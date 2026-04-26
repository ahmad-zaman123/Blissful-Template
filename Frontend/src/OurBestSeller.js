import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "./services/api";

function OurBestSeller() {
  const navigate = useNavigate();
  const [byName, setByName] = useState({});

  useEffect(() => {
    fetchProducts()
      .then((list) => {
        const map = {};
        list.forEach((p) => {
          map[p.product_name] = p._id;
        });
        setByName(map);
      })
      .catch(() => {});
  }, []);

  const goTo = (dbName) => {
    const id = byName[dbName];
    if (id) navigate(`/description/${id}`);
  };

  const clickableStyle = { cursor: "pointer" };

  return (
    <>
      <Container fluid style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
        <Row className="align-items-center">
          <Col xs={12} style={{ color: "#f9a8d4", fontWeight: "bold", fontSize: "2.5rem", textAlign: "center" }}>
            OUR BEST SELLERS
          </Col>
        </Row>
        <br />
      </Container>

      <Container fluid style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
        {/* 🖥️ Large Screens Layout */}
        <Row className="align-items-start d-none d-lg-flex">
              <Col
                xs={6} sm={6} lg={4} md={4}
                className="d-flex flex-column align-items-center"
                onClick={() => goTo("Barrier Repair Moisturizer")}
                style={clickableStyle}
              >
                <div style={{ position: "relative", width: "100%" }}>
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0721/8639/6974/files/best_seller_barrier_repair.jpg?v=1731912589"
                    style={{
                      height: "570px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#a78bfa",
                      color: "white",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      paddingLeft: "18px",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      padding: "10px",
                      borderRadius: "10px",
                      position: "absolute",
                      bottom: "0",
                      width: "100%",
                      height: "60px",
                    }}
                  >
                    Barrier Repair Moisturiser
                  </div>
                </div>
              </Col>

              <Col xs={6} sm={6} lg={4} md={4} className="d-flex flex-column">
                <div
                  style={{ position: "relative", marginBottom: "10px", ...clickableStyle }}
                  onClick={() => goTo("Tinted Sunscreen")}
                >
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0678/2517/2643/files/12_e98ea999-9e1d-437d-be4c-2d8dbdeddcdc.jpg?v=1736224937"
                    style={{
                      height: "290px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#fdba74",
                      color: "white",
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      padding: "10px",
                      borderRadius: "10px",
                      position: "absolute",
                      bottom: "0",
                      width: "100%",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      paddingLeft: "18px",
                    }}
                  >
                    Tinted Sunscreen
                  </div>
                </div>

                <div
                  style={{ position: "relative", ...clickableStyle }}
                  onClick={() => goTo("Brightening Serum")}
                >
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0678/2517/2643/files/26.png?v=1736225073"
                    style={{
                      height: "290px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#fdba74",
                      color: "white",
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      padding: "10px",
                      borderRadius: "10px",
                      position: "absolute",
                      bottom: "0",
                      width: "100%",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      paddingLeft: "18px",
                    }}
                  >
                    Vitamin C Serum
                  </div>
                </div>
              </Col>

              <Col xs={6} sm={6} lg={4} md={4} className="d-flex flex-column">
                <div
                  style={{
                    height: "290px",
                    position: "relative",
                    borderRadius: "20px",
                    marginBottom: "10px",
                    backgroundColor: "#f9a8d4",
                  }}
                >
                  <Link to="/SHOPALL">
                    <Button
                      style={{
                        position: "absolute",
                        left: "20px",
                        bottom: "20px",
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        border: "none",
                        padding: "12px 24px",
                        backgroundColor: "#f9a8d4",
                        borderRadius: "10px",
                      }}
                    >
                      SHOP NOW →
                    </Button>
                  </Link>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "290px",
                  }}
                >
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0678/2517/2643/files/blissfull_animation_cdb43ffc-3bd4-4d3a-8c58-22cf1f966dda.gif?v=1736398441"
                    style={{
                      display: "block",
                      width: "50%",
                    }}
                  />
                </div>
              </Col>
        </Row>
      </Container>
    </>
  );
}

export default OurBestSeller;
