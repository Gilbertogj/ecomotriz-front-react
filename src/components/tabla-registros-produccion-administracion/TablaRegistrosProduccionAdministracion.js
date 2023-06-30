import React from "react";

export const TablaRegistrosProduccionAdministracion = ({
  registros,
  setRegistroSeleccionado,
}) => {
  const handleClick = (e, reg) => {
    setRegistroSeleccionado(reg);

    if (document.querySelector(".table-info")) {
      document.querySelector(".table-info").classList.remove("table-info");
    }

    e.target.parentNode.classList.add("table-info");
  };

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
              onClick={(e) => handleClick(e, registro)}
              style={{ cursor: "pointer" }}
            >
              <td>{registro.id_command}</td>
              <td>{registro.numero_olla}</td>
              <td>{registro.m3}</td>
              <td>{registro.primera_olla ? "Sí" : "No"}</td>
              <td>{registro.olla_consecutiva}</td>
              <td>{registro.ajuste}</td>
              <td>{registro.nombre_dosificador}</td>
              <td>{registro.created_at.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
