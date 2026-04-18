# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Next.js dev server

# Build (must use legacy-peer-deps due to Three.js/React peer dep conflicts)
npm run build        # Runs: npm install --legacy-peer-deps && next build

# Production
npm run start        # Start production server

# Linting
npm run lint         # next lint

# Database
npx prisma migrate dev       # Run migrations in development
npx prisma migrate deploy    # Apply migrations in production
npx prisma generate          # Regenerate Prisma client after schema changes
npx prisma studio            # Open DB browser
npx prisma db seed           # Seed sample data
```

> TypeScript build errors are intentionally ignored via `next.config.ts` (`ignoreBuildErrors: true`).

## Architecture

**XAVOV** is a Next.js 15 full-stack Arabic e-commerce platform connecting Chinese suppliers to Saudi Arabian buyers, with three main sections: Store, Auctions, and Bourse (trading). UI is Arabic/RTL, currency is SAR, and payment methods target the Saudi market (STC Pay, Tamara, Apple Pay, card).

### Tech Stack
- **Framework**: Next.js 15 (App Router), React 18, TypeScript
- **Database**: PostgreSQL via Prisma 5
- **Styling**: Mix of Tailwind CSS + heavy inline styles
- **3D/Canvas**: Three.js + @react-three/fiber/@react-three/drei (currently used for animated particle backgrounds, not true 3D scenes)

### Data Flow

State management is split across three layers — be aware when modifying features:

1. **localStorage** — cart items, points balance, current order details (not persisted server-side)
2. **React Context** (`app/context/CartContext.tsx`) — cart item count for Navbar badge
3. **Prisma/PostgreSQL** — orders and order items only; no user/auth tables currently exist

### Key Flows

**Checkout**: `app/checkout/page.tsx` → 3 steps (Personal Info → Address → Payment) → OTP verification (`/otp`) → order created via `POST /api/orders`

**Order Tracking**: `app/track/page.tsx` — reads order from localStorage, shows status progression (processing → preparing → onway → delivered), awards points on delivery confirmation and review submission

**Points/Rewards**: Logic in `lib/rewards.ts` — 2pts for confirming delivery, 3pts for review; 5pts = 1.5 SAR discount (capped at 20% of order total). Points stored in localStorage.

### Database Schema

Only two models exist (`prisma/schema.prisma`):
- `Order` — id, email, phone, totalAmount, status, createdAt
- `OrderItem` — id, name, price, quantity, orderId (cascade deletes with Order)

User and OTP tables were dropped in the latest migration. Auth is handled client-side via localStorage.

### API Routes (`app/api/`)

| Route | Method | Purpose |
|---|---|---|
| `/api/orders` | GET/POST | List all orders / Create order |
| `/api/orders/[id]/status` | PATCH | Update order status |
| `/api/orders/[id]/pay` | POST | Mark as paid |
| `/api/orders/[id]/review` | POST | Submit review |
| `/api/auth/send-otp` | POST | Send OTP via email/SMS |
| `/api/otp/send` | POST | Alternate OTP endpoint |
| `/api/products` | GET | Hardcoded product list |
| `/api/admin/orders` | GET | Admin order list |
| `/api/ping` | GET | Health check |

### Path Aliases

`tsconfig.json` defines `@/*` → project root and `@/lib` → `./lib`. Use `@/` imports throughout.

### Store Products

Product data lives in `app/data/` as static TypeScript files. The `/api/products` endpoint returns a small hardcoded list (fridge, TV). The store's `/wings` section organizes products by price tier.
