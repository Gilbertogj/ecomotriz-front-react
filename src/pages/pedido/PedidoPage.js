import React, { useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { DetallesPedido } from "../../components/detalles-pedido/DetallesPedido";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";
import { RegistrosProduccion } from "../../components/registros-produccion/RegistrosProduccion";
import { RegistroProduccionOperador } from "../../components/registro-produccion-operador/RegistroProduccionOperador";
import { SelectNumeroBomba } from "../../components/select-numero-bomba/SelectNumeroBomba";

export const PedidoPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { data, setData, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${id}/`,
    id
  );

  const { userRol } = useContext(ReactReduxContext);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data.id ? (
            <>
              <DetallesPedido pedidoData={data} />
              {pathname.includes("produccion") && userRol !== "Operador" && (
                <>
                  <RegistrosProduccion
                    estatusPedido={data.status_pedido}
                    pedidoData={data}
                    setData={setData}
                  />
                  {data.status_pedido === "Activado" &&
                    data.forma === "B" &&
                    (userRol === "Produccion" || userRol === "Dosificador") && (
                      <>
                        <RegistroProduccionOperador
                          reporteOperador={data.reporte_operador}
                        />
                        <SelectNumeroBomba
                          tipoBomba={data.tipo_bomba}
                          numeroBomba={data.numero_bomba}
                          setData={setData}
                        />
                      </>
                    )}
                </>
              )}

              {userRol === "Operador" &&
                !data.reporte_operador.incidencia &&
                data.reporte_operador.id && (
                  <Link
                    to={`/concreco/produccion/crear-reporte-operador/${data.reporte_operador.id}`}
                    className="btn btn-success mt-3"
                  >
                    {data.reporte_operador.salida_planta
                      ? "Continuar con el reporte"
                      : "Iniciar reporte"}
                  </Link>
                )}
            </>
          ) : (
            <p>No existe el pedido #{id}</p>
          )}
        </>
      )}
    </>
  );
};
