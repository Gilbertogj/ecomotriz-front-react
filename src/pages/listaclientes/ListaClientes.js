import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { fetchData } from "../../utils/fetchData";

import { SearchInput } from "../../components/search-input/SearchInput";
import { TablaClientes } from "../../components/tablaclientes/TablaClientes";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

import "./ListaClientes.styles.scss";
import { BotonesPaginacionTablas } from "../../components/botones-paginacion-tablas/BotonesPaginacionTablas";

export const ListaClientes = () => {
  const [clientes, setClientes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [busquedaAplicada, setBusquedaAplicada] = useState("");

  const { pathname } = useLocation();

  const { authtoken, dispatch, setCurrentUser } = useContext(ReactReduxContext);

  useEffect(() => {
    fetchClientes(process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/clientes/");
  }, []);

  const fetchClientes = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url, authtoken, dispatch, setCurrentUser);

    setClientes(data.results);
    setFinalPage(Math.ceil(data.count / 10));
    setIsLoading(false);
  };

  const changePage = (num) => {
    const newCurrentPage = currentPage + num;

    fetchClientes(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/?search=${
        busquedaAplicada ? busquedaAplicada : ""
      }&page=${newCurrentPage}`
    );

    setCurrentPage(newCurrentPage);
  };

  return (
    <Container style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <Row className="text-center mb-3">
        {pathname.includes("pedido") || pathname.includes("cotizacion") ? (
          <h3 className="m-0">Seleccione Cliente</h3>
        ) : (
          <h3 className="m-0">Lista de Clientes</h3>
        )}
      </Row>
      <Row className="mb-3 text-center">
        <div className="col-12 col-sm-7 mb-3">
          <SearchInput
            setClientes={setClientes}
            setCurrentPage={setCurrentPage}
            setFinalPage={setFinalPage}
            url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/clientes/?search="}
            setIsLoading={setIsLoading}
            setBusquedaAplicada={setBusquedaAplicada}
          />
        </div>
        <div className="col">
          {pathname.includes("logistica") &&
            !pathname.includes("clientes-pedido") && (
              <Link to="/logistica/agregar-cliente">
                <Button variant="primary">Agregar Cliente</Button>
              </Link>
            )}
          {pathname.includes("logistica") &&
            pathname.includes("clientes-pedido") && (
              <Link to="/concreco/logistica/agregar-cliente/realizar-pedido">
                <Button variant="primary">Agregar Cliente</Button>
              </Link>
            )}
          {pathname.includes("comercializacion") && (
            <Link to="/concreco/comercializacion/agregar-cliente">
              <Button variant="primary">Agregar Cliente</Button>
            </Link>
          )}
        </div>
      </Row>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Row>
          <TablaClientes clientes={clientes} />
          <BotonesPaginacionTablas
            currentPage={currentPage}
            finalPage={finalPage}
            changePage={changePage}
          />
        </Row>
      )}
    </Container>
  );
};