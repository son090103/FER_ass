import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";
function Cart() {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const storedUser = localStorage.getItem("loggedInUser");
    const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (!loggedInUser) {
            alert("Vui lòng đăng nhập để xem giỏ hàng!");
            return;
        }

        fetch(`http://localhost:9999/accounts/${loggedInUser.id}`)
            .then((res) => res.json())
            .then((user) => {
                setCart(user.cart || []);
                setLoading(false);
            })
            .catch((error) => console.error("Lỗi khi lấy giỏ hàng:", error));
    }, [loggedInUser]);

    // Xử lý chọn/bỏ chọn sản phẩm
    const handleCheckboxChange = (productId) => {
        setSelectedItems((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
    };

    // Xử lý xóa sản phẩm khỏi giỏ hàng
    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);

        fetch(`http://localhost:9999/accounts/${loggedInUser.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: updatedCart })
        })
            .then(() => {
                alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
                setCart(updatedCart);
            })
            .catch(error => console.error("Lỗi khi xóa sản phẩm:", error));
    };

    // Xử lý thanh toán
    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }

        fetch(`http://localhost:9999/accounts/${loggedInUser.id}`)
            .then(res => res.json())
            .then(user => {
                const selectedProducts = cart.filter(item => selectedItems.includes(item.id));
                const updatedCart = cart.filter(item => !selectedItems.includes(item.id));

                const newOrder = {
                    id: Date.now().toString(),
                    items: selectedProducts,
                    total: selectedProducts.reduce((total, item) => total + item.price * item.quantity, 0),
                    date: new Date().toISOString(),
                    status: "Đang giao" // ✅ Thêm trạng thái "Đang giao"
                };

                const updatedOrders = user.orders ? [...user.orders, newOrder] : [newOrder];

                fetch(`http://localhost:9999/accounts/${loggedInUser.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orders: updatedOrders, cart: updatedCart })
                })
                    .then(() => {
                        alert("Thanh toán thành công! Đơn hàng đang được giao.");
                        setCart(updatedCart);
                        setSelectedItems([]);
                    })
                    .catch(error => console.error("Lỗi khi cập nhật đơn hàng:", error));
            })
            .catch(error => console.error("Lỗi khi lấy dữ liệu người dùng:", error));
    };

    if (!loggedInUser) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="danger">Bạn chưa đăng nhập!</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center text-primary">🛒 Giỏ Hàng Của Bạn</h2>

            {loading ? (
                <p className="text-center">Đang tải giỏ hàng...</p>
            ) : cart.length === 0 ? (
                <Alert variant="info" className="text-center">Giỏ hàng trống!</Alert>
            ) : (
                <>
                    <Table striped bordered hover className="mt-3 text-center">
                        <thead>
                        <tr>
                            <th>Chọn</th>
                            <th>Ảnh</th>
                            <th>Tên sách</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                </td>
                                <td><img src={item.image} alt={item.title} width="80" /></td>
                                <td>{item.title}</td>
                                <td>{item.price.toLocaleString()} VNĐ</td>
                                <td>{item.quantity}</td>
                                <td>{(item.price * item.quantity).toLocaleString()} VNĐ</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <div className="text-center mt-4">
                        <Button variant="success" onClick={handleCheckout}>Mua hàng</Button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Cart;
