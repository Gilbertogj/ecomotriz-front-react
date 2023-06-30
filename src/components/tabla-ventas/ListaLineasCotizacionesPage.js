import React from "react";

import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { TablaLineasCotizaciones } from "../../components/tabla-lineas-cotizaciones/TablaLineasCotizaciones";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";



export const ListaLineasCotizacionesPage = () => {


  const { id } = useParams();



  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/lineas/?obra=${id}`,
    id
  );
  const lineas = data


  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <TablaLineasCotizaciones lineas={lineas} />


      )}
    </>
  );
};
