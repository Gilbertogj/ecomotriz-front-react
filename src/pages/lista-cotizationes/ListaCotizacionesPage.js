import React, { useContext, useEffect, useState } from "react";


import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

import { SearchInput } from "../../components/search-input/SearchInput";
import { TablaCotizaciones } from "../../components/tabla-cotizaciones/TablaCotizaciones";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormFiltrosCotizaciones } from "../../components/form-filtros-cotizaciones/FormFiltrosCotizaciones";
import { BotonesPaginacionTablas } from "../../components/botones-paginacion-tablas/BotonesPaginacionTablas";

const initialFormState = {
  fechaElaboracion: "",
  fechaVencimiento: "",
  tipoVenta: "",
  estatus: "",
  asesor: "",
};

export const ListaCotizacionesPage = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [busquedaAplicada, setBusquedaAplicada] = useState("");
  const [filtrosAplicadosCotizaciones, setFiltrosAplicadosCotizaciones] =
    useState(initialFormState);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  useEffect(() => {
    fetchCotizaciones(
      process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/cotizaciones/"
    );
  }, [authtoken]);

  const fetchCotizaciones = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url, authtoken, dispatch, setCurrentUser);

    setCotizaciones(data.results);
    setFinalPage(Math.ceil(data.count / 10));
    setIsLoading(false);
  };

  const changePage = (num) => {
    const newCurrentPage = currentPage + num;

    fetchCotizaciones(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/?fecha_filtro=${
        filtrosAplicadosCotizaciones.fechaElaboracion
          ? filtrosAplicadosCotizaciones.fechaElaboracion
          : ""
      }&vigencia=${
        filtrosAplicadosCotizaciones.fechaVencimiento
          ? filtrosAplicadosCotizaciones.fechaVencimiento
          : ""
      }&search=${busquedaAplicada ? busquedaAplicada : ""}&tipo_venta=${
        filtrosAplicadosCotizaciones.tipoVenta
          ? filtrosAplicadosCotizaciones.tipoVenta
          : ""
      }&estado=${
        filtrosAplicadosCotizaciones.estatus
          ? filtrosAplicadosCotizaciones.estatus
          : ""
      }&page=${newCurrentPage}`
    );

    setCurrentPage(newCurrentPage);
  };

  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Lista de Cotizaciones</h3>
      </div>
      <div className="row mb-3 text-center justify-content-center">
        <div className="col-12 col-sm-7">
          <SearchInput
            setCotizaciones={setCotizaciones}
            setCurrentPage={setCurrentPage}
            setFinalPage={setFinalPage}
            url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/cotizaciones/?search="}
            setIsLoading={setIsLoading}
            setBusquedaAplicada={setBusquedaAplicada}
            setFiltrosAplicadosCotizaciones={setFiltrosAplicadosCotizaciones}
          />
        </div>
      </div>

      <FormFiltrosCotizaciones
        setCotizaciones={setCotizaciones}
        setFiltrosAplicadosCotizaciones={setFiltrosAplicadosCotizaciones}
        setCurrentPage={setCurrentPage}
        setFinalPage={setFinalPage}
        setBusquedaAplicada={setBusquedaAplicada}
        setIsLoading={setIsLoading}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <TablaCotizaciones cotizaciones={cotizaciones} />
          <BotonesPaginacionTablas
            currentPage={currentPage}
            finalPage={finalPage}
            changePage={changePage}
          />
        </div>
      )}
    </div>
  );
};
