"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Minus, Plus, Heart, Share2, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Mock product data
const mockProduct = {
  id: "p1000000-0000-0000-0000-000000000001",
  name: "Nike Air Zoom Pegasus 41",
  slug: "nike-air-zoom-pegasus-41",
  description:
    "The Nike Air Zoom Pegasus 41 continues to put a spring in your step with responsive cushioning and durable support. Built for running, training, and everything in between. Whether you're logging miles or cruising the streets, this versatile trainer delivers comfort and style.",
  price: 124.99,
  compare_at_price: 149.99,
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
    "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800",
  ],
  is_available: true,
  is_featured: true,
  rating: 4.8,
  review_count: 324,
  category: { name: "Running", slug: "running" },
};

const mockVariants = [
  { id: "v1", size: "7", color: "Black/White", stock: 15 },
  { id: "v2", size: "8", color: "Black/White", stock: 20 },
  { id: "v3", size: "9", color: "Black/White", stock: 25 },
  { id: "v4", size: "10", color: "Black/White", stock: 30 },
  { id: "v5", size: "11", color: "Black/White", stock: 18 },
  { id: "v6", size: "12", color: "Black/White", stock: 12 },
  { id: "v7", size: "9", color: "Blue/Orange", stock: 20 },
  { id: "v8", size: "10", color: "Blue/Orange", stock: 22 },
  { id: "v9", size: "11", color: "Blue/Orange", stock: 0 },
];

const colors = [...new Set(mockVariants.map((v) => v.color))];
const sizes = [...new Set(mockVariants.map((v) => v.size))];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const { addToast } = useToast();

  const product = mockProduct;
  const variants = mockVariants;

  const selectedVariant = variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const availableSizes = variants
    .filter((v) => v.color === selectedColor)
    .map((v) => ({ size: v.size, stock: v.stock }));

  const handleAddToCart = () => {
    if (!selectedVariant) {
      addToast("Please select a size", "warning");
      return;
    }

    if (selectedVariant.stock === 0) {
      addToast("This size is out of stock", "error");
      return;
    }

    addItem(
      {
        ...product,
        category_id: null,
        created_at: "",
        updated_at: "",
      } as any,
      {
        ...selectedVariant,
        product_id: product.id,
        sku: null,
        created_at: "",
      },
      quantity
    );

    addToast(`${product.name} added to cart!`, "success");
  };

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
            Home
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <Link href="/products" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
            Products
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <Link
            href={`/products?category=${product.category.slug}`}
            className="text-slate-500 hover:text-blue-600 dark:text-slate-400"
          >
            {product.category.name}
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  -{discountPercentage}% OFF
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-xl bg-slate-100 transition-all dark:bg-slate-800",
                    selectedImage === index
                      ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200 dark:fill-slate-600 dark:text-slate-600"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {product.rating}
              </span>
              <span className="text-sm text-slate-500">({product.review_count} reviews)</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-slate-500 line-through">
                  {formatPrice(product.compare_at_price!)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                Color: <span className="font-normal text-slate-600 dark:text-slate-400">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedSize(null);
                    }}
                    className={cn(
                      "rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all",
                      selectedColor === color
                        ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "border-slate-200 text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                Size:{" "}
                <span className="font-normal text-slate-600 dark:text-slate-400">
                  {selectedSize || "Select a size"}
                </span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => {
                  const sizeInfo = availableSizes.find((s) => s.size === size);
                  const isAvailable = sizeInfo && sizeInfo.stock > 0;
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl border-2 text-sm font-medium transition-all",
                        isSelected
                          ? "border-blue-500 bg-blue-500 text-white"
                          : isAvailable
                          ? "border-slate-200 text-slate-700 hover:border-blue-500 dark:border-slate-700 dark:text-slate-300"
                          : "cursor-not-allowed border-slate-100 text-slate-300 line-through dark:border-slate-800 dark:text-slate-600"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-12 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(selectedVariant?.stock || 10, quantity + 1))
                    }
                    className="flex h-12 w-12 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {selectedVariant && (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedVariant.stock} in stock
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-slate-800 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Free Shipping</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">On orders £100+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Authentic</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">100% Genuine</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Easy Returns</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">30 day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
