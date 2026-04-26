import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

const testimonials = [
  {
    name: "Ali Haq",
    image: "https://shopblissfulbeauty.com/cdn/shop/files/sunscreen_300x300.png?v=1738908689",
    rating: 5,
    review:
      "The sunscreen is perfect for everyday use. It's non-greasy, protects my skin, and blends seamlessly. Great for men too!",
  },
  {
    name: "Hafsa Jafar",
    image: "https://shopblissfulbeauty.com/cdn/shop/files/image-1_300x300.png?v=1732092732",
    rating: 5,
    review:
      "Finally found a skincare brand that aligns with my values and works brilliantly for my skin. The Halal certification gives me peace of mind.",
  },
  {
    name: "Omar Farooq",
    image: "https://shopblissfulbeauty.com/cdn/shop/files/hyloronic_300x300.jpg?v=1738908715",
    rating: 5,
    review:
      "I used to suffer from dull skin, but the Vitamin C Serum has completely transformed my face. It's refreshing and effective!",
  },
  {
    name: "Noor Eman",
    image: "https://shopblissfulbeauty.com/cdn/shop/files/retinol_300x300.png?v=1738908667",
    rating: 5,
    review:
      "MashAllah, the products are amazing! The packaging, quality, and results are better than I could've imagined. A must-try!",
  },
  {
    name: "Sana Malik",
    image: "https://shopblissfulbeauty.com/cdn/shop/files/sunscreen_300x300.png?v=1738908689",
    rating: 5,
    review:
      "I love how light and hydrating the moisturizer is. It doesn't clog my pores, and my skin feels good all day.",
  },
  {
    name: "Bilal Ahmad",
    image: "https://shopblissfulbeauty.com/cdn/shop/files/image-1_300x300.png?v=1732092732",
    rating: 5,
    review:
      "The cleanser is the best product I've used. It cleanses deeply without drying out my skin. Family is hooked too!",
  },
  {
    name: "Maryam Salman",
    image: "https://shopblissfulbeauty.com/cdn/shop/files/hyloronic_300x300.jpg?v=1738908715",
    rating: 5,
    review:
      "The natural ingredients drew me to this brand and I'm so glad I tried it. My acne scars have faded significantly, Alhamdulillah.",
  },
  {
    name: "Zainab Tariq",
    image: "https://shopblissfulbeauty.com/cdn/shop/files/retinol_300x300.png?v=1738908667",
    rating: 5,
    review:
      "I have received so many compliments on my glowing skin since I started using these amazing products. Highly recommended!",
  },
];

const Card = ({ t }) => (
  <div
    style={{
      backgroundColor: "#f9a8d4",
      borderRadius: "20px",
      position: "relative",
      height: "100%",
      padding: "1.5rem 1rem",
      textAlign: "center",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <img
      src={t.image}
      alt={t.name}
      style={{
        width: "96px",
        height: "96px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "0.75rem",
        backgroundColor: "white",
      }}
    />
    <h5 style={{ fontWeight: "bold", color: "white", fontSize: "1.25rem", marginBottom: "0.25rem" }}>
      {t.name}
    </h5>
    <div style={{ color: "white", fontSize: "1rem", marginBottom: "0.75rem" }}>
      {"★".repeat(t.rating)}
    </div>
    <p style={{ color: "white", fontSize: "0.95rem", lineHeight: 1.4, flex: "1 1 auto" }}>
      {t.review}
    </p>
    <button
      type="button"
      style={{
        backgroundColor: "white",
        color: "#f9a8d4",
        fontWeight: "bold",
        border: "none",
        borderRadius: "999px",
        padding: "0.5rem 1.25rem",
        marginTop: "auto",
        fontSize: "0.85rem",
        letterSpacing: "0.5px",
      }}
    >
      RECOMMENDED
    </button>
  </div>
);

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function Reviews() {
  const slides = chunk(testimonials, 4);

  return (
    <Container fluid style={{ paddingLeft: "3rem", paddingRight: "3rem" }} className="py-4">
      <Row className="align-items-center">
        <Col xs={12} style={{ color: "#f9a8d4", fontWeight: "bold", fontSize: "2.5rem", textAlign: "center" }}>
          BLISSFUL JOURNEY
        </Col>
      </Row>
      <br />

      <Carousel indicators={false} controls={false} interval={2000} fade>
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row className="g-4 px-2">
              {group.map((t, i) => (
                <Col key={i} xs={12} sm={6} md={3}>
                  <Card t={t} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Reviews;
