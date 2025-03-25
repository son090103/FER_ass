import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS để đảm bảo carousel hoạt động
import "./../App.css"; // Import file CSS tùy chỉnh

function Carousel() {
    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="3000">
                    <img
                        src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                        className="d-block w-100 carousel-img"
                        alt="Book 1"
                    />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img
                        src="https://images.unsplash.com/photo-1522143049013-2519756a52d4"
                        className="d-block w-100 carousel-img"
                        alt="Book 2"
                    />
                </div>
                <div className="carousel-item" data-bs-interval="3000">
                    <img
                        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
                        className="d-block w-100 carousel-img"
                        alt="Book 3"
                    />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
