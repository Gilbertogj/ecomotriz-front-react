import React from "react";
import { Link } from "react-router-dom";

export const MobileMenuButtons = ({ userLinkObj, app }) => {
  return (
    <Link to={userLinkObj.link}>
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid #666A6D",
          height: "4rem",
          color:"#272727",
        }}
        className="m-4 d-flex align-items-center justify-content-center"
      >
        <h4 className="mb-0">{userLinkObj.text}</h4>
      </div>
    </Link>
  );
};
