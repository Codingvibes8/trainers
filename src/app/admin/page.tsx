import { DollarSign, ShoppingBag, Users, TrendingUp, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Mock data for dashboard
const stats = [
  {
    label: "Total Revenue",
    value: "£24,567.89",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "blue",
  },
  {
    label: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    color: "emerald",
  },
  {
    label: "Total Customers",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "purple",
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "amber",
  },
];

const recentOrders = [
  { id: "ORD-001", customer: "John Smith", total: 249.99, status: "processing", date: "2 hours ago" },
  { id: "ORD-002", customer: "Sarah Johnson", total: 189.99, status: "shipped", date: "4 hours ago" },
  { id: "ORD-003", customer: "Mike Brown", total: 324.99, status: "delivered", date: "6 hours ago" },
  { id: "ORD-004", customer: "Emma Wilson", total: 159.99, status: "processing", date: "8 hours ago" },
  { id: "ORD-005", customer: "James Davis", total: 449.99, status: "pending", date: "12 hours ago" },
];

const lowStockProducts = [
  { name: "Nike Air Zoom Pegasus 41", size: "10", color: "Black/White", stock: 5 },
  { name: "Jordan 1 Retro High OG", size: "9", color: "Chicago", stock: 3 },
  { name: "Nike LeBron 21", size: "12", color: "Purple/Gold", stock: 2 },
];

const statusColors = {
  pending: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  shipped: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${stat.color}-100 text-${stat.color}-600 dark:bg-${stat.color}-900/30 dark:text-${stat.color}-400`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {stat.change}
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Orders
            </h2>
            <a
              href="/admin/orders"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View all
            </a>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {order.id}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {order.customer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900 dark:text-white">
                    £{order.total.toFixed(2)}
                  </p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      statusColors[order.status as keyof typeof statusColors]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Low Stock Alert
            </h2>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {lowStockProducts.length}
            </span>
          </div>
          <div className="space-y-4">
            {lowStockProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Size: {product.size} | {product.color}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  {product.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
