import Link from "next/link";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Order Confirmed!
        </h1>
        
        <p className="mx-auto mt-4 max-w-md text-lg text-slate-600 dark:text-slate-400">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>

        <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Confirmation Email Sent
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Check your inbox for order details
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  Shipping in 2-3 Days
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Free delivery on this order
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button>
            <Link href="/account/orders" className="flex items-center gap-2">
              View Order
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
