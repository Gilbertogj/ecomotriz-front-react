import React from "react";

export const TablaReportesOperador = ({
  pedidoData,
  setReporteOperadorSeleccionado,
}) => {
  const handleClick = (e, reg) => {
    setReporteOperadorSeleccionado(reg);
  };

  return (
    <div className="table-responsive p-0">
      <table className="table table-striped table-hover table-bordered text-center">
        <thead>
          <tr>
            <th>Nombre de operador</th>
            <th>Número de bomba</th>
          </tr>
        </thead>
        <tbody>
          <tr
            key={pedidoData.reporte_operador.id}
            onClick={(e) => handleClick(e, pedidoData.reporte_operador)}
            style={{ cursor: "pointer" }}
          >
            <td>{pedidoData.reporte_operador.nombre_operador}</td>
            <td>{pedidoData.numero_bomba}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
