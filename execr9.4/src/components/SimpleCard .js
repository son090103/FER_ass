import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SimpleCard = ({ item }) => {
  return (
    <div className="simple-card">
      <div className="image-container">
        <span>IMG</span>
      </div>
      <div className="content">
        <h2 className="title">{item.title}</h2>
        <p className="description">{item.description}</p>
      </div>
    </div>
  );
};

export default SimpleCard;
