import { useEffect, useState } from "react";
import { Badge, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DishComments from "./DishComments";

const PastaDetails = ({ menu }) => {
  const [pasta, setPasta] = useState(null);
  // useParams quando chiamato ci torna un oggetto con tutti i parametri, specificati sulle rotte in App.jsx che ritroveremo come coppie chiave-valore all'interno
  const params = useParams();
  const dishId = params.dishId;
  const navigate = useNavigate();

  useEffect(() => {
    // dishId arriva dai parametri e lo confrontiamo con ogni oggetto pasta nel suo id
    const pastaObj = menu.find(dish => dish.id.toString() === dishId);
    console.log("pastaObj", pastaObj);

    if (pastaObj) {
      setTimeout(() => {
        setPasta(pastaObj);
      }, 500);
    } else {
      // invia l'utente alla pagina 404 dopo mezzo secondo
      setTimeout(() => {
        navigate("/not-found");
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {pasta ? (
          <Col xs={12} md={8}>
            <Image src={pasta.image} fluid />
            <h1 className="display-4">{pasta.name}</h1>
            <p>{pasta.description}</p>
            <Badge bg="info" className="fs-5">
              {pasta.price}€
            </Badge>

            <h4 className="display-6 mt-4 mb-2">Recensioni:</h4>
            <DishComments selectedPasta={pasta} />
          </Col>
        ) : (
          <Spinner animation="border" role="status" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Row>
    </Container>
  );
};
export default PastaDetails;
