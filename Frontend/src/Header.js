import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaShoppingBag, FaSearch } from 'react-icons/fa';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/SHOPALL?q=${encodeURIComponent(q)}`);
  };

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

        {/* Right Side - Search bar + Cart icon */}
        <Col xs={3} className="d-flex justify-content-end align-items-center" style={{ gap: '24px' }}>
          <form
            onSubmit={submitSearch}
            className="d-flex align-items-center bg-white rounded"
            style={{ height: '28px', paddingLeft: '10px', paddingRight: '8px', minWidth: '160px' }}
          >
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent flex-grow-1"
              style={{ outline: 'none', fontSize: '13px', minWidth: 0 }}
            />
            <button
              type="submit"
              className="border-0 bg-transparent p-0 d-flex align-items-center"
              aria-label="Search"
            >
              <FaSearch className="text-secondary" size={12} />
            </button>
          </form>
          <Link className="text-decoration-none" to="/CART">
            <FaShoppingBag className="text-xl cursor-pointer text-white" />
          </Link>
        </Col>
      </Row>

    </Container>


  );
}

export default Header;