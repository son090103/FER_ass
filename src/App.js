import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Cart from "./component/Cart";
import Navbar from "./component/Narbar";
import Foooter from "./component/Foooter";
import Carosel from "./component/Carosel";
import Navbar1 from "./component/Navbar1";
import Home1 from "./component/Home1";
import { useState, useEffect } from "react";
import Detail from "./component/Detail";
import Register from "./component/Register";
import Orders from "./component/Orders";
import Profile from "./component/Profile";
import AdminBookList from "./component/Admin";
import Detail1 from "./component/Detail1"; // ✅ Import trang Orders

function App() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:9999/books")
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error("Error fetching books:", error));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<><Navbar setSearchTerm={setSearchTerm} /><Carosel /><Home searchTerm={searchTerm} books={books} /></>} />
                <Route path="/home1" element={<><Navbar1 setSearchTerm={setSearchTerm} /><Carosel /><Home1 searchTerm={searchTerm} books={books}/></>} />
                <Route path="/login" element={<><Navbar /><Login /></>} />
                <Route path="/detail1/:id" element={<><Navbar /><Detail1 /></>} />
                <Route path="/register" element={<><Navbar1 /><Register /></>} />
                <Route path="/cart" element={<><Navbar1 setSearchTerm={setSearchTerm} /><Cart /></>} />
                <Route path="/detail/:id" element={<><Navbar1 /><Detail books={books}/> </>} />
                <Route path="/orders" element={<><Navbar1 /><Orders /></>} /> {/* ✅ Thêm đường dẫn orders */}
                <Route path="/profile" element={<><Navbar1 /><Profile /></>} />
                <Route path="/admin" element={<><Navbar1 /><AdminBookList /></>} />
            </Routes>
            <Foooter />
        </Router>
    );
}

export default App;
