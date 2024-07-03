import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  // l'hook useNavigate(), una volta chiamato, produce una funzione.
  // Sarà poi quella che noi potremmo effettivamente chiamare per produrre il risultato di cambiare la pagina

  // quindi navigate contiene una funzione ed è QUELLA che dobbiamo chiamare, non useNavigate direttamente!
  console.log("Navigate", navigate);
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} className="text-center">
          <h1 className="display-3 text-primary">404 — Risorsa non trovata!</h1>
          <p className="lead">La pagina che stavi cercando non è disponibile</p>
          <div className="d-flex justify-content-center gap-2 mt-5">
            <Link to="/prenotazioni" className="btn btn-success">
              Vai a prenotazioni
            </Link>

            {/* questo è il metodo per cambiare pagina in maniera programmatica */}
            <Button onClick={() => navigate("/")}>Torna alla home</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
