import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Logo() { 
  return (
    <Container fluid>
      <Row className="h-[150px] flex items-center justify-center">
        <Col className="flex justify-center">

        <Link
                className="mx-auto text-decoration-none"
                to="/"
                style={{ color: "black" }}
              >
                <img 
            src="https://shopblissfulbeauty.com/cdn/shop/files/FINAL_LOGO_T_2-01_1.png?v=1731915868&width=300" 
            alt="Logo"
            className="h-[120px] w-auto"
          />
              </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Logo;
