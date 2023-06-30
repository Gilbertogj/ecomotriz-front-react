import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";

export const TablaRegistrosProduccion = ({ registros }) => {
  const { userRol } = useContext(ReactReduxContext);

  return (
    <div className="table-responsive p-0">
      <table className="table table-striped table-hover table-bordered text-center">
        <thead>
          <tr>
            <th>Número de remisión</th>
            <th>Número de Olla</th>
            <th>M3</th>
            <th>¿Es primera olla?</th>
            <th>Olla consecutiva</th>
            <th>Ajuste</th>
            <th>Dosificador</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr
              key={registro.id}
              className={`${
                userRol === "Ollero"
                  ? registro.reporte_ollero.salida_planta &&
                    (!registro.reporte_ollero.llegada_obra ||
                      !registro.reporte_ollero.inicio_descarga ||
                      !registro.reporte_ollero.fin_descarga ||
                      !registro.reporte_ollero.incidencia)
                    ? "table-warning"
                    : registro.reporte_ollero.causa_retraso
                    ? "table-success"
                    : "table-danger"
                  : ""
              }`}
            >
              <th>
                <Link to={`/concreco/produccion/registro/${registro.id}`}>
                  {registro.id_command}
                </Link>
              </th>
              <th>
                <Link to={`/concreco/produccion/registro/${registro.id}`}>
                  {registro.numero_olla}
                </Link>
              </th>
              <th>
                <Link to={`/concreco/produccion/registro/${registro.id}`}>
                  {registro.m3}
                </Link>
              </th>
              <th>
                <Link to={`/concreco/produccion/registro/${registro.id}`}>
                  {registro.primera_olla ? "Sí" : "No"}
                </Link>
              </th>
              <th>
                <Link to={`/concreco/produccion/registro/${registro.id}`}>
                  {registro.olla_consecutiva}
                </Link>
              </th>
              <th>
                <Link to={`/concreco/produccion/registro/${registro.id}`}>
                  {registro.ajuste}
                </Link>
              </th>
              <th>
                <Link to={`/concreco/produccion/registro/${registro.id}`}>
                  {registro.nombre_dosificador}
                </Link>
              </th>
              <th>
                <Link to={`/concreco/produccion/registro/${registro.id}`}>
                  {registro.created_at.slice(0, 10)}
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
