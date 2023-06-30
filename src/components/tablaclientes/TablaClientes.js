import React from "react";

import { TablaFila } from "../tabla-fila/TablaFila";

import Table from "react-bootstrap/Table";

export const TablaClientes = ({ clientes }) => {
  return (
    <div className="table-responsive p-0">
      <Table striped bordered hover className="text-center ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Alias</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody className="text-reset">
          {clientes.map((cliente) => (
            <TablaFila key={cliente.id} cliente={cliente} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
