// questo è un sistema più "pratico" che permette di importare più cose sulla stessa linea
// import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

// import singolo di navbar che sfrutta il cosiddetto "tree shaking", ovvero prende la minima parte che serve dalla libreria
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";

// questa è la sintassi abbreviata che sfrutta il return IMPLICITO delle arrow functions,
// da ricordarsi che NON CI DEVONO essere le graffe dopo la freccia! (altrimenti servirà un return esplicito)
const TopBar = props => {
  // useLocation() è un hook che ci ritorna un oggetto che salveremo in una variabile
  const location = useLocation();
  console.log("Location", location);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid="md">
        <Navbar.Brand href="#home">EpicStaurant — {props.claim}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}> */}
            {/* <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/prenota-tavolo" className={`nav-link ${location.pathname === "/prenota-tavolo" ? "active" : ""}`}>
              Prenota Tavolo
            </Link>
            <Link to="/prenotazioni" className={`nav-link ${location.pathname === "/prenotazioni" ? "active" : ""}`}>
              Prenotazioni
            </Link> */}

            {/* con un NavLink abbiamo il controllo e la funzionalità di active in automatico */}
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/menu" className="nav-link">
              Menu
            </NavLink>
            <NavLink to="/prenota-tavolo" className="nav-link">
              Prenota Tavolo
            </NavLink>
            <NavLink to="/prenotazioni" className="nav-link">
              Prenotazioni
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
