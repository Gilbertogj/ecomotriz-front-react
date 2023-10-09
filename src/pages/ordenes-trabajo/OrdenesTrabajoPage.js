import React, { useContext } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import { useIsDesktop } from "../../hooks/useIsDesktop";
import { ordenesTrabajoLinks } from "../../utils/navigationLinks";

import { ListaOrdenesTrabajoPage } from "../lista-ordenes-trabajo/ListaOrdenesTrabajoPage";
import { DetallesOrdenTrabajoPage } from "../detalles-orden-trabajo/DetallesOrdenTrabajoPage.js";
import { ListaUnidadesPage } from "../lista-unidades/ListaUnidadesPage";
import { UnidadOrdenPage } from "../unidad-orden/UnidadOrdenPage";

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


import "./OrdenesTrabajoPage.styles.scss";
import { AgregarPedidoCotizationPage } from "../agregar-pedido/AgregarPedidoCotizationPage";

export const OrdenesTrabajoPage = () => {
  const { userRol } = useContext(ReactReduxContext);
  const { path } = useRouteMatch();
  const isDesktop = useIsDesktop();

  return (
    <Layout sectionTitle="Órdenes de Trabajo" navLinksArr={ordenesTrabajoLinks[userRol]}>
      <Switch>
        <Route exact path={`${path}`}>
          {isDesktop ? (
            <MainSectionCover text="Órdenes de Trabajo" />
          ) : (
            <div className="mobile-main-content">
              <div>
                {ordenesTrabajoLinks[userRol] &&
                  ordenesTrabajoLinks[userRol].map((userLink) => (
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
            <ListaOrdenesTrabajoPage />
            {/* <p>Tabla Ordenes de Trabajo</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/orden/:id`}>
          <div className="p-3">
            <DetallesOrdenTrabajoPage />
            {/* <p>hola</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/unidades-orden`}>
          <div className="p-3">
            <ListaUnidadesPage />
            {/* <p>pagina para agreagr orden</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/unidades-orden/:id`}>
          <div className="p-3">
            <UnidadOrdenPage />
            {/* <p>detalle de la unidad para orden</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/unidades-orden/:id/crear-orden`}>
          <div className="p-3">
            <UnidadOrdenPage />
            {/* <p>pantalla para crear orden</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/orden/:id/crear-solicitud`}>
          <div className="p-3">
            <DetallesOrdenTrabajoPage />
            {/* <p>hola</p> */}
          </div>
        </Route>

        <Route exact path={`${path}/orden/:id/fallas-encontradas`}>
          <div className="p-3">
            <DetallesOrdenTrabajoPage />
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

       

        

      













        
      </Switch>
    </Layout>
  );
};
