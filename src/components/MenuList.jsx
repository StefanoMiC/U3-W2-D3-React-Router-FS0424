import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuList = ({ menu }) => (
  <Container className="mt-5">
    {menu.map(dish => (
      <Row key={`piatto-${dish.id}`} className="justify-content-center mb-3">
        <Col xs={12} md={8} lg={4}>
          <Card>
            <Card.Img variant="top" src={dish.image} />
            <Card.Body>
              <Card.Title>{dish.name}</Card.Title>
              <Card.Text>
                {dish.description}{" "}
                <Badge bg="info" className="text-bg-info">
                  {dish.price}€
                </Badge>
              </Card.Text>
              <Link to={"/menu/dettagli/" + dish.id} className="btn btn-dark d-block w-100">
                Vai {dish.name}
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ))}
  </Container>
);
export default MenuList;
