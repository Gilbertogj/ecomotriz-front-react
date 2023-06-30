import React, { useContext } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import { useIsDesktop } from "../../hooks/useIsDesktop";
import { unidadesLinks } from "../../utils/navigationLinks";

import { ListaUnidadesPage } from "../lista-unidades/ListaUnidadesPage";
import { UnidadPage } from "../unidad/UnidadPage";
import { AgregarUnidadPage } from "../agregar-unidad/AgregarUnidadPage";
import { InformacionFinancieraPage } from "../informacion-financiera/InformacionFinancieraPage.js";
import { AgregarInformacionFinancieraPage } from "../agregar-informacion-financiera/AgregarInformacionFinancieraPage.js";
import { SeguroUnidadPage } from "../seguro-unidad/SeguroUnidadPage.js";
import { AgregarSeguroPage } from "../agregar-seguro/AgregarSeguroPage.js";
import { TransitoUnidadPage } from "../transito-unidad/TransitoUnidadPage.js";
import { AgregarTransitoPage } from "../agregar-transito/AgregarTransitoPage.js";
import { EditarUnidadPage } from "../editar-unidad/EditarUnidadPage.js";
import { TablaInventario } from "../../components/tabla-inventario/TablaInventario";
import { AgregarInventarioPage } from "../agregar-inventario/AgregarInventarioPage.js";
import { TablaFacturas } from "../../components/tabla-facturas/TablaFacturas";
import { AgregarFacturaPage } from "../agregar-factura/AgregarFacturaPage.js";




import { AgregarClientePage } from "../agregar-cliente/AgregarClientePage";
import { AgregarObraPage } from "../agregar-obra/AgregarObraPage";
import { AgregarPedidoPage } from "../agregar-pedido/AgregarPedidoPage";
import { ClientePage } from "../cliente/ClientePage";
import { EditarClientePage } from "../edita-cliente/EditarClientePage";
import { EditarObraPage } from "../editar-obra/EditarObraPage";
import { EditarPedidoPage } from "../editar-pedido/EditarPedidoPage";
import { DuplicarPedidoPage } from "../duplicar-pedido/DuplicarPedidoPage";
import { ListaPedidosPage } from "../lista-pedidos/ListaPedidosPage";
import { ListaClientes } from "../listaclientes/ListaClientes";
import { ObraPedidoPage } from "../obra-pedido/ObraPedidoPage";
import { ObraPage } from "../obra/ObraPage";




import { MainSectionCover } from "../../components/main-section-cover/MainSectionCover";
import { MobileMenuButtons } from "../../components/mobile-menu-buttons/MobileMenuButtons";
import { Layout } from "../../components/layout/Layout";

import { PedidosMañanaPage } from "../pedidos-mañana/PedidosMañanaPage";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { TablaCondicionVenta } from "../../components/tabla-condicion-venta/TablaCondicionVenta";
import { CondicionVentaPage } from "../condicion-venta/CondicionVentaPage";
import { AgregarCondicionVentaPage } from "../agregar-condicion-venta/AgregarCondicionVentaPage";
import { ListaLineasCotizacionesPage } from "../lista-lineas-cotizaciones/ListaLineasCotizacionesPage";
import { ListaCotizacionesPage } from "../lista-cotizationes/ListaCotizacionesPage";
import { Tabk } from "../lista-cotizationes/ListaCotizacionesPage";


import "./EcomotrizPage.styles.scss";
import { AgregarPedidoCotizationPage } from "../agregar-pedido/AgregarPedidoCotizationPage";

