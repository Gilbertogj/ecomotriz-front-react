import React from "react";

import { LogOutButton } from "../log-out-btn/LogOutButton";

import { useLocation } from "react-router-dom";

import "./Header.styles.scss";

export const Header = ({ title }) => {
  const { pathname } = useLocation();

  return (
    <div className="header-container">
      <div style={{ color: "#212C56", width: "40px", height: "40px" }}>.</div>

      {pathname !== "/concreco/home" &&
        pathname !== "/concreco/unidades" &&
        pathname !== "/concreco/comercializacion" &&
        pathname !== "/concreco/users" &&
        pathname !== "/concreco/produccion" &&
        pathname !== "/concreco/dashboard" &&
        pathname !== "/concreco/facturacion" && (
          <div className="d-flex align-items-center">
            <h2 style={{ margin: "0", color: "white" }}>{title}</h2>
          </div>
        )}

      <LogOutButton />
    </div>
  );
};
