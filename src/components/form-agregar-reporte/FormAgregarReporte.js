import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { ModalRedirect } from "../modal-redirect/ModalRedirect";

const selectsInitialState = {
  causa_retraso: "",
  incidencia: "",
};

export const FormAgregarReporte = ({ reporte }) => {
  const [selects, setSelects] = useState(selectsInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCompletadoModal, setShowCompletadoModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { id } = useParams();

  const siguienteEtapa = useMemo(() => {
    if (!reporte.salida_planta) return "salida_planta";
    if (!reporte.llegada_obra) return "llegada_obra";
    if (!reporte.inicio_descarga) return "inicio_descarga";
    if (!reporte.fin_descarga) return "fin_descarga";
    if (!reporte.salida_obra) return "salida_obra";
    if (!reporte.llegada_planta) return "llegada_planta";
    if (!reporte.incidencia || !reporte.causa_retraso) return "fin";
    return "completado";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelects({
      ...selects,
      [name]: value,
    });
  };

  const handleSelectsSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const url = `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/reporte_ollero/${id}/update/`;

      let data = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
        body: JSON.stringify({
          incidencia: selects.incidencia,
          causa_retraso: selects.causa_retraso,
        }),
      });

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${json.token}`,
          },
          body: JSON.stringify({
            incidencia: selects.incidencia,
            causa_retraso: selects.causa_retraso,
          }),
        });

        json = await data.json();
      }

      if (data.status === 200) {
        setShowCompletadoModal(true);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const registrarHora = async (e, propiedadAModificar) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const url = `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/reporte_ollero/${id}/update/`;

      let data = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
        body: JSON.stringify({ [propiedadAModificar]: "." }),
      });

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${json.token}`,
          },
          body: JSON.stringify({ [propiedadAModificar]: "." }),
        });

        json = await data.json();
      }

      if (data.status === 200) {
        setShowModal(true);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ModalRedirect
        showConfirmModal={showCompletadoModal}
        text="Reporte completado."
        link="/concreco/produccion/registros"
      />
      <ModalRedirect
        showConfirmModal={showModal}
        text="Hora marcada correctamente."
        link={`/concreco/produccion/registro/${reporte.registro}`}
      />
      {siguienteEtapa === "salida_planta" &&
        (!isLoading ? (
          <form
            onSubmit={(e) => {
              registrarHora(e, "salida_planta");
            }}
          >
            <input
              type="submit"
              value="Iniciar Viaje"
              className="btn btn-primary btn-lg"
            />
          </form>
        ) : (
          <>
            <LoadingSpinner />
            <p className="text-center">Procesando...</p>
          </>
        ))}

      {siguienteEtapa === "llegada_obra" &&
        (!isLoading ? (
          <form
            onSubmit={(e) => {
              registrarHora(e, "llegada_obra");
            }}
          >
            <input
              type="submit"
              value="Llegada Obra"
              className="btn btn-primary btn-lg"
            />
          </form>
        ) : (
          <>
            <LoadingSpinner />
            <p className="text-center">Procesando...</p>
          </>
        ))}

      {siguienteEtapa === "inicio_descarga" &&
        (!isLoading ? (
          <form
            onSubmit={(e) => {
              registrarHora(e, "inicio_descarga");
            }}
          >
            <input
              type="submit"
              value={"Inicio Descarga"}
              className="btn btn-primary btn-lg"
            />
          </form>
        ) : (
          <>
            <LoadingSpinner />
            <p className="text-center">Procesando...</p>
          </>
        ))}

      {siguienteEtapa === "fin_descarga" &&
        (!isLoading ? (
          <form
            onSubmit={(e) => {
              registrarHora(e, "fin_descarga");
            }}
          >
            <input
              type="submit"
              value={"Fin Descarga"}
              className="btn btn-primary btn-lg"
            />
          </form>
        ) : (
          <>
            <LoadingSpinner />
            <p className="text-center">Procesando...</p>
          </>
        ))}

      {siguienteEtapa === "salida_obra" &&
        (!isLoading ? (
          <form
            onSubmit={(e) => {
              registrarHora(e, "salida_obra");
            }}
          >
            <input
              type="submit"
              value={"Salida Obra"}
              className="btn btn-primary btn-lg"
            />
          </form>
        ) : (
          <>
            <LoadingSpinner />
            <p className="text-center">Procesando...</p>
          </>
        ))}

      {siguienteEtapa === "llegada_planta" &&
        (!isLoading ? (
          <form
            onSubmit={(e) => {
              registrarHora(e, "llegada_planta");
            }}
          >
            <input
              type="submit"
              value={"Llegada Planta"}
              className="btn btn-primary btn-lg"
            />
          </form>
        ) : (
          <>
            <LoadingSpinner />
            <p className="text-center">Procesando...</p>
          </>
        ))}

      {siguienteEtapa === "fin" &&
        (!isLoading ? (
          <form onSubmit={handleSelectsSubmit}>
            <label className="form-label" htmlFor="incidencia">
              Incidencia
            </label>
            <select
              className="form-select"
              id="incidencia"
              name="incidencia"
              required
              onChange={handleChange}
              value={selects.incidencia}
            >
              <option></option>
              <option value="Acceso de terracería complicado">
                Acceso de terracería complicado
              </option>
              <option value="Cables bajos durante el acceso">
                Cables bajos durante el acceso
              </option>
              <option value="Obstrucción de acceso">
                Obstrucción de acceso
              </option>
              <option value="Todo en orden">Todo en orden</option>
              <option value="Espacios reducidos en acceso">
                Espacios reducidos en acceso
              </option>
              <option value="Direccion">Direccion</option>
              <option value="Acceso">Acceso</option>
              <option value="Tramo no listo">Tramo no listo</option>
              <option value="Colocadores">Colocadores</option>
              <option value="Descarga lenta">Descarga lenta</option>
              <option value="Ausencia de resistente">Ausencia de resistente</option>
              <option value="Lluvia">Lluvia</option>
              <option value="Inconformidad de volumen">
              Inconformidad de volumen
              </option>
              <option value="Revenimiento">Revenimiento</option>
              <option value="Trabajabilidad">Trabajabilidad</option>
              <option value="Falla de unidad">Falla de unidad</option>
              <option value="Otro">Otro</option>
              <option value="Ninguna">Ninguna</option>
            </select>

            <label className="form-label" htmlFor="causa_retraso">
              Causa Retraso
            </label>
            <select
              className="form-select"
              id="causa_retraso"
              name="causa_retraso"
              required
              onChange={handleChange}
              value={selects.causa_retraso}
            >
              <option></option>
              <option value="Falta de personal en obra">
                Falta de personal en obra
              </option>
              <option value="Residente indicó que esperáramos">
                Residente indicó que esperáramos
              </option>
              <option value="Pruebas de laboratorio">
                Pruebas de laboratorio
              </option>
              <option value="La obra no estaba lista">
                La obra no estaba lista
              </option>
              <option value="Sin retraso">Sin retraso</option>
            </select>

            <div className="d-flex justify-content-end">
              <input
                className="btn btn-primary mt-3"
                type="submit"
                value="Enviar"
              />
            </div>
          </form>
        ) : (
          <>
            <LoadingSpinner />
            <p className="text-center">Procesando...</p>
          </>
        ))}

      {siguienteEtapa === "completado" && <h2>Reporte completado</h2>}
    </div>
  );
};
