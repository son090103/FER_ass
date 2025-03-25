import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar({ setSearchTerm }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Home</a>
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
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Link</a>
                        </li>
                    </ul>

                    {/* Ô nhập tìm kiếm, cập nhật state khi người dùng nhập */}
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Tìm kiếm sách..."
                            aria-label="Search"
                            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm trong App.js
                        />
                        <button className="btn btn-outline-light" type="button">🔍</button>
                    </form>

                    <form className="d-flex" style={{padding: "10px"}} role="search" action="/login">
                        <button className="btn btn-outline-light" type="submit">Login</button>
                    </form>
                    <form className="d-flex" style={{padding: "10px"}} role="search" action="/register">
                        <button className="btn btn-outline-light" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
