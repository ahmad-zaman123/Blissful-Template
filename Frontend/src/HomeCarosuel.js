import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons for arrows

const images = [
  "https://shopblissfulbeauty.com/cdn/shop/files/Web_banner_blissful.jpg?v=1762165958&width=1770",
  "https://shopblissfulbeauty.com/cdn/shop/files/banner_web.jpg?v=1759140076&width=1770",
  "https://shopblissfulbeauty.com/cdn/shop/files/color_correcting_banner.jpg?v=1757591498&width=2000",
  "https://shopblissfulbeauty.com/cdn/shop/files/blissfull_desktop_banner_1.jpg?v=1738903312&width=1770"
];

function HomeCarosuel() {
  return (
    <Container fluid style={{ padding: "0" }}>
      <Row
        className="d-flex align-items-center justify-content-center"
        style={{ height: "580px", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        <Col className="d-flex justify-content-center p-0">
          <Carousel
            controls
            indicators={false}
            interval={3000}
            fade
            // prevIcon={
            //   <div style={styles.arrow}>
            //     <FaChevronLeft size={20} color="black" />
            //   </div>
            // }
            // nextIcon={
            //   <div style={styles.arrow}>
            //     <FaChevronRight size={20} color="black" />
            //   </div>
            // }
          >
            {images.map((src, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  style={{ height: "580px", width: "100%", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

// Styles for custom arrow buttons
const styles = {
  arrow: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)"
  }
};

export default HomeCarosuel;
