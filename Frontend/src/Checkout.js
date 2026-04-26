import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useCart } from "./context/CartContext";
import { createOrder, createSafepayCheckout, fetchPaymentConfig } from "./services/api";
import { formatPrice } from "./utils/format";

const SHIPPING_FEE = 200;
const PHONE_REGEX = /^(\+?\d{1,3}[\s-]?)?(\d{10,11})$/;

function Checkout() {
  const { items, subtotal, refresh, clearLocal } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [safepayEnabled, setSafepayEnabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    country: "Pakistan",
  });

  useEffect(() => {
    fetchPaymentConfig()
      .then((cfg) => setSafepayEnabled(Boolean(cfg.safepay)))
      .catch(() => setSafepayEnabled(false));
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const total = subtotal + SHIPPING_FEE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }
    if (!PHONE_REGEX.test(form.phone.trim())) {
      setError("Please enter a valid phone number (10–11 digits, optional country code)");
      return;
    }

    setSubmitting(true);
    const payload = {
      customer: {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      },
      shippingAddress: { country: form.country, address: form.address },
      paymentMethod,
      items: items.map((it) => ({
        productId: it.product._id,
        quantity: it.quantity,
      })),
    };

    try {
      if (paymentMethod === "safepay") {
        const { checkoutUrl } = await createSafepayCheckout(payload);
        await refresh();
        clearLocal();
        window.location.href = checkoutUrl;
        return;
      }

      const order = await createOrder(payload);
      await refresh();
      clearLocal();
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h4 className="fw-bold">No items to checkout</h4>
        <Button className="mt-3" onClick={() => navigate("/SHOPALL")} style={{ backgroundColor: "#f9a8d4", border: "none", fontWeight: "bold" }}>
          CONTINUE SHOPPING
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="min-vh-100 bg-white d-flex align-items-start mb-5">
      <Row className="w-100 g-3 mt-3">
        <Col lg={1} md={1} className="d-none d-lg-block bg-white"></Col>
        <Col lg={6} md={6} sm={12} className="p-4 bg-white">
          <h1 className="fs-4 fw-semibold mb-3">Blissful</h1>
          <Form onSubmit={handleSubmit}>
            <h3 className="fs-6 fw-medium mb-2">Contact</h3>
            <Form.Control name="email" type="email" required placeholder="Email" className="mb-2" style={{ height: "55px" }} value={form.email} onChange={handleChange} />

            <h3 className="fs-6 fw-medium mb-2 mt-3">Delivery</h3>
            <Form.Select name="country" className="mb-2" style={{ height: "55px" }} value={form.country} onChange={handleChange}>
              <option>Pakistan</option>
            </Form.Select>
            <Row className="g-2">
              <Col><Form.Control name="firstName" required type="text" placeholder="First name" style={{ height: "55px" }} value={form.firstName} onChange={handleChange} /></Col>
              <Col><Form.Control name="lastName" required type="text" placeholder="Last name" style={{ height: "55px" }} value={form.lastName} onChange={handleChange} /></Col>
            </Row>
            <Form.Control name="address" required type="text" placeholder="Address" className="mt-2" style={{ height: "55px" }} value={form.address} onChange={handleChange} />
            <Form.Control name="phone" required type="tel" placeholder="Phone (e.g. 03001234567)" className="mt-2" style={{ height: "55px" }} value={form.phone} onChange={handleChange} />

            <h3 className="fs-6 fw-medium mb-2 mt-3">Payment</h3>
            <div className="border rounded p-3 mb-2" style={paymentMethod === "cod" ? { backgroundColor: "rgba(249, 168, 212, 0.3)", border: "1px solid #f9a8d4" } : {}}>
              <Form.Check type="radio" label="Cash on Delivery (COD)" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
            </div>
            <div
              className="border rounded p-3 d-flex justify-content-between align-items-center"
              style={paymentMethod === "safepay" ? { backgroundColor: "rgba(249, 168, 212, 0.3)", border: "1px solid #f9a8d4" } : {}}
            >
              <Form.Check
                type="radio"
                label="Safepay (debit / credit card)"
                name="payment"
                checked={paymentMethod === "safepay"}
                disabled={!safepayEnabled}
                onChange={() => setPaymentMethod("safepay")}
              />
              {!safepayEnabled && <span className="badge bg-secondary">Coming soon</span>}
            </div>

            {error && <div className="text-danger mt-2">{error}</div>}

            <Button type="submit" disabled={submitting} className="w-100 mt-3 text-white" style={{ backgroundColor: "#f9a8d4", border: "1px solid #f9a8d4", height: "55px", fontSize: "22px" }}>
              {submitting ? <Spinner animation="border" size="sm" /> : "Pay now"}
            </Button>
          </Form>
        </Col>
        <Col lg={5} md={5} sm={12} className="bg-light p-4 sticky-lg-top" style={{ top: 0 }}>
          {items.map((item) => {
            const p = item.product;
            if (!p) return null;
            return (
              <div key={item._id} className="d-flex align-items-center mb-3">
                <img src={p.img} alt={p.product_name} className="rounded me-3" style={{ width: 50, height: 60 }} />
                <div>
                  <p className="mb-0 fw-medium">{p.product_name}</p>
                  <p className="text-muted small">x{item.quantity}</p>
                </div>
                <p className="ms-auto fw-medium">Rs {formatPrice(p.newprice * item.quantity)}</p>
              </div>
            );
          })}
          <hr />
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>Rs {formatPrice(subtotal)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>{SHIPPING_FEE > 0 ? `Rs ${formatPrice(SHIPPING_FEE)}` : "Free"}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold mt-2">
            <span>Total</span>
            <span>Rs {formatPrice(total)}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
