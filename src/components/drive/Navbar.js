import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeColorButton from "./ThemeColorButton";
import "../../styles/main.scss";

export default function NavbarComponent() {
  return (
    <Navbar className="app-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>FDrive</span>
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center gap-2">
          <Nav.Link as={Link} to="/user" className="nav-icon-btn p-0" aria-label="Account">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Nav.Link>
          <ThemeColorButton />
        </Nav>
      </Container>
    </Navbar>
  );
}
