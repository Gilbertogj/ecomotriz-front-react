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

// const formInitialState = {
//     status: "",
//     empresa_responsable: "",
//     categoria: "",
//     familia: "",
//     subfamilia: "",
   
//   };

export const ListaOrdenesTrabajoPage = () => {
  const [unidades, setUnidades] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
//   const [filtrosAplicadosUnidades, setFiltrosAplicadosUnidades] =
//     useState(formInitialState);
//     const [totalUnidades, setTotalUnidades] = useState(null);




  const [busquedaAplicada, setBusquedaAplicada] = useState("");
  const [fechasFiltroAplicados, setFechasFiltroAplicados] = useState("");

  const { authtoken, dispatch, setCurrentUser, userRol } =
    useContext(ReactReduxContext);

//   useEffect(() => {
//     fetchUnidades(`${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/`);
//   }, [authtoken]);
  

  const fetchUnidades = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url ,authtoken, dispatch, setCurrentUser);
    setUnidades(data.results);
    setFinalPage(Math.ceil(data.count / 10));

    setIsLoading(false);
  
  };

  // const changePage = (num) => {
  //   const newCurrentPage = currentPage + num;

  //   fetchUnidades(
  //     `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/?search=${
  //       busquedaAplicada ? busquedaAplicada : ""
  //     }&page=${newCurrentPage}`
  //   );

  //   setCurrentPage(newCurrentPage);
  // };

//   const changePage = (num) => {
//     const newCurrentPage = currentPage + num;

//     fetchUnidades(
//       `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/?empresa_alta=${
//         filtrosAplicadosUnidades.empresa_alta ? filtrosAplicadosUnidades.empresa_alta : ""
//       }&fecha_intervalo=${
//         fechasFiltroAplicados ? fechasFiltroAplicados : ""
//       }&categoria=${
//         filtrosAplicadosUnidades.categoria
//           ? filtrosAplicadosUnidades.categoria
//           : ""
//       }&familia=${
//         filtrosAplicadosUnidades.familia ? filtrosAplicadosUnidades.familia : ""
//       }&subfamilia=${
//         filtrosAplicadosUnidades.subfamilia ? filtrosAplicadosUnidades.subfamilia : ""
//       }&search=${busquedaAplicada ? busquedaAplicada : ""}&page=${newCurrentPage}`
//     );

//     setCurrentPage(newCurrentPage);
//   };

  return (
    <Container style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <Row className="text-center mb-3">
        <h3 className="m-0">Lista de Órdenes de Trabajo</h3>
      </Row>

      {/* {userRol !== "Operador" && (
        <Row className="mb-3 justify-content-center">
          <div className="col-12 col-sm-7">
            <SearchInput
              unidades={unidades}
              setUnidades={setUnidades}
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
          setUnidades={setUnidades}
          
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
          <TablaOrdenesTrabajo unidades={unidades} setUnidades={setUnidades} />
          
          {/* <BotonesPaginacionTablas
            currentPage={currentPage}
            finalPage={finalPage}
            changePage={changePage}
            
          /> */}
        </Row>
      )}
    </Container>
  );
};