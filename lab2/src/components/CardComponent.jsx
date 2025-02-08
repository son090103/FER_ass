import { Card, Button } from "react-bootstrap";
import menu1 from "../images/menu1.jpg";
import menu2 from "../images/menu2.jpg";
import menu3 from "../images/menu3.jpg";
import menu4 from "../images/menu4.jpg";

function CardComponent() {
  return (
    <div className="container-fluid bg-dark text-white vh-100 d-flex flex-column justify-content-center align-items-center">
      <div>
        <h1 style={{ paddingRight: "100px" }}>Our Menu</h1>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        <Card style={{ width: "18rem" }} className="mx-3">
          <Card.Img variant="top" src={menu1} />
          <Card.Body>
            <Card.Title>Margenrita Pizza</Card.Title>
            <Card.Text>Price: $19.99</Card.Text>
            <Button className="btn btn-dark w-100 text-center">Buy</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="mx-3">
          <Card.Img variant="top" src={menu2} />
          <Card.Body>
            <Card.Title>Mushroom Pizza</Card.Title>
            <Card.Text>Price: $19.99</Card.Text>
            <Button className="btn btn-dark w-100 text-center">Buy</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="mx-3">
          <Card.Img variant="top" src={menu3} />
          <Card.Body>
            <Card.Title>Hawaiian Pizza</Card.Title>
            <Card.Text>Price: $19.99</Card.Text>
            <Button className="btn btn-dark w-100 text-center">Buy</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="mx-3">
          <Card.Img variant="top" src={menu4} />
          <Card.Body>
            <Card.Title>Pesto Pizza</Card.Title>
            <Card.Text>Price: $19.99</Card.Text>
            <Button className="btn btn-dark w-100 text-center">Buy</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CardComponent;
