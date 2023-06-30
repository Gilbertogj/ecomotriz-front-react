import React, { useContext, useEffect, useRef, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { FormFiltrosGraficas } from "../form-filtros-graficas/FormFiltrosGraficas";
import { GraficasPdfDocument } from "../graficas-pdf-document/GraficasPdfDocument";
import { MyBarChart } from "../my-barchart/MyBarChart";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { useIsDesktop } from "../../hooks/useIsDesktop";

import { graphicsToPdf } from "../../utils/graphicsToPdf";

export const GraficasLogisticaBombas = ({ setDisableTab }) => {
  const [dataOperadores, setDataOperadores] = useState(null);
  const [dataTodosOperadores, setDataTodosOperadores] = useState(null);
  const [dataBombas, setDataBombas] = useState(null);
  const [dataTodasBombas, setDataTodasBombas] = useState(null);
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
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/operadores/",
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
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/operadores/",
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
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/bombas/",
            {
              headers: {
                Authorization: `Token ${newToken ? newToken : authtoken}`,
              },
            }
          );

          let json2 = await data2.json();

          if (json2.expired) {
            dispatch(setCurrentUser({ token: json2.token }));

            data2 = await fetch(
              process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/bombas/",
              {
                headers: {
                  Authorization: `Token ${json2.token}`,
                },
              }
            );

            json2 = await data2.json();
          }

          setDataOperadores(json);
          setDataTodosOperadores(json);
          setDataBombas(json2);
          setDataTodasBombas(json2);
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

  return (
    <>
      {isLoading ? (
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
              options={dataTodosOperadores}
              setData={setDataOperadores}
              optionValue="id"
              optionText1="name"
              optionText2="last_name"
              label="Operadores"
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/operadores/"}
              urlParam="id"
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Operadores (Logística Bombas)"
            />
            <MyBarChart
              title="Servicios de bombeo por operador"
              data={dataOperadores}
              xDataKey="name"
              barDataKey="values.cantidad_reportes"
              xLabel="Operadores"
              yLabel="No. de viajes"
              barName="Viajes por operador"
              keyToSort1="values"
              keyToSort2="cantidad_reportes"
              ollerosOrOperadores
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="M3 por operador"
              data={dataOperadores}
              xDataKey="name"
              barDataKey="values.m3"
              xLabel="Operadores"
              yLabel="M3"
              barName="M3"
              keyToSort1="values"
              keyToSort2="m3"
              ollerosOrOperadores
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Tiempo ciclo bombeo real por operador"
              data={dataOperadores}
              xDataKey="name"
              barDataKey="values.tiempos_bombeo_real"
              xLabel="Operadores"
              yLabel="Minutos"
              barName="Minutos"
              keyToSort1="values"
              keyToSort2="tiempos_bombeo_real"
              ollerosOrOperadores
            />
          </div>
          <hr />
          <div className="to-image">
            <FormFiltrosGraficas
              options={dataTodasBombas}
              setData={setDataBombas}
              optionValue="bomba"
              optionText1="bomba"
              label="Bombas"
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/bombas/"}
              urlParam="numero_bomba"
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Bombas (Logística Bombas)"
            />
            <MyBarChart
              title="Servicios de bombeo por bomba"
              data={dataBombas}
              xDataKey="bomba"
              barDataKey="values.cantidad_pedidos"
              xLabel="Bombas"
              yLabel="No. de viajes"
              barName="Viajes por bomba"
              keyToSort1="values"
              keyToSort2="cantidad_pedidos"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="M3 por bomba"
              data={dataBombas}
              xDataKey="bomba"
              barDataKey="values.m3"
              xLabel="Bombas"
              yLabel="M3"
              barName="M3"
              keyToSort1="values"
              keyToSort2="m3"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Tiempo ciclo bombeo bruto por bomba"
              data={dataBombas}
              xDataKey="bomba"
              barDataKey="values.tiempo_ciclo_bombeo_bruto"
              xLabel="Bombas"
              yLabel="Minutos"
              barName="Minutos"
              keyToSort1="values"
              keyToSort2="tiempo_ciclo_bombeo_bruto"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Tiempo ciclo bombeo real por bomba"
              data={dataBombas}
              xDataKey="bomba"
              barDataKey="values.tiempo_ciclo_bombeo_real"
              xLabel="Bombas"
              yLabel="Minutos"
              barName="Minutos"
              keyToSort1="values"
              keyToSort2="tiempo_ciclo_bombeo_real"
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Tiempo ciclo por m3 bombeado"
              data={dataBombas}
              xDataKey="bomba"
              barDataKey="values.tiempo_m3_bombeo"
              xLabel="Bombas"
              yLabel="Minutos"
              barName="Minutos"
              keyToSort1="values"
              keyToSort2="tiempo_m3_bombeo"
            />
          </div>
          <div className="invisible">
            <PDFDownloadLink
              document={
                <GraficasPdfDocument
                  title="Logística Bombas"
                  stateArr={imageSrc}
                />
              }
              fileName="Reporte Logística Bombas.pdf"
            >
              <button className="download-btn">Descargar PDF</button>
            </PDFDownloadLink>
          </div>
        </>
      )}
    </>
  );
};
