import React , { useState} from "react";
import { useParams, useLocation  } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetallesOrdenTrabajo } from "../../components/detalles-orden-trabajo/DetallesOrdenTrabajo.js";
import { SolicitudRefacciones } from "../../components/solicitud-refacciones/SolicitudRefacciones.js";
import { DetallesSolicitudRefacciones } from "../../components/detalles-solicitud-refacciones/DetallesSolicitudRefacciones.js";

import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

// import "./InformacionFinancieraPage.styles.scss";

export const DetallesSolicitudRefaccionesPage = () => {
  const { idSolicitud } = useParams();
  const { idOrden } = useParams();
  const { pathname } = useLocation();
  // const [isLoading, setIsLoading] = useState(false);
  

  // const { data, isLoading } = useFetchAndLoading(
  //   `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partsrequests/${idSolicitud}/`,
  //   idSolicitud
  // );

  const { data, isLoading } = useFetchAndLoading(
    `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partsrequests/${idSolicitud}/`,
    idSolicitud
  );


  return (
    <>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DetallesSolicitudRefacciones solicitudData={data} />
        // <p>hola aqui si funciona 22 </p>
      )}
  


    </>
  );
};