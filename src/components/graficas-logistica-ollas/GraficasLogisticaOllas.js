import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { FormFiltrosGraficas } from "../form-filtros-graficas/FormFiltrosGraficas";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { MyBarChart } from "../my-barchart/MyBarChart";
import { MyPieChart } from "../my-piechart/MyPieChart";
import { GraficasPdfDocument } from "../graficas-pdf-document/GraficasPdfDocument";
import { useIsDesktop } from "../../hooks/useIsDesktop";

import { graphicsToPdf } from "../../utils/graphicsToPdf";

export const GraficasLogisticaOllas = ({ setDisableTab }) => {
  const [dataOlleros, setDataOlleros] = useState(null);
  const [dataTodosOlleros, setDataTodosOlleros] = useState(null);
  const [dataAllOllas, setDataAllOllas] = useState(null);
  const [dataOllas, setDataOllas] = useState(null);
  const [dataFletes, setDataFletes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/olleros_viajes/",
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
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/olleros_viajes/",
            {
              headers: {
                Authorization: `Token ${newToken}`,
              },
            }
          );

          json = await data.json();
        }

        if (data.status === 200) {
          let data2 = await fetch(
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/ollas/",
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
              process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/ollas/",
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
              process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/fletes/",
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
                process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/fletes/",
                {
                  headers: {
                    Authorization: `Token ${json3.token}`,
                  },
                }
              );

              json3 = await data3.json();
            }

            setDataOlleros(json);
            setDataTodosOlleros(json);
            setDataOllas(json2);
            setDataAllOllas(json2);
            setDataFletes(json3);
          }
        }
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setDisableTab(false);
        setIsLoading(false);
      }
    })();
  }, []);

  const fletesVacioData = useMemo(() => {
    if (!dataFletes) return null;

    const arr = [
      {
        name: "Fletes no vacío",
        value: dataFletes.fletes_no_vacio,
      },
      {
        name: "Fletes vacío",
        value: dataFletes.fletes_vacio,
      },
    ];

    return arr;
  }, [dataFletes]);

  return (
    <>
      {isLoading && !fletesVacioData ? (
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
              options={dataTodosOlleros}
              setData={setDataOlleros}
              optionValue="id"
              optionText1="name"
              optionText2="last_name"
              label="Olleros"
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/olleros_viajes/"}
              urlParam="id"
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Olleros (Logística Ollas)"
            />
            <MyBarChart
              title="Viajes por ollero"
              data={dataOlleros}
              xDataKey="name"
              barDataKey="values.cantidad_registros"
              xLabel="Olleros"
              yLabel="No. de viajes"
              barName="Viajes por ollero"
              keyToSort1="values"
              keyToSort2="cantidad_registros"
              ollerosOrOperadores
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="M3 por ollero"
              data={dataOlleros}
              xDataKey="name"
              barDataKey="values.m3"
              xLabel="Olleros"
              yLabel="M3 "
              barName="M3"
              keyToSort1="values"
              keyToSort2="m3"
              ollerosOrOperadores
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Tiempo ciclo ollero"
              data={dataOlleros}
              xDataKey="name"
              barDataKey="values.tiempo_promedio"
              xLabel="Olleros"
              yLabel="M3 "
              barName="M3"
              keyToSort1="values"
              keyToSort2="tiempo_promedio"
              ollerosOrOperadores
            />
          </div>
          <hr />
          <div className="to-image">
            <FormFiltrosGraficas
              options={dataAllOllas}
              setData={setDataOllas}
              optionValue="olla"
              optionText1="olla"
              label="Ollas"
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/ollas/"}
              urlParam="numero_olla"
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Ollas (Logística Ollas)"
            />

            <MyBarChart
              title="Viajes por olla"
              data={dataOllas}
              xDataKey="olla"
              barDataKey="values.cantidad_registros"
              xLabel="Ollas"
              yLabel="No. de viajes"
              barName="Viajes por olla"
              keyToSort1="values"
              keyToSort2="cantidad_registros"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="M3 por olla"
              data={dataOllas}
              xDataKey="olla"
              barDataKey="values.m3"
              xLabel="Ollas"
              yLabel="M3"
              barName="M3"
              keyToSort1="values"
              keyToSort2="m3"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Minutos por olla"
              data={dataOllas}
              xDataKey="olla"
              barDataKey="values.tiempo_promedio"
              xLabel="Ollas"
              yLabel="Minutos"
              barName="Minutos"
              keyToSort1="values"
              keyToSort2="tiempo_promedio"
            />
          </div>
          <hr />
          <div className="to-image">
            <FormFiltrosGraficas
              onlyCalendar
              setData={setDataFletes}
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/fletes/?"}
              setDisableTab={setDisableTab}
            />

            <MyPieChart
              title="Fletes de vacío"
              data={fletesVacioData}
              dataKeyString="value"
              nameKeyString="name"
            />
          </div>

          <div className="invisible">
            <PDFDownloadLink
              document={
                <GraficasPdfDocument
                  title="Logística Ollas"
                  stateArr={imageSrc}
                />
              }
              fileName="Reporte Logística Ollas.pdf"
            >
              <button className="download-btn">Descargar PDF</button>
            </PDFDownloadLink>
          </div>
        </>
      )}
    </>
  );
};
