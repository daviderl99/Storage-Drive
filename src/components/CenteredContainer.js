import React from "react";
import { Container } from "react-bootstrap";

export default function CenteredContainer({ children }) {
  return (
    <Container className="centered-container d-flex align-items-center justify-content-center">
      <div className="centered-content w-100">
        {children}
      </div>
    </Container>
  );
}
