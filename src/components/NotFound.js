import { Container } from "react-bootstrap";
import Navbar from "./drive/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center text-center mt-5 pt-5"
      >
        <div>
          <h1 style={{ fontSize: "5rem" }}>404</h1>
          <p style={{ fontSize: "2rem" }}>Page not found</p>
        </div>
      </Container>
    </>
  );
}
