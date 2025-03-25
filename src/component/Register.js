import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import  "./../Login.css"
function Register() {
    const [user, setUser] = useState({ name: "", username: "", password: "", phone: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Kiểm tra số điện thoại hợp lệ (10 số, bắt đầu bằng 0)
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(user.phone)) {
            setError("Số điện thoại không hợp lệ. Vui lòng nhập 10 số và bắt đầu bằng 0.");
            return;
        }

        try {
            const response = await fetch("http://localhost:9999/accounts");
            if (!response.ok) {
                throw new Error("Không thể kết nối đến server!");
            }
            const accounts = await response.json();

            // Kiểm tra xem username đã tồn tại chưa
            const existingUser = accounts.find((acc) => acc.username === user.username);
            if (existingUser) {
                setError("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
                return;
            }

            // Tạo tài khoản mới
            const newUser = { id: accounts.length + 1, ...user };

            // Lưu tài khoản mới vào JSON Server (hoặc localStorage nếu không có backend)
            await fetch("http://localhost:9999/accounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            setSuccess("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
            setTimeout(() => (window.location.href = "/login"), 2000);
        } catch (err) {
            setError("Lỗi hệ thống! Vui lòng thử lại sau.");
            console.error(err);
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100" id="register">
            <Row className="login-container w-100 shadow-lg rounded-lg bg-white" style={{ width: "550px", height: "550px" }}>
                {/* Form đăng ký */}
                <Col md={6} className="p-5 d-flex flex-column justify-content-center">
                    <h2 className="text-center mb-4">ĐĂNG KÝ</h2>
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    {success && <Alert variant="success" className="text-center">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Họ và Tên"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                placeholder="Tên đăng nhập"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Mật khẩu"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                placeholder="Số điện thoại"
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100 mb-3">
                            Đăng ký
                        </Button>
                    </Form>
                    <p className="text-center mt-3">Hoặc đăng ký với</p>
                </Col>
                {/* Phần chào mừng */}
                <Col md={6} className="welcome-section p-5 d-flex flex-column justify-content-center align-items-center text-white bg-success">
                    <h2 className="text-center mb-4" style={{ color: "white" }}>CHÀO MỪNG BẠN!</h2>
                    <p className="text-center" style={{ color: "white" }}>Hãy tham gia cộng đồng của chúng tôi để có những trải nghiệm tuyệt vời.</p>
                    <p className="text-center" style={{ color: "white" }}>Đã có tài khoản? <a href="#" className="text-white text-decoration-underline">Đăng nhập.</a></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
