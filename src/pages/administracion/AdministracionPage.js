import React, { useContext } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { administracionUserTypeLinks } from "../../utils/navigationLinks";

import { ListaPedidosPage } from "../lista-pedidos/ListaPedidosPage";
import { PedidoAdministracionPage } from "../pedido-administracion/PedidoAdministracionPage";
import { KpisPage } from "../kpis/KpisPage";

import { MainSectionCover } from "../../components/main-section-cover/MainSectionCover";
import { MobileMenuButtons } from "../../components/mobile-menu-buttons/MobileMenuButtons";
import { Layout } from "../../components/layout/Layout";

export const AdministracionPage = () => {
  const { path } = useRouteMatch();

  const isDesktop = useIsDesktop();

  const { userRol } = useContext(ReactReduxContext);

  return (
    <Layout
      sectionTitle="Dashboard"
      navLinksArr={administracionUserTypeLinks[userRol] || []}
    >
      <Switch>
        <Route exact path={`${path}`}>
          {isDesktop ? (
            <MainSectionCover text="Dashboard" />
          ) : (
            <div className="mobile-main-content">
              <div>
                {administracionUserTypeLinks[userRol] &&
                  administracionUserTypeLinks[userRol].map((userLink) => (
                    <MobileMenuButtons
                      key={userLink.id}
                      userLinkObj={userLink}
                    />
                  ))}
              </div>
            </div>
          )}
        </Route>
        <Route exact path={`${path}/pedidos`}>
          <div className="p-3">
            <ListaPedidosPage />
          </div>
        </Route>
        <Route exact path={`${path}/pedido/:id`}>
          <div className="p-3">
            <PedidoAdministracionPage />
          </div>
        </Route>
        <Route exact path={`${path}/kpis`}>
          <div className="p-3">
            <KpisPage />
          </div>
        </Route>
        <Route path={`${path}/*`}>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Layout>
  );
};
