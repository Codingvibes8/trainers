import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "NexShop Pro | Premium Men's Sports Trainers",
    template: "%s | NexShop Pro",
  },
  description:
    "Discover the finest collection of men's sports trainers. Premium running, training, basketball, and lifestyle shoes from top brands.",
  keywords: [
    "trainers",
    "sports shoes",
    "running shoes",
    "basketball shoes",
    "men's footwear",
    "Nike",
    "Adidas",
    "New Balance",
  ],
  authors: [{ name: "NexShop Pro" }],
  creator: "NexShop Pro",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://nexshop.pro",
    siteName: "NexShop Pro",
    title: "NexShop Pro | Premium Men's Sports Trainers",
    description:
      "Discover the finest collection of men's sports trainers. Premium running, training, basketball, and lifestyle shoes from top brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexShop Pro | Premium Men's Sports Trainers",
    description:
      "Discover the finest collection of men's sports trainers. Premium running, training, basketball, and lifestyle shoes from top brands.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
      >
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}
