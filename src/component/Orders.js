import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const storedUser = localStorage.getItem("loggedInUser");
    const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (!loggedInUser) {
            alert("Vui lòng đăng nhập để xem đơn hàng!");
            return;
        }

        fetch(`http://localhost:9999/accounts/${loggedInUser.id}`)
            .then((res) => res.json())
            .then((user) => {
                setOrders(user.orders || []);
                setLoading(false);
            })
            .catch((error) => console.error("Lỗi khi lấy đơn hàng:", error));
    }, [loggedInUser]);

    if (!loggedInUser) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="danger">Bạn chưa đăng nhập!</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center text-success">📦 Danh Sách Đơn Hàng</h2>

            {loading ? (
                <p className="text-center">Đang tải đơn hàng...</p>
            ) : orders.length === 0 ? (
                <Alert variant="info" className="text-center">Bạn chưa có đơn hàng nào!</Alert>
            ) : (
                <Table striped bordered hover className="mt-3 text-center">
                    <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Ngày đặt</th>
                        <th>Tổng tiền</th>
                        <th>Sản phẩm</th>
                        <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.date).toLocaleString()}</td>
                            <td>{order.total.toLocaleString()} VNĐ</td>
                            <td>
                                <ul className="text-start">
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            {item.title} - {item.quantity} x {item.price.toLocaleString()} VNĐ
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                    <span
                                        className={`badge ${
                                            order.status === "Đang giao"
                                                ? "bg-warning"
                                                : order.status === "Hoàn thành"
                                                    ? "bg-success"
                                                    : "bg-danger"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default Orders;
