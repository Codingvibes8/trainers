import { Search, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    email: "john@example.com",
    total: 249.99,
    items: 2,
    status: "processing",
    date: "2026-02-02T10:30:00",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    total: 189.99,
    items: 1,
    status: "shipped",
    date: "2026-02-02T08:15:00",
  },
  {
    id: "ORD-003",
    customer: "Mike Brown",
    email: "mike@example.com",
    total: 324.99,
    items: 3,
    status: "delivered",
    date: "2026-02-01T16:45:00",
  },
  {
    id: "ORD-004",
    customer: "Emma Wilson",
    email: "emma@example.com",
    total: 159.99,
    items: 1,
    status: "processing",
    date: "2026-02-01T14:20:00",
  },
  {
    id: "ORD-005",
    customer: "James Davis",
    email: "james@example.com",
    total: 449.99,
    items: 4,
    status: "pending",
    date: "2026-02-01T09:00:00",
  },
  {
    id: "ORD-006",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    total: 279.99,
    items: 2,
    status: "cancelled",
    date: "2026-01-31T18:30:00",
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "default" as const },
  processing: { label: "Processing", variant: "info" as const },
  shipped: { label: "Shipped", variant: "warning" as const },
  delivered: { label: "Delivered", variant: "success" as const },
  cancelled: { label: "Cancelled", variant: "danger" as const },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Orders</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage and fulfill customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div
            key={key}
            className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800"
          >
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {orders.filter((o) => o.status === key).length}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {config.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:w-80"
          />
        </div>
        <div className="flex gap-2">
          <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Total
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
              {orders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig];
                return (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {order.customer}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {order.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 dark:text-slate-400">
                        {formatDate(order.date)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 dark:text-slate-400">
                        {order.items} item{order.items > 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900 dark:text-white">
                        £{order.total.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing 1-6 of 48 orders
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
