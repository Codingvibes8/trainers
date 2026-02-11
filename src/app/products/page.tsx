import Link from "next/link";
import Image from "next/image";
import { Star, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock products (will be replaced with Supabase query)
const allProducts = [
  {
    id: "1",
    name: "Nike Air Zoom Pegasus 41",
    slug: "nike-air-zoom-pegasus-41",
    price: 124.99,
    compare_at_price: 149.99,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
    rating: 4.8,
    review_count: 324,
    category: "running",
    is_featured: true,
  },
  {
    id: "2",
    name: "Adidas Ultraboost Light",
    slug: "adidas-ultraboost-light",
    price: 179.99,
    compare_at_price: null,
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800"],
    rating: 4.7,
    review_count: 256,
    category: "running",
    is_featured: true,
  },
  {
    id: "3",
    name: "New Balance Fresh Foam X 1080v13",
    slug: "new-balance-fresh-foam-1080v13",
    price: 159.99,
    compare_at_price: 184.99,
    images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=800"],
    rating: 4.9,
    review_count: 189,
    category: "running",
    is_featured: true,
  },
  {
    id: "4",
    name: "ASICS Gel-Kayano 30",
    slug: "asics-gel-kayano-30",
    price: 189.99,
    compare_at_price: null,
    images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800"],
    rating: 4.6,
    review_count: 142,
    category: "running",
    is_featured: false,
  },
  {
    id: "5",
    name: "Nike Metcon 9",
    slug: "nike-metcon-9",
    price: 149.99,
    compare_at_price: null,
    images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"],
    rating: 4.7,
    review_count: 198,
    category: "training",
    is_featured: true,
  },
  {
    id: "6",
    name: "Under Armour Project Rock 6",
    slug: "ua-project-rock-6",
    price: 159.99,
    compare_at_price: 179.99,
    images: ["https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800"],
    rating: 4.5,
    review_count: 167,
    category: "training",
    is_featured: false,
  },
  {
    id: "7",
    name: "Reebok Nano X4",
    slug: "reebok-nano-x4",
    price: 139.99,
    compare_at_price: null,
    images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800"],
    rating: 4.4,
    review_count: 98,
    category: "training",
    is_featured: false,
  },
  {
    id: "8",
    name: "Nike LeBron 21",
    slug: "nike-lebron-21",
    price: 199.99,
    compare_at_price: 229.99,
    images: ["https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800"],
    rating: 4.8,
    review_count: 234,
    category: "basketball",
    is_featured: true,
  },
  {
    id: "9",
    name: "Jordan 1 Retro High OG",
    slug: "jordan-1-retro-high-og",
    price: 179.99,
    compare_at_price: null,
    images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800"],
    rating: 4.9,
    review_count: 567,
    category: "basketball",
    is_featured: true,
  },
  {
    id: "10",
    name: "Adidas Harden Vol. 8",
    slug: "adidas-harden-vol-8",
    price: 159.99,
    compare_at_price: 189.99,
    images: ["https://images.unsplash.com/photo-1584735175097-719d848f8449?w=800"],
    rating: 4.3,
    review_count: 89,
    category: "basketball",
    is_featured: false,
  },
  {
    id: "11",
    name: "Nike Air Force 1 '07",
    slug: "nike-air-force-1-07",
    price: 109.99,
    compare_at_price: null,
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"],
    rating: 4.8,
    review_count: 1243,
    category: "lifestyle",
    is_featured: true,
  },
  {
    id: "12",
    name: "Puma RS-X Reinvention",
    slug: "puma-rs-x-reinvention",
    price: 119.99,
    compare_at_price: 139.99,
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800"],
    rating: 4.4,
    review_count: 156,
    category: "lifestyle",
    is_featured: false,
  },
];

const categories = [
  { name: "All", slug: "" },
  { name: "Running", slug: "running" },
  { name: "Training", slug: "training" },
  { name: "Basketball", slug: "basketball" },
  { name: "Lifestyle", slug: "lifestyle" },
];

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categoryFilter = params.category;
  const sortBy = params.sort || "featured";

  // Filter products
  let products = categoryFilter
    ? allProducts.filter((p) => p.category === categoryFilter)
    : allProducts;

  // Sort products
  switch (sortBy) {
    case "price-asc":
      products = [...products].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products = [...products].sort((a, b) => b.price - a.price);
      break;
    case "newest":
      products = [...products].reverse();
      break;
    case "rating":
      products = [...products].sort((a, b) => b.rating - a.rating);
      break;
    default:
      products = [...products].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
            {categoryFilter
              ? categories.find((c) => c.slug === categoryFilter)?.name || "All"
              : "All"}{" "}
            Trainers
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {products.length} products found
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={
                        category.slug
                          ? `/products?category=${category.slug}`
                          : "/products"
                      }
                      className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        categoryFilter === category.slug ||
                        (!categoryFilter && !category.slug)
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Under £100
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      £100 - £150
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      £150 - £200
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Over £200
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 lg:hidden">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    defaultValue={sortBy}
                    className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-slate-800">
                    <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {product.compare_at_price && (
                        <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {product.rating}
                        </span>
                        <span className="text-sm text-slate-500">
                          ({product.review_count})
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          £{product.price.toFixed(2)}
                        </span>
                        {product.compare_at_price && (
                          <span className="text-sm text-slate-500 line-through">
                            £{product.compare_at_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
