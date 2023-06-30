import React, { useEffect, useState, useMemo, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { TablaRegistrosProduccion } from "../../components/tabla-registros-produccion/TablaRegistrosProduccion";

export const ListaRegistrosPage = () => {
  const [registros, setRegistros] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const fechaHoyString = useMemo(() => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);

    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    fetchRegistros(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/registro_produccion/?search=${fechaHoyString}`
    );
  }, [authtoken]);

  const fetchRegistros = async (url) => {
    setIsLoading(true);
    const data = await fetchData(url, authtoken, dispatch, setCurrentUser);
    setRegistros(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
    setIsLoading(false);
  };

  const changePage = (url) => {
    fetchRegistros(url);
  };

  return (
    <Container style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <Row className="text-center mb-3">
        <h3 className="m-0">Lista de Registros</h3>
      </Row>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Row>
          <TablaRegistrosProduccion registros={registros} />
          <div className="text-center mb-3">
            {prevPage && (
              <Button
                variant="outline-primary"
                onClick={() => {
                  changePage(prevPage);
                }}
              >
                Anterior
              </Button>
            )}
            {nextPage && (
              <Button
                variant="outline-primary"
                onClick={() => {
                  changePage(nextPage);
                }}
              >
                Siguiente
              </Button>
            )}
          </div>
        </Row>
      )}
    </Container>
  );
};
