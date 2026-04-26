# Blissful

> A full-stack e-commerce storefront for a beauty and skincare brand — React frontend, Express + MongoDB API, real card payments via **Safepay**, and a Cash-on-Delivery fallback. Deployed serverless on Vercel.

**🛒 [Live demo →](https://blissful-template.vercel.app/)**  ·  **💻 [Source on GitHub →](https://github.com/ahmad-zaman123/Blissful-Template)**

---

## Features

- **Product catalog** with category and skin-concern routes (Serums, Moisturisers, Cleansers, Sunscreens, Bundles, etc.).
- **Header search** that filters the catalog by product name (server-side regex, bookmarkable URL).
- **Dual-thumb price-range slider** with independent in-stock / out-of-stock toggles and live result counts.
- **Session-based cart** persisted to MongoDB — no login required.
- **Checkout** with phone-format validation, fixed shipping fee, and a clean order summary.
- **Two payment methods**: Cash on Delivery and Safepay (debit / credit card via hosted form).
- **Order confirmation** that auto-updates from the Safepay webhook — status flips from "pending payment" to paid without a refresh.
- **Responsive design** across desktop, tablet, and mobile.

## Tech Stack

| Layer | |
|---|---|
| Frontend | React 18, React Router 7, Bootstrap 5, Tailwind CSS, Axios |
| Backend  | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |
| Payments | Safepay (`@sfpy/node-core`), Cash on Delivery |
| Hosting  | Vercel (frontend static build + Express as a serverless function) |

---

## Running locally

```bash
# Backend
cd Backend && npm install && cp .env.example .env && npm run dev

# Frontend (in a second terminal)
cd Frontend && npm install && npm start
```

Backend runs on `:5000`, frontend on `:3000` (proxied to the API).

### Environment variables (`Backend/.env`)

| Key | Required | Notes |
|---|---|---|
| `MONGO_URI` | **yes** | MongoDB connection string |
| `CLIENT_ORIGIN` | recommended | e.g. `http://localhost:3000` |
| `PUBLIC_BASE_URL` | for Safepay | URL the Safepay form redirects back to |
| `SAFEPAY_API_KEY` | for Safepay | Public key (`sec_…`) |
| `SAFEPAY_SECRET` | for Safepay | Secret key (SDK auth + webhook signature) |
| `SAFEPAY_ENV` | for Safepay | `sandbox` or `production` |

Without the Safepay vars, only COD is enabled. For end-to-end card payments locally, expose the backend with `ngrok http 5000` and register `<tunnel>/api/payments/safepay/webhook` in **Safepay Dashboard → Developer → Endpoints**.

