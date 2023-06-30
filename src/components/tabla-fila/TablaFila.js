import React from "react";
import { Link, useLocation } from "react-router-dom";

export const TablaFila = ({ cliente }) => {
  const { pathname } = useLocation();
  /* 
  console.log("location", location); */

  return (
    <tr className="table-row">
      <td>
        {pathname.includes("pedido") && (
          <Link
            to={`/concreco/logistica/cliente/${cliente.id}/realizar-pedido`}
          >
            {cliente.id}
          </Link>
        )}

        {pathname.includes("comercializacion") &&
          !pathname.includes("cotizacion") && (
            <Link to={`/concreco/comercializacion/cliente/${cliente.id}`}>
              {cliente.id}
            </Link>
          )}

        {pathname.includes("logistica") && !pathname.includes("pedido") && (
          <Link to={`/concreco/logistica/cliente/${cliente.id}`}>
            {cliente.id}
          </Link>
        )}

        {pathname.includes("cotizacion") && (
          <Link
            to={`/concreco/comercializacion/cliente/${cliente.id}/realizar-cotizacion`}
          >
            {cliente.id}
          </Link>
        )}
      </td>
      <td>
        {pathname.includes("pedido") && (
          <Link
            to={`/concreco/logistica/cliente/${cliente.id}/realizar-pedido`}
          >
            {cliente.nombre}
          </Link>
        )}

        {pathname.includes("comercializacion") &&
          !pathname.includes("cotizacion") && (
            <Link to={`/concreco/comercializacion/cliente/${cliente.id}`}>
              {cliente.nombre}
            </Link>
          )}

        {pathname.includes("logistica") && !pathname.includes("pedido") && (
          <Link to={`/concreco/logistica/cliente/${cliente.id}`}>
            {cliente.nombre}
          </Link>
        )}

        {pathname.includes("cotizacion") && (
          <Link
            to={`/concreco/comercializacion/cliente/${cliente.id}/realizar-cotizacion`}
          >
            {cliente.nombre}
          </Link>
        )}
      </td>
      <td>
        {pathname.includes("pedido") && (
          <Link
            to={`/concreco/logistica/cliente/${cliente.id}/realizar-pedido`}
          >
            {cliente.alias}
          </Link>
        )}

        {pathname.includes("comercializacion") &&
          !pathname.includes("cotizacion") && (
            <Link to={`/concreco/comercializacion/cliente/${cliente.id}`}>
              {cliente.alias}
            </Link>
          )}

        {pathname.includes("logistica") && !pathname.includes("pedido") && (
          <Link to={`/concreco/logistica/cliente/${cliente.id}`}>
            {" "}
            {cliente.alias}
          </Link>
        )}

        {pathname.includes("cotizacion") && (
          <Link
            to={`/concreco/comercializacion/cliente/${cliente.id}/realizar-cotizacion`}
          >
            {cliente.alias}
          </Link>
        )}
      </td>
      <td>
        {pathname.includes("pedido") && (
          <Link
            to={`/concreco/logistica/cliente/${cliente.id}/realizar-pedido`}
          >
            {cliente.created_at.slice(0, 10)}
          </Link>
        )}

        {pathname.includes("comercializacion") &&
          !pathname.includes("cotizacion") && (
            <Link to={`/concreco/comercializacion/cliente/${cliente.id}`}>
              {cliente.created_at.slice(0, 10)}
            </Link>
          )}

        {pathname.includes("logistica") && !pathname.includes("pedido") && (
          <Link to={`/concreco/logistica/cliente/${cliente.id}`}>
            {cliente.created_at.slice(0, 10)}
          </Link>
        )}

        {pathname.includes("cotizacion") && (
          <Link
            to={`/concreco/comercializacion/cliente/${cliente.id}/realizar-cotizacion`}
          >
            {cliente.created_at.slice(0, 10)}
          </Link>
        )}
      </td>
    </tr>
  );
};
