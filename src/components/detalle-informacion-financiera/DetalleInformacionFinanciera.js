import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { DeleteClientButton } from "../delete-client-button/DeleteClientButton";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";


export const DetalleInformacionFinanciera = ({ detallesInfoFinanciera, urlId }) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { idFinanzas } = useParams();

  return (
    <div className="container">
      {detallesInfoFinanciera.id ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ width: "40px" }} className="invisible">
              .
            </div>
            <div className="text-center">
              <h2>Informacion Financiera </h2>
            </div>
            <div>
              <div className="d-flex  flex-column align-items-center">
                {/* {detallesCliente.id &&
                  pathname.includes("logistica") &&
                  !pathname.includes("realizar-pedido") && ( */}
                    {/* <Link
                      to={`/concreco/logistica/editar-cliente/${detallesCliente.id}`}
                    > */}
                      <div style={{ width: "40px" }}>
                        <EditarLogo />
                      </div>
                    {/* </Link> */}
                   {/* )} */}
              
               
                {/* {detallesCliente.id && !pathname.includes("pedido") && (
                  <DeleteClientButton />
                )} */}
                {/* <Link
                to={`/unidades/unidad/${detallesInfoFinanciera.id}/financiera/1`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Ver Información Financiera
              </Link> */}
              
              </div>
            </div>
            
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Empresa alta finanzas: </strong> {detallesInfoFinanciera.empresa_alta}
              </li>
              <li className="list-group-item">
                <strong>Empresa responsable:</strong> {detallesInfoFinanciera.empresa_responsable}
              </li>
              <li className="list-group-item">
                <strong>Año de compra: </strong> {detallesInfoFinanciera.ano_compra}
              </li>
              
              {/* <li className="list-group-item">
                <strong>Fecha de creación:</strong>{" "}
                {detallesCliente.created_at.slice(0, 10)}
                prueba
              </li> */}
              
            </ul>
          </div>

          <div className="d-flex justify-content-end mt-2 ">

          <div className="d-flex justify-content-end mt-2 ">
             <Link
             to={`/unidades/informacion-financiera/${idFinanzas}/facturas`}
             className="btn mb-2"
             style={{ backgroundColor: "#00C08B", color: "white" }}
           >
            Ver Facturas
           </Link>     
        </div>
            

            

            
              {/* <Link
                to={`/unidades/unidad/${detallesUnidad.id}/financiera/1`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Ver Información Financiera
              </Link> */}
           
            {/* {pathname.includes("comercializacion") &&
              !pathname.includes("cotizacion") && (
                <Link
                  to={`/concreco/comercializacion/cliente/${detallesCliente.id}/obras`}
                  className="btn mb-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                >
                  Ver Obras
                </Link>
              )} */}
              
          </div>
          {/* <div className="d-flex justify-content-end mt-2 ">
              {pathname.includes("logistica") && !pathname.includes("pedido") && (
              <Link
                to={`/concreco/logistica/cliente/${detallesCliente.id}/condicion-venta`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Ver Condiciones de Venta
              </Link>
            )}
            </div> */}
        </>
      ) : (
        <p>No existe la unidad #{urlId} </p>
        
      
      )}
    </div>
  );
};