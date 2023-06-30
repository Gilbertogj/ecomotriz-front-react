import React, { useContext, useEffect, useState } from "react";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

const initialFormState = {
  fechaElaboracion: "",
  fechaVencimiento: "",
  tipoVenta: "",
  estatus: "",
  asesor: "",
};

export const FormFiltrosCotizaciones = ({
  setCotizaciones,
  setCurrentPage,
  setFinalPage,
  setFiltrosAplicadosCotizaciones,
  setBusquedaAplicada,
  setIsLoading,
}) => {
  const [form, setForm] = useState(initialFormState);
  const [asesores, setAsesores] = useState([]);
  const [filtrarBtnDisabled, setFiltrarBtnDisabled] = useState(true);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const isDesktop = useIsDesktop();

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/asesores/`,
        authtoken,
        dispatch,
        setCurrentUser
      );

      setAsesores(fetchedData);
    })();
  }, []);

  const descargarExcel = async (e) => {

    try {
      e.target.disabled = true;
      e.target.textContent = "Descargando...";

      let response = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/reporte_cotizaciones/?fecha_filtro=${form.fechaElaboracion}&vigencia=${form.fechaVencimiento}&search=&tipo_venta=${form.tipoVenta}&estado=${form.estatus}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
        }
      );

      if (response.headers.get("Content-Type") !== "application/ms-excel") {
        let json = await response.json();

        if (json.expired) {
          dispatch(setCurrentUser({ token: json.token }));

          response = await fetch(
            `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/reporte_cotizaciones/?fecha_filtro=${form.fechaElaboracion}&vigencia=${form.fechaVencimiento}&search=&tipo_venta=${form.tipoVenta}&estado=${form.estatus}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${json.token}`,
              },
            }
          );
        }

      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Cotizaciones.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      e.target.textContent = "Descargar Excel";
      e.target.disabled = false;
    }
  };

  const handleChange = (e) => {
    setFiltrarBtnDisabled(false);

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setFiltrarBtnDisabled(true);

      const fetchedData = await fetchData(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/?fecha_filtro=${
          form.fechaElaboracion ? form.fechaElaboracion : ""
        }&vigencia=${
          form.fechaVencimiento ? form.fechaVencimiento : ""
        }&search=&tipo_venta=${form.tipoVenta ? form.tipoVenta : ""}&estado=${
          form.estatus ? form.estatus : ""
        }`,
        authtoken,
        dispatch,
        setCurrentUser
      );

      setCotizaciones(fetchedData.results);

      setCurrentPage(1);
      setFinalPage(Math.ceil(fetchedData.count / 10));

      if (setBusquedaAplicada) {
        setBusquedaAplicada("");
      }
      setFiltrosAplicadosCotizaciones({
        fechaElaboracion: form.fechaElaboracion,
        fechaVencimiento: form.fechaVencimiento,
        tipoVenta: form.tipoVenta,
        estatus: form.estatus,
        asesor: form.asesor,
      });
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="row mb-3" onSubmit={handleSubmit}>
      <div className="col-6 col-md-3">
        <label htmlFor="fechaElaboracion" className="form-label">
          Fecha de elaboración
        </label>
        <input
          type="date"
          id="fechaElaboracion"
          name="fechaElaboracion"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="col-6 col-md-3">
        <label htmlFor="fechaVencimiento" className="form-label">
          Fecha de vencimiento
        </label>
        <input
          type="date"
          id="fechaVencimiento"
          name="fechaVencimiento"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="col-6 col-md-3">
        <label htmlFor="tipoVenta" className="form-label">
          Tipo de venta
        </label>
        <select
          className="form-select"
          id="tipoVenta"
          name="tipoVenta"
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select>
      </div>

      <div className="col-6 col-md-3">
        <label htmlFor="estatus" className="form-label">
          Estatus
        </label>
        <select
          className="form-select"
          id="estatus"
          name="estatus"
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="Aprobada">Aprobada</option>
          <option value="Por aprobar">Por aprobar</option>
        </select>
      </div>

      <div className="col-6 col-md-3">
        <label htmlFor="asesor" className="form-label">
          Asesor
        </label>
        <select
          className="form-select"
          id="asesor"
          name="asesor"
          onChange={handleChange}
        >
          <option value="">Todos</option>
          {asesores.map((asesor) => (
            <option key={asesor.id} value={asesor.id}>
              {asesor.fullname}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        {isDesktop && (
          <button
            type="button"
            className="btn btn-success"
            onClick={descargarExcel}
          >
            Descargar Excel
          </button>
        )}

        <input
          type="submit"
          value="Filtrar"
          className="btn btn-primary"
          disabled={filtrarBtnDisabled}
        />
      </div>
    </form>
  );
};
