import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

import { TablaProyecciones } from "../../components/tabla-proyecciones/TablaProyecciones";
import { SearchInput } from "../../components/search-input/SearchInput";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { BotonesPaginacionTablas } from "../../components/botones-paginacion-tablas/BotonesPaginacionTablas";

export const ProyeccionesPage = () => {
  const [proyeccionesData, setProyeccionesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [busquedaAplicada, setBusquedaAplicada] = useState("");

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  useEffect(() => {
    fetchProyecciones(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/`
    );
  }, []);

  const fetchProyecciones = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url, authtoken, dispatch, setCurrentUser);

    setProyeccionesData(data.results);
    setFinalPage(Math.ceil(data.count / 10));
    setIsLoading(false);
  };

  const changePage = (num) => {
    const newCurrentPage = currentPage + num;

    fetchProyecciones(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/proyecciones/?search=${
        busquedaAplicada ? busquedaAplicada : ""
      }&page=${newCurrentPage}`
    );

    setCurrentPage(newCurrentPage);
  };

  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Lista de Proyecciones</h3>
      </div>

      <div className="row mb-3 text-center justify-content-center">
        <div className="col-12 col-sm-7 mb-3 ">
          <SearchInput
            setCotizaciones={setProyeccionesData}
            setCurrentPage={setCurrentPage}
            setFinalPage={setFinalPage}
            url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/proyecciones/?search="}
            setIsLoading={setIsLoading}
            setBusquedaAplicada={setBusquedaAplicada}
          />
        </div>
        <div className="col">
          <Link to="/concreco/comercializacion/agregar-proyeccion">
            <button className="btn btn-primary">Agregar Proyeccion</button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <TablaProyecciones proyecciones={proyeccionesData} />
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
