import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DeleteClientButton } from "../delete-client-button/DeleteClientButton";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";
import SliderUnidad from "../BoostrapCarousel/SliderUnidad.js"
import SliderMotor from "../BoostrapCarousel/SliderMotor.js"

import "./DetalleUnidadOrden.styles.scss";



export const DetalleUnidadOrden = ({ detallesUnidad, urlId }) => {
  const { pathname } = useLocation();

  return (
    
    <div className="container">
      
      {detallesUnidad.id ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ width: "40px" }} className="invisible">
              .
            </div>
            <div className="text-center">
              <h2>{detallesUnidad.nombre }</h2>
            </div>
            <div>
              {/* <div className="d-flex  flex-column align-items-center">
                
                    <Link
                      to={`/unidades/editar-unidad/${detallesUnidad.id}`}
                    >
                      <div style={{ width: "40px" }}>
                        <EditarLogo />
                      </div>
                    </Link>    
              </div> */}
             
              
              
            </div>
            
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Número económico: </strong> {detallesUnidad.numero_economico}
              </li>
              <li className="list-group-item">
                <strong>Nombre:</strong> {detallesUnidad.nombre} 
              </li>
              <li className="list-group-item">
                <strong>Estatus de la unidad: </strong> {detallesUnidad.status_unidad}
              </li>
              <li className="list-group-item">
                <strong>Ubicación resguardo:</strong>{detallesUnidad.ubicacion_resguardo ? detallesUnidad.ubicacion_resguardo: "N/A"}
              </li>
              <li className="list-group-item">
                <strong>Categoría:</strong> {detallesUnidad.categoria}
              </li>
              <li className="list-group-item">
                <strong>Familia:</strong> {detallesUnidad.familia}
               
              </li>
              <li className="list-group-item">
                <strong>Subfamilia:</strong> {detallesUnidad.subfamilia ? detallesUnidad.subfamilia: "N/A"}
              </li>
              <li className="list-group-item">
                <strong>Año de la unidad:</strong>{" "}{detallesUnidad.ano_unidad}
              </li>
              <li className="list-group-item">
                <strong>Marca de la unidad: </strong> {detallesUnidad.marca_unidad}
              </li>
              <li className="list-group-item">
                <strong>Modelo de la unidad:</strong> {detallesUnidad.modelo}
              </li>
              <li className="list-group-item">
                <strong>Número de serie de la unidad:</strong> {detallesUnidad.numero_serie_unidad}
              </li>
              <li className="list-group-item">
                <strong>Tipo de combustible:</strong> {detallesUnidad.tipo_combustible}
              </li>

              <li className="list-group-item">
              <strong>Fotografías de la unidad:</strong>
              <SliderUnidad
                
                
                frontal={detallesUnidad.fotografia_frontal}
                derecha={detallesUnidad.fotografia_derecha}
                izquierda={detallesUnidad.fotografia_izquierda}
                trasera={detallesUnidad.fotografia_trasera}
                cabina={detallesUnidad.fotografia_cabina}
                placa={detallesUnidad.fotografia_placa_identificacion}

                />


              </li>
              
              {/* <li className="list-group-item">
                <strong>Fotografía frontal:</strong> 
                {detallesUnidad.fotografia_frontal ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.fotografia_frontal}
              >
                Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto lateral derecha:</strong> 
                {detallesUnidad.fotografia_derecha ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.fotografia_derecha}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto lateral izquierda:</strong> 
                {detallesUnidad.fotografia_izquierda ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.fotografia_izquierda}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong> Foto trasera:</strong> 
                {detallesUnidad.fotografia_trasera ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.fotografia_trasera}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto cabina:</strong> 
                {detallesUnidad.fotografia_cabina ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.fotografia_cabina}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto placa identificación:</strong> 
                {detallesUnidad.fotografia_placa_identificacion ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.fotografia_placa_identificacion}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li> */}

              
              <li className="list-group-item">
                <strong>Marca motor:</strong> {detallesUnidad.marca_motor}
                
              </li>
              <li className="list-group-item">
                <strong>Modelo motor:</strong> {detallesUnidad.modelo_motor}
              </li>
              <li className="list-group-item">
                <strong>Numero serie del motor:</strong> {detallesUnidad.numero_serie_motor}
              </li>
              <li className="list-group-item">
                <strong>Número de serie del chasis:</strong> {detallesUnidad.numero_serie_chasis}
              </li>

              <li className="list-group-item">
              <strong>Fotografías del motor:</strong>
              <SliderMotor
                
                
                frontal={detallesUnidad.foto_motor_frontal}
                derecha={detallesUnidad.foto_lateral_dereacha}
                izquierda={detallesUnidad.foto_lateral_izquierda}
                serie={detallesUnidad.foto_numero_serie_motor}
                chasis={detallesUnidad.foto_numero_serie_chasis}
                

                />


              </li>


              {/* <li className="list-group-item">
                <strong>Foto frontal del motor:</strong> 
                {detallesUnidad.foto_motor_frontal ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.foto_motor_frontal}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto lateral derecha del motor:</strong>
                {detallesUnidad.foto_lateral_dereacha ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.foto_lateral_dereacha}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto lateral izquierda del motor:</strong> 
                {detallesUnidad.foto_lateral_izquierda ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.foto_lateral_izquierda}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              <li className="list-group-item">
                <strong>Foto del número de serie motor:</strong> 
                {detallesUnidad.foto_numero_serie_motor ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.foto_numero_serie_motor}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li>
              
              <li className="list-group-item">
                <strong>Foto número de serie del chasis:</strong> 
                {detallesUnidad.foto_numero_serie_chasis ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={detallesUnidad.foto_numero_serie_chasis}
              >
                {" "}Imagen
              </a>
            ) : (
              " No hay imagen"
            )}
              </li> */}
              <li className="list-group-item">
                <strong>Comentarios generales:</strong> {detallesUnidad.comentarios_generales}
              </li>
              {/* <li className="list-group-item">
                <strong>Fecha de creación:</strong>{" "}
                {detallesCliente.created_at.slice(0, 10)}
                prueba
              </li> */}
              
            </ul>
          </div>

     
        {/* <div className="d-flex justify-content-end mt-2 ">
             <Link
             to={`/unidades/unidad/${detallesUnidad.id}/inventario`}
             className="btn mb-2"
             style={{ backgroundColor: "#FFC107", color: "black" }}
           >
             Ver Inventario de la unidad
           </Link>     
        </div>

          <div className="d-flex justify-content-end mt-2 ">

          {detallesUnidad.informacion_financiera.id?
             <Link
             to={`/unidades/unidad/${detallesUnidad.id}/informacion-financiera/${detallesUnidad.informacion_financiera.id}`}
             className="btn mb-2"
             style={{ backgroundColor: "#00C08B", color: "white" }}
           >
             Ver Información Financiera de la Unidad
           </Link>
            : 
            <Link
              to={`/unidades/agregar-informacion-financiera/${detallesUnidad.id}`}
              className="btn mb-2"
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              Agregar Informacion Financiera de la Unidad
            </Link>

          }
              
          </div>
          <div className="d-flex justify-content-end mt-2 ">
          {detallesUnidad.seguro.id?
             <Link
              to={`/unidades/unidad/${detallesUnidad.id}/seguro/${detallesUnidad.seguro.id}`}
              className="btn mb-2"
              style={{ backgroundColor: "#00C08B", color: "white" }}
             >
              Ver Seguro de la Unidad
             </Link>
            : 
            <Link
              to={`/unidades/agregar-seguro/${detallesUnidad.id}`}
              className="btn mb-2"
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              Agregar Seguro a la unidad
            </Link>

          }
            

         
      
        </div>

        <div className="d-flex justify-content-end mt-2 ">

        {detallesUnidad.transito.id?
             <Link
             to={`/unidades/unidad/${detallesUnidad.id}/transito/${detallesUnidad.transito.id}`}
             className="btn mb-2"
             style={{ backgroundColor: "#00C08B", color: "white" }}
           >
             Ver Tránsito de la unidad 
           </Link>
            : 
            <Link
              to={`/unidades/agregar-transito/${detallesUnidad.id}`}
              className="btn mb-2"
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              Agregar Tránsito de la Unidad
            </Link>

          }


            
           
        </div> */}

        <div className="d-flex justify-content-end mt-2 ">

        <Link
                to={`/ordenes-trabajo/unidades-orden/${detallesUnidad.id}/crear-orden`}
                className="btn  mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Continuar
              </Link>

        


            
           
        </div>

       


        
        </>
      ) : (
        <p>No existe la unidad #{urlId} </p>
       
      
      )}
    </div>
  );
};