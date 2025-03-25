import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, ListGroup, Collapse } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar } from "react-icons/fa"; // Icon ngôi sao

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:9999/books/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBook(data);
                setComments(data.comments || []);
                setLoading(false);
            })
            .catch((error) => console.error("Lỗi khi tải sách:", error));
    }, [id]);

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <h2 className="text-info">Đang tải dữ liệu...</h2>
            </Container>
        );
    }

    if (!book) {
        return (
            <Container className="mt-5 text-center">
                <h2 className="text-danger">Không tìm thấy sách!</h2>
                <Link to="/" className="btn btn-primary mt-3">Quay lại trang chủ</Link>
            </Container>
        );
    }

    const addToCart = async () => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (!storedUser) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng!");
            return;
        }

        const loggedInUser = JSON.parse(storedUser);

        try {
            const response = await fetch("http://localhost:9999/accounts");
            const accounts = await response.json();

            const user = accounts.find((acc) => acc.username === loggedInUser.username);
            if (!user) {
                alert("Không tìm thấy tài khoản!");
                return;
            }

            let cart = user.cart || [];
            const existingItem = cart.find((item) => item.id === book.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: book.id,
                    title: book.title,
                    price: book.price,
                    image: book.image,
                    quantity: 1,
                });
            }

            const updatedUser = { ...user, cart };
            const updateResponse = await fetch(`http://localhost:9999/accounts/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });

            if (updateResponse.ok) {
                alert("Thêm vào giỏ hàng thành công!");
                navigate("/cart");
            } else {
                throw new Error("Lỗi khi cập nhật giỏ hàng!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const storedUser = localStorage.getItem("loggedInUser");
        if (!storedUser) {
            alert("Vui lòng đăng nhập để gửi đánh giá!");
            return;
        }

        const loggedInUser = JSON.parse(storedUser);

        try {
            // Lấy thông tin tài khoản từ API
            const response = await fetch("http://localhost:9999/accounts");
            const accounts = await response.json();
            const user = accounts.find((acc) => acc.username === loggedInUser.username);
            if (!user) {
                alert("Không tìm thấy tài khoản!");
                return;
            }

            const newComment = {
                username: user.username,
                name: user.name,
                content: comment,
                rating: rating,
                date: new Date().toISOString(),
            };

            const updatedComments = [...comments, newComment];
            const updatedBook = { ...book, comments: updatedComments };
            const bookUpdateResponse = await fetch(`http://localhost:9999/books/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedBook),
            });

            if (!bookUpdateResponse.ok) {
                throw new Error("Lỗi khi cập nhật comment cho sách!");
            }


            const userCommentEntry = {
                bookId: book.id,
                bookTitle: book.title,
                content: comment,
                rating: rating,
                date: newComment.date,
            };
            const updatedUserComments = [...(user.userComments || []), userCommentEntry];
            const updatedUser = { ...user, userComments: updatedUserComments };
            const userUpdateResponse = await fetch(`http://localhost:9999/accounts/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });

            if (!userUpdateResponse.ok) {
                throw new Error("Lỗi khi cập nhật lịch sử comment của người dùng!");
            }

            setComments(updatedComments);
            setComment("");
            setRating(0);
            setShowForm(false);
            alert("Gửi đánh giá thành công!");
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    // CSS tùy chỉnh
    const styles = {
        starContainer: {
            display: "flex",
            gap: "5px",
            marginBottom: "15px",
        },
        star: {
            cursor: "pointer",
            fontSize: "24px",
            transition: "color 0.2s",
        },
        commentCard: {
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
        },
        commentHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
        },
        ratingStars: {
            display: "flex",
            gap: "3px",
            color: "#f39c12",
        },
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0 rounded">
                <Row className="g-0">
                    <Col md={5}>
                        <Card.Img
                            src={book.image}
                            alt={book.title}
                            className="img-fluid rounded-start"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    </Col>
                    <Col md={7}>
                        <Card.Body className="d-flex flex-column justify-content-center p-4">
                            <Card.Title className="fw-bold text-primary">{book.title}</Card.Title>
                            <Card.Text className="text-muted">{book.description}</Card.Text>
                            <h4 className="text-danger">
                                Giá: <strong>{book.price.toLocaleString()} VNĐ</strong>
                            </h4>

                            <div className="d-flex justify-content-between mt-4">
                                <Button variant="success" className="px-4" onClick={addToCart}>
                                    🛒 Thêm vào giỏ hàng
                                </Button>
                                <Button
                                    variant="info"
                                    className="px-4"
                                    onClick={() => setShowForm(!showForm)}
                                >
                                    ⭐ Đánh giá
                                </Button>
                                <Link to="/" className="btn btn-secondary px-4">⬅️ Quay lại</Link>
                            </div>

                            {/* Form đánh giá - Hiển thị khi bấm nút "Đánh giá" */}
                            <Collapse in={showForm}>
                                <div className="mt-4">
                                    <Form onSubmit={handleCommentSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Đánh giá của bạn (1-5 sao):</Form.Label>
                                            <div style={styles.starContainer}>
                                                {[...Array(5)].map((_, index) => {
                                                    const ratingValue = index + 1;
                                                    return (
                                                        <FaStar
                                                            key={index}
                                                            style={styles.star}
                                                            color={
                                                                ratingValue <= (hover || rating)
                                                                    ? "#f39c12"
                                                                    : "#e4e5e9"
                                                            }
                                                            onMouseEnter={() => setHover(ratingValue)}
                                                            onMouseLeave={() => setHover(0)}
                                                            onClick={() => setRating(ratingValue)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Viết đánh giá của bạn:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Nhập đánh giá của bạn về sản phẩm..."
                                                required
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Gửi đánh giá
                                        </Button>
                                    </Form>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            {/* Phần lịch sử đánh giá sản phẩm */}
            <div className="mt-5">
                <h4 className="mb-3">Lịch sử đánh giá sản phẩm</h4>
                {comments.length > 0 ? (
                    <div>
                        {comments.map((cmt, index) => (
                            <div key={index} style={styles.commentCard}>
                                <div style={styles.commentHeader}>
                                    <div>
                                        <strong>{cmt.name}</strong> (@{cmt.username})
                                    </div>
                                    <div style={styles.ratingStars}>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                color={i < cmt.rating ? "#f39c12" : "#e4e5e9"}
                                                size={16}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted">
                                    {new Date(cmt.date).toLocaleString()}
                                </p>
                                <p>{cmt.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                )}
            </div>
        </Container>
    );
}

export default Detail;