export const UnidadesPage = () => {
  const { userRol } = useContext(ReactReduxContext);
  const { path } = useRouteMatch();
  const isDesktop = useIsDesktop();

  return (
    <Layout sectionTitle="Unidades" navLinksArr={unidadesLinks[userRol]}>
      <Switch>
        <Route exact path={`${path}`}>
          {isDesktop ? (
            <MainSectionCover text="Unidades" />
          ) : (
            <div className="mobile-main-content">
              <div>
                {unidadesLinks[userRol] &&
                  unidadesLinks[userRol].map((userLink) => (
                    <MobileMenuButtons
                      key={userLink.id}
                      userLinkObj={userLink}
                    />
                  ))}
              </div>
            </div>
          )}
        </Route>
        
        {/* <Route
          exact
          path={`${path}/lista`}
          render={() =>
            userRol === "Administracion" ||
            userRol === "Ventas" ||
            userRol === "Produccion" ? (
              <div className="p-3">
                <ListaUnidadesPage />
              </div>
            ) : (
              <Redirect to="/home" />
            )
          }
        ></Route> */}
        
        <Route exact path={`${path}/lista`}>
          <div className="p-3">
            <ListaUnidadesPage />
            {/* <p>hola</p> */}
          </div>
        </Route>
        <Route exact path={`${path}/unidad/:id`}>
          <div className="p-3">
            <UnidadPage />
            {/* <p>hola</p> */}
          </div>
        </Route>


        <Route exact path={`${path}/agregar-unidad`}>
          <div className="p-3">
            <AgregarUnidadPage />
            
          </div>
        </Route>

        <Route exact path={`${path}/unidad/:id/informacion-financiera/:idFinanzas`}>
          <div className="p-3">
          <InformacionFinancieraPage/>
            {/* <p>pagina de financiera unidad</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/agregar-informacion-financiera/:id`}>
          <div className="p-3">
          <AgregarInformacionFinancieraPage/>
            {/* <p>pagina de finakkknciera unidad</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/unidad/:id/seguro/:idSeguro`}>
          <div className="p-3">
          <SeguroUnidadPage/>
            {/* <p>pagina de financiera unidad</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/agregar-seguro/:id`}>
          <div className="p-3">
          <AgregarSeguroPage/>
            {/* <p>pagina de finakkknciera unidad</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/unidad/:id/transito/:idTransito`}>
          <div className="p-3">
          <TransitoUnidadPage/>
            {/* <p>pagina de financiera unidad</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/agregar-transito/:id`}>
          <div className="p-3">
          <AgregarTransitoPage/>
            {/* <p>pagina de financiera unidad</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/editar-unidad/:id`}>
          <div className="p-3">
            <EditarUnidadPage/>
          </div>
        </Route>

        <Route exact path={`${path}/unidad/:id/inventario`}>
          <div className="p-3">
            {/* <p>pagina ver inventario</p> */}
            <TablaInventario/>

          </div>
        </Route>

        <Route exact path={`${path}/agregar-inventario/:id`}>
          <div className="p-3">
          <AgregarInventarioPage/>
            {/* <p>pagina de financiera unidad</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/informacion-financiera/:id/facturas`}>
          <div className="p-3">
          <TablaFacturas/>
            {/* <p>pagina de flas facturas</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/agregar-facturas/:id`}>
          <div className="p-3">
          <AgregarFacturaPage/>
            {/* <p>pagina de agregar </p> */}
          </div>
        </Route>

       

        

      













        <Route
          exact
          path={`${path}/pedidos-mañana`}
          render={() =>
            userRol === "Administracion" ? (
              <div className="p-3">
                <PedidosMañanaPage />
              </div>
            ) : (
              <Redirect to="/home" />
            )
          }
        ></Route>
        <Route exact path={`${path}/clientes-pedido`}>
          <div className="p-3">
            <ListaClientes />
          </div>
        </Route>
        <Route exact path={`${path}/cliente/:id`}>
          <div className="p-3">
            <ClientePage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-cliente`}>
          <div className="p-3">
            <AgregarClientePage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-cliente/realizar-pedido`}>
          <div className="p-3">
            <AgregarClientePage />
          </div>
        </Route>
        {/* <Route exact path={`${path}/cliente/:id/obras`}>
          <div className="p-3">
            <TablaObras />
          </div>
        </Route> */}
        <Route exact path={`${path}/cliente/:id/condicion-venta`}>
          <div className="p-3">
            <TablaCondicionVenta />
          </div>
        </Route>
        <Route exact path={`${path}/condicion-venta/:id`}>
          <div className="p-3">
            <CondicionVentaPage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-condicion-venta/:id`}>
          <div className="p-3">
            <AgregarCondicionVentaPage />
          </div>
        </Route>
        <Route exact path={`${path}/cliente/:id/obra/:id/condicion/realizar-pedido`}>
          <div className="p-3">
            <TablaCondicionVenta />
          </div>
        </Route>
        <Route exact path={`${path}/obra/:id`}>
          <div className="p-3">
            <ObraPage />
          </div>
        </Route>
        <Route exact path={`${path}/editar-cliente/:id`}>
          <div className="p-3">
            <EditarClientePage />
          </div>
        </Route>
        <Route exact path={`${path}/editar-cliente/:id/realizar-pedido`}>
          <div className="p-3">
            <EditarClientePage />
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
        
        <Route exact path={`${path}/editar-pedido/:pedidoId`}>
          <div className="p-3">
            <EditarPedidoPage />
          </div>
        </Route>
        <Route exact path={`${path}/duplicar-pedido/:pedidoId`}>
          <div className="p-3">
            <DuplicarPedidoPage />
          </div>
        </Route>
        <Route exact path={`${path}/cliente/:id/realizar-pedido`}>
          <div className="p-3">
            <ClientePage />
          </div>
        </Route>
        {/* <Route exact path={`${path}/cliente/:id/obras/realizar-pedido`}>
          <div className="p-3">
            <TablaObras />
          </div>
        </Route> */}
        <Route exact path={`${path}/obra/:id/realizar-pedido`}>
          <div className="p-3">
            <ObraPedidoPage />
          </div>
        </Route>
        <Route
          exact
          path={`${path}/agregar-pedido/cliente/:clienteId/obra/:obraId`}
        >
          <div className="p-3">
            <AgregarPedidoPage />
          </div>
        </Route>
        <Route exact path={`${path}/agregar-pedido/cotizacion/:cotizacionId/condicion-venta`}>
          <div className="p-3">
            <TablaCondicionVenta />
          </div>
        </Route>
        <Route
          exact
          path={`${path}/agregar-pedido/cotizacion/:cotizacionId/condicion-venta/:condicionVentaId`}
        >
          <div className="p-3">
            <AgregarPedidoCotizationPage />
          </div>
        </Route>
        <Route exact path={`${path}/obra/:id/linea/realizar-pedido`}>
          <div className="p-3">
            <ListaLineasCotizacionesPage />
          </div>
        </Route>
        <Route path={`${path}/*`}>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Layout>
  );
};