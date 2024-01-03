import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";
import { AuthContext, GetAuthContext } from "./security/AuthContext";

export default function HeaderComponent(){
    const authContext = GetAuthContext();
    const isAuthenticated = authContext.isAuthenticated;
    function logout(){
        AuthContext.logout();
    }
    return(
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Event Management</Navbar.Brand>
          <Nav className="me-auto">
            {isAuthenticated && <Link className="nav-link" to="/welcome/:username">Home</Link>}
            {isAuthenticated && <Link className="nav-link" to="/events">Events</Link>}
            {isAuthenticated && <Link className="nav-link" to="/tasks">Tasks</Link>}
          </Nav>
          <Nav className="justify-content-end">
            {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
            {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
          </Nav>            
        </Container>
      </Navbar>
    );
}