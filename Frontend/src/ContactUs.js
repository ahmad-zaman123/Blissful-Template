import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ContactUs() {
  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col xs={1}></Col> {/* Left Empty Space */}
        
        <Col xs={10} className="text-start">
          {/* 🖤 Contact Heading */}
          <h3 style={{ fontWeight: "bold", color: "black", fontSize: "1.5rem" }}>
            CONTACT
          </h3>

          {/* 2 Line Space */}
          <br />

          {/* 📩 Contact Description */}
          <p style={{ fontSize: "0.8rem" }}>Have a question or comment? <br /> Use the form below to send us a message or contact us by mail at: </p>
    
    

          {/* 📝 Contact Form */}
          <Form>
            {/* Name */}
            <Form.Label style={{ fontSize: "1.1rem" }}>Name</Form.Label>
            <Form.Control type="text" />

            {/* 1 Line Space */}
            <br />

            {/* Phone Number */}
            <Form.Label style={{ fontSize: "1.1rem" }}>Phone Number</Form.Label>
            <Form.Control type="text" />

            {/* 1 Line Space */}
            <br />

            {/* Email */}
            <Form.Label style={{ fontSize: "1.1rem" }}>Email</Form.Label>
            <Form.Control type="email"/>

            {/* 1 Line Space */}
            <br />

            {/* Comment */}
            <Form.Label style={{ fontSize: "1.1rem" }}>Comment</Form.Label>
            <Form.Control as="textarea" rows={8} />

            {/* 1 Line Space */}
            <br />

            {/* Submit Button with Custom Styling */}
            <Button 
              style={{ 
                backgroundColor: "#f9a8d4", 
                color: "white", 
                fontWeight: "bold", 
                border: "none", 
                padding: "10px 20px",
                fontSize: "0.8rem",
                width : "200px"
              }} 
              type="submit"
            >
              SUBMIT CONTACT
            </Button>
          </Form>
        </Col>

        <Col xs={1}></Col> {/* Right Empty Space */}
      </Row>

      < br /> <br />
    </Container>
  );
}

export default ContactUs;
