const crypto = require("crypto");
const Safepay = require("@sfpy/node-core");

const getEnv = () => (process.env.SAFEPAY_ENV === "production" ? "production" : "sandbox");
const getApiHost = () =>
  getEnv() === "production"
    ? "https://api.getsafepay.com"
    : "https://sandbox.api.getsafepay.com";

const isConfigured = () => Boolean(process.env.SAFEPAY_API_KEY && process.env.SAFEPAY_SECRET);

let sdkInstance;
const getSdk = () => {
  if (!sdkInstance) {
    sdkInstance = Safepay(process.env.SAFEPAY_SECRET, {
      authType: "secret",
      host: getApiHost(),
    });
  }
  return sdkInstance;
};

/**
 * Create a Safepay payment session and return the redirect URL the user
 * should be sent to. Amount is in PKR; Safepay expects the lowest unit (paisa).
 */
const createTracker = async ({ orderId, amountPkr, customerEmail, redirectUrl }) => {
  if (!isConfigured()) {
    throw new Error("Safepay is not configured: set SAFEPAY_API_KEY and SAFEPAY_SECRET in .env");
  }

  const safepay = getSdk();

  // 1. Set up the payment session — returns a tracker token.
  const sessionRes = await safepay.payments.session.setup({
    merchant_api_key: process.env.SAFEPAY_API_KEY,
    intent: "CYBERSOURCE",
    mode: "payment",
    currency: "PKR",
    amount: Math.round(amountPkr * 100),
  });
  console.log("[safepay] session response:", JSON.stringify(sessionRes, null, 2));

  const trackerToken =
    sessionRes?.tracker?.token ||
    sessionRes?.data?.tracker?.token ||
    sessionRes?.data?.token;
  if (!trackerToken) throw new Error("Safepay session setup did not return a tracker token");

  // 2. Mint a client passport token (tbt) so the embedded form can call back
  // to the API on behalf of this session.
  const passportRes = await safepay.client.passport.create({});
  console.log("[safepay] passport response:", JSON.stringify(passportRes, null, 2));

  // Passport endpoint returns the token directly at .data (a raw string).
  const tbt =
    typeof passportRes?.data === "string"
      ? passportRes.data
      : passportRes?.data?.token || passportRes?.token;
  if (!tbt) throw new Error("Safepay passport endpoint did not return a tbt token");

  // 3. Build the hosted-checkout URL using the SDK helper so the host + param
  // shape are guaranteed correct for the configured environment.
  const checkout = safepay.checkout.createCheckoutUrl({
    env: getEnv(),
    tbt,
    tracker: trackerToken,
    source: "hosted",
    order_id: orderId,
    redirect_url: redirectUrl,
    cancel_url: redirectUrl,
  });

  return { tracker: trackerToken, token: trackerToken, checkoutUrl: checkout };
};

/**
 * Verify a webhook payload using HMAC-SHA256 with the merchant secret.
 * TODO(safepay-docs): confirm the exact header name and signing scheme
 * against Safepay's webhook documentation.
 */
const verifyWebhookSignature = (rawBody, signatureHeader) => {
  if (!process.env.SAFEPAY_SECRET) return false;
  if (!signatureHeader) return false;
  const computed = crypto
    .createHmac("sha256", process.env.SAFEPAY_SECRET)
    .update(rawBody)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signatureHeader));
  } catch {
    return false;
  }
};

module.exports = { createTracker, verifyWebhookSignature, isConfigured, getEnv };
