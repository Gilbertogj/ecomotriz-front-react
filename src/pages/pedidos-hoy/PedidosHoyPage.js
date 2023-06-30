import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { fetchData } from "../../utils/fetchData";

import { SearchInput } from "../../components/search-input/SearchInput";
import { TablaPedidos } from "../../components/tabla-pedidos/TablaPedidos";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormFiltrosPedidos } from "../../components/form-filtros-pedidos/FormFiltrosPedidos";
import { BotonesPaginacionTablas } from "../../components/botones-paginacion-tablas/BotonesPaginacionTablas";

const formInitialState = {
  planta: "",
  estatusPedido: "",
  forma: "",
  usuario: "",
};

export const PedidosHoyPage = () => {
  const [pedidos, setPedidos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sumaM3, setSumaM3] = useState(null);
  const [totalPedidos, setTotalPedidos] = useState(null);
  const [finalPage, setFinalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtrosAplicadosPedidos, setFiltrosAplicadosPedidos] =
    useState(formInitialState);
  const [busquedaAplicada, setBusquedaAplicada] = useState("");

  const { authtoken, dispatch, setCurrentUser, userRol } =
    useContext(ReactReduxContext);

  const fecha = useMemo(() => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    fetchPedidos(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/?fecha_filtro=${fecha}`
    );
  }, [authtoken]);

  const fetchPedidos = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url, authtoken, dispatch, setCurrentUser);

    setPedidos(data.results);
    setTotalPedidos(data.count);
    setSumaM3(data.m3);
    setFinalPage(Math.ceil(data.count / 10));
    setIsLoading(false);
  };

  const changePage = (num) => {
    const newCurrentPage = currentPage + num;

    fetchPedidos(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/?fecha_filtro=${fecha}&planta_id=${
        filtrosAplicadosPedidos.planta ? filtrosAplicadosPedidos.planta : ""
      }&status_pedido=${
        filtrosAplicadosPedidos.estatusPedido
          ? filtrosAplicadosPedidos.estatusPedido
          : ""
      }&forma=${
        filtrosAplicadosPedidos.forma ? filtrosAplicadosPedidos.forma : ""
      }&Ventas=${
        filtrosAplicadosPedidos.usuario ? filtrosAplicadosPedidos.usuario : ""
      }&search=${
        busquedaAplicada ? busquedaAplicada : ""
      }&page=${newCurrentPage}`
    );

    setCurrentPage(newCurrentPage);
  };

  return (
    <Container style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <Row className="text-center mb-3">
        <h3 className="m-0">Lista de Pedidos</h3>
      </Row>
      {userRol !== "Operador" && (
        <Row className="mb-3 justify-content-center">
          <div className="col-12 col-sm-7">
            <SearchInput
              url={`${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/?fecha_filtro=${fecha}&search=`}
              setPedidos={setPedidos}
              setCurrentPage={setCurrentPage}
              setFinalPage={setFinalPage}
              setSumaM3={setSumaM3}
              setTotalPedidos={setTotalPedidos}
              setIsLoading={setIsLoading}
              setBusquedaAplicada={setBusquedaAplicada}
              setFiltrosAplicadosPedidos={setFiltrosAplicadosPedidos}
            />
          </div>
        </Row>
      )}

      {userRol !== "Operador" && (
        <FormFiltrosPedidos
          setFiltrosAplicadosPedidos={setFiltrosAplicadosPedidos}
          setPedidos={setPedidos}
          setSumaM3={setSumaM3}
          setTotalPedidos={setTotalPedidos}
          setIsLoading={setIsLoading}
          setFinalPage={setFinalPage}
          setCurrentPage={setCurrentPage}
          setBusquedaAplicada={setBusquedaAplicada}
          filtrosAplicadosPedidos={filtrosAplicadosPedidos}
          busquedaAplicada={busquedaAplicada}
          fecha={fecha}
          noCalendar
        />
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Row>
          {sumaM3 && totalPedidos && (
            <div className="d-flex">
              <div>
                <strong>Pedidos:</strong> {totalPedidos}
              </div>
              <div className="mx-3">
                <strong>Suma de M3:</strong> {sumaM3}
              </div>
            </div>
          )}
          <TablaPedidos pedidos={pedidos} setPedidos={setPedidos} />
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
