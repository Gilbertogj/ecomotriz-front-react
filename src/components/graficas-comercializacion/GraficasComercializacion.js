import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useContext, useEffect, useState, useMemo, useRef } from "react";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { graphicsToPdf } from "../../utils/graphicsToPdf";
import { FormFiltrosGraficas } from "../form-filtros-graficas/FormFiltrosGraficas";
import { GraficasPdfDocument } from "../graficas-pdf-document/GraficasPdfDocument";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { MyPieChart } from "../my-piechart/MyPieChart";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export const GraficasComercializacion = ({ setDisableTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [imageSrc, setImageSrc] = useState([]);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const descargarBtnRef = useRef(null);
  const spinnerBtnRef = useRef(null);

  const isDesktop = useIsDesktop();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setDisableTab(true);
        let data = await fetch(
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/client/",
          {
            headers: {
              Authorization: `Token ${authtoken}`,
            },
          }
        );

        let json = await data.json();

        let newToken = null;

        if (json.expired) {
          newToken = json.token;
          dispatch(setCurrentUser({ token: newToken }));

          data = await fetch(
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/client/",
            {
              headers: {
                Authorization: `Token ${newToken}`,
              },
            }
          );

          json = await data.json();
        }

        setData(json);
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setDisableTab(false);
        setIsLoading(false);
      }
    })();
  }, []);

  const cantidadClientesFGdata = useMemo(() => {
    if (!data) return null;

    const arr = [
      {
        name: "Clientes F",
        value: data.values.clientes_colado_f.cantidad_clientes,
      },
      {
        name: "Clientes G",
        value: data.values.clientes_colado_g.cantidad_clientes,
      },
    ];

    return arr;
  }, [data]);

  const clientesConPedidosFGdata = useMemo(() => {
    if (!data) return null;

    const arr = [
      {
        name: "Clientes F",
        value: data.values.clientes_colado_f.clientes_con_pedidos,
      },
      {
        name: "Clientes G",
        value: data.values.clientes_colado_g.clientes_con_pedidos,
      },
    ];

    return arr;
  }, [data]);

  const m3FGdata = useMemo(() => {
    if (!data) return null;

    const arr = [
      {
        name: "Clientes F",
        value: data.values.clientes_colado_f.m3,
      },
      {
        name: "Clientes G",
        value: data.values.clientes_colado_g.m3,
      },
    ];

    return arr;
  }, [data]);

  const cantidadClientesCreditoContadodata = useMemo(() => {
    if (!data) return null;

    const arr = [
      {
        name: "Clientes Contado",
        value: data.values.clientes_colado_contado.cantidad_clientes,
      },
      {
        name: "Clientes Crédito",
        value: data.values.clientes_colado_creito.cantidad_clientes,
      },
    ];

    return arr;
  }, [data]);

  const clientesConPedidosCreditoContadodata = useMemo(() => {
    if (!data) return null;

    const arr = [
      {
        name: "Clientes Contado",
        value: data.values.clientes_colado_contado.clientes_con_pedidos,
      },
      {
        name: "Clientes Crédito",
        value: data.values.clientes_colado_creito.clientes_con_pedidos,
      },
    ];

    return arr;
  }, [data]);

  const m3CreditoContadodata = useMemo(() => {
    if (!data) return null;

    const arr = [
      {
        name: "Clientes Contado",
        value: data.values.clientes_colado_contado.m3,
      },
      {
        name: "Clientes Crédito",
        value: data.values.clientes_colado_creito.m3,
      },
    ];

    return arr;
  }, [data]);

  return (
    <>
      {isLoading &&
      !cantidadClientesFGdata &&
      !clientesConPedidosFGdata &&
      !m3FGdata &&
      !cantidadClientesCreditoContadodata &&
      !clientesConPedidosCreditoContadodata &&
      !m3CreditoContadodata ? (
        <LoadingSpinner />
      ) : (
        <>
          {isDesktop && (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  setDisableTab(true);
                  await graphicsToPdf(
                    descargarBtnRef,
                    spinnerBtnRef,
                    setImageSrc
                  );
                  setDisableTab(false);
                }}
                ref={descargarBtnRef}
              >
                Descargar PDF
              </button>
              <button
                className="btn btn-primary d-none"
                type="button"
                disabled
                ref={spinnerBtnRef}
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                No cambies de página
              </button>
            </div>
          )}

          <div className="to-image">
            <MyPieChart
              title="Cantidad de clientes"
              data={cantidadClientesFGdata}
              dataKeyString="value"
              nameKeyString="name"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyPieChart
              title="Cantidad de clientes"
              data={cantidadClientesCreditoContadodata}
              dataKeyString="value"
              nameKeyString="name"
            />
          </div>
          <hr />
          <div className="to-image">
            <FormFiltrosGraficas
              onlyCalendar
              setData={setData}
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/client/" }
              setDisableTab={setDisableTab}
              urlParam="id"
            />
            <MyPieChart
              title="Clientes con pedidos"
              data={clientesConPedidosFGdata}
              dataKeyString="value"
              nameKeyString="name"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyPieChart
              title="Metros cúbicos"
              data={m3FGdata}
              dataKeyString="value"
              nameKeyString="name"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyPieChart
              title="Clientes con pedidos"
              data={clientesConPedidosCreditoContadodata}
              dataKeyString="value"
              nameKeyString="name"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyPieChart
              title="Metros cúbicos"
              data={m3CreditoContadodata}
              dataKeyString="value"
              nameKeyString="name"
            />
          </div>
          <div className="invisible">
            <PDFDownloadLink
              document={
                <GraficasPdfDocument
                  title="Comercialización"
                  stateArr={imageSrc}
                />
              }
              fileName="Reporte Comercialización.pdf"
            >
              <button className="download-btn">Descargar PDF</button>
            </PDFDownloadLink>
          </div>
        </>
      )}
    </>
  );
};
