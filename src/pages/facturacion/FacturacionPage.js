import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import { facturacionLinks } from "../../utils/navigationLinks";
import { useIsDesktop } from "../../hooks/useIsDesktop";

import { ListaPedidosPage } from "../ventas/VentasPage";
import { ListaUsuariosPage } from "../lista-usuarios/ListaUsuariosPage";


import { MobileMenuButtons } from "../../components/mobile-menu-buttons/MobileMenuButtons";
import { MainSectionCover } from "../../components/main-section-cover/MainSectionCover";
import { Layout } from "../../components/layout/Layout";

export const FacturacionPage = () => {
  const { path } = useRouteMatch();

  const isDesktop = useIsDesktop();

  return (
    <Layout sectionTitle="Facturación" navLinksArr={facturacionLinks}>
      <Switch>
        <Route exact path={`${path}`}>
          {isDesktop ? (
            <MainSectionCover text="Facturación" />
          ) : (
            <div className="mobile-main-content">
              <div>
                {facturacionLinks.map((userLink) => (
                  <MobileMenuButtons key={userLink.id} userLinkObj={userLink} />
                ))}
              </div>
            </div>
          )}
        </Route>
        <Route exact path={`${path}/ventas`}>
          <div className="p-3">
            <ListaPedidosPage />
          </div>
        </Route>
        
        {/* <Route path={`${path}/*`}>
          <Redirect to="/home" />
        </Route> */}
      </Switch>
    </Layout>
  );
};
