import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock featured products (will be replaced with Supabase query)
const featuredProducts = [
  {
    id: "1",
    name: "Nike Air Zoom Pegasus 41",
    slug: "nike-air-zoom-pegasus-41",
    price: 124.99,
    compare_at_price: 149.99,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
    rating: 4.8,
    review_count: 324,
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
  },
  {
    id: "3",
    name: "Jordan 1 Retro High OG",
    slug: "jordan-1-retro-high-og",
    price: 179.99,
    compare_at_price: null,
    images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800"],
    rating: 4.9,
    review_count: 567,
  },
  {
    id: "4",
    name: "Nike Air Force 1 '07",
    slug: "nike-air-force-1-07",
    price: 109.99,
    compare_at_price: null,
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"],
    rating: 4.8,
    review_count: 1243,
  },
];

const categories = [
  {
    name: "Running",
    slug: "running",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    count: 24,
  },
  {
    name: "Training",
    slug: "training",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    count: 18,
  },
  {
    name: "Basketball",
    slug: "basketball",
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400",
    count: 15,
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400",
    count: 32,
  },
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over £100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "2-3 business days",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300">
                <Zap className="h-4 w-4" />
                New Collection 2026
              </span>
              
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Step Into{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-slate-300 sm:text-xl">
                Discover premium men's sports trainers designed for peak performance
                and unmatched style. From track to street, we've got you covered.
              </p>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button size="lg" className="group">
                  <Link href="/products" className="flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <Link href="/products?is_featured=true">View Bestsellers</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-slate-400">Brands</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-slate-400">Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto hidden max-w-lg lg:block">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-3xl" />
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
                  alt="Nike Air Zoom Pegasus"
                  fill
                  className="rotate-[-20deg] scale-110 object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-slate-200 bg-white py-8 dark:border-slate-700 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Find the perfect trainers for every occasion
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    {category.count} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 py-16 dark:bg-slate-800/50 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                Featured Products
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Our most popular picks this season
              </p>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline">
              <Link href="/products" className="flex items-center gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-16 text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white lg:text-4xl">
                Get 10% Off Your First Order
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-blue-100">
                Subscribe to our newsletter for exclusive deals, new arrivals, and
                style tips.
              </p>
              <form className="mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border-0 bg-white/10 px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
