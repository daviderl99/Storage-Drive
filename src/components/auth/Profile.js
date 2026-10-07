import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "../CenteredContainer";
import Navbar from "../drive/Navbar";
import "../../styles/main.scss";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Navbar />
      <CenteredContainer>
        <Card className="auth-card">
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <p className="my-4">Email: {currentUser.email}</p>
            <Link to="/update-profile" className="btn btn-primary w-100">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2 auth-footer-text">
          <Button
            variant="link"
            onClick={handleLogout}
            style={{ color: "inherit" }}
          >
            Log Out
          </Button>
        </div>
      </CenteredContainer>
    </>
  );
}
