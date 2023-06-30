import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { SuccessModal } from "../success-modal/SuccessModal";

export const TablaUnidades = ({ unidades, setUnidades }) => {
  console.log(unidades);
  const [show, setShow] = useState(false);

  const { pathname } = useLocation();

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

  return (
    <>
      <SuccessModal
        show={show}
        handleClose={handleClose}
        title="Pedido actualizado"
      />
      <div className="table-responsive p-0">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Número económico</th>
              <th>Nombre (Descripción)</th>
              <th>Categoría</th>
              <th>Familia</th>
              <th>Subfamilia</th>
              <th>Marca</th>
              <th>Modelo</th>
             
            </tr>
          </thead>
          <tbody>
            {unidades.map((unidad) => (
              <tr
                key={unidad.id}
                className="table-row"
                
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
                    to={ `/unidades/unidad/${unidad.id}`
                    }
                  >
                    {unidad.numero_economico}
             
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                    //   pathname.includes("logistica")
                    //     ? `/concreco/logistica/pedido/${pedido.id}`
                    //     : pathname.includes("produccion")
                    //     ? `/concreco/produccion/pedido/${pedido.id}`
                    //     : pathname.includes("dashboard") &&
                    //       `/concreco/dashboard/pedido/${pedido.id}`
                    `/unidades/unidad/${unidad.id}`
                    }
                  >
                    {unidad.nombre}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                    `/unidades/unidad/${unidad.id}`
                    }
                  >
                    {unidad.categoria}
                   
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                    `/unidades/unidad/${unidad.id}`
                    }
                  >
                    {unidad.familia}
                  
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                    `/unidades/unidad/${unidad.id}`
                    }
                  >
                    {unidad.subfamilia}
                  
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                    `/unidades/unidad/${unidad.id}`
                    }
                  >
                     {unidad.marca}
                   
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                    `/unidades/unidad/${unidad.id}`
                    }
                  >
                    {unidad.modelo}
                  
                  </Link>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
