<h1 align="center">🌸 Blissful</h1>

<p align="center">
  <b>A full-stack storefront for a beauty and skincare brand.</b><br/>
  React frontend, Express + MongoDB API, real card payments with Safepay, and a Cash on Delivery fallback.
</p>

<p align="center">
  <a href="https://blissful-template.vercel.app"><img src="https://img.shields.io/badge/live-blissful--template.vercel.app-000?logo=vercel&logoColor=white&style=flat-square" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black&style=flat-square" alt="React 18" />
  <img src="https://img.shields.io/badge/Express-4-000?logo=express&logoColor=white&style=flat-square" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white&style=flat-square" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Safepay-payments-1F6FEB?style=flat-square" alt="Safepay" />
  <img src="https://img.shields.io/badge/Vercel-serverless-000?logo=vercel&logoColor=white&style=flat-square" alt="Vercel" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT license" /></a>
</p>

<p align="center">
  <a href="#-quick-start">Quick start</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-how-checkout-works">Checkout</a> ·
  <a href="#-api">API</a> ·
  <a href="#-deployment">Deployment</a>
</p>

<!-- Hero screenshot: add docs/screenshots/home.png (and optionally shop.png, checkout.png), then uncomment:
<p align="center">
  <img src="docs/screenshots/home.png" alt="Blissful storefront" width="860" />
</p>
-->

---

## 🧭 What is Blissful?

A complete online shop you can run end to end: browse and filter a product catalog, keep a cart without signing in, check out with a card or cash on delivery, and see the order confirmation flip from "pending payment" to paid on its own when Safepay's webhook lands.

| 🛍️ Browse | 🛒 Buy | ✅ Confirm |
|---|---|---|
| Categories, skin-concern routes, search and a price slider | Session-based cart, no login, phone-validated checkout | Card via Safepay or COD, with live payment status |

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🧴 Product catalog
Category and skin-concern routes (serums, moisturisers, cleansers, sunscreens, bundles and more).

### 🔍 Search and filters
Header search by product name (server-side regex, bookmarkable URL), a dual-thumb price slider, and independent in-stock and out-of-stock toggles with live result counts.

### 🛒 Session cart
Persisted to MongoDB and keyed by a browser session id, so there is no login.

</td>
<td width="50%" valign="top">

### 💳 Two payment methods
Cash on Delivery, or a debit or credit card through Safepay's hosted form.

### 🔔 Live order status
The confirmation page updates from the Safepay webhook without a refresh.

### 📱 Responsive
Desktop, tablet and mobile.

</td>
</tr>
</table>

## 🚀 Quick start

**Prerequisites:** Node.js 18+ and a MongoDB database (a free [Atlas](https://www.mongodb.com/atlas) cluster, or a local instance).

Run the backend and frontend in two terminals.

**1. Backend** → `http://localhost:5000`

```bash
cd Backend
npm install
cp .env.example .env        # set MONGO_URI at minimum
npm run seed                # load the product catalog
npm run dev
```

**2. Frontend** → `http://localhost:3000`

```bash
cd Frontend
npm install
npm start                   # proxies /api to http://localhost:5000
```

<details>
<summary><b>🔧 Environment variables</b> (<code>Backend/.env</code>)</summary>
<br/>

| Key | Needed for | Notes |
|---|---|---|
| `MONGO_URI` | **everything** | MongoDB connection string. Default `mongodb://127.0.0.1:27017/blissful`. |
| `CLIENT_ORIGIN` | CORS | Frontend origin, e.g. `http://localhost:3000`. |
| `PUBLIC_BASE_URL` | card payments | URL the Safepay form redirects back to after payment. |
| `SAFEPAY_API_KEY` | card payments | Public key (`sec_…`). |
| `SAFEPAY_SECRET` | card payments | Secret key: SDK auth and webhook signature. |
| `SAFEPAY_ENV` | card payments | `sandbox` or `production`. |
| `PORT` | no | Defaults to `5000`. |

Leave the Safepay keys blank and only Cash on Delivery is offered.

</details>

<details>
<summary><b>💳 Testing card payments locally</b></summary>
<br/>

Safepay has to reach your webhook, so expose the backend with a tunnel:

```bash
ngrok http 5000
```

Then register `<tunnel-url>/api/payments/safepay/webhook` in **Safepay Dashboard → Developer → Endpoints**, and set `PUBLIC_BASE_URL` to where your frontend is reachable.

</details>

<details>
<summary><b>🌱 Seeding</b></summary>
<br/>

```bash
npm run seed            # clear products and insert the catalog from data/products.js
npm run seed:destroy    # clear products only
```

</details>

## 🧩 How checkout works

```
 Browser (React) ── x-session-id ──▶ Express API ──▶ MongoDB
        │                                │ products · cart · orders
        │  card?                         │
        ▼                                ▼
 Safepay hosted form ── webhook ──▶ POST /api/payments/safepay/webhook
                                     verify HMAC on the raw body
                                     mark the order paid
```

- **Cart:** the browser keeps a generated session id in `localStorage` and sends it as the `x-session-id` header, so the cart persists server-side without an account.
- **COD:** the order is created immediately with payment method `cod`.
- **Card:** the API creates a Safepay checkout and the browser is redirected to the hosted form. The webhook route reads the **raw** request body so the HMAC signature can be verified before the order is marked paid.
- **Shipping:** a flat fee is added to every order. Amounts are in PKR.

## 🔌 API

| Resource | Endpoints |
|---|---|
| **Products** | `GET /api/products`, `GET /api/products/:id` |
| **Cart** | `GET /api/cart`, `POST /api/cart`, `DELETE /api/cart/:id` |
| **Orders** | `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id` |
| **Payments** | `GET /api/payments/config`, `POST /api/payments/safepay/checkout`, `POST /api/payments/safepay/webhook` |

## 🛠️ Tech stack

| Layer | Tech |
|---|---|
| **Frontend** | React 18, React Router 7, Bootstrap 5, Tailwind CSS, Axios |
| **Backend** | Node.js, Express, Mongoose |
| **Database** | MongoDB Atlas |
| **Payments** | Safepay (`@sfpy/node-core`), Cash on Delivery |
| **Hosting** | Vercel: static frontend build plus Express as a serverless function |

## 🗂️ Project structure

```
Blissful-Template/
├── Backend/
│   ├── app.js              Express app, webhook (raw body) and routes
│   ├── server.js           local entry point
│   ├── api/index.js        Vercel serverless entry
│   ├── routes/ controllers/ models/ middleware/ utils/
│   ├── data/products.js    seed catalog
│   └── seeder.js
├── Frontend/
│   └── src/                pages · components · context (cart) · services (api)
└── vercel.json             static build + /api rewrite to the function
```

## ☁️ Deployment

Deploys to **Vercel** as one project: `vercel.json` builds `Frontend/` as a static site and runs `Backend/api/index.js` as a serverless function behind `/api/*`.

1. Create a MongoDB Atlas cluster and allow Vercel's IPs (or `0.0.0.0/0`).
2. Import the repo in Vercel and set the environment variables above, with `SAFEPAY_ENV=production` for live payments.
3. In Safepay, register `https://<your-domain>/api/payments/safepay/webhook`.

## 📄 License

[MIT](LICENSE) © 2026 Ahmad Zaman
