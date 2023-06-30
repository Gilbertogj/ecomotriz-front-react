import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { DeletePedidoButton } from "../delete-pedido-button/DeletePedidoButton";
import { ModalRedirect } from "../modal-redirect/ModalRedirect";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";

export const DetallesPedido = ({ pedidoData }) => {
  const [form, setForm] = useState({
    status_pago: pedidoData.status_pago,
    status_pedido: pedidoData.status_pedido === "Desactivado" ? false : true,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch, userRol } = useContext(ReactReduxContext);

  const { pathname } = useLocation();
  console.log(userRol)
  const nuevoComprobantePagoRef = useRef();
  const actualizarEstatusBtnRef = useRef();
  const statusPedidoRef = useRef();
  const nuevaconstanciaFiscalRef = useRef();

  useEffect(() => {
    if (pathname.includes("logistica")) {
      if (pedidoData.status_pedido === "Activado") {
        if (userRol === "Administracion") {
          statusPedidoRef.current.checked = true;
        }
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    actualizarEstatusBtnRef.current.disabled = false;

    if (name === "status_pedido") {
      setForm({
        ...form,
        status_pedido: e.target.checked,
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = () => {
    actualizarEstatusBtnRef.current.disabled = false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const status_pedido = form.status_pedido ? "Activado" : "Desactivado";
    const status_pago = form.status_pago;

    let formData = new FormData();

    formData.append("status_pedido", status_pedido);
    formData.append("status_pago", status_pago);

    if (nuevoComprobantePagoRef.current.files[0]) {
      formData.append(
        "comprobante_pago",
        nuevoComprobantePagoRef.current.files[0]
      );
    }
    if (nuevaconstanciaFiscalRef.current.files[0]) {
      formData.append(
        "constancia_fiscal",
        nuevaconstanciaFiscalRef.current.files[0]
      );
    }

    let data = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedidoData.id}/update/`,
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
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedidoData.id}/update/`,
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
      setShowConfirmModal(true);
    }
  };

  return (
    <div className="container">
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text="Se ha actualizado correctamente el pedido."
        link="/concreco/logistica/pedidos"
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ width: "40px" }} className="invisible">
          .
        </div>
        <div className="text-center">
          <h2>{pedidoData.cliente_nombre}</h2>
        </div>

        <div>
          <div className="d-flex  flex-column align-items-center">
            {pedidoData.id && pathname.includes("logistica") && (
              <Link to={`/concreco/logistica/editar-pedido/${pedidoData.id}`}>
                <div style={{ width: "40px" }}>
                  <EditarLogo />
                </div>
              </Link>
            )}

            {pedidoData.id &&
              !pathname.includes("produccion") &&
              !pathname.includes("dashboard") && <DeletePedidoButton />}

            {pedidoData.id && pathname.includes("logistica") && (
              <Link to={`/concreco/logistica/duplicar-pedido/${pedidoData.id}`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Duplicar Pedido
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Id:</strong> {pedidoData.id}
          </li>
          <li className="list-group-item">
            <strong>Folio de la cotización:</strong> {pedidoData.folio_cotizacion}
          </li>
          <li className="list-group-item">
            <strong>Fecha de entrega:</strong>{" "}
            {pedidoData.fecha_pedido.slice(0, 10)}
          </li>
          <li className="list-group-item">
            <strong>Hora:</strong> {pedidoData.fecha_pedido.slice(11, 16)}
          </li>
          <li className="list-group-item">
            <strong>Obra:</strong>{" "}
            {pedidoData.obra_nombre ? pedidoData.obra_nombre : pedidoData.obra}
          </li>
          <li className="list-group-item">
            <strong>M3:</strong> {pedidoData.m3}
          </li>
          <li className="list-group-item">
            <strong>Diseño:</strong>{" "}
            {`${pedidoData.tipo}${pedidoData.resistencia}${pedidoData.edad}${pedidoData.tma}${pedidoData.revenimiento}${pedidoData.extensibility}${pedidoData.forma}`}
          </li>
          <li className="list-group-item">
            <strong>Más ajuste:</strong> {pedidoData.mas_ajuste}
          </li>
          <li className="list-group-item">
            <strong>Forma:</strong> {pedidoData.forma === "T" && "Tirado"}
            {pedidoData.forma === "B" && "Bombeado"}
            {pedidoData.forma === "BC" && "Bomba Cliente"}
          </li>
          <li className="list-group-item">
            <strong>Tipo de bomba:</strong> {pedidoData.tipo_bomba}
          </li>
          <li className="list-group-item">
            <strong>No. de bomba:</strong> {pedidoData.numero_bomba}
          </li>
          <li className="list-group-item">
            <strong>Proveedor de bomba:</strong>{" "}
            {pedidoData.proveedor_bomba || "N/A"}
          </li>
          <li className="list-group-item">
            <strong>Mts. adicionales:</strong> {pedidoData.metros_adicionales}
          </li>
          <li className="list-group-item">
            <strong>Aditivo:</strong> {pedidoData.aditivo}
          </li>
          <li className="list-group-item">
            <strong>Elemento a colar:</strong> {pedidoData.elemento_colar}
          </li>
          <li className="list-group-item">
            <strong>Observaciones:</strong> {pedidoData.observaciones}
          </li>
          <li className="list-group-item">
            <strong>Espaciado entre camiones:</strong>
            {pedidoData.espaciado_camiones}
          </li>
          <li className="list-group-item">
            <strong>Planta:</strong>{" "}
            {pedidoData.planta_nombre
              ? pedidoData.planta_nombre
              : pedidoData.planta}
          </li>
          <li className="list-group-item">
            <strong>Tiempo colado en minutos:</strong>{" "}
            {pedidoData.tiempo_colado_minutos}
          </li>
          <li className="list-group-item">
            <strong>Restricciones horario en obra:</strong>{" "}
            {pedidoData.restricciones_horario_obra}
          </li>
          <li className="list-group-item">
            <strong>Protocolo de acceso:</strong>{" "}
            {pedidoData.protocolo_acceso}
          </li>
          <li className="list-group-item">
            <strong>Confirmación del cliente:</strong>{" "}
            {pedidoData.confirmacion_cliente_escrito === true
              ? "Sí"
              : "No"}
          </li>
          <li className="list-group-item">
            <strong>Fecha de solicitud:</strong>{" "}
            {pedidoData.created_at.slice(0, 10)}{" "}
            {pedidoData.created_at.slice(11, 16)}
          </li>
          <li className="list-group-item">
            <strong>Comprobante de pago: </strong>
            {pedidoData.comprobante_pago ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={pedidoData.comprobante_pago}
              >
                Imagen o Archivo
              </a>
            ) : (
              "No hay comprobante de pago"
            )}
          </li>
          <li className="list-group-item">
            <strong>Monto pagado:</strong>{" "}
            {pedidoData.monto_pagado}
          </li>
          <li className="list-group-item">
            <strong>Observaciones del precio:</strong>{" "}
            {pedidoData.observaciones_precio}
          </li>
          <li className="list-group-item">
            <strong>Constancias Fiscal: </strong>
            {pedidoData.constancia_fiscal ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={pedidoData.constancia_fiscal}
              >
                Archivo
              </a>
            ) : (
              "No hay constancia"
            )}
          </li>
        </ul>
      </div>

      {pathname.includes("logistica") && (
        <div className="row my-3">
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
              <div className="mb-2">
                <label htmlFor="pago" className="form-label">
                  Estatus de pago
                </label>
                <select
                  id="pago"
                  name="status_pago"
                  onChange={handleChange}
                  value={form.status_pago}
                  className="form-select"
                  required
                >
                  <option value="Por pagar">Por pagar</option>
                  <option value="Pagado">Pagado</option>
                  <option value="Crédito">Crédito</option>
                </select>
              </div>

              <div className="mb-2">
                <label htmlFor="comprobante" className="form-label">
                  Comprobante de pago
                </label>
                <input
                  type="file"
                  id="comprobante"
                  className="form-control"
                  ref={nuevoComprobantePagoRef}
                  onChange={handleFileChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="constancia_fiscal" className="form-label">
                  Constancia Fiscal
                </label>
                <input
                  type="file"
                  id="constancia_fiscal"
                  className="form-control"
                  ref={nuevaconstanciaFiscalRef}
                  onChange={handleFileChange}
                />
              </div>

              {userRol === "Administracion" && (
                <div className="form-check form-switch my-3">
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Activo
                  </label>
                  <input
                    name="status_pedido"
                    onChange={handleChange}
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    className="form-check-input"
                    ref={statusPedidoRef}
                  />
                </div>
              )}
            </div>

            <input
              type="submit"
              value="Actualizar Estatus"
              className="btn btn-success"
              ref={actualizarEstatusBtnRef}
              disabled
            />
          </form>
        </div>
      )}
    </div>
  );
};
