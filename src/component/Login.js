import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import  "./../Login.css"
function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:9999/accounts");
            if (!response.ok) {
                throw new Error("Không thể kết nối đến server!");
            }
            const accounts = await response.json();

            const user = accounts.find(
                (acc) => acc.username === credentials.username && acc.password === credentials.password
            );

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                navigate("/home1");
            } else {
                setError("Tên đăng nhập hoặc mật khẩu không đúng!");
            }
        } catch (err) {
            setError("Lỗi hệ thống! Vui lòng thử lại sau.");
            console.error(err);
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100" id="login" >
            <Row className="login-container w-100 shadow-lg rounded-lg bg-white" style={{width:"550px",height:"550px"}}>
                {/* Form đăng nhập */}
                <Col md={6} className="p-5 d-flex flex-column justify-content-center">
                    <h2 className="text-center mb-4">ĐĂNG NHẬP</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Tên đăng nhập"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Mật khẩu"
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100 mb-3">
                            Đăng nhập
                        </Button>
                    </Form>
                    <p className="text-center mt-3">Hoặc đăng nhập với</p>
                </Col>
                {/* Phần chào mừng */}
                <Col md={6} className="welcome-section p-5 d-flex flex-column justify-content-center align-items-center text-white bg-success">
                    <h2 className="text-center mb-4" style={{color:"white"}}>CHÀO MỪNG TRỞ LẠI!</h2>
                    <p className="text-center" style={{color:"white"}}>Chúng tôi rất vui khi có bạn ở đây. Hy vọng bạn có một khoảng thời gian vui vẻ.</p>
                    <p className="text-center" style={{color:"white"}}>Chưa có tài khoản? <a href="#" className="text-white text-decoration-underline">Đăng ký.</a></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;