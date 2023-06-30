import React from "react";
import { Link } from "react-router-dom";
import { meses } from "../../utils/mesesArray";

export const TablaProyecciones = ({ proyecciones }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive p-0">
          <table className="table table-striped table-hover table-bordered text-center">
            <thead>
              <tr>
                <th>Asesor Comercial</th>
                <th>Mes</th>
                <th>Metros Proyectdos</th>
              </tr>
            </thead>
            <tbody>
              {proyecciones.map((proyeccion) => (
                <tr key={proyeccion.id}>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/proyeccion/${proyeccion.id}`}
                    >
                      {proyeccion.Ventas || "Admin"}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/proyeccion/${proyeccion.id}`}
                    >
                      {meses[parseInt(proyeccion.created_at.slice(5, 7))]}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/concreco/comercializacion/proyeccion/${proyeccion.id}`}
                    >
                      {proyeccion.m3}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
