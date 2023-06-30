import React from "react";

export const DetallesRegistroProduccion = ({ registro }) => {
  return (
    <ul className="list-group mb-3">
      <li className="list-group-item">
        <strong>Número de remisión:</strong> {registro.id_command}
      </li>
      <li className="list-group-item">
        <strong>Fecha:</strong> {registro.hora_pedido.slice(0, 10)}
      </li>
      <li className="list-group-item">
        <strong>Nombre de la obra:</strong> {registro.nombre_obra}
      </li>
      <li className="list-group-item">
        <strong>Dirección:</strong> {registro.direccion_obra}
      </li>
      <li className="list-group-item">
        <strong>Cliente:</strong> {registro.data_pedido.cliente_nombre}
      </li>
      <li className="list-group-item">
        <strong>Residente:</strong> {registro.residente_obra}
      </li>
      <li className="list-group-item">
        <strong>Teléfono residente:</strong> {registro.telefono_obra}
      </li>
      <li className="list-group-item">
        <strong>Fecha de asignación de pedido:</strong> {registro.created_at.slice(0, 10)+ " Hora: "+ registro.created_at.slice(11, 16)}
      </li>
      <li className="list-group-item">
        <strong>Hora programada de llegada:</strong> {registro.hora_pedido.slice(11, 16)}
      </li>
      <li className="list-group-item">
        <strong>Ollero:</strong>
        {registro.reporte_ollero.nombre_ollero
          ? registro.reporte_ollero.nombre_ollero
          : " No hay ollero asignado"}
      </li>
      <li className="list-group-item">
        <strong>Número de olla:</strong> {registro.numero_olla}
      </li>
      <li className="list-group-item">
        <strong>¿Es primera olla?: </strong>
        {registro.primera_olla ? "Sí" : "No"}
      </li>
      <li className="list-group-item">
        <strong>Olla consecutiva:</strong> {registro.olla_consecutiva}
      </li>
      <li className="list-group-item">
        <strong>¿Es flete de vacio?: </strong>
        {registro.flete_de_vacio ? "Sí" : "No"}
      </li>
      <li className="list-group-item">
        <strong>M3:</strong> {registro.m3}
      </li>
      <li className="list-group-item">
        <strong>Ajuste:</strong> {registro.ajuste}
      </li>
      <li className="list-group-item">
        <strong>Diseño:</strong> {`${registro.data_pedido.tipo}${registro.data_pedido.resistencia}${registro.data_pedido.edad}${registro.data_pedido.tma}${registro.data_pedido.revenimiento}${registro.data_pedido.extensibility}${registro.data_pedido.forma}`}
      </li>
      <li className="list-group-item">
        <strong>Elemento:</strong> {registro.data_pedido.elemento_colar}
      </li>
      {/* <li className="list-group-item">
        <strong>Forma de tiro:</strong> {"FORMA DE TIRO"}
      </li> */}
      <li className="list-group-item">
        <strong>Restricciones de horario:</strong> {registro.data_pedido.restricciones_horario_obra}
      </li>
      <li className="list-group-item">
        <strong>Restricciones de accesos:</strong> {registro.data_pedido.protocolo_acceso}
      </li>
      <li className="list-group-item">
        <strong>Observaciones:</strong> {registro.data_pedido.observaciones}
      </li>
      <li className="list-group-item">
        <strong>Dosificador:</strong> {registro.nombre_dosificador}
      </li>








      
      
      
      
      
      
      
      {/* <li className="list-group-item">
        <strong>Fecha de asignación</strong> {registro.created_at.slice(0, 10)}
      </li>
      <li className="list-group-item">
        <strong>Hora de asignación</strong> {registro.created_at.slice(11, 16)}
      </li> */}
      
      
      
    </ul>
  );
};
