import { Container } from "react-bootstrap";
import Navbar from "./drive/Navbar";
import "../styles/main.scss";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Container fluid className="not-found-page">
        <div className="not-found-card">
          <span className="eyebrow">NOT FOUND</span>
          <h1>404</h1>
          <p>We couldn’t find the page you were looking for.</p>
        </div>
      </Container>
    </>
  );
}
