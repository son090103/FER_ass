import React, { useState, useEffect } from "react";

function Profile() {
    const storedUser = localStorage.getItem("loggedInUser");
    const userData = storedUser ? JSON.parse(storedUser) : null;

    const [user, setUser] = useState(userData || { id: "", name: "", phone: "", username: "", password: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [updatedFields, setUpdatedFields] = useState({});

    useEffect(() => {
        if (userData?.id) {
            console.log("Fetching data for user ID:", userData.id);
            fetch(`http://localhost:9999/accounts/${userData.id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    console.log("Dữ liệu từ API:", data);
                    setUser(data);
                    localStorage.setItem("loggedInUser", JSON.stringify(data));
                })
                .catch((error) => console.error("Lỗi khi tải dữ liệu người dùng:", error));
        }
    }, [userData?.id]);

    if (!userData) {
        return <div className="alert-danger">Bạn chưa đăng nhập!</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
        setUpdatedFields(prevFields => ({ ...prevFields, [name]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (Object.keys(updatedFields).length === 0) {
            alert("Không có thay đổi nào để lưu!");
            return;
        }

        console.log("Dữ liệu gửi đi:", updatedFields);
        console.log("URL yêu cầu:", `http://localhost:9999/accounts/${user.id}`);

        try {
            const response = await fetch(`http://localhost:9999/accounts/${user.id}`, {
                method: "PATCH", // json-server hỗ trợ PATCH
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(updatedFields),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Phản hồi từ API:", response.status, responseData);

            const updatedUser = { ...user, ...updatedFields };
            setUser(updatedUser);
            localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
            setUpdatedFields({});
            setIsEditing(false);
            alert("Cập nhật thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            alert(`Lỗi khi cập nhật dữ liệu: ${error.message}`);
        }
    };

    return (
        <div style={styles.profileContainer}>
            <div style={styles.profileCard}>
                <h2 style={styles.profileTitle}>Thông Tin Cá Nhân</h2>
                <ul style={styles.profileInfo}>
                    <li><strong>ID:</strong> {user.id}</li>
                    <li>
                        <strong>Họ và Tên:</strong>
                        <input
                            type="text"
                            name="name"
                            value={user.name || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            style={styles.input}
                        />
                    </li>
                    <li>
                        <strong>Số Điện Thoại:</strong>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            style={styles.input}
                        />
                    </li>
                    <li>
                        <strong>Mật khẩu:</strong>
                        <input
                            type="password"
                            name="password"
                            value={user.password || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            style={styles.input}
                        />
                    </li>
                </ul>
                {isEditing ? (
                    <button onClick={handleSaveClick} style={styles.saveButton}>Lưu</button>
                ) : (
                    <button onClick={handleEditClick} style={styles.editButton}>Chỉnh Sửa</button>
                )}
            </div>
        </div>
    );
}

const styles = {
    profileContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #74ebd5, #acb6e5)"
    },
    profileCard: {
        width: "400px",
        padding: "20px",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        textAlign: "center"
    },
    profileTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "20px"
    },
    profileInfo: {
        listStyle: "none",
        padding: "0"
    },
    input: {
        marginLeft: "10px",
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        width: "90%"
    },
    editButton: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px"
    },
    saveButton: {
        backgroundColor: "#28a745",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px"
    }
};

export default Profile;