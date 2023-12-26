import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";

export default function HeaderComponent(){
    return(
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/welcome/:username">Home</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/tasks">Tasks</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
            
        </Container>
      </Navbar>
    );
}