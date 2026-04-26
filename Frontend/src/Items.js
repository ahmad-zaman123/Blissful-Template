import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { formatPrice } from "./utils/format";

const Items = ({ img, product_name, newprice, oldprice, discount }) => {
  return (
    <div
      className="card mx-auto border-0 hover:shadow-xl d-flex flex-column h-100"
      style={{ width: "100%" }}
    >
      <div className="position-relative" style={{ overflow: "hidden" }}>
        <img className="card-img-top" src={img} alt={product_name} />

        {discount && (
          <span
            className="position-absolute bg-danger text-white px-2 py-1"
            style={{
              top: "8px",
              right: "8px",
              fontSize: "12px",
              borderRadius: "3px",
            }}
          >
            Sale {discount}
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-row align-items-end justify-content-between" style={{ gap: "8px", flex: "1 1 auto" }}>
        <div
          className="title text-dark fw-semibold flex-grow-1"
          style={{
            fontSize: "13px",
            lineHeight: "1.25",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "calc(13px * 1.25 * 2)",
          }}
        >
          {product_name}
        </div>

        <div className="d-flex flex-column align-items-end flex-shrink-0" style={{ gap: "2px", lineHeight: "1.2" }}>
          {oldprice && (
            <span
              className="text-muted text-decoration-line-through fw-bold"
              style={{ fontSize: "12px" }}
            >
              Rs.{formatPrice(oldprice)}
            </span>
          )}
          <span className="fw-bold" style={{ color: "#f9a8d4", fontSize: "13px" }}>
            Rs.{formatPrice(newprice)}
          </span>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center" style={{ paddingBottom: "7px" }}>
        <Button
          className="fw-bold d-flex align-items-center justify-content-between text-white mt-auto px-3"
          style={{ backgroundColor: "#f8a8c9", border: "none", padding: "10px", width: "95%", height: "30px" }}
        >
          <FaShoppingCart color="white" size={16} />
          <span className="flex-grow-1 text-right" style={{ fontSize: "13px" }}>ADD TO CART</span>
        </Button>
      </div>
    </div>
  );
};

export default Items;
