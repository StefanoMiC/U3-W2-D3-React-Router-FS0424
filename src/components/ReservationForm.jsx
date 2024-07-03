import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

// proprietà che il server si aspetta di ricevere per ogni prenotazione inviata:

// name <-- string
// phone <-- string
// numberOfPeople <-- string || number
// smoking <-- boolean
// dateTime <-- string || date
// specialRequests <-- string

const ReservationForm = () => {
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    numberOfPeople: "1",
    smoking: false,
    dateTime: "",
    specialRequests: ""
  });

  const [hasAlert, setHasAlert] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // i metodi custom delle classi vanno creati come arrow function per evitare problemi nella lettura del this
  const handleFieldChange = (propertyName, propertyValue) => {
    setReservation({ ...reservation, [propertyName]: propertyValue });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("submit");

    try {
      const resp = await fetch("https://striveschool-api.herokuapp.com/api/reservation/", {
        method: "POST",
        body: JSON.stringify(reservation),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (resp.ok) {
        setReservation({
          name: "",
          phone: "",
          numberOfPeople: "1",
          smoking: false,
          dateTime: "",
          specialRequests: ""
        });
        setHasAlert(true);

        setTimeout(() => {
          setHasAlert(false);
        }, 5000);
      } else {
        throw new Error("Non trovo la risorsa");
      }
    } catch (err) {
      console.log(err);

      setHasError(true);
      setErrMsg(err.message);

      setTimeout(() => {
        setHasError(false);
        setErrMsg("");
      }, 5000);
    }
  };

  return (
    <Container>
      <h2 className="display-5 text-center mt-5">Prenota un tavolo da noi</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={4} xl={6}>
          {/* versione 1) con cortocircuito */}
          {hasAlert && (
            <Alert variant="success" onClose={() => setHasAlert(false)} dismissible>
              Prenotazione inviata
            </Alert>
          )}

          {/* versione 2) con prop show */}
          {/* 
            <Alert show={hasAlert} variant="success" >
              Prenotazione inviata
            </Alert> */}

          {hasError && (
            <Alert variant="danger" onClose={() => setHasError(false)} dismissible>
              Errore: <strong>{errMsg || "Errore nell'invio della prenotazione"}</strong>
            </Alert>
          )}

          <Form className="text-start" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome prenotazione"
                value={reservation.name} // lettura dallo stato
                //   lo spread operator serve a prendere tutte le proprietà esistenti nello State IN QUEL MOMENTO e successivamente si sovrascriverà solo una di queste (in questo caso name)
                //   onChange={e => this.setState({ reservation: { ...reservation, name: e.target.value } })} // scrittura dello stato
                onChange={e => handleFieldChange("name", e.target.value)} // scrittura dello stato
                required
              />
              {reservation.name && reservation.name.toLowerCase().includes("arnaldo") && (
                <Form.Text className="text-danger">Ma che nome orribile! Usa quello di un tuo amico..</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" placeholder="333xxxxx" value={reservation.phone} onChange={e => handleFieldChange("phone", e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSeats">
              <Form.Label>Numero Coperti</Form.Label>
              <Form.Select aria-label="Number of seats" value={reservation.numberOfPeople} onChange={e => handleFieldChange("numberOfPeople", e.target.value)}>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
                <option value="7">Seven</option>
                <option value="8">Eight</option>
                <option value="9">Nine</option>
                <option value="10">Ten</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCheckbox">
              <Form.Check type="checkbox" label="Fumatori" checked={reservation.smoking} onChange={e => handleFieldChange("smoking", e.target.checked)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Data e Ora</Form.Label>
              <Form.Control
                type="datetime-local"
                min={new Date().toISOString().split(".")[0].slice(0, -3)}
                value={reservation.dateTime}
                onChange={e => handleFieldChange("dateTime", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Richieste particolari</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="intolleranze, allergie..."
                value={reservation.specialRequests}
                onChange={e => handleFieldChange("specialRequests", e.target.value)}
              />
            </Form.Group>

            <Button variant="info" type="submit" className="d-block mx-auto">
              Invia
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationForm;
