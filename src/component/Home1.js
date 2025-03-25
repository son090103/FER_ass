import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home1({ searchTerm, books }) {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 4;

    // Lọc sách theo từ khóa tìm kiếm
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Xác định sách hiển thị trên trang hiện tại
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Chuyển trang
    const nextPage = () => {
        if (indexOfLastBook < filteredBooks.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Danh sách sách</h2>
            <Row className="g-4">
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                        <Col key={book.id} lg={3} md={4} sm={6} xs={12}>
                            <Card className="shadow-sm border-0 rounded">
                                <Card.Img variant="top" src={book.image} alt={book.title} />
                                <Card.Body className="text-center">
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text className="text-muted">
                                        Giá: <strong>{book.price.toLocaleString()} VNĐ</strong>
                                    </Card.Text>
                                    <Link to={`/detail/${book.id}`} className="btn btn-primary w-100">
                                        Xem chi tiết 📖
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center text-danger">Không tìm thấy sách nào!</p>
                )}
            </Row>

            {/* Nút phân trang */}
            <div className="d-flex justify-content-center mt-4">
                <Button variant="secondary" onClick={prevPage} disabled={currentPage === 1}>
                    ← Previous
                </Button>
                <span className="mx-3 align-self-center">Trang {currentPage}</span>
                <Button variant="secondary" onClick={nextPage} disabled={indexOfLastBook >= filteredBooks.length}>
                    Next →
                </Button>
            </div>
        </Container>
    );
}

export default Home1;
