import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DeleteClientButton } from "../delete-client-button/DeleteClientButton";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";


export const DetalleTransito = ({ detallesTransito, urlId }) => {
  const { pathname } = useLocation();

  return (
    <div className="container">
      {detallesTransito.id ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ width: "40px" }} className="invisible">
              .
            </div>
            <div className="text-center">
              <h2>Información de Tránsito </h2>
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
                
              
              </div>
            </div>
            
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Placas: </strong> {detallesTransito.placas}
              </li>
              <li className="list-group-item">
                <strong>Foto placas frontal:</strong> 
                {detallesTransito.foto_placas_frontal ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.foto_placas_frontal}
              >
                Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto placas trasera:</strong> 
                {detallesTransito.foto_placas_trasera ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.foto_placas_trasera}
              >
                Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto tarejta de circulación:</strong> 
                {detallesTransito.foto_tarjeta_circulacion ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.foto_tarjeta_circulacion}
              >
                Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Operador: </strong> {detallesTransito.operador}
              </li>
              <li className="list-group-item">
                <strong>Foto del operador:</strong> 
                {detallesTransito.foto_operador ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.foto_operador}
              >
                Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Fecha de vencimiento de la licencia: </strong> {detallesTransito.fecha_vencimiento_licencia}
              </li>
              <li className="list-group-item">
                <strong>Foto frontal licencia del operador:</strong> 
                {detallesTransito.foto_licencia_operador_frontal ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.foto_licencia_operador_frontal}
              >
                Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto posterior licencia del operador:</strong> 
                {detallesTransito.foto_licencia_operador_posterior ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.foto_licencia_operador_posterior}
              >
                Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Fecha de inicio de operación: </strong> {detallesTransito.fecha_inicio_operacion}
              </li>
              <li className="list-group-item">
                <strong>Carta responsiva de entrega:</strong> 
                {detallesTransito.carta_responsiva_entrega ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.carta_responsiva_entrega}
              >
                Archivo
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Carta responsiva de operador:</strong> 
                {detallesTransito.carta_responsiva_operador ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.carta_responsiva_operador}
              >
                Archivo
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Permiso de carca SCT:</strong> 
                {detallesTransito.permiso_carga_sct ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.permiso_carga_sct}
              >
                Archivo
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Permiso de la empresa:</strong> 
                {detallesTransito.permiso_empresa ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.permiso_empresa}
              >
                Archivo
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Verificación Estatal:</strong> 
                {detallesTransito.verificacion_estatal ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.verificacion_estatal}
              >
                Archivo
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Verificación Federal:</strong> 
                {detallesTransito.verificacion_federal ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesTransito.verificacion_federal}
              >
                Archivo
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              


              













              
              
              
            </ul>
          </div>

          <div className="d-flex justify-content-end mt-2 ">
            

            

            
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