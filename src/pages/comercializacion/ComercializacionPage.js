import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import { comercializacionLinks } from "../../utils/navigationLinks";
import { useIsDesktop } from "../../hooks/useIsDesktop";

import { AgregarClientePage } from "../agregar-cliente/AgregarClientePage";
import { AgregarObraPage } from "../agregar-obra/AgregarObraPage";
import { ClientePage } from "../cliente/ClientePage";
import { EditarClientePage } from "../edita-cliente/EditarClientePage";
import { EditarObraPage } from "../editar-obra/EditarObraPage";
import { ListaCotizacionesPage } from "../lista-cotizationes/ListaCotizacionesPage";
import { ProductosPage } from "../lista-productos/ListaProductosPage";
import { ListaClientes } from "../listaclientes/ListaClientes";
import { ObraPage } from "../obra/ObraPage";
import { ProductoPage } from "../producto/ProductoPage";
import { ProyeccionPage } from "../proyeccion/ProyeccionPage";
import { ProyeccionesPage } from "../proyecciones/ProyeccionesPage";
import { MapaPage } from "../mapa/MapaPage";
import { ObraPedidoPage } from "../obra-pedido/ObraPedidoPage";
import { AgregarPedidoPage } from "../agregar-pedido/AgregarPedidoPage";
import { DetallesCotizacionPage } from "../detalles-cotizacion/DetallesCotizacionPage";
import { AgregarProyeccionPage } from "../agregar-proyeccion/AgregarProyeccionPage";

import { FormAgregarProducto } from "../../components/form-agregar-producto/FormAgregarProducto";
import { TablaObras } from "../../components/tabla-obras/TablaObras";
import { MainSectionCover } from "../../components/main-section-cover/MainSectionCover";
import { MobileMenuButtons } from "../../components/mobile-menu-buttons/MobileMenuButtons";
import { Layout } from "../../components/layout/Layout";

import "./ComercializacionPage.styles.scss";

export const ComercializacionPage = () => {
  const { path } = useRouteMatch();

  const isDesktop = useIsDesktop();

  return (
    <Layout sectionTitle="Comercialización" navLinksArr={comercializacionLinks}>
      <Switch>
        <Route exact path={`${path}`}>
          {isDesktop ? (
            <MainSectionCover text="Comercialización" />
          ) : (
            <div className="mobile-main-content">
              <div>
                {comercializacionLinks.map((userLink) => (
                  <MobileMenuButtons key={userLink.id} userLinkObj={userLink} />
                ))}
              </div>
            </div>
          )}
        </Route>
        <Route exact path={`${path}/clientes`}>
          <div className="p-3">
            <ListaClientes />
          </div>
        </Route>
        <Route exact path={`${path}/cliente/:id`}>
          <div className="p-3">
            <ClientePage />
          </div>
        </Route>
        <Route exact path={`${path}/cliente/:id/obras`}>
          <div className="p-3">
            <TablaObras />
          </div>
        </Route>
        <Route exact path={`${path}/obra/:id`}>
          <div className="p-3">
            <ObraPage />
          </div>
        </Route>
        <Route exact path={`${path}/editar-obra/:obraId`}>
          <div className="p-3">
            <EditarObraPage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-obra/:id`}>
          <div className="p-3">
            <AgregarObraPage />
          </div>
        </Route>
        <Route exact path={`${path}/editar-cliente/:id`}>
          <div className="p-3">
            <EditarClientePage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-cliente`}>
          <div className="p-3">
            <AgregarClientePage />
          </div>
        </Route>
        <Route exact path={`${path}/productos`}>
          <div className="p-3">
            <ProductosPage />
          </div>
        </Route>
        <Route exact path={`${path}/producto/:id`}>
          <div className="p-3">
            <ProductoPage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-producto`}>
          <div className="p-3">
            <FormAgregarProducto />
          </div>
        </Route>
        <Route exact path={`${path}/cotizaciones`}>
          <div className="p-3">
            <ListaCotizacionesPage />
          </div>
        </Route>
        <Route exact path={`${path}/proyecciones`}>
          <div className="p-3">
            <ProyeccionesPage />
          </div>
        </Route>
        <Route exact path={`${path}/proyeccion/:id`}>
          <div className="p-3">
            <ProyeccionPage />
          </div>
        </Route>
        <Route exact path={`${path}/clientes-cotizacion`}>
          <div className="p-3">
            <ListaClientes />
          </div>
        </Route>
        <Route exact path={`${path}/cliente/:id/realizar-cotizacion`}>
          <div className="p-3">
            <ClientePage />
          </div>
        </Route>
        <Route exact path={`${path}/cliente/:id/obras/realizar-cotizacion`}>
          <div className="p-3">
            <TablaObras />
          </div>
        </Route>
        <Route exact path={`${path}/obra/:id/realizar-cotizacion`}>
          <div className="p-3">
            <ObraPedidoPage />
          </div>
        </Route>
        <Route
          exact
          path={`${path}/agregar-cotizacion/cliente/:clienteId/obra/:obraId`}
        >
          <div className="p-3">
            <AgregarPedidoPage />
          </div>
        </Route>
        <Route exact path={`${path}/cotizacion/:id`}>
          <div className="p-3">
            <DetallesCotizacionPage />
          </div>
        </Route>
        <Route exact path={`${path}/mapa`}>
          <div className="p-3">
            <MapaPage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-proyeccion`}>
          <div className="p-3">
            <AgregarProyeccionPage />
          </div>
        </Route>
        <Route exact path={`${path}/editar-proyeccion/:id`}>
          <div className="p-3">
            <AgregarProyeccionPage />
          </div>
        </Route>
        <Route path={`${path}/*`}>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Layout>
  );
};
