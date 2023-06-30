import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { graphicsToPdf } from "../../utils/graphicsToPdf";
import { FormFiltrosGraficas } from "../form-filtros-graficas/FormFiltrosGraficas";
import { GraficasPdfDocument } from "../graficas-pdf-document/GraficasPdfDocument";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { MyBarChart } from "../my-barchart/MyBarChart";
import { MyPieChart } from "../my-piechart/MyPieChart";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export const GraficasPuntualidad = ({ setDisableTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [punctualityData, setPunctualityData] = useState(null);
  const [plantData, setPlantData] = useState(null);
  const [ollerosData, setOllerosData] = useState(null);
  const [dataTodoOlleros, setDataTodoOlleros] = useState(null);
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
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/punctuality/",
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
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/punctuality/",
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
            setDataTodoOlleros(json3);
          }
        }
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setIsLoading(false);
        setDisableTab(false);
      }
    })();
  }, []);

  const puntualesImpuntualesData = useMemo(() => {
    if (!punctualityData) return null;

    const arr = [
      {
        name: "Impuntuales",
        value: punctualityData.impuntuales,
      },
      {
        name: "Puntuales",
        value: punctualityData.puntuales,
      },
    ];

    return arr;
  }, [punctualityData]);

  const puntualesImpuntualesPlantaData = useMemo(() => {
    if (!plantData) return null;

    const arr = [];

    plantData.forEach((planta) => {
      const obj = {
        name: planta.nombre,
        impuntuales: planta.values.impuntuales,
        puntuales: planta.values.puntuales,
        retraso_promedio: planta.values.retraso_promedio,
      };

      arr.push(obj);
    });

    return arr;
  }, [plantData]);

  const puntualesImpuntualesOllerosData = useMemo(() => {
    if (!ollerosData) return null;

    const arr = [];

    ollerosData.forEach((ollero) => {
      const obj = {
        name: ollero.name,
        last_name: ollero.last_name,
        impuntuales: ollero.values.impuntuales,
        puntuales: ollero.values.puntuales,
        retraso_promedio: ollero.values.retraso_promedio,
      };

      arr.push(obj);
    });

    return arr;
  }, [ollerosData]);

  return (
    <>
      {isLoading &&
      !puntualesImpuntualesData &&
      !puntualesImpuntualesPlantaData &&
      !puntualesImpuntualesOllerosData ? (
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
              onlyCalendar
              setData={setPunctualityData}
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/punctuality/"}
              setDisableTab={setDisableTab}
            />
            <MyPieChart
              title="Puntualidad"
              data={puntualesImpuntualesData}
              dataKeyString="value"
              nameKeyString="name"
            />

            <h5 className="text-center">
              Impuntualidad media: {punctualityData.impuntualidad_media}
            </h5>
          </div>
          <hr />
          <div className="to-image">
            <FormFiltrosGraficas
              onlyCalendar
              setData={setPlantData}
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/plant/"}
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Plantas (Puntualidad Producción)"
            />
            <MyBarChart
              title="Puntualidad en plantas"
              data={puntualesImpuntualesPlantaData || []}
              xDataKey="name"
              barDataKey="impuntuales"
              barDataKey2="puntuales"
              xLabel="Plantas"
              yLabel="Pedidos"
              barName="Impuntuales"
              barName2="Puntuales"
              legend
              tickMargin={100}
              height={400}
              marginBottom={170}
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Tiempo promedio de impuntualidades por planta"
              data={puntualesImpuntualesPlantaData || []}
              xDataKey="name"
              barDataKey="retraso_promedio"
              xLabel="Plantas"
              yLabel="Minutos"
              barName="Impuntuales"
              tickMargin={100}
              height={400}
              marginBottom={170}
            />
          </div>
          <hr />
          <div className="to-image">
            <FormFiltrosGraficas
              options={dataTodoOlleros}
              setData={setOllerosData}
              optionValue="id"
              optionText1="name"
              optionText2="last_name"
              label="Olleros"
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/punctuality/ollero/"}
              urlParam="id"
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Olleros (Puntualidad Producción)"
            />
            <MyBarChart
              title="Puntualidad olleros"
              data={puntualesImpuntualesOllerosData || []}
              xDataKey="name"
              barDataKey="impuntuales"
              barDataKey2="puntuales"
              xLabel="Olleros"
              yLabel="Pedidos"
              barName="Impuntuales"
              barName2="Puntuales"
              legend
              ollerosOrOperadores
            />
          </div>
          <hr />
          <div className="to-image">
            <MyBarChart
              title="Tiempo promedio de impuntualidades por ollero"
              data={puntualesImpuntualesOllerosData || []}
              xDataKey="name"
              barDataKey="retraso_promedio"
              xLabel="Olleros"
              yLabel="Minutos"
              barName="Minutos"
              ollerosOrOperadores
            />
          </div>
          <div className="invisible">
            <PDFDownloadLink
              document={
                <GraficasPdfDocument
                  title="Puntualidad Producción"
                  stateArr={imageSrc}
                />
              }
              fileName="Reporte Puntualidad Producción.pdf"
            >
              <button className="download-btn">Descargar PDF</button>
            </PDFDownloadLink>
          </div>
        </>
      )}
    </>
  );
};
