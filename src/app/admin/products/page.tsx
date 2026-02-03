import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock products data
const products = [
  {
    id: "1",
    name: "Nike Air Zoom Pegasus 41",
    slug: "nike-air-zoom-pegasus-41",
    price: 124.99,
    category: "Running",
    stock: 120,
    status: "active",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
  },
  {
    id: "2",
    name: "Adidas Ultraboost Light",
    slug: "adidas-ultraboost-light",
    price: 179.99,
    category: "Running",
    stock: 85,
    status: "active",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200",
  },
  {
    id: "3",
    name: "Jordan 1 Retro High OG",
    slug: "jordan-1-retro-high-og",
    price: 179.99,
    category: "Basketball",
    stock: 45,
    status: "active",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200",
  },
  {
    id: "4",
    name: "Nike Air Force 1 '07",
    slug: "nike-air-force-1-07",
    price: 109.99,
    category: "Lifestyle",
    stock: 200,
    status: "active",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200",
  },
  {
    id: "5",
    name: "Nike Metcon 9",
    slug: "nike-metcon-9",
    price: 149.99,
    category: "Training",
    stock: 0,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200",
  },
];

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Products</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your product inventory
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:w-80"
          />
        </div>
        <div className="flex gap-2">
          <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <option>All Categories</option>
            <option>Running</option>
            <option>Training</option>
            <option>Basketball</option>
            <option>Lifestyle</option>
          </select>
          <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Out of Stock</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {product.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 dark:text-slate-400">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900 dark:text-white">
                      £{product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        product.stock < 10
                          ? "font-medium text-red-600"
                          : "text-slate-600 dark:text-slate-400"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={product.status === "active" ? "success" : "danger"}
                    >
                      {product.status === "active" ? "Active" : "Out of Stock"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing 1-5 of 12 products
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
