import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { SuccessModal } from "../success-modal/SuccessModal";

export const TablaPedidos = ({ pedidos, setPedidos }) => {

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
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedido.id}/update/`,
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
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedido.id}/update/`,
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
              <th>Fecha de entrega</th>
              <th>Horario</th>
              <th>M3</th>
              <th>Más ajuste</th>
              <th>Diseño</th>
              <th>Forma</th>
              <th>Obra</th>
              {pathname.includes("logistica") && <th>Estatus de pago</th>}
              {pathname.includes("logistica") &&
                userRol === "Administracion" && <th>Comprobante de pago</th>}

              <th>Estatus de pedido</th>
              <th>Fecha de solicitud</th>
              <th>Planta</th>
              <th>Asesor</th>
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
                    {pedido.m3}
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
                    {pedido.mas_ajuste}
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
                    {`${pedido.tipo}${pedido.resistencia}${pedido.edad}${pedido.tma}${pedido.revenimiento}${pedido.extensibility}${pedido.forma}`}
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
                    {pedido.forma}
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

                {pathname.includes("logistica") && (
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
                      {pedido.status_pago === "Por pagar" && "PP"}
                      {pedido.status_pago === "Crédito" && "C"}
                      {pedido.status_pago === "Pagado" && "P"}
                    </Link>
                  </td>
                )}

                {pathname.includes("logistica") &&
                  userRol === "Administracion" && (
                    <td>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={pedido.comprobante_pago}
                      >
                        {pedido.comprobante_pago ? "Ver" : "N/A"}
                      </a>
                    </td>
                  )}

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
                    {pedido.status_pedido}
                  </Link>

                  {pathname.includes("logistica") &&
                    userRol === "Administracion" && (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            handleClick(e, pedido);
                          }}
                        >
                          {pedido.status_pedido === "Activado" && "Desactivar"}
                          {pedido.status_pedido === "Desactivado" && "Activar"}
                        </button>

                        <button
                          className="btn btn-primary d-none"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </button>
                      </>
                    )}
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
                    {pedido.created_at.slice(0, 10)}
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
                    {pedido.planta_nombre === "Planta 01 León" && "P01L"}
                    {pedido.planta_nombre === "Planta 02 Puerto Interior" &&
                      "P02Pi"}
                    {pedido.planta_nombre === "Planta 03 Salida a Lagos" &&
                      "P03SL"}
                    {pedido.planta_nombre === "Planta 04 San Miguel" &&
                      "P04SMA"}
                    {pedido.planta_nombre === "PT San Pancho" && "PT SP"}
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
                    {pedido.asesor_comercial}
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
