import React, { useRef } from "react";
import { LogOutButton } from "../log-out-btn/LogOutButton";
import { ReactComponent as IconoMenu } from "../../assets/svg/iconoMenu.svg";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const HeaderMobile = ({ title, links }) => {
  const navRef = useRef();

  return (
    <Navbar collapseOnSelect expand="lg" className="header-mobile" ref={navRef}>
      <Container fluid>
        <Navbar.Toggle
          style={{ padding: "0" }}
          aria-controls="navbarScroll"
          children={
            <div style={{ width: "40px" }}>
              <IconoMenu />
            </div>
          }
        />
        <h2 style={{ margin: "0", color: "white" }}>{title}</h2>

        <LogOutButton />

        <Navbar.Collapse id="navbarScroll" style={{ marginLeft: "50px" }}>
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={"span"} href="#" className="p-0 d-flex">
              <Link
                className="nav-link p-0"
                style={{ color: "white", fontSize: "18px" }}
                aria-current="page"
                to="/concreco/home"
              >
                Inicio
              </Link>
            </Nav.Link>

            {links.map((link) => (
              <Nav.Link
                as={"span"}
                href="#"
                className="p-0 d-flex"
                key={link.id}
              >
                <Link
                  className="nav-link p-0"
                  style={{ color: "white", fontSize: "18px" }}
                  aria-current="page"
                  to={link.link}
                >
                  {link.text}
                </Link>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
