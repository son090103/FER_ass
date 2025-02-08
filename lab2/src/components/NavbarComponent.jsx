import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <div className="container">
        <Navbar.Brand href="#">Pizza House</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link href="#" active>
              Home
            </Nav.Link>
            <Nav.Link href="#">About us</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex" role="search">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button
              variant="outline-light"
              type="submit"
              className="mx-2"
              style={{
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              }}
            >
              <FaSearch style={{ color: "white" }} /> {/* Thêm icon tìm kiếm */}
            </Button>
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarComponent;
