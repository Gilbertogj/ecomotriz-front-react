import React from "react";

import { Link } from "react-router-dom";

export const TablaUsuarios = ({ usuarios }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive p-0">
          <table className="table table-striped table-hover table-bordered text-center">
            <thead>
              <tr>
                <th>Id</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    <Link to={`/concreco/users/usuario/${usuario.id}`}>
                      {usuario.id}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/concreco/users/usuario/${usuario.id}`}>
                      {usuario.username}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/concreco/users/usuario/${usuario.id}`}>
                      {usuario.name}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/concreco/users/usuario/${usuario.id}`}>
                      {usuario.tipo_usuario}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/concreco/users/usuario/${usuario.id}`}>
                      {usuario.email}
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

/* Id	Username	Nombre	Rol	Email */
