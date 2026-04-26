import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function BuildYourRoutine() { 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <>
      <Container fluid>
        <br /> <br />
        <Row className="h-[80px] flex items-center justify-center">
          <Col className="text-center">
            <h1 className="text-4xl font-bold text-pink-300">BUILD YOUR ROUTINE</h1>
          </Col>
        </Row>
      </Container>

      <Container fluid className="py-4">
        <Slider {...settings}>
          
          {/* Hydrate */}
          <Link to="/shop-by-category/moisturisers" className="no-underline">
          <div className="p-2">
            <div className="text-left text-pink-300 font-bold text-3xl px-8 mb-[5px]">
              Hydrate
            </div>
            <img 
              src="https://cdn.shopify.com/s/files/1/0678/2517/2643/files/3_8bda6692-f7ae-4813-bc13-e457d2ee5be1.webp?v=1738652349" 
              alt="Hydrate" 
              className="w-full h-[400px] object-cover rounded-3xl"
            />
          </div>
          </Link>

          {/* Treat */}
          <Link to="/SHOP-BY-CATEGORY/SERUMS" className="no-underline">
          <div className="p-2">
            <div className="text-left text-pink-300 font-bold text-3xl px-8 mb-[5px]">
              Treat
            </div>
            <img 
              src="https://cdn.shopify.com/s/files/1/0721/8639/6974/files/DSC01311.png?v=1732079282" 
              alt="Treat" 
              className="w-full h-[400px] object-cover rounded-3xl"
            />
          </div>
          </Link>

          {/* Cleanse */}
          <Link to="/shop-by-category/cleansers" className="no-underline">
          <div className="p-2">
            <div className="text-left text-pink-300 font-bold text-3xl px-8 mb-[5px]">
              Cleanse
            </div>
            <img 
              src="https://cdn.shopify.com/s/files/1/0678/2517/2643/files/DSC01614_4b272fb2-25a9-4c71-ac43-b587105cb70b.webp?v=1738816094" 
              alt="Cleanse" 
              className="w-full h-[400px] object-cover rounded-3xl"
            />
          </div>
          </Link>

          {/* Protect */}
          <Link to="/shop-by-category/sunscreens" className="no-underline">
          <div className="p-2">
            <div className="text-left text-pink-300 font-bold text-3xl px-8 mb-[5px]">
              Protect
            </div>
            <img 
              src="https://cdn.shopify.com/s/files/1/0721/8639/6974/files/DSC01564.png?v=1732079285" 
              alt="Protect" 
              className="w-full h-[400px] object-cover rounded-3xl"
            />
          </div>
          </Link>

        </Slider>
      </Container>
    </>
  );
}

export default BuildYourRoutine;
