"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTax, getTotal, getItemCount } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-900",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Your Cart
              </h2>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {getItemCount()}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Start shopping to add items to your cart
                </p>
                <Button onClick={closeCart} className="mt-6">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800"
                  >
                    {/* Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-white dark:bg-slate-700">
                      <Image
                        src={item.product.images[0] || "/placeholder-shoe.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Size: {item.variant.size} | Color: {item.variant.color}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-full p-1 text-slate-400 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-100 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.variant.stock}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-100 disabled:opacity-50 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-bold text-slate-900 dark:text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatPrice(getSubtotal())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">VAT (20%)</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatPrice(getTax())}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 dark:border-slate-700">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Button className="w-full" size="lg" onClick={closeCart}>
                  <Link href="/checkout" className="flex w-full items-center justify-center">
                    Checkout
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={closeCart}
                >
                  <Link href="/cart" className="flex w-full items-center justify-center">
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
