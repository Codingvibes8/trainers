import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, ArrowUpRight } from "lucide-react";

// Mock analytics data
const weeklyRevenue = [
  { day: "Mon", revenue: 2400 },
  { day: "Tue", revenue: 1398 },
  { day: "Wed", revenue: 3200 },
  { day: "Thu", revenue: 2780 },
  { day: "Fri", revenue: 4890 },
  { day: "Sat", revenue: 6390 },
  { day: "Sun", revenue: 4490 },
];

const topProducts = [
  { name: "Nike Air Zoom Pegasus 41", sales: 124, revenue: 15499.76 },
  { name: "Jordan 1 Retro High OG", sales: 98, revenue: 17639.02 },
  { name: "Adidas Ultraboost Light", sales: 87, revenue: 15659.13 },
  { name: "Nike Air Force 1 '07", sales: 76, revenue: 8359.24 },
  { name: "Nike Metcon 9", sales: 65, revenue: 9749.35 },
];

const topCategories = [
  { name: "Running", percentage: 35, color: "bg-blue-500" },
  { name: "Basketball", percentage: 28, color: "bg-purple-500" },
  { name: "Lifestyle", percentage: 22, color: "bg-emerald-500" },
  { name: "Training", percentage: 15, color: "bg-amber-500" },
];

export default function AdminAnalyticsPage() {
  const maxRevenue = Math.max(...weeklyRevenue.map((d) => d.revenue));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track your store performance and insights
        </p>
      </div>

      {/* Period Selector */}
      <div className="mb-8 flex items-center gap-2">
        <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 12 months</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              +12.5%
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              £25,548
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Weekly Revenue</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              +8.2%
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              187
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Weekly Orders</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              +15.3%
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              64
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">New Customers</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              +5.1%
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              £136.62
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Order Value</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Revenue Overview
            </h2>
            <BarChart3 className="h-5 w-5 text-slate-400" />
          </div>
          <div className="flex h-64 items-end justify-between gap-2">
            {weeklyRevenue.map((data) => (
              <div key={data.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-500"
                  style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
            Top Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {product.sales} sold
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  £{product.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800 lg:col-span-2">
          <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
            Sales by Category
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topCategories.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {category.name}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {category.percentage}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className={`h-full rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
