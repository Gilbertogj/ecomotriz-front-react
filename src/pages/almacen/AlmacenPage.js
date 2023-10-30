import React, { useContext } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import { useIsDesktop } from "../../hooks/useIsDesktop";
import { almacenLinks } from "../../utils/navigationLinks";


import { ListaSolicitudesRefaccionesPage } from "../lista-solicitudes-refacciones/ListaSolicitudesRefaccionesPage";





import { ListaOrdenesTrabajoPage } from "../lista-ordenes-trabajo/ListaOrdenesTrabajoPage";
import { DetallesOrdenTrabajoPage } from "../detalles-orden-trabajo/DetallesOrdenTrabajoPage.js";
import { ListaUnidadesPage } from "../lista-unidades/ListaUnidadesPage";
import { UnidadOrdenPage } from "../unidad-orden/UnidadOrdenPage";
import { DetallesSolicitudRefaccionesPage } from "../detalles-solicitud-refacciones/DetallesSolicitudRefaccionesPage.js";


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



// import "./OrdenesTrabajoPage.styles.scss";
import { AgregarPedidoCotizationPage } from "../agregar-pedido/AgregarPedidoCotizationPage";

export const AlmacenPage = () => {
  const { userRol } = useContext(ReactReduxContext);
  const { path } = useRouteMatch();
  const isDesktop = useIsDesktop();

  return (
    <Layout sectionTitle="Almacén" navLinksArr={almacenLinks[userRol]}>
      <Switch>
        <Route exact path={`${path}`}>
          {isDesktop ? (
            <MainSectionCover text="Almacén" />
          ) : (
            <div className="mobile-main-content">
              <div>
                {almacenLinks[userRol] &&
                  almacenLinks[userRol].map((userLink) => (
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


        <Route exact path={`${path}/lista-solicitudes-refaccion`}>
          <div className="p-3">
            <ListaSolicitudesRefaccionesPage />
            {/* <p>Tabla lista de solicitudes de refacciones </p> */}
          </div>
        </Route>

      














       







        
      </Switch>
    </Layout>
  );
};
