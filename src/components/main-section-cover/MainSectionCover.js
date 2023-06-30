import React from "react";
import MenuImagen from "../../assets/img/menu.JPG";
// 

export const MainSectionCover = ({ text }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100%", width: "100%" }}
    >
      <div className="title-img-container">
        <h1 className="title-home">{text}</h1>
        <hr className="title-hr" />
        <div>
        <img src={MenuImagen} alt="menu-img" className="img" />
        </div>
      </div>
    </div>
  );
};
