import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./../AdminBookList.css";

const AdminBookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    // Kiểm tra localStorage ngay khi vào trang
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log("Stored User in AdminBookList:", storedUser); // Debug

    if (!storedUser) {
      console.log("No user found, redirecting to /login");
      navigate("/login", { replace: true });
      return;
    }

    setUser(storedUser);
    setLoading(true);

    fetch("http://localhost:9999/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải danh sách sách!");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Không thể tải dữ liệu sách!");
        setLoading(false);
      });
  }, [navigate]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      image: "",
      description: "",
      category: "",
    });
    setEditBook(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    setShowForm(true);
    setEditBook(null);
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setFormData({
      title: book.title,
      price: book.price,
      image: book.image,
      description: book.description,
      category: book.category,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sách này?")) {
      fetch(`http://localhost:9999/books/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setBooks(books.filter((book) => book.id !== id));
        })
        .catch((error) => console.error("Error deleting book:", error));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      ...formData,
      price: Number(formData.price),
      id: books.length > 0 ? (Math.max(...books.map((b) => Number(b.id))) + 1).toString() : "1",
    };


    if (editBook) {
      fetch(`http://localhost:9999/books/${editBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      })
        .then((response) => response.json())
        .then((updatedBook) => {
          setBooks(books.map((book) => (book.id === editBook.id ? updatedBook : book)));
          resetForm();
        })
        .catch((error) => console.error("Error updating book:", error));
    } else {
      fetch("http://localhost:9999/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      })
        .then((response) => response.json())
        .then((newBook) => {
          setBooks([...books, newBook]);
          resetForm();
        })
        .catch((error) => console.error("Error adding book:", error));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="admin-container">
      <h2>Quản lý sách</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        placeholder="Tìm kiếm sách..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          <table className="book-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hình ảnh</th>
                <th>Tên Sách</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>
                    <img 
                      src={book.image} 
                      alt={book.title}
                      style={{ width: "50px", height: "70px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.price.toLocaleString()} VNĐ</td>
                  <td>{book.description}</td>
                  <td>
                    <button 
                      className="edit-button"
                      onClick={() => handleEdit(book)}
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button 
                      className="delete-button"
                      onClick={() => handleDelete(book.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="footer-section">
            <button className="add-button" onClick={handleAdd}>
              Thêm sách mới
            </button>
          </div>

          {showForm && (
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h3>{editBook ? "Sửa sách" : "Thêm sách mới"}</h3>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Tên sách"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Giá (VNĐ)"
                  required
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="URL hình ảnh"
                  required
                />
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả"
                  required
                />
                <div className="form-buttons">
                  <button type="submit" className="submit-button">
                    {editBook ? "Cập nhật" : "Thêm"}
                  </button>
                  <button type="button" className="cancel-button" onClick={resetForm}>
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBookList;