import { Component } from "react";
import withRouter from "../helpers/withRouter";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class ClassComponent extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <div>Class component renderizzato con id dinamico: {this.props.router.params.dynamicId}</div>
            <Link to="/prenotazioni" className="btn btn-primary">
              Vai a prenotazioni
            </Link>
            <Button onClick={() => this.props.router.navigate("/")}>Vai alla Home</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(ClassComponent);
