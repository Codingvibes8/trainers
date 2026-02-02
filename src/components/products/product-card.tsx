"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star, TrendingUp } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useToast } from "@/components/ui/toast";
import type { Product, ProductVariant } from "@/types";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: ProductVariant;
}

export function ProductCard({ product, variant }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { addToast } = useToast();

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercentage = hasDiscount
    ? calculateDiscountPercentage(product.compare_at_price!, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (variant) {
      addItem(product, variant, 1);
      addToast(`${product.name} added to cart!`, "success");
    } else {
      addToast("Please select a size and color", "warning");
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-slate-800">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
          <Image
            src={product.images[0] || "/placeholder-shoe.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {hasDiscount && (
              <span className="rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                -{discountPercentage}%
              </span>
            )}
            {product.is_featured && (
              <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                <TrendingUp className="h-3 w-3" />
                Hot
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "absolute bottom-3 right-3 flex items-center justify-center rounded-full p-3",
              "bg-white/90 text-slate-700 shadow-lg backdrop-blur-sm",
              "opacity-0 transition-all duration-300 group-hover:opacity-100",
              "hover:bg-blue-600 hover:text-white",
              "dark:bg-slate-800/90 dark:text-white dark:hover:bg-blue-600"
            )}
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          {product.rating > 0 && (
            <div className="mb-2 flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                ({product.review_count})
              </span>
            </div>
          )}

          {/* Name */}
          <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-slate-500 line-through dark:text-slate-400">
                {formatPrice(product.compare_at_price!)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
