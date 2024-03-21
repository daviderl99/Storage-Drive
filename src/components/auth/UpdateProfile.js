import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "../CenteredContainer";
import Navbar from "../drive/Navbar";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, customUpdateEmail, customUpdatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(customUpdateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(customUpdatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/user");
      })
      .catch((e) => {
        switch (e.code) {
          case "auth/weak-password":
            setError("Password should be at least 6 characters");
            break;
          default:
            setError("Failed to update");
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Navbar />
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/user">Cancel</Link>
        </div>
      </CenteredContainer>
    </>
  );
}
