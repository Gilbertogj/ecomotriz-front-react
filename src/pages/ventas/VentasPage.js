import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { fetchData } from "../../utils/fetchData";

import { SearchInput } from "../../components/search-input/SearchInput";
import { TablaVentas } from "../../components/tabla-ventas/TablaVentas";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormFiltrosVentas } from "../../components/form-filtros-ventas/FormFiltrosVentas";
import { BotonesPaginacionTablas } from "../../components/botones-paginacion-tablas/BotonesPaginacionTablas";

const formInitialState = {
  planta: "",
  estatusPedido: "",
  forma: "",
  usuario: "",
};

export const ListaPedidosPage = () => {
  const [pedidos, setPedidos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sumaM3, setSumaM3] = useState(null);
  const [totalPedidos, setTotalPedidos] = useState(null);
  const [filtrosAplicadosPedidos, setFiltrosAplicadosPedidos] =
    useState(formInitialState);

  const [busquedaAplicada, setBusquedaAplicada] = useState("");
  const [fechasFiltroAplicados, setFechasFiltroAplicados] = useState("");

  const { authtoken, dispatch, setCurrentUser, userRol } =
    useContext(ReactReduxContext);

  useEffect(() => {
    fetchPedidos(`${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/ventas/`);
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
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/ventas/?planta_id=${
        filtrosAplicadosPedidos.planta ? filtrosAplicadosPedidos.planta : ""
      }&status_pedido=${
        filtrosAplicadosPedidos.estatusPedido
          ? filtrosAplicadosPedidos.estatusPedido
          : ""
      }&forma=${
        filtrosAplicadosPedidos.forma ? filtrosAplicadosPedidos.forma : ""
      }&Ventas=${
        filtrosAplicadosPedidos.usuario ? filtrosAplicadosPedidos.usuario : ""
      }&search=${busquedaAplicada ? busquedaAplicada : ""}&fecha_intervalo=${
        fechasFiltroAplicados ? fechasFiltroAplicados : ""
      }&page=${newCurrentPage}`
    );

    setCurrentPage(newCurrentPage);
  };

  return (
    <Container style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <Row className="text-center mb-3">
        <h3 className="m-0">Lista de Pedidooss</h3>
      </Row>

      {userRol !== "Operador" && (
        <Row className="mb-3 justify-content-center">
          <div className="col-12 col-sm-7">
            <SearchInput
              pedidos={pedidos}
              setPedidos={setPedidos}
              setCurrentPage={setCurrentPage}
              setFinalPage={setFinalPage}
              setSumaM3={setSumaM3}
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/pedidos/ventas/?search="}
              setIsLoading={setIsLoading}
              setTotalPedidos={setTotalPedidos}
              setBusquedaAplicada={setBusquedaAplicada}
              setFiltrosAplicadosPedidos={setFiltrosAplicadosPedidos}
              setFechasFiltroAplicados={setFechasFiltroAplicados}
            />
          </div>
        </Row>
      )}

      {userRol !== "Operador" && (
        <FormFiltrosVentas
          setFiltrosAplicadosPedidos={setFiltrosAplicadosPedidos}
          setPedidos={setPedidos}
          setSumaM3={setSumaM3}
          setTotalPedidos={setTotalPedidos}
          setIsLoading={setIsLoading}
          setCurrentPage={setCurrentPage}
          setFinalPage={setFinalPage}
          fechasFiltroAplicados={fechasFiltroAplicados}
          setFechasFiltroAplicados={setFechasFiltroAplicados}
          setBusquedaAplicada={setBusquedaAplicada}
          filtrosAplicadosPedidos={filtrosAplicadosPedidos}
          busquedaAplicada={busquedaAplicada}
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
          <TablaVentas pedidos={pedidos} setPedidos={setPedidos} />
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
