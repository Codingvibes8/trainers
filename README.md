# Trainers - E-Commerce Platform

A modern e-commerce platform for athletic footwear built with Next.js 15, Supabase, and Stripe.

## Tech Stack

- **Framework**: Next.js 15 with App Router & Turbopack
- **Language**: TypeScript 5
- **Database & Auth**: Supabase
- **Payments**: Stripe
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form + Zod validation

## Features

### Shopping Experience
- Product catalog with category filtering
- Product detail pages with size/color variants
- Persistent shopping cart with localStorage
- Automatic VAT calculation (20%)

### Checkout & Payments
- Stripe checkout integration
- Support for UK and international shipping
- Webhook handling for order creation
- Order confirmation pages

### Authentication
- Supabase authentication (email/password, OAuth)
- Session management via middleware
- Protected routes

### Admin Dashboard
- Sales analytics and metrics
- Order management with status tracking
- Product inventory management
- Low stock alerts

### UI/UX
- Dark/light theme toggle
- Responsive design
- Optimized images with Next.js Image

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── (auth)/          # Login & register
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes (checkout, webhooks)
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout flow
│   └── products/        # Product catalog
├── components/
│   ├── layout/          # Header, footer, theme toggle
│   ├── ui/              # Reusable UI components
│   ├── cart/            # Cart components
│   └── products/        # Product display components
├── lib/
│   ├── stripe.ts        # Stripe configuration
│   └── supabase/        # Supabase clients
├── stores/              # Zustand stores (cart, UI)
└── types/               # TypeScript definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd trainers
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` from the example:
   ```bash
   cp .env.example .env.local
   ```

4. Configure environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/checkout` | POST | Create Stripe checkout session |
| `/api/webhooks/stripe` | POST | Handle Stripe webhook events |
| `/auth/callback` | GET | Supabase OAuth callback |

## Database Schema

The application expects the following Supabase tables:

- **products** - Product catalog
- **product_variants** - Size/color variants with stock
- **categories** - Product categories
- **orders** - Customer orders
- **order_items** - Items within orders

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

## License

MIT
