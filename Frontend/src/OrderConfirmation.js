import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { fetchOrderById } from "./services/api";
import { formatPrice } from "./utils/format";

function OrderConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    let timeoutId;

    const load = () => {
      fetchOrderById(id)
        .then((data) => {
          if (cancelled) return;
          setOrder(data);
          setLoading(false);
          // If we just got back from Safepay, the webhook may not have arrived
          // yet — poll a few times until status flips out of pending_payment.
          if (data.status === "pending_payment" && attempts < 5) {
            attempts += 1;
            timeoutId = setTimeout(load, 1500);
          }
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err.response?.data?.message || err.message || "Failed to load order");
          setLoading(false);
        });
    };
    load();
    return () => { cancelled = true; if (timeoutId) clearTimeout(timeoutId); };
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center"><Spinner animation="border" /></Container>
    );
  }
  if (error || !order) {
    return (
      <Container className="py-5 text-center">
        <h4 className="fw-bold">{error || "Order not found"}</h4>
        <Button className="mt-3" onClick={() => navigate("/")} style={{ backgroundColor: "#f9a8d4", border: "none", fontWeight: "bold" }}>
          BACK TO HOME
        </Button>
      </Container>
    );
  }

  const shipping = (order.total || 0) - (order.subtotal || 0);

  const isPending = order.status === "pending_payment";
  const isFailed = order.status === "failed" || order.status === "cancelled";

  const headline = isPending
    ? "Waiting for payment confirmation…"
    : isFailed
    ? "Payment was not completed"
    : "Thank you for your order!";
  const badgeColor = isPending ? "#f9a8d4" : isFailed ? "#dc3545" : "#28a745";
  const badgeIcon = isPending ? "…" : isFailed ? "✕" : "✓";

  return (
    <Container className="py-5" style={{ maxWidth: 720 }}>
      <div className="text-center mb-4">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{ width: 64, height: 64, backgroundColor: badgeColor, color: "white", fontSize: 32 }}
        >
          {badgeIcon}
        </div>
        <h2 className="fw-bold mb-1">{headline}</h2>
        <p className="text-muted mb-0">Order ID: <span className="fw-medium">{order._id}</span></p>
        {!isPending && !isFailed && (
          <p className="text-muted">A confirmation has been sent to {order.customer?.email}.</p>
        )}
        {isPending && (
          <p className="text-muted">If you completed the card payment, this page will update automatically.</p>
        )}
      </div>

      <div className="border rounded p-4 mb-4">
        <h5 className="fw-bold mb-3">Items</h5>
        {order.items.map((it, idx) => (
          <Row key={idx} className="align-items-center mb-2">
            {it.image && (
              <Col xs="auto">
                <img src={it.image} alt={it.name} className="rounded" style={{ width: 50, height: 60, objectFit: "cover" }} />
              </Col>
            )}
            <Col>
              <div className="fw-medium">{it.name}</div>
              <div className="text-muted small">x{it.quantity}</div>
            </Col>
            <Col xs="auto" className="fw-medium">Rs {formatPrice(it.price * it.quantity)}</Col>
          </Row>
        ))}
        <hr />
        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>Rs {formatPrice(order.subtotal)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Shipping</span>
          <span>{shipping > 0 ? `Rs ${formatPrice(shipping)}` : "Free"}</span>
        </div>
        <div className="d-flex justify-content-between fw-bold mt-2">
          <span>Total</span>
          <span>Rs {formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="border rounded p-4 mb-4">
        <h5 className="fw-bold mb-3">Shipping to</h5>
        <p className="mb-1">{order.customer?.firstName} {order.customer?.lastName}</p>
        <p className="mb-1">{order.shippingAddress?.address}</p>
        <p className="mb-1">{order.shippingAddress?.country}</p>
        <p className="mb-0 text-muted small">{order.customer?.phone}</p>
      </div>

      <div className="d-flex justify-content-between text-muted small mb-4">
        <span>Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}</span>
        <span>Status: {order.status}</span>
      </div>

      <div className="text-center">
        <Link to="/SHOPALL">
          <Button style={{ backgroundColor: "#f9a8d4", border: "none", fontWeight: "bold", padding: "10px 30px" }}>
            CONTINUE SHOPPING
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default OrderConfirmation;
