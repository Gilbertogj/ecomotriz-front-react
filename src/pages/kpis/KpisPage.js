import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { GraficasLogisticaOllas } from "../../components/graficas-logistica-ollas/GraficasLogisticaOllas";
import { GraficasLogisticaBombas } from "../../components/graficas-logistica-bombas/GraficasLogisticaBombas";
import { GraficasComercializacion } from "../../components/graficas-comercializacion/GraficasComercializacion";
import { GraficasPuntualidad } from "../../components/graficas-puntulidad/GraficasPuntualidad";
import { GraficasProduccion } from "../../components/graficas-produccion/GraficasProduccion";
import { GraficasPuntualidadComercial } from "../../components/graficas-puntualidad-comercial/GraficasPuntualidadComercial";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export const KpisPage = () => {
  const [disableTab, setDisableTab] = useState(false);

  const isDesktop = useIsDesktop();

  return (
    <>
      <Tabs
        defaultActiveKey="ollas"
        className="mb-3"
        mountOnEnter={true}
        variant={isDesktop ? "tabs" : "pills"}
        unmountOnExit={true}
      >
        <Tab eventKey="ollas" title="Logística Ollas" disabled={disableTab}>
          <GraficasLogisticaOllas setDisableTab={setDisableTab} />
        </Tab>
        <Tab eventKey="bombas" title="Logística Bombas" disabled={disableTab}>
          <GraficasLogisticaBombas setDisableTab={setDisableTab} />
        </Tab>
        <Tab
          eventKey="comercializacion"
          title="Comercialización"
          disabled={disableTab}
        >
          <GraficasComercializacion setDisableTab={setDisableTab} />
        </Tab>
        <Tab
          eventKey="puntualidad_produccion"
          title="Puntualidad Producción"
          disabled={disableTab}
        >
          <GraficasPuntualidad setDisableTab={setDisableTab} />
        </Tab>
        <Tab
          eventKey="puntualidad_comercial"
          title="Puntualidad Comercial"
          disabled={disableTab}
        >
          <GraficasPuntualidadComercial setDisableTab={setDisableTab} />
        </Tab>
        <Tab eventKey="produccion" title="Producción" disabled={disableTab}>
          <GraficasProduccion setDisableTab={setDisableTab} />
        </Tab>
      </Tabs>
    </>
  );
};
