import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import { usuariosLinks } from "../../utils/navigationLinks";
import { useIsDesktop } from "../../hooks/useIsDesktop";

import { ListaUsuariosPage } from "../lista-usuarios/ListaUsuariosPage";
import { UsuarioPage } from "../usuario/UsuarioPage";
import { AgregarUsuarioPage } from "../agregar-usuario/AgregarUsuarioPage";

import { MobileMenuButtons } from "../../components/mobile-menu-buttons/MobileMenuButtons";
import { MainSectionCover } from "../../components/main-section-cover/MainSectionCover";
import { Layout } from "../../components/layout/Layout";

export const UsersPage = () => {
  const { path } = useRouteMatch();

  const isDesktop = useIsDesktop();

  return (
    <Layout sectionTitle="Usuarios" navLinksArr={usuariosLinks}>
      <Switch>
        <Route exact path={`${path}`}>
          {isDesktop ? (
            <MainSectionCover text="Usuarios" />
          ) : (
            <div className="mobile-main-content">
              <div>
                {usuariosLinks.map((userLink) => (
                  <MobileMenuButtons key={userLink.id} userLinkObj={userLink} />
                ))}
              </div>
            </div>
          )}
        </Route>
        <Route exact path={`${path}/usuarios`}>
          <div className="p-3">
            <ListaUsuariosPage />
          </div>
        </Route>
        <Route exact path={`${path}/usuario/:id`}>
          <div className="p-3">
            <UsuarioPage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-usuario`}>
          <div className="p-3">
            <AgregarUsuarioPage />
          </div>
        </Route>
        <Route path={`${path}/*`}>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Layout>
  );
};
