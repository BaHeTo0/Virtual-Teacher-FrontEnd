import React from "react";
import "./NotFoundContainer.css";
import image404 from "../../images/404.png";

const NotFoundContainer = () => {
  return (
    <div className="NotFoundContainer">
      <img src={image404} alt="not found" />
    </div>
  );
};

export default NotFoundContainer;
