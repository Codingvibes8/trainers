"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTax, getTotal, getItemCount } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="mb-8 h-10 w-48 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-700"
                    />
                  ))}
                </div>
              </div>
              <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <ShoppingBag className="h-12 w-12 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Your cart is empty
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Looks like you haven&apos;t added any items yet.
          </p>
          <Button className="mt-6">
            <Link href="/products" className="flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
          Shopping Cart ({getItemCount()} items)
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-800 sm:gap-6 sm:p-6"
                >
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700 sm:h-32 sm:w-32"
                  >
                    <Image
                      src={item.product.images[0] || "/placeholder-shoe.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Size: {item.variant.size} | Color: {item.variant.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-full p-2 text-slate-400 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      {/* Quantity */}
                      <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-10 w-10 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.variant.stock}
                          className="flex h-10 w-10 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-sm text-slate-500">
                            {formatPrice(item.product.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatPrice(getSubtotal())}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">VAT (20%)</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatPrice(getTax())}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>

                <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {formatPrice(getTotal())}
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Button size="lg" className="mt-4 w-full">
                  <Link href="/checkout" className="flex w-full items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
                <p className="mb-3 text-center text-sm text-slate-500 dark:text-slate-400">
                  Secure checkout with
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-8 w-12 rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="h-8 w-12 rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="h-8 w-12 rounded bg-slate-100 dark:bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
