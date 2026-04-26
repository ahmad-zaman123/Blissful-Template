import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';

const images = [
  "https://shopblissfulbeauty.com/cdn/shop/files/Vector_Smart_Object-1.png?v=1732079204",
  "https://shopblissfulbeauty.com/cdn/shop/files/Vector_Smart_Object-2.png?v=1732079204",
  "https://shopblissfulbeauty.com/cdn/shop/files/cruelty_free.png?v=1738903311",
  "https://shopblissfulbeauty.com/cdn/shop/files/Vector_Smart_Object.png?v=1732079204",
  "https://shopblissfulbeauty.com/cdn/shop/files/Untitled-3.png?v=1738903311"
];

function IconBar() {
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(2); // Show 2 images on small screens
      } else {
        setItemsPerSlide(5); // Show 5 images on large screens
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const slides = [];
  for (let i = 0; i < images.length; i += itemsPerSlide) {
    slides.push(images.slice(i, i + itemsPerSlide));
  }

  return (
    <Container fluid className="py-4">
      <Carousel indicators={false} controls={false} interval={2000}>
        {slides.map((group, index) => (
          <Carousel.Item key={index}>
            <Row className="align-items-center justify-content-center">
              <Col xs={1} sm={1} md={1} lg={1}></Col> {/* Empty space on left */}
              <Col xs={10} sm={10} md={10} lg={10}>
                <Row className="align-items-center justify-content-center">
                  {group.map((src, idx) => (
                    <Col key={idx} xs={6} sm={4} md={2} className="p-1 text-center">
                      <img 
                        src={src} 
                        alt={`Image ${idx + 1}`} 
                        className="rounded-lg" 
                        style={{ maxWidth: "120px", height: "auto" }}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}></Col> {/* Empty space on right */}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default IconBar;
