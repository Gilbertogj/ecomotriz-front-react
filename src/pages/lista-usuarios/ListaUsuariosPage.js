import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

import { SearchInput } from "../../components/search-input/SearchInput";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { TablaUsuarios } from "../../components/tabla-usuarios/TablaUsuarios";
import { FormFiltrosUsuarios } from "../../components/form-filtros-usuarios/FormFiltrosUsuarios";
import { BotonesPaginacionTablas } from "../../components/botones-paginacion-tablas/BotonesPaginacionTablas";

export const ListaUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [busquedaAplicada, setBusquedaAplicada] = useState("");
  const [filtrosAplicadosUsuarios, setFiltrosAplicadosUsuarios] = useState("");

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  useEffect(() => {
    fetchUsuarios(process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/users/");
  }, [authtoken]);

  const fetchUsuarios = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url, authtoken, dispatch, setCurrentUser);

    setUsuarios(data.results);
    setFinalPage(Math.ceil(data.count / 10));
    setIsLoading(false);
  };

  const changePage = (num) => {
    const newCurrentPage = currentPage + num;

    fetchUsuarios(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/?tipo_usuario=${
        filtrosAplicadosUsuarios ? filtrosAplicadosUsuarios : ""
      }&search=${
        busquedaAplicada ? busquedaAplicada : ""
      }&page=${newCurrentPage}`
    );

    setCurrentPage(newCurrentPage);
  };

  return (
    <div className="container" style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <div className="row text-center mb-3">
        <h3>Lista de Usuarios</h3>
      </div>

      <div className="row text-center justify-content-center">
        <div className="col-12 col-sm-7 mb-3">
          <SearchInput
            setUsuarios={setUsuarios}
            setCurrentPage={setCurrentPage}
            setFinalPage={setFinalPage}
            url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/users/?search="}
            setIsLoading={setIsLoading}
            setBusquedaAplicada={setBusquedaAplicada}
            setFiltrosAplicadosUsuarios={setFiltrosAplicadosUsuarios}
          />
        </div>
      </div>

      <FormFiltrosUsuarios
        setUsuarios={setUsuarios}
        setCurrentPage={setCurrentPage}
        setFinalPage={setFinalPage}
        setBusquedaAplicada={setBusquedaAplicada}
        setFiltrosAplicadosUsuarios={setFiltrosAplicadosUsuarios}
        setIsLoading={setIsLoading}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <TablaUsuarios usuarios={usuarios} />
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
