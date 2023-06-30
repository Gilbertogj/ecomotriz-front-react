import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { DetallesPedidoAcordeon } from "../../components/detalles-pedido-acordeon/DetallesPedidoAcordeon";
import { TablaReportesOperador } from "../../components/tabla-reportes-operador/TablaReportesOperador";
import { TablaRegistrosProduccionAdministracion } from "../../components/tabla-registros-produccion-administracion/TablaRegistrosProduccionAdministracion";
import { DetallesRegistroProduccion } from "../../components/detalles-registro-produccion/DetallesRegistroProduccion";
import { StepIndicator } from "../../components/step-indicator/StepIndicator";

import { timeDifference } from "../../utils/timeDifference";

export const PedidoAdministracionPage = () => {
  const [pedidoData, setPedidoData] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [stepsOllero, setStepsOllero] = useState(null);
  const [reporteOperadorSeleccionado, setReporteOperadorSeleccionado] =
    useState(null);
  const [stepsOperador, setStepsOperador] = useState(null);

  const { id } = useParams();

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const sumaM3Registros = useMemo(
    () => registros.reduce((accu, registro) => accu + Number(registro.m3), 0),
    [registros]
  );

  useEffect(() => {
    if (!registroSeleccionado) return;
    setStepsOllero([
      {
        text: "Salida planta",
        value: registroSeleccionado.reporte_ollero.salida_planta,
      },
      {
        text: "Llegada obra",
        value: registroSeleccionado.reporte_ollero.llegada_obra,
      },
      {
        text: "Inicio descarga",
        value: registroSeleccionado.reporte_ollero.inicio_descarga,
      },
      {
        text: "Fin descarga",
        value: registroSeleccionado.reporte_ollero.fin_descarga,
      },
      {
        text: "Salida obra",
        value: registroSeleccionado.reporte_ollero.salida_obra,
      },
      {
        text: "Llegada planta",
        value: registroSeleccionado.reporte_ollero.llegada_planta,
      },
    ]);
  }, [registroSeleccionado]);

  const olleroTimeDiffArr = useMemo(() => {
    if (!registroSeleccionado) return null;

    const arr = [
      {
        timeDiff: registroSeleccionado.reporte_ollero.llegada_obra
          ? timeDifference(
              registroSeleccionado.reporte_ollero.salida_planta,
              registroSeleccionado.reporte_ollero.llegada_obra
            )
          : "N/A",
      },
      {
        timeDiff: registroSeleccionado.reporte_ollero.inicio_descarga
          ? timeDifference(
              registroSeleccionado.reporte_ollero.llegada_obra,
              registroSeleccionado.reporte_ollero.inicio_descarga
            )
          : "N/A",
      },
      {
        timeDiff: registroSeleccionado.reporte_ollero.fin_descarga
          ? timeDifference(
              registroSeleccionado.reporte_ollero.inicio_descarga,
              registroSeleccionado.reporte_ollero.fin_descarga
            )
          : "N/A",
      },
      {
        timeDiff: registroSeleccionado.reporte_ollero.salida_obra
          ? timeDifference(
              registroSeleccionado.reporte_ollero.fin_descarga,
              registroSeleccionado.reporte_ollero.salida_obra
            )
          : "N/A",
      },
      {
        timeDiff: registroSeleccionado.reporte_ollero.llegada_planta
          ? timeDifference(
              registroSeleccionado.reporte_ollero.salida_obra,
              registroSeleccionado.reporte_ollero.llegada_planta
            )
          : "N/A",
      },
    ];

    return arr;
  }, [registroSeleccionado]);

  const operadorTimeDiffArr = useMemo(() => {
    if (!reporteOperadorSeleccionado) return null;

    const arr = [
      {
        timeDiff: reporteOperadorSeleccionado.llegada_obra
          ? timeDifference(
              reporteOperadorSeleccionado.salida_planta,
              reporteOperadorSeleccionado.llegada_obra
            )
          : "N/A",
      },
      {
        timeDiff: reporteOperadorSeleccionado.inicio_bombeo
          ? timeDifference(
              reporteOperadorSeleccionado.llegada_obra,
              reporteOperadorSeleccionado.inicio_bombeo
            )
          : "N/A",
      },
      {
        timeDiff: reporteOperadorSeleccionado.fin_bombeo
          ? timeDifference(
              reporteOperadorSeleccionado.inicio_bombeo,
              reporteOperadorSeleccionado.fin_bombeo
            )
          : "N/A",
      },
      {
        timeDiff: reporteOperadorSeleccionado.salida_obra
          ? timeDifference(
              reporteOperadorSeleccionado.fin_bombeo,
              reporteOperadorSeleccionado.salida_obra
            )
          : "N/A",
      },
      {
        timeDiff: reporteOperadorSeleccionado.llegada_planta
          ? timeDifference(
              reporteOperadorSeleccionado.salida_obra,
              reporteOperadorSeleccionado.llegada_planta
            )
          : "N/A",
      },
    ];

    return arr;
  }, [reporteOperadorSeleccionado]);

  useEffect(() => {
    if (!reporteOperadorSeleccionado) return;
    setStepsOperador([
      {
        text: "Salida planta",
        value: reporteOperadorSeleccionado.salida_planta,
      },
      {
        text: "Llegada obra",
        value: reporteOperadorSeleccionado.llegada_obra,
      },
      {
        text: "Inicio bombeo",
        value: reporteOperadorSeleccionado.inicio_bombeo,
      },
      {
        text: "Fin bombeo",
        value: reporteOperadorSeleccionado.fin_bombeo,
      },
      {
        text: "Salida obra",
        value: reporteOperadorSeleccionado.salida_obra,
      },
      {
        text: "Llegada planta",
        value: reporteOperadorSeleccionado.llegada_planta,
      },
    ]);
  }, [reporteOperadorSeleccionado]);

  useEffect(() => {
    const fecthData = async () => {
      try {
        setIsLoading(true);
        let data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${id}/`,
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
            `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${id}/`,
            {
              headers: {
                Authorization: `Token ${newToken}`,
              },
            }
          );

          json = await data.json();
        }

        if (data.status === 404) {
          setPedidoData(json);
          setIsLoading(false);
        }

        if (data.status === 200) {
          let data2 = await fetch(
            `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/registro_produccion/?pedido=${id}`,
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
              `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/registro_produccion/?pedido=${id}`,
              {
                headers: {
                  Authorization: `Token ${json2.token}`,
                },
              }
            );

            json2 = await data2.json();
          }

          setRegistros(json2.results);
          setPedidoData(json);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };

    fecthData();
  }, [id]);

  const ocultarInfo = (isRegistro) => {
    if (isRegistro) {
      document.querySelector(".table-info").classList.remove("table-info");
      setStepsOllero(null);
      setRegistroSeleccionado(null);
    } else {
      setStepsOperador(null);
      setReporteOperadorSeleccionado(null);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {pedidoData && pedidoData.id ? (
            <>
              <DetallesPedidoAcordeon pedidoData={pedidoData} />

              {registros && registros.length > 0 ? (
                <div className="mt-3">
                  <p className="text-success my-2">
                    <strong>M3 del pedido: </strong> {Number(pedidoData.m3)}
                  </p>
                  <p className="text-danger my-2">
                    <strong>M3 suministrados: </strong>
                    {Number(sumaM3Registros)}
                  </p>

                  <h4 className="text-center">Registros de Producción</h4>
                  <TablaRegistrosProduccionAdministracion
                    registros={registros}
                    setRegistroSeleccionado={setRegistroSeleccionado}
                  />
                  <div className="mt-3">
                    {registroSeleccionado && (
                      <>
                        <h4 className="text-center">Registro de Producción</h4>
                        <DetallesRegistroProduccion
                          registro={registroSeleccionado}
                        />
                        <h4 className="text-center">Reporte de Ollero</h4>

                        {stepsOllero && (
                          <>
                            <StepIndicator steps={stepsOllero} />
                            <div className="time-diff-container d-flex justify-content-around">
                              {olleroTimeDiffArr.map((step, i) => (
                                <p className="time-diff-p" key={i}>
                                  {step.timeDiff}
                                </p>
                              ))}
                            </div>
                            {registroSeleccionado.reporte_ollero
                              .causa_retraso && (
                              <div className="pt-3 ps-3">
                                <p className="m-0">
                                  <strong>Causa retraso: </strong>
                                  {
                                    registroSeleccionado.reporte_ollero
                                      .causa_retraso
                                  }
                                </p>
                                <p className="m-0">
                                  <strong>Incidencia: </strong>
                                  {
                                    registroSeleccionado.reporte_ollero
                                      .incidencia
                                  }
                                </p>
                              </div>
                            )}
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn btn-primary mt-3"
                                onClick={() => ocultarInfo(true)}
                              >
                                Ocultar Información
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-center mt-3">
                  Este pedido no tiene registros de producción.
                </p>
              )}

              {pedidoData.reporte_operador.id && (
                <div className="mt-3">
                  <h4 className="text-center">Reporte de Operador</h4>
                  <TablaReportesOperador
                    pedidoData={pedidoData}
                    setReporteOperadorSeleccionado={
                      setReporteOperadorSeleccionado
                    }
                  />

                  {stepsOperador && (
                    <>
                      <StepIndicator steps={stepsOperador} />
                      <div className="time-diff-container d-flex justify-content-around">
                        {operadorTimeDiffArr.map((step, i) => (
                          <p className="time-diff-p" key={i}>
                            {step.timeDiff}
                          </p>
                        ))}
                      </div>
                      {reporteOperadorSeleccionado.causa_retraso && (
                        <div className="pt-3 ps-3">
                          <p className="m-0">
                            <strong>Causa retraso: </strong>
                            {reporteOperadorSeleccionado.causa_retraso}
                          </p>
                          <p className="m-0">
                            <strong>Incidencia: </strong>
                            {reporteOperadorSeleccionado.incidencia}
                          </p>
                        </div>
                      )}

                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => ocultarInfo(false)}
                        >
                          Ocultar Información
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <p>No existe el pedido #{id}</p>
          )}
        </>
      )}
    </>
  );
};
