import React, { useContext } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { produccionMenuUserTypeLinks } from "../../utils/navigationLinks";

import { ListaPedidosPage } from "../lista-pedidos/ListaPedidosPage";
import { PedidoPage } from "../pedido/PedidoPage";
import { RegistrosPage } from "../registros/RegistrosPage";
import { ListaRegistrosPage } from "../lista-registros/ListaRegistrosPage";
import { CrearReportePage } from "../crear-reporte/CrearReportePage";
import { CrearReporteOperadorPage } from "../crear-reporte-operador/CrearReporteOperadorPage";
import { PedidosHoyPage } from "../pedidos-hoy/PedidosHoyPage";

import { MainSectionCover } from "../../components/main-section-cover/MainSectionCover";
import { MobileMenuButtons } from "../../components/mobile-menu-buttons/MobileMenuButtons";
import { Layout } from "../../components/layout/Layout";

export const ProduccionPage = () => {
  const { path } = useRouteMatch();

  const isDesktop = useIsDesktop();

  const { userRol } = useContext(ReactReduxContext);

  return (
    <Layout
      sectionTitle="Producción"
      navLinksArr={produccionMenuUserTypeLinks[userRol] || []}
    >
      <Switch>
        <Route exact path={`${path}`}>
          {isDesktop ? (
            <MainSectionCover text="Producción" />
          ) : (
            <div className="mobile-main-content">
              <div>
                {produccionMenuUserTypeLinks[userRol] &&
                  produccionMenuUserTypeLinks[userRol].map((userLink) => (
                    <MobileMenuButtons
                      key={userLink.id}
                      userLinkObj={userLink}
                    />
                  ))}
              </div>
            </div>
          )}
        </Route>
        <Route
          exact
          path={`${path}/pedidos`}
          render={() =>
            userRol === "Dosificador" || userRol === "Administracion" ? (
              <div className="p-3">
                <PedidosHoyPage />
              </div>
            ) : (
              <Redirect to="/home" />
            )
          }
        ></Route>
        <Route exact path={`${path}/pedido/:id`}>
          <div className="p-3">
            <PedidoPage />
          </div>
        </Route>
        <Route exact path={`${path}/registro/:id`}>
          <div className="p-3">
            <RegistrosPage />
          </div>
        </Route>
        <Route
          exact
          path={`${path}/registros`}
          render={() =>
            userRol === "Ollero" || userRol === "Administracion" ? (
              <div className="p-3">
                <ListaRegistrosPage />
              </div>
            ) : (
              <Redirect to="/home" />
            )
          }
        ></Route>
        <Route
          exact
          path={`${path}/crear-reporte/:id`}
          render={() =>
            userRol === "Ollero" ? (
              <CrearReportePage />
            ) : (
              <Redirect to="/home" />
            )
          }
        ></Route>
        <Route
          exact
          path={`${path}/p-bombeados`}
          render={() =>
            userRol === "Produccion" || userRol === "Administracion" ? (
              <div className="p-3">
                <PedidosHoyPage />
              </div>
            ) : (
              <Redirect to="/home" />
            )
          }
        ></Route>
        <Route
          exact
          path={`${path}/operador`}
          render={() =>
            userRol === "Operador" || userRol === "Administracion" ? (
              <div className="p-3">
                <PedidosHoyPage />
              </div>
            ) : (
              <Redirect to="/home" />
            )
          }
        ></Route>
        <Route
          exact
          path={`${path}/crear-reporte-operador/:id`}
          render={() =>
            userRol === "Operador" ? (
              <CrearReporteOperadorPage />
            ) : (
              <Redirect to="/home" />
            )
          }
        ></Route>
        <Route path={`${path}/*`}>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Layout>
  );
};
