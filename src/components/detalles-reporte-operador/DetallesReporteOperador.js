import React from "react";

export const DetallesReporteOperador = ({ reporteData }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <strong>Id:</strong> {reporteData.id}
      </li>
      <li className="list-group-item">
        <strong>Nombre del operador:</strong>
        {reporteData.nombre_operador}
      </li>
      <li className="list-group-item">
        <strong>Fecha:</strong>
        {reporteData.created_at && reporteData.created_at.slice(0, 10)}
      </li>
      <li className="list-group-item">
        <strong>Hora de salida de planta:</strong>
        {reporteData.salida_planta && reporteData.salida_planta.slice(11, 16)}
      </li>
      <li className="list-group-item">
        <strong>Hora de llegada a la obra:</strong>
        {reporteData.llegada_obra && reporteData.llegada_obra.slice(11, 16)}
      </li>
      <li className="list-group-item">
        <strong>Hora de inicio de bombeo:</strong>
        {reporteData.inicio_bombeo && reporteData.inicio_bombeo.slice(11, 16)}
      </li>
      <li className="list-group-item">
        <strong>Hora de fin de bombeo:</strong>
        {reporteData.fin_bombeo && reporteData.fin_bombeo.slice(11, 16)}
      </li>
      <li className="list-group-item">
        <strong>Causa de retraso:</strong> {reporteData.causa_retraso}
      </li>
      <li className="list-group-item">
        <strong>Incidencia:</strong> {reporteData.incidencia}
      </li>
    </ul>
  );
};
