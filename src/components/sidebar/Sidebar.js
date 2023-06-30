import React from "react";

import { Link } from "react-router-dom";

import { ReactComponent as LogoBlanco } from "../../assets/svg/logoEcoBlanco.svg";

import "./Sidebar.styles.scss";

export const Sidebar = ({ navigationLinks }) => {
  const handleClick = (e) => {
    const seccionActiva = document.querySelector(".seccion-activa");

    if (seccionActiva) {
      seccionActiva.classList.remove("seccion-activa");
    }
    e.target.classList.add("seccion-activa");
  };

  return (
    <div className="sidebar-container">
      <Link to="/concreco/home">
        <div className="menu-logo-container">
          <LogoBlanco className="logo" />
        </div>
      </Link>

      <ul>
        {navigationLinks.map((navigationLink) => (
          <div key={navigationLink.id} onClick={handleClick}>
            <li>
              <div className="w-100 h-100 d-flex align-items-center">
                <Link to={`${navigationLink.link}`} style={{ display: "flex" }}>
                  {navigationLink.text}
                </Link>
              </div>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
};
