import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { SuccessModal } from "../success-modal/SuccessModal";

export const TablaRefaccionesCompras = ({ refacciones, setRefacciones }) => {
  // console.log(ordenes);
  const [show, setShow] = useState(false);

  const { pathname } = useLocation();
  const [nuevoPrecio, setNuevoPrecio] = useState();

  const { authtoken, dispatch, userRol } = useContext(ReactReduxContext);

  const handleClose = () => setShow(false);

  // const handleClick = async (e, pedido) => {
  //   try {
  //     e.target.classList.add("d-none");

  //     e.target.nextSibling.classList.remove("d-none");

  //     let formData = new FormData();

  //     let status_pedido;

  //     if (pedido.status_pedido === "Desactivado") {
  //       status_pedido = "Activado";
  //     }

  //     if (pedido.status_pedido === "Activado") {
  //       status_pedido = "Desactivado";
  //     }

  //     formData.append("status_pedido", status_pedido);

  //     let data = await fetch(
  //       `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedido.id}/update/`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Token ${authtoken}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     let json = await data.json();

  //     if (json.expired) {
  //       dispatch(setCurrentUser({ token: json.token }));

  //       data = await fetch(
  //         `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedido.id}/update/`,
  //         {
  //           method: "PATCH",
  //           headers: {
  //             Authorization: `Token ${json.token}`,
  //           },
  //           body: formData,
  //         }
  //       );

  //       json = await data.json();
  //     }

  //     if (data.status === 201 || data.status === 200) {
  //       setShow(true);
  //       setPedidos((prevState) => {
  //         const arr = [...prevState];

  //         const arrElementsStringifed = arr.map((el) => JSON.stringify(el));

  //         const idx = arrElementsStringifed.indexOf(JSON.stringify(pedido));

  //         arr.splice(idx, 1, json);

  //         return arr;
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert(error);
  //   } finally {
  //     e.target.nextSibling.classList.add("d-none");
  //     e.target.classList.remove("d-none");
  //   }
  // };

  const handlePrecioChange = (event) => {
    setNuevoPrecio(parseFloat(event.target.value)); // Actualiza el estado del nuevo precio
  };

  const handleClick = async (e, refaccion) => {
    try {
      e.target.classList.add("d-none");

      e.target.nextSibling.classList.remove("d-none");

      let formData = new FormData();

      let status;
      let bought;


      if (refaccion.status=== "Por Suministrar") {
        status = "Suministrado";
        bought = false;
        
      }

      if (refaccion.status === "Suministrado") {
        status = "Por Suministrar";
        bought = true;
      }

      formData.append("status", status);
      formData.append("bought", bought);

      let data = await fetch(
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/${refaccion.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/${refaccion.id}/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 201 || data.status === 200) {
        setShow(true);
        // setPedidos((prevState) => {
        //   const arr = [...prevState];

        //   const arrElementsStringifed = arr.map((el) => JSON.stringify(el));

        //   const idx = arrElementsStringifed.indexOf(JSON.stringify(pedido));

        //   arr.splice(idx, 1, json);

        //   return arr;
        // });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      e.target.nextSibling.classList.add("d-none");
      e.target.classList.remove("d-none");
    }
  };

  const handleClickPrecio = async (e, refaccion) => {
    try {
      e.target.classList.add("d-none");

      e.target.nextSibling.classList.remove("d-none");

      let formData = new FormData();
    

    
      formData.append("price", nuevoPrecio);
      

      let data = await fetch(
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/${refaccion.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/${refaccion.id}/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 201 || data.status === 200) {
        setShow(true);
        // setPedidos((prevState) => {
        //   const arr = [...prevState];

        //   const arrElementsStringifed = arr.map((el) => JSON.stringify(el));

        //   const idx = arrElementsStringifed.indexOf(JSON.stringify(pedido));

        //   arr.splice(idx, 1, json);

        //   return arr;
        // });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      e.target.nextSibling.classList.add("d-none");
      e.target.classList.remove("d-none");
    }
  };

  const handleReload = () => {
    window.location.reload(); // Reload the page when the button is clicked
  };

  return (
    <>
      <SuccessModal
        show={show}
        handleClose={handleReload}
        title="Linea de Refaccion Actualizada"
      />
      <div className="table-responsive p-0">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
            <th>Folio Orden</th>
            <th>Folio Solicitud Refacciones</th>
            <th>Cantidad</th>
              <th>Número de parte</th>
              <th>Descripción</th>
              <th>Precio</th>
            
              <th>Compras </th>
              
             
            </tr>
          </thead>
          <tbody>
            {refacciones.map((refaccion) => (
              <tr
                key={refaccion.id}

                // className={`${
                
                //      orden.status === "Closed"
                //         ? "table-success"
                //         :  orden.status === "Open"
                //         ? "table-danger"
                //       : "table-warning"
                   
                // }`}
                // className="table-row"
                
                // {`${
                //   pathname.includes("logistica")
                //     ? userRol === "Administracion"
                //       ? pedido.status_pedido === "Activado"
                //         ? "table-success"
                //         : "table-danger"
                //       : ""
                //     : pathname.includes("produccion")
                //     ? userRol === "Operador"
                //       ? pedido.reporte_operador.salida_planta &&
                //         (!pedido.reporte_operador.llegada_obra ||
                //           !pedido.reporte_operador.inicio_bombeo ||
                //           !pedido.reporte_operador.fin_bombeo ||
                //           !pedido.reporte_operador.incidencia)
                //         ? "table-warning"
                //         : pedido.reporte_operador.causa_retraso
                //         ? "table-success"
                //         : "table-danger"
                //       : pedido.status_pedido === "Activado"
                //       ? "table-success"
                //       : "table-danger"
                //     : ""
                // }`}
              >
                <td>
                  <Link
                    to={ `/ordenes-trabajo/orden/${refaccion.parts_request}`
                    }
                  >
                    {refaccion.id}
             
                  </Link>
                </td>
                <td>
                  <Link
                    to={ `/ordenes-trabajo/orden/${refaccion.parts_request}`
                    }
                  >
                    {refaccion.id}
             
                  </Link>
                </td>
                <td>
                  <Link
                    to={ `/ordenes-trabajo/orden/${refaccion.parts_request}`
                    }
                  >
                    {refaccion.quantity}
             
                  </Link>
                </td>
                <td>
                  <Link
                    to={ `/ordenes-trabajo/orden/${refaccion.parts_request}`
                    }
                  >
                    {refaccion.part_data[0].sae_key}
             
                  </Link>
                </td>
                <td>
                  <Link
                    to={ `/ordenes-trabajo/orden/${refaccion.parts_request}`
                    }
                  >
                    {refaccion.part_data[0].description}
             
                  </Link>
                </td>
                <td>
                  

                <input
                          type="number"
                          className="col-6"
                          id="price"
                          name="price"
                          // value={}
                          onChange={handlePrecioChange}
                          // onChange={(e) => {
                          //   changeDiseñoInput(e, diseño);
                          //   actualizarSubtotal(diseño);
                          // }}
                          autoComplete="off"
                          // required
                          // onWheel={(e) => {
                          //   e.target.blur();
                          // }}
                        />
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            handleClickPrecio(e, refaccion);
                          }}
                        >
                          {"Actualizar precio"}
                        
                        </button>
            <button
                          className="btn btn-primary d-none"
                          type="checkbox"
                          
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </button>
             
                
                </td>

                <td>{refaccion.status}
            <button
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            handleClick(e, refaccion);
                          }}
                        >
                          {refaccion.status === "Suministrado" && "Por Suministrar"}
                          {refaccion.status === "Por Suministrar" && "Suministrado"}
                        </button>
            <button
                          className="btn btn-primary d-none"
                          type="checkbox"
                          
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </button>
            </td>

            <td>{refaccion.bought ? "SÍ" : "NO"}</td>

        
        

     
               
                
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
