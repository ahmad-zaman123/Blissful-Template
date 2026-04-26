# Blissful

A **full-stack e-commerce web app** for a beauty and skincare brand, with a React storefront, Express + MongoDB API, and **Safepay** card-payment integration alongside Cash on Delivery.

## Features

### Storefront
- Responsive React UI (desktop / tablet / mobile).
- Product catalog with category and skin-concern routes (Serums, Moisturisers, Cleansers, Sunscreens, Bundles, etc.).
- Header search bar — submits to `/SHOPALL?q=<term>` and filters by product name (case-insensitive regex on the backend).
- Dual-thumb price-range slider with availability toggles (`In Stock` / `Out of Stock` independently selectable).
- Auto scroll-to-top on every route change.

### Cart & Checkout
- Session-based cart persisted to MongoDB (anonymous, identified by a `x-session-id` header).
- Checkout flow with phone validation and a fixed shipping fee (Rs 200).
- **Two payment methods**:
  - **Cash on Delivery (COD)** — order created with `pending` status.
  - **Safepay (debit / credit cards)** — server creates a payment session, redirects to Safepay's hosted card form, and updates order status via webhook.
- Order confirmation page that auto-polls until the Safepay webhook flips status from `pending_payment` → `paid`.

### Backend
- REST API: `/api/products`, `/api/cart`, `/api/orders`, `/api/payments/safepay/checkout`, `/api/payments/safepay/webhook`, `/api/payments/config`.
- MongoDB via Mongoose with cached connection (works for both long-running and serverless deployments).
- Safepay integration via the official `@sfpy/node-core` SDK (session setup + passport token + hosted-checkout URL helper).
- Webhook handler with raw-body parsing for HMAC signature verification.

## Tech Stack

| Layer | |
|---|---|
| Frontend | React 18, React Router 7, Bootstrap 5, Tailwind CSS, Axios, Lucide / React Icons |
| Backend  | Node.js, Express, Mongoose, dotenv |
| Database | MongoDB Atlas |
| Payments | Safepay (`@sfpy/node-core`), Cash on Delivery |
| Hosting  | Vercel (frontend static build + Express as a serverless function) |

## Project Structure

```
.
├── Frontend/              # React app (CRA)
│   ├── src/
│   │   ├── components/    # ProductGrid, etc.
│   │   ├── context/       # CartContext
│   │   ├── hooks/         # useProducts
│   │   ├── services/      # api.js (axios client)
│   │   ├── utils/         # formatters
│   │   └── *.js           # page components (HomePage, ShopAll, Cart, Checkout, ...)
│   └── package.json
├── Backend/               # Express API
│   ├── api/index.js       # Vercel serverless entrypoint
│   ├── app.js             # Express app
│   ├── server.js          # Local server entrypoint
│   ├── config/db.js       # Mongoose connection (cached)
│   ├── controllers/       # productController, cartController, orderController, paymentController
│   ├── models/            # Product, CartItem, Order
│   ├── routes/            # productRoutes, cartRoutes, orderRoutes, paymentRoutes
│   ├── utils/             # safepay.js (SDK wrapper), asyncHandler, ApiError
│   └── package.json
└── vercel.json            # multi-build config
```

## Local Development

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB)
- A Safepay sandbox account for card payments (optional — COD works without it)

### Backend
```bash
cd Backend
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # starts on http://localhost:5000
```

### Frontend
```bash
cd Frontend
npm install
npm start              # starts on http://localhost:3000 with proxy to :5000
```

### Environment variables (`Backend/.env`)

| Key | Required | Notes |
|---|---|---|
| `PORT` | no | defaults to 5000 |
| `MONGO_URI` | **yes** | MongoDB connection string |
| `CLIENT_ORIGIN` | recommended | e.g. `http://localhost:3000` for CORS |
| `PUBLIC_BASE_URL` | for Safepay | URL the Safepay form redirects back to (e.g. `http://localhost:3000`) |
| `SAFEPAY_API_KEY` | for Safepay | Public key from Safepay dashboard (`sec_…`) |
| `SAFEPAY_SECRET` | for Safepay | Secret key — used for SDK auth and webhook signature verification |
| `SAFEPAY_ENV` | for Safepay | `sandbox` or `production` |

Without the Safepay vars, the Safepay radio on checkout shows as "Coming soon" and only COD is available.

### Webhook setup (local)
Safepay can't reach `localhost`, so for local end-to-end card payments you need a public tunnel:
```bash
ngrok http 5000
```
Register `https://<your-tunnel>/api/payments/safepay/webhook` in **Safepay Dashboard → Developer → Endpoints**, and subscribe to `payment.succeeded` / `payment.failed`.

## Deployment (Vercel)

The repo's `vercel.json` builds the frontend as a static site and the backend as a serverless function under `/api/*`.

After importing the repo into Vercel:
1. Set **Framework Preset** to `Other` (Settings → Build and Development Settings).
2. Add all the env vars from the table above to **Settings → Environment Variables** (Production + Preview), plus `NODE_ENV=production` and `CI=false`.
3. Deploy. The production URL becomes the new `PUBLIC_BASE_URL` — update that env var and redeploy once.
4. In the Safepay dashboard, switch the registered webhook URL from your ngrok URL to `https://<your-app>.vercel.app/api/payments/safepay/webhook`.

## Live Demo
[https://blissful-template.vercel.app/](https://blissful-template.vercel.app/)

## Source Code
[GitHub Repository](https://github.com/ahmad-zaman123/Blissful-Template)

## Use Case
A ready-to-launch e-commerce template for beauty / skincare brands or any small-catalog Pakistani store, with sandbox Safepay wired up out of the box.
