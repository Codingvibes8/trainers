"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Truck, Check, ChevronLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart-store";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const shippingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postcode: z.string().min(5, "Postcode is required"),
  country: z.string().min(2, "Country is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

const steps = [
  { id: 1, name: "Cart", icon: Check },
  { id: 2, name: "Shipping", icon: Truck },
  { id: 3, name: "Payment", icon: CreditCard },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { items, getSubtotal, getTax, getTotal } = useCartStore();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      country: "United Kingdom",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/cart");
    }
  }, [mounted, items.length, router]);

  const onSubmit = async (data: ShippingFormData) => {
    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }

    setIsLoading(true);
    try {
      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            variantId: item.variant.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images[0],
            size: item.variant.size,
            color: item.variant.color,
          })),
          shippingAddress: data,
        }),
      });

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch {
      addToast("Failed to process payment. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="mb-8 h-12 w-64 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-700" />
              <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-900 lg:py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to cart
        </Link>

        {/* Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    currentStep > step.id
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : currentStep === step.id
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-slate-800"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm font-medium",
                    currentStep >= step.id
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400"
                  )}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-4 h-0.5 w-12 sm:w-24",
                      currentStep > step.id
                        ? "bg-emerald-500"
                        : "bg-slate-300 dark:bg-slate-600"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 2 && (
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
                  <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
                    Shipping Information
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      placeholder="John"
                      error={errors.firstName?.message}
                      {...register("firstName")}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      error={errors.lastName?.message}
                      {...register("lastName")}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+44 7123 456789"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      label="Address"
                      placeholder="123 High Street"
                      error={errors.address?.message}
                      {...register("address")}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <Input
                      label="City"
                      placeholder="London"
                      error={errors.city?.message}
                      {...register("city")}
                    />
                    <Input
                      label="Postcode"
                      placeholder="SW1A 1AA"
                      error={errors.postcode?.message}
                      {...register("postcode")}
                    />
                    <Input
                      label="Country"
                      placeholder="United Kingdom"
                      error={errors.country?.message}
                      {...register("country")}
                    />
                  </div>

                  <Button type="submit" className="mt-6 w-full" size="lg">
                    Continue to Payment
                  </Button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
                  <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
                    Payment
                  </h2>

                  <div className="mb-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-700">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-emerald-500" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          Secure Payment with Stripe
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Your payment info is encrypted and secure
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mb-6 text-slate-600 dark:text-slate-400">
                    Click the button below to complete your purchase securely
                    through Stripe.
                  </p>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      size="lg"
                      isLoading={isLoading}
                    >
                      Pay {formatPrice(getTotal())}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
              <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
                Order Summary
              </h2>

              <div className="max-h-64 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
                      <Image
                        src={item.product.images[0] || "/placeholder.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {item.variant.size} / {item.variant.color}
                      </p>
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6 dark:border-slate-700">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>VAT (20%)</span>
                  <span>{formatPrice(getTax())}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
