import React from "react";
import Accordion from "react-bootstrap/Accordion";

export const DetallesPedidoAcordeon = ({ pedidoData }) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Detalles de Pedido</Accordion.Header>
        <Accordion.Body>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Id:</strong> {pedidoData.id}
            </li>
            <li className="list-group-item">
              <strong>Cliente:</strong> {pedidoData.cliente_nombre}
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
              {pedidoData.obra_nombre
                ? pedidoData.obra_nombre
                : pedidoData.obra}
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
                  Imágen o Archivo
                </a>
              ) : (
                "No hay comprobante de pago"
              )}
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
