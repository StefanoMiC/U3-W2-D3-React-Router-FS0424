import { Badge, ListGroup } from "react-bootstrap";

const DishComments = ({ selectedPasta }) => {
  return (
    <ListGroup className="mb-3">
      {selectedPasta.comments.map((review, index) => (
        <ListGroup.Item key={`review-${index}`} className="d-flex justify-content-between align-items-center">
          <span>
            {review.author} — {review.comment}
          </span>
          <Badge bg={review.rating > 3 ? "success" : "danger"}>{review.rating}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default DishComments;
