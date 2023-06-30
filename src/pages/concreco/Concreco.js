import React, { useContext } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";

import { LoginPage } from "../login/LoginPage";
import { HomePage } from "../home/HomePage";
import { ComercializacionPage } from "../comercializacion/ComercializacionPage";
import { UsersPage } from "../users/UsersPage";
import { ProduccionPage } from "../produccion/ProduccionPage";
import { AdministracionPage } from "../administracion/AdministracionPage";
//import { LogisticaPage } from "../logistica/LogisticaPage";
import { FacturacionPage } from "../facturacion/FacturacionPage";
import { Helmet } from "react-helmet";

/* import favicon from "../../assets/favicon-32x32.png"; */

export const Concreco = () => {
  const { currentUser, userRol } = useContext(ReactReduxContext);

  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>Concreco</title>
        <link rel="icon" type="image/png" href="favicon-32x32.png" />
        <meta name="description" content="Concreco" />
      </Helmet>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() =>
            currentUser ? <Redirect to={`${path}/home`} /> : <LoginPage />
          }
        />
        <Route
          exact
          path={`${path}/home`}
          render={() =>
            currentUser ? <HomePage /> : <Redirect to={`${path}`} />
          }
        />
        {/* <Route
          path={`${path}/logistica`}
          render={() =>
            currentUser ? (
              userRol === "Administracion" ||
              userRol === "Ventas" ||
              userRol === "Produccion" ? (
                <LogisticaPage />
              ) : (
                <Redirect to="/concreco/home" />
              )
            ) : (
              <Redirect to="/concreco" />
            )
          }
        /> */}
        <Route
          path={`${path}/comercializacion`}
          render={() =>
            currentUser ? (
              userRol === "Administracion" ||
              userRol === "Ventas" ||
              userRol === "Produccion" ? (
                <ComercializacionPage />
              ) : (
                <Redirect to="/concreco/home" />
              )
            ) : (
              <Redirect to="/concreco" />
            )
          }
        />
        <Route
          path={`${path}/users`}
          render={() =>
            currentUser ? (
              userRol === "Administracion" || userRol === "Produccion" ? (
                <UsersPage />
              ) : (
                <Redirect to="/concreco/home" />
              )
            ) : (
              <Redirect to="/concreco" />
            )
          }
        />
        <Route
          path={`${path}/produccion`}
          render={() =>
            currentUser ? (
              userRol === "Administracion" ||
              userRol === "Produccion" ||
              userRol === "Dosificador" ||
              userRol === "Ollero" ||
              userRol === "Operador" ? (
                <ProduccionPage />
              ) : (
                <Redirect to="/concreco/home" />
              )
            ) : (
              <Redirect to="/concreco" />
            )
          }
        />
        <Route
          path={`${path}/dashboard`}
          render={() =>
            currentUser ? (
              userRol === "Administracion" ? (
                <AdministracionPage />
              ) : (
                <Redirect to="/concreco/home" />
              )
            ) : (
              <Redirect to="/concreco" />
            )
          }
        />
        <Route
          path={`${path}/facturacion`}
          render={() =>
            currentUser ? (
              userRol === "Administracion" ? (
                <FacturacionPage />
              ) : (
                <Redirect to="/concreco/home" />
              )
            ) : (
              <Redirect to="/concreco" />
            )
          }
        />
        <Route
          path={`${path}/*`}
          render={() =>
            currentUser ? (
              <Redirect to="/concreco/home" />
            ) : (
              <Redirect to="/concreco" />
            )
          }
        />
      </Switch>
    </>
  );
};
