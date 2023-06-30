import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

import { SearchInput } from "../../components/search-input/SearchInput";
import { TablaProductos } from "../../components/tabla-productos/TablaProductos";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { BotonesPaginacionTablas } from "../../components/botones-paginacion-tablas/BotonesPaginacionTablas";

export const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [busquedaAplicada, setBusquedaAplicada] = useState("");

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  useEffect(() => {
    fetchProductos(
      process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/productos/"
    );
  }, [authtoken]);

  const fetchProductos = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url, authtoken, dispatch, setCurrentUser);

    setProductos(data.results);
    setFinalPage(Math.ceil(data.count / 10));
    setIsLoading(false);
  };

  const changePage = (num) => {
    const newCurrentPage = currentPage + num;

    fetchProductos(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/productos/?search=${
        busquedaAplicada ? busquedaAplicada : ""
      }&page=${newCurrentPage}`
    );

    setCurrentPage(newCurrentPage);
  };

  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Diseños</h3>
      </div>

      <div className="row mb-3 text-center justify-content-center">
        <div className="col-12 col-sm-7 mb-3">
          <SearchInput
            setProductos={setProductos}
            setCurrentPage={setCurrentPage}
            setFinalPage={setFinalPage}
            url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/productos/?search="}
            setIsLoading={setIsLoading}
            setBusquedaAplicada={setBusquedaAplicada}
          />
        </div>
        <div className="col">
          <Link to="/concreco/comercializacion/agregar-producto">
            <button className="btn btn-primary">Agregar Producto</button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <TablaProductos productos={productos} />
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
