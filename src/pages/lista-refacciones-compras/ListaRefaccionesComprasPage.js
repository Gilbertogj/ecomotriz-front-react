import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { fetchData } from "../../utils/fetchData";

import { SearchInput } from "../../components/search-input/SearchInput";
import { TablaOrdenesTrabajo } from "../../components/tabla-ordenes-trabajo/TablaOrdenesTrabajo";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { FormFiltrosUnidades } from "../../components/form-filtros-unidades/FormFiltrosUnidades";
import { BotonesPaginacionTablas } from "../../components/botones-paginacion-tablas/BotonesPaginacionTablas";
// import "./ListaOrdenesTrabajoPage.styles.scss";

// const formInitialState = {
//   empresa_alta: "",
//     empresa_responsable: "",
//     categoria: "",
//     familia: "",
//     subfamilia: "",
   
//   };

export const ListaRefaccionesComprasPage  = () => {
  const [ordenes, setOrdenes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [filtrosAplicadosUnidades, setFiltrosAplicadosUnidades] =
  //   useState(formInitialState);
  //   const [totalUnidades, setTotalUnidades] = useState(null);




  const [busquedaAplicada, setBusquedaAplicada] = useState("");
  const [fechasFiltroAplicados, setFechasFiltroAplicados] = useState("");

  const { authtoken, dispatch, setCurrentUser, userRol } =
    useContext(ReactReduxContext);

  useEffect(() => {
    fetchUnidades(`https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/`);
  }, [authtoken]);
  // console.log(authtoken);

  const fetchUnidades = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url ,authtoken, dispatch, setCurrentUser);
    setOrdenes(data.results);
    setFinalPage(Math.ceil(data.count / 10));

    setIsLoading(false);
  
  };

  const changePage = (num) => {
    const newCurrentPage = currentPage + num;

    fetchUnidades(
      `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/?page=${newCurrentPage}`
    );

    setCurrentPage(newCurrentPage);
  };

  // const changePage = (num) => {
  //   const newCurrentPage = currentPage + num;

  //   fetchUnidades(
  //     `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/assets/?empresa_alta=${
  //       filtrosAplicadosUnidades.empresa_alta ? filtrosAplicadosUnidades.empresa_alta : ""
  //     }&fecha_intervalo=${
  //       fechasFiltroAplicados ? fechasFiltroAplicados : ""
  //     }&categoria=${
  //       filtrosAplicadosUnidades.categoria
  //         ? filtrosAplicadosUnidades.categoria
  //         : ""
  //     }&familia=${
  //       filtrosAplicadosUnidades.familia ? filtrosAplicadosUnidades.familia : ""
  //     }&subfamilia=${
  //       filtrosAplicadosUnidades.subfamilia ? filtrosAplicadosUnidades.subfamilia : ""
  //     }&search=${busquedaAplicada ? busquedaAplicada : ""}&page=${newCurrentPage}`
  //   );

  //   setCurrentPage(newCurrentPage);
  // };

  return (
    <Container style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <Row className="text-center mb-3">
        <h3 className="m-0">Lista de Refacciones</h3>
      </Row>
      

      {/* <div class="contenedor-circulo">
        <div class="circulo verde"></div>
        <span>No atendida</span>
    </div>
    <div class="contenedor-circulo">
        <div class="circulo rojo"></div>
        <span>En proceso</span>
    </div>
    <div class="contenedor-circulo">
        <div class="circulo amarillo"></div>
        <span>Cerrada</span>
    </div> */}

      {/* {userRol !== "Operador" && (
        <Row className="mb-3 justify-content-center">
          <div className="col-12 col-sm-7">
            <SearchInput
              ordenes={ordenes}
              setOrdenes={setOrdenes}
              setCurrentPage={setCurrentPage}
              setFinalPage={setFinalPage}
             
              url={process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/pedidos/?search="}
              setIsLoading={setIsLoading}
              setTotalUnidades={setTotalUnidades}
              setBusquedaAplicada={setBusquedaAplicada}
              setFiltrosAplicadosPedidos={setFiltrosAplicadosPedidos}
              setFechasFiltroAplicados={setFechasFiltroAplicados}
            />
          </div>
        </Row>
      )} */}

      {/* {userRol !== "Operador" && ( 
         <FormFiltrosUnidades
          setFiltrosAplicadosUnidades={setFiltrosAplicadosUnidades}
          setOrdenes={setOrdenes}
          
          setTotalUnidades={setTotalUnidades}
          setIsLoading={setIsLoading}
          setCurrentPage={setCurrentPage}
          setFinalPage={setFinalPage}
          fechasFiltroAplicados={fechasFiltroAplicados}
          setFechasFiltroAplicados={setFechasFiltroAplicados}
          setBusquedaAplicada={setBusquedaAplicada}
          filtrosAplicadosUnidades={filtrosAplicadosUnidades}
          busquedaAplicada={busquedaAplicada}
        /> 
       )}  */}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Row>
          {/* {sumaM3 && totalPedidos && (
            <div className="d-flex">
              <div>
                <strong>Pedidos:</strong> {totalPedidos}
              </div>
              <div className="mx-3">
                <strong>Suma de M3:</strong> {sumaM3}
              </div>
            </div>
          )} */}
          {/* <TablaOrdenesTrabajo ordenes={ordenes} setOrdenes={setOrdenes} /> */}
          
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