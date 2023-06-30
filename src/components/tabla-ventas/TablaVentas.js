import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { SuccessModal } from "../success-modal/SuccessModal";

export const TablaVentas = ({ pedidos, setPedidos }) => {
  const [show, setShow] = useState(false);

  const { pathname } = useLocation();

  const { authtoken, dispatch, userRol } = useContext(ReactReduxContext);

  const handleClose = () => setShow(false);
  

  const handleClick = async (e, pedido) => {
    try {
      e.target.classList.add("d-none");

      e.target.nextSibling.classList.remove("d-none");

      let formData = new FormData();

      let status_pedido;

      if (pedido.status_pedido === "Desactivado") {
        status_pedido = "Activado";
      }

      if (pedido.status_pedido === "Activado") {
        status_pedido = "Desactivado";
      }

      formData.append("status_pedido", status_pedido);

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/ventas/`,
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
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/ventas/`,
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
        setPedidos((prevState) => {
          const arr = [...prevState];

          const arrElementsStringifed = arr.map((el) => JSON.stringify(el));

          const idx = arrElementsStringifed.indexOf(JSON.stringify(pedido));

          arr.splice(idx, 1, json);

          return arr;
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      e.target.nextSibling.classList.add("d-none");
      e.target.classList.remove("d-none");
    }
  };

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
              <th>Cliente</th>
              <th>Alias</th>
              <th>Obra</th>
              <th>Diseño</th>
              <th>Precio</th>
              <th>Asesor</th>
              <th>Método de Pago</th>
              <th>Uso de CFDI</th>
              <th>Forma de factruración</th>
              <th>Tipo de Pago</th>
              <th>RFC</th>
              <th>Tipo de Venta</th>
              <th>Fecha de entrega</th>
              <th>Horario</th>
              <th>Fecha de solicitud</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr
                key={pedido.id}
                className={`${
                  pathname.includes("logistica")
                    ? userRol === "Administracion"
                      ? pedido.status_pedido === "Activado"
                        ? "table-success"
                        : "table-danger"
                      : ""
                    : pathname.includes("produccion")
                    ? userRol === "Operador"
                      ? pedido.reporte_operador.salida_planta &&
                        (!pedido.reporte_operador.llegada_obra ||
                          !pedido.reporte_operador.inicio_bombeo ||
                          !pedido.reporte_operador.fin_bombeo ||
                          !pedido.reporte_operador.incidencia)
                        ? "table-warning"
                        : pedido.reporte_operador.causa_retraso
                        ? "table-success"
                        : "table-danger"
                      : pedido.status_pedido === "Activado"
                      ? "table-success"
                      : "table-danger"
                    : ""
                }`}
              >
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.cliente_nombre}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.cliente_alias}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.obra_nombre}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.cotizacion_diseño}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.cotizacion_precio}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.asesor_nombre}
                  </Link>
                </td>
                
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.condicion_venta.metodo_pago}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.condicion_venta.CFDI}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.condicion_venta.tipo_facturacion}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.pago}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.rfc}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.tipo_venta}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.fecha_pedido.slice(0, 10)}
                  </Link>
                </td>
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.fecha_pedido.slice(11, 16)}
                  </Link>
                </td>
                
                
                {/* <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {`${pedido.tipo}${pedido.resistencia}${pedido.edad}${pedido.tma}${pedido.revenimiento}${pedido.forma}`}
                  </Link>
                </td> */}
                

                  
                <td>
                  <Link
                    to={
                      pathname.includes("logistica")
                        ? `/concreco/logistica/pedido/${pedido.id}`
                        : pathname.includes("produccion")
                        ? `/concreco/produccion/pedido/${pedido.id}`
                        : pathname.includes("dashboard") &&
                          `/concreco/dashboard/pedido/${pedido.id}`
                    }
                  >
                    {pedido.created_at.slice(0, 10)}
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
