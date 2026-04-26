import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Table, Spinner } from "react-bootstrap";
import { useCart } from "./context/CartContext";
import { formatPrice } from "./utils/format";

function Cart() {
  const { items, loading, error, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h4 className="fw-bold mb-3">YOUR CART IS EMPTY</h4>
        <Link to="/SHOPALL">
          <Button style={{ backgroundColor: "#f9a8d4", border: "none", fontWeight: "bold" }}>
            CONTINUE SHOPPING
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {error && <div className="text-danger text-center mb-3">{error}</div>}
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="bg-white p-4">
          <h4 className="fw-bold mb-4">YOUR CART</h4>

          <Table className="text-center align-middle" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
            <thead style={{ height: "60px", backgroundColor: "#d3d3d3" }}>
              <tr style={{ backgroundColor: "green" }}>
                <th className="text-start ps-3">PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const p = item.product;
                if (!p) return null;
                return (
                  <tr key={item._id} style={{ border: "1px solid grey" }}>
                    <td className="d-flex align-items-center">
                      <img
                        src={p.img}
                        alt={p.product_name}
                        className="img-fluid me-3"
                        style={{ width: "85px", height: "120px" }}
                      />
                      <div>
                        <p className="mb-0 fw-medium">{p.product_name}</p><br />
                        <p className="text-muted small">{p.size || "30ml"}</p>
                      </div>
                    </td>
                    <td className="fw-semibold" style={{ fontSize: "15px" }}>Rs {formatPrice(p.newprice)}</td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center" style={{ border: "1px solid grey", width: "100px", marginLeft: "28px" }}>
                        <Button variant="outline-dark" size="xl" style={{ border: "none" }}>-</Button>
                        <span className="mx-2" style={{ border: "none" }}>{item.quantity}</span>
                        <Button variant="outline-dark" size="xl" style={{ border: "none" }}>+</Button>
                      </div>
                    </td>
                    <td className="fw-semibold" style={{ fontSize: "15px" }}>Rs {formatPrice(p.newprice * item.quantity)}</td>
                    <td>
                      <Button
                        variant="link"
                        className="text-muted"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Form.Group controlId="additionalComments">
            <Form.Label className="fw-medium">Additional Comments</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Special instructions for seller..." />
          </Form.Group>
        </Col>

        <Col xs={12} md={4} className="bg-white p-4">
          <h4 className="fw-bold pb-2">ORDER SUMMARY</h4>
          <Row className="mt-3 mb-3 border-top border-bottom border-secondary d-flex align-items-center justify-content-between py-2" style={{ height: "70px" }}>
            <Col className="fw-bold">Subtotal</Col>
            <Col className="text-end fw-bold">Rs.{formatPrice(subtotal)}</Col>
          </Row>
          <Form.Group controlId="couponCode" className="mt-4 mb-4">
            <Form.Label>Coupon Code</Form.Label>
            <Form.Control type="text" placeholder="Enter Coupon Code" />
            <small className="text-muted">Coupon code will be applied on the checkout page</small>
          </Form.Group>
          <Row className="mt-3">
            <Col className="fw-bold">TOTAL:</Col>
            <Col className="text-end fw-bold">Rs.{formatPrice(subtotal)}</Col>
          </Row>

          <Button
            onClick={() => navigate("/checkout")}
            className="w-100 mt-3 mb-1"
            style={{ backgroundColor: "#f9a8d4", border: "none", fontWeight: "bold", fontSize: "0.875rem", padding: "8px" }}
          >
            PROCEED TO CHECKOUT
          </Button>

          <Link to="/">
            <Button className="w-100 mt-2" style={{ backgroundColor: "#f9a8d4", border: "none", fontWeight: "bold", fontSize: "0.875rem", padding: "8px" }}>
              CONTINUE SHOPPING
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
