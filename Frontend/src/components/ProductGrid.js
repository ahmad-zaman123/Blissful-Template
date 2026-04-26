import React, { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PriceBar from "../PriceBar";
import Items from "../Items";
import Board from "../Board";
import useProducts from "../hooks/useProducts";

export default function ProductGrid({ params = {}, banner, title }) {
  const { products, loading, error } = useProducts(params);
  const [filteredPriceRange, setFilteredPriceRange] = useState([-Infinity, Infinity]);
  const [stockFilter, setStockFilter] = useState({ showInStock: true, showOutOfStock: true });
  const navigate = useNavigate();

  const handlePriceChange = (priceRange, stock) => {
    setFilteredPriceRange(priceRange);
    setStockFilter(stock);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.newprice >= filteredPriceRange[0] &&
      product.newprice <= filteredPriceRange[1] &&
      ((stockFilter.showInStock && product.inStock) ||
        (stockFilter.showOutOfStock && !product.inStock))
  );

  return (
    <>
      {banner && <Board src={banner} />}
      {title && (
        <Container fluid style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
          <div className="text-muted small mt-3">
            <Link to="/" className="text-muted text-decoration-none">Home</Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </div>
        </Container>
      )}
      <Container fluid style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
        <Row className="my-4">
          <Col md={3} lg={3}>
            <br />
            <PriceBar onPriceChange={handlePriceChange} productList={products} />
          </Col>
          <Col md={9} lg={9}>
            <hr className="hidden md:block" /><br /><br /><br />
            <Row className="g-4">
              {loading ? (
                <Col className="text-center mt-4"><Spinner animation="border" /></Col>
              ) : error ? (
                <Col className="text-center mt-4"><h5>{error}</h5></Col>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Col
                    key={product._id}
                    xs={6} sm={6} md={4} lg={4}
                    className="d-flex flex-column align-items-center mb-4"
                    onClick={() => navigate(`/description/${product._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <Items {...product} />
                    <br /><br />
                  </Col>
                ))
              ) : (
                <Col className="text-center mt-4">
                  <h5>No products found in this price range</h5>
                </Col>
              )}
            </Row>
            <br /><br />
          </Col>
        </Row>
      </Container>
    </>
  );
}
