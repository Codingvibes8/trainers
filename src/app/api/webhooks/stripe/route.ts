import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      
      try {
        await handleCheckoutComplete(session);
      } catch (error) {
        console.error("Error handling checkout complete:", error);
      }
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent ${paymentIntent.id} failed`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const supabase = await createAdminClient();

  // Parse metadata
  const shippingAddress = session.metadata?.shippingAddress
    ? JSON.parse(session.metadata.shippingAddress)
    : null;

  const items = session.metadata?.items
    ? JSON.parse(session.metadata.items)
    : [];

  // Calculate amounts
  const total = (session.amount_total || 0) / 100;
  const subtotal = total / 1.2; // Remove 20% VAT
  const tax = total - subtotal;

  // Create order in database
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: session.client_reference_id || null,
      status: "processing",
      total,
      subtotal,
      tax,
      discount: 0,
      shipping_address: shippingAddress,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
    })
    .select()
    .single();

  if (orderError) {
    console.error("Failed to create order:", orderError);
    throw orderError;
  }

  // Create order items
  for (const item of items) {
    // Get product price
    const { data: product } = await supabase
      .from("products")
      .select("price")
      .eq("id", item.productId)
      .single();

    if (product) {
      await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: item.productId,
        variant_id: item.variantId,
        quantity: item.quantity,
        price: product.price,
      });

      // Update stock
      await supabase.rpc("decrement_stock", {
        variant_id: item.variantId,
        quantity: item.quantity,
      });
    }
  }

  console.log(`Order ${order.id} created successfully`);
}
