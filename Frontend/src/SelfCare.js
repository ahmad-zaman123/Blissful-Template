import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SelfCare() { 
  return (
    <Container fluid>
      <Row className="h-[200px] flex items-center justify-center">
        <Col className="flex justify-center">
          <img 
            src="https://cdn.shopify.com/s/files/1/0678/2517/2643/files/text_banner.png?v=1737635693" 
            alt="Logo"
            className="h-[200px] w-auto"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SelfCare;
