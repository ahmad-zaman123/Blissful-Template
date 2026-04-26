import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp,FaShoppingBag } from 'react-icons/fa';

function Header() {
  return (
    <Container fluid className="bg-pink-300 h-[50px] flex items-center">
      <Row className="w-full flex items-center justify-between px-4">
        {/* Left Side - Social Icons */}
        <Col xs={3} className="flex space-x-4">
          <a href ="https://api.whatsapp.com/send/?phone=%2B923331371383&text&type=phone_number&app_absent=0"><FaWhatsapp className="text-xl cursor-pointer text-white" /></a>
          <a href ="https://www.facebook.com/blissfulbeautypakistan?mibextid=ZbWKwL"><FaFacebookF className="text-xl cursor-pointer text-white" /></a>
          <a href ="https://www.instagram.com/blissfulbeautypakistan/"><FaInstagram className="text-xl cursor-pointer text-white" /></a>
        </Col>

        {/* Center - Promo Text */}
        <Col xs={6} className="flex items-center justify-center h-full">
          <p className="text-white text-md font-medium leading-none mt-[10px]">
            Special Discounts are available on bundles
          </p>
        </Col>

        <Col xs={2} className="">  
        </Col>

        {/* Right Side - Search Bar with Icon */}
        <Col xs={1} className="flex justify-end relative">
        <Link
                className="mx-auto text-decoration-none"
                to="/CART"
              >
                <FaShoppingBag className="text-xl cursor-pointer text-white" />
              </Link>
          
        </Col>
      </Row>

    </Container>

    
  );
}

export default Header;