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

export const GraficasProduccion = ({ setDisableTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [plantData, setPlantData] = useState(null);
  const [ajusteData, setAjusteData] = useState(null);
  const [elementData, setElementData] = useState(null);
  const [elementTodosdata, setElementTodosdata] = useState(null);
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
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/plant/",
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
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/plant/",
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
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/ajuste/",
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
              process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/ajuste/",
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
              process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/element/",
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
                process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/element/",
                {
                  headers: {
                    Authorization: `Token ${json3.token}`,
                  },
                }
              );

              json3 = await data3.json();
            }

            setPlantData(json);
            setAjusteData(json2);
            setElementData(json3);
            setElementTodosdata(json3);
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

  const m3SuministradosData = useMemo(() => {
    if (!plantData) return null;

    const arr = [];

    plantData.forEach((planta) => {
      const obj = {
        name: planta.nombre,
        value: planta.m3_suministrados,
      };

      arr.push(obj);
    });

    return arr;
  }, [plantData]);

  const ajusteNewData = useMemo(() => {
    if (!ajusteData) return null;

    const arr = [];

    ajusteData.forEach((ajuste) => {
      const obj = {
        name: ajuste.ajuste === "N/A" ? "Sin ajuste" : ajuste.ajuste,
        value: ajuste.cantidad,
      };

      arr.push(obj);
    });

    return arr;
  }, [ajusteData]);

  const elementoAColarData = useMemo(() => {
    if (!elementData) return null;

    const arr = [];

    elementData.forEach((elemento) => {
      const obj = {
        name: elemento.elemento,
        value: elemento.m3_colados,
      };

      arr.push(obj);
    });

    return arr;
  }, [elementData]);

  return (
    <>
      {isLoading &&
      !m3SuministradosData &&
      !ajusteNewData &&
      !elementoAColarData ? (
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
              setData={setPlantData}
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/plant/"}
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Plantas (Producción)"
            />
            <MyBarChart
              title="M3 suministrados por planta"
              data={m3SuministradosData}
              xDataKey="name"
              barDataKey="value"
              xLabel="Plantas"
              yLabel="M3"
              barName="Metros cúbicos"
              keyToSort1="value"
              tickMargin={100}
              height={400}
              marginBottom={170}
            />
          </div>
          <hr />
          <div className="to-image">
            <FormFiltrosGraficas
              onlyCalendar
              setData={setAjusteData}
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/ajuste/"}
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Ajustes (Producción)"
            />
            <MyBarChart
              title="Ajustes"
              data={ajusteNewData || []}
              xDataKey="name"
              barDataKey="value"
              xLabel="Ajustes"
              yLabel="Pedidos"
              barName="Pedidos"
              keyToSort1="value"
            />
          </div>
          <hr />
          <div className="to-image">
            <FormFiltrosGraficas
              options={elementTodosdata}
              setData={setElementData}
              optionValue="elemento"
              optionText1="elemento"
              label="Elementos"
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_produccion/graphics/element/"}
              urlParam="name"
              setDisableTab={setDisableTab}
              excelBtn
              excelDocTitle="Elementos a colar (Producción)"
            />
            <MyBarChart
              title="Elementos a colar"
              data={elementoAColarData || []}
              xDataKey="name"
              barDataKey="value"
              xLabel="Elementos"
              yLabel="M3"
              barName="Metros cúbicos"
              keyToSort1="value"
              tickMargin={100}
              height={410}
              marginBottom={180}
            />
          </div>
          <div className="invisible">
            <PDFDownloadLink
              document={
                <GraficasPdfDocument title="Producción" stateArr={imageSrc} />
              }
              fileName="Reporte Producción.pdf"
            >
              <button className="download-btn">Descargar PDF</button>
            </PDFDownloadLink>
          </div>
        </>
      )}
    </>
  );
};
