import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AboutUs_info() {
  return (
    <Container style={{ marginTop: "30px" }}> {/* ✅ Added 20px Margin */}
      <Row>
        <Col xs={1}></Col> {/* Left Empty Space */}
        <Col xs={10} className="text-start"> {/* Left Align */}
          <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            Our story: From Passion to Legacy: The Blissful Journey
          </p>

          {/* 2 Line Space */}
          <br />
          <br />

          <p style={{ fontSize: "1.1rem" }}>
            In a small setup, with a big dream, Anya and Ali embarked on a journey to revolutionize the skincare landscape in Pakistan. As a doctor and dermatology enthusiast, Anya's passion for skincare was contagious, and soon, her husband Ali was equally invested in the vision.
          </p>

          {/* 2 Line Space */}
          <br />
          <br />

          <p style={{ fontSize: "1.1rem" }}>
            With unwavering dedication, they worked tirelessly, pouring their hearts and souls into creating a brand that would make high-quality skincare accessible to all. Their relentless pursuit of excellence and commitment to affordability resonated deeply with the Pakistani community.
          </p>

          {/* 2 Line Space */}
          <br />
          <br />

          <p style={{ fontSize: "1.1rem" }}>
            In less than a year, their small startup blossomed into one of Pakistan's leading skincare brands, with an astonishing 160,000 orders and an impressive 75% customer return rate. The love and loyalty of their customers humbled and fueled them to continue innovating and improving.
          </p>

          {/* 2 Line Space */}
          <br />
          <br />

          <p style={{ fontSize: "1.1rem" }}>
            Today, Anya and Ali's brainchild stands as a testament to the power of passion, hard work, and the relentless pursuit of excellence. Their story serves as a beacon of inspiration, reminding us that even the smallest beginnings can lead to extraordinary outcomes.
          </p>

          {/* 2 Line Space */}
          <br />
          <br />

          <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Join the Blissful Family</p>

          {/* 2 Line Space */}
          <br />
          <br />

          <p style={{ fontSize: "1.1rem" }}>
            As we continue to grow and evolve, we remain committed to our core values: quality, affordability, and a passion for empowering healthy, glowing skin. We're honored to have you as part of our journey and look forward to helping you achieve your skincare goals.
          </p>
        </Col>
        <Col xs={1}></Col> {/* Right Empty Space */}
      </Row>
    </Container>
  );
}

export default AboutUs_info;
