import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { graphicsToPdf } from "../../utils/graphicsToPdf";
import { FormFiltrosGraficas } from "../form-filtros-graficas/FormFiltrosGraficas";
import { GraficasPdfDocument } from "../graficas-pdf-document/GraficasPdfDocument";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { MyBarChart } from "../my-barchart/MyBarChart";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export const GraficasPuntualidadComercial = ({ setDisableTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientData, setClientData] = useState(null);
  const [clientesTodoData, setClientesTodoData] = useState([]);
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
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/client/",
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
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/client/",
            {
              headers: {
                Authorization: `Token ${newToken}`,
              },
            }
          );

          json = await data.json();
        }

        setClientData(json);
        setClientesTodoData(json);

        /*  if (data.status === 200) {
             let data2 = await fetch(
               process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/plant/",
               {
                 headers: {
                   Authorization: `Token ${newToken ? newToken : authtoken}`,
                 },
               }
             );

             let json2 = await data2.json();

             if (json2.expired) {
               newToken = json.token;
               dispatch(setCurrentUser({ token: newToken }));

               data2 = await fetch(
                 process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/plant/",
                 {
                   headers: {
                     Authorization: `Token ${newToken}`,
                   },
                 }
               );

               json2 = await data2.json();
             }

             if (data2.status === 200) {
               let data3 = await fetch(
                 process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/ollero/",
                 {
                   headers: {
                     Authorization: `Token ${newToken ? newToken : authtoken}`,
                   },
                 }
               );

               let json3 = await data3.json();

               if (json3.expired) {
                 dispatch(setCurrentUser({ token: json3.token }));

                 data3 = await fetch(
                   process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/ollero/",
                   {
                     headers: {
                       Authorization: `Token ${json3.token}`,
                     },
                   }
                 );

                 json3 = await data3.json();
               }

               setPunctualityData(json);
               setPlantData(json2);
               setOllerosData(json3);
             } */
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setIsLoading(false);
        setDisableTab(false);
      }
    })();
  }, []);

  const puntualesImpuntualesClientData = useMemo(() => {
    if (!clientData) return null;

    const arr = [];

    clientData.forEach((cliente) => {
      const obj = {
        name: cliente.nombre,
        impuntuales: cliente.values.impuntuales,
        puntuales: cliente.values.puntuales,
        retraso_promedio: cliente.values.retraso_promedio,
      };

      arr.push(obj);
    });

    return arr;
  }, [clientData]);

  return (
    <>
      {isLoading && !puntualesImpuntualesClientData ? (
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
            <FormFiltrosGraficas
              options={clientesTodoData}
              setData={setClientData}
              optionValue="id"
              optionText1="nombre"
              label="Clientes"
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/client/"}
              urlParam="id"
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Clientes (Puntualidad Comercial)"
            />
            <MyBarChart
              title="Puntualidad de cliente"
              data={puntualesImpuntualesClientData || []}
              xDataKey="name"
              barDataKey="impuntuales"
              barDataKey2="puntuales"
              xLabel="Clientes"
              yLabel="Pedidos"
              barName="Impuntuales"
              barName2="Puntuales"
              legend
              tickMargin={200}
              height={700}
              marginBottom={450}
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Retraso promedio de clientes"
              data={puntualesImpuntualesClientData || []}
              xDataKey="name"
              barDataKey="retraso_promedio"
              xLabel="Clientes"
              yLabel="Minutos"
              barName="Minutos"
              tickMargin={200}
              height={700}
              marginBottom={450}
            />
          </div>
          <div className="invisible">
            <PDFDownloadLink
              document={
                <GraficasPdfDocument
                  title="Puntualidad Comercial"
                  stateArr={imageSrc}
                />
              }
              fileName="Reporte Puntualidad Comercial.pdf"
            >
              <button className="download-btn">Descargar PDF</button>
            </PDFDownloadLink>
          </div>
        </>
      )}
    </>
  );
};
