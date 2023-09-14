import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function NavbarComponent() {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'
          style={{ fontSize: '24px' }}
        >
          FDrive
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to='/user'>
            <FontAwesomeIcon icon={faUser} size='lg' />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
