import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import Trash3 from "react-bootstrap-icons/dist/icons/trash3";

const ReservationList = () => {
  // state = {
  //   reservations: [], // questa porzione di stato la useremo per raccogliere e salvare i dati in arrivo dal server (dopo la fetch)
  //   isLoading: false
  // };

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // i metodi custom DEVONO usare SEMPRE ARROW FUNCTIONS (per ereditare il this dell'istanza del nostro componente a classe)
  const fetchReservations = async () => {
    setIsLoading(true);

    try {
      const resp = await fetch("https://striveschool-api.herokuapp.com/api/reservation/");
      if (resp.ok) {
        // qui abbiamo ricevuto i dati sotto forma di array, ci basterà sostituire lo stato con array vuoto con questo nuovo array

        // this.setState({reservations: reservations})
        // this.setState({ reservations }); // equivalente alla precedente sintassi
        console.log("setState(), reservations saved");
        const reservations = await resp.json();

        setReservations(reservations); // equivalente alla precedente sintassi
        // questo è il momento in cui l'array si salva nello stato e scatterà immediatamente dopo un'altra chiamata di render()
        // che a questo punto nel suo JSX potrà mappare e generare nuovi elementi a partire dai nuovi dati trovati nello stato
      } else {
        throw new Error("Errore nel reperimento delle prenotazioni");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReservation = async reservId => {
    try {
      const resp = await fetch("https://striveschool-api.herokuapp.com/api/reservation/" + reservId, { method: "DELETE" });
      if (resp.ok) {
        // qui dentro, sicuri di aver già eliminato l'elemento, chiameremo di nuovo la funzione fetchReservations che chiederà al server l'array aggiornato,
        // salvandolo di conseguenza come nuovo reservations
        fetchReservations();
        // const deletedObj = await resp.json();
        // alert("abbiamo eliminato la prenotazione di: " + deletedObj.name);
      } else {
        throw new Error("Errore nel reperimento delle prenotazioni");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // this.fetchReservations(); // E' VIETATO avviare operazioni che settano lo stato dentro a render()! (LOOP INFINITO)

  console.log("RESERV. LIST Render");
  return (
    <Container fluid="md" className="mt-5 text-center">
      <h2 className="display-5 mt-5 d-inline-block me-3">Prenotazioni</h2>
      {/* lo spinner si visualizzerà SOLO se lo stato isLoading sarà true, e questo valore lo abbiamo gestito dalla nostra fetchReservations */}
      {isLoading && (
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={4} xl={6}>
          <ListGroup>
            {reservations.map(reserv => (
              <ListGroup.Item key={reserv._id} className="d-flex align-items-center">
                <span>{reserv.name} per:</span> <strong className="ms-2">{reserv.numberOfPeople}</strong> {reserv.smoking && <span className="ms-2">🚬</span>}
                <Badge bg="light" className="text-bg-light ms-auto">
                  {new Date(reserv.dateTime).toLocaleTimeString()}
                </Badge>
                {/* questo è il bottone di cancellazione. una volta cliccato eseguirà il nostro metodo deleteReservations passandogli 
                  l'id della prenotazione come argomento */}
                <Button variant="danger" size="sm" onClick={() => deleteReservation(reserv._id)}>
                  {/* icona di react-bootstrap-icons */}
                  <Trash3 />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationList;
