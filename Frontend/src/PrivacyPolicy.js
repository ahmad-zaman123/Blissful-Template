import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PrivacyPolicy() {
  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col xs={1} md={4}></Col> {/* Left Empty Space */}
        <Col xs={10} md={4} className="text-center"> {/* Left Align */}
          <p style={{ fontWeight: "bold", fontSize: "3rem" }}>
            Privacy Policy
          </p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
            At Blissful Beauty, protecting your personal information is our top priority. Our dedication to providing a secure experience is reflected in our practices and policies.
          </p>
         
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Protection Assurance:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
            Rest assured that your private information is secure with our robust protection assurance. We utilize advanced security measures to block unauthorized access, ensuring your data remains safe from any potential threats.
          </p>
          
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Minimal Data Collection:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
            We are committed to collecting only the necessary information to process your orders and deliver excellent customer service. Your trust is essential, and we follow a minimalist approach, acquiring only the details crucial for a smooth and customized experience.
          </p>
          
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Confidentiality Policy:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
            Your personal information remains strictly confidential at Blissful Beauty. We never share your details with third parties. This commitment upholds the trust we build with our valued customers, ensuring the integrity of your data.
          </p>
          
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Strict Security Measures:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
            Your security is our utmost priority. We enforce very strict security protocols to protect your data from potential vulnerabilities. Our thorough approach ensures that your information is managed with the highest level of care and compliance with industry standards.
          </p>
         
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Informed Agreement:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
            By using our website and providing your information, you agree to our privacy policy. We respect your willingness to share data and are committed to transparently communicating our privacy practices, ensuring you are well-informed and comfortable with how your information is handled.
          </p>
          
          <p style={{ fontSize: "0.9rem" }} className="text-start">
            At Blissful Beauty, our commitment to privacy is a cornerstone of the trust you place in us. Feel confident that your information is managed responsibly, aligning with our dedication to offering you a secure and enjoyable shopping experience.
          </p>

          <br /> <br /> <br />

        </Col>
        <Col xs={1} md={4}></Col> {/* Right Empty Space */}

     
      </Row>
    </Container>
  );
}

export default PrivacyPolicy;