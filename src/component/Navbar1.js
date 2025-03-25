import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar1({ setSearchTerm }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "/"; // Chuyển hướng về trang chủ sau khi đăng xuất
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/home1">Home</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="/home1">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cart">Cart</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/orders">Order</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                    </ul>

                    {/* Ô nhập tìm kiếm */}
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Tìm kiếm sách..."
                            aria-label="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-light" type="button">🔍</button>
                    </form>

                    {user ? (
                        <>
                            <span className="text-white mx-3">Xin Chào, {user.name}!</span>
                            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <form className="d-flex" role="search" action="/login">
                            <button className="btn btn-outline-light" type="submit">Đăng nhập</button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar1;
