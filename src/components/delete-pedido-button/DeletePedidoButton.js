import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { BootstrapModal } from "../BootstrapModal/BootstrapModal";

import { ReactComponent as IconoEliminar } from "../../assets/svg/iconoEliminar.svg";

export const DeletePedidoButton = () => {
  const [modalShow, setModalShow] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { id } = useParams();
  const history = useHistory();

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const DeletePedido = async (token, pedidoId, historyRef) => {
    let data = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedidoId}/destroy/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (data.headers.get("Content-Type") !== null) {
      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${pedidoId}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
          }
        );
      }
    }

    if (data.status === 400) {
      alert(data.json);
      console.log(data.json);
    }

    if (data.status === 204) {
      historyRef.push(`/concreco/logistica/pedidos`);
    }
  };

  return (
    <div style={{ width: "40px", cursor: "pointer" }} onClick={handleShow}>
      <IconoEliminar />

      <BootstrapModal
        text={`¿Esta seguro de eliminar el pedido?`}
        show={modalShow}
        onHide={handleClose}
        id={id}
        deleteFunc={DeletePedido}
        authtoken={authtoken}
        history={history}
      />
    </div>
  );
};
