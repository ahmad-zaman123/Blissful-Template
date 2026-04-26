import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = ({ img, product_name, newprice, oldprice, discount }) => {
  return (
    <div className="card mx-auto border-0 hover: shadow-md" style={{ width: "17rem" }}>
      <div className="position-relative">
        {/* Product Image */}
        <img className="card-img-top" src={img} alt={product_name} />

        {/* Sale Badge */}
        {discount && (
          <span
            className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1"
            style={{ fontSize: "12px", borderRadius: "3px", margin: "8px" }}
          >
            Sale {discount}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body d-flex justify-content-between align-items-start">

      <div className="title text-dark fw-semibold" style={{ width: "200px",fontSize:"15px",paddingTop:"2px",marginLeftLeft:"-10px" }}>
        {/* Product Name */}

            {product_name}
             
        </div>

        {/* Price Section */}
        <div className="d-flex flex-column align-items-end justify-content-start" style={{ width: "200px" }}>
          {oldprice && (
            <span className="text-muted text-decoration-line-through fw-bold text-right" style={{ fontSize: "16px" }}>
              Rs. {oldprice}
            </span>
          )}
          <span className="fw-bold text-right" style={{ color: "#f9a8d4", fontSize: "16px" }}>
            Rs. {newprice}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="d-flex flex-column align-items-center justify-content-center"  >
      <button
        className="btn fw-bold d-flex flex-column align-items-center justify-content-center"
        style={{ backgroundColor: "#f9a8d4",marginBottom:"5px", color: "white", padding: "10px", borderRadius: "5px", height:"35px",fontSize:"15px",width:"95%" }}
      >
        ADD TO CART
      </button>  
      </div>

    </div>
  );
};

// PropTypes for type safety
Product.propTypes = {
  img: PropTypes.string.isRequired,
  product_name: PropTypes.string.isRequired,
  newprice: PropTypes.number.isRequired,
  oldprice: PropTypes.number,
  discount: PropTypes.string,
};

// Default Props
Product.defaultProps = {
  oldprice: null,
  discount: null,
};

export default Product;
