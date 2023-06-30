import React, { useContext, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { BootstrapModal } from "../BootstrapModal/BootstrapModal";

import { ReactComponent as IconoEliminar } from "../../assets/svg/iconoEliminar.svg";

export const DeleteClientButton = () => {
  const [modalShow, setModalShow] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const DeleteClient = async (token, clienteId, historyRef) => {
    let data = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${clienteId}/`,
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

      if (json.token) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${clienteId}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
          }
        );
      }

      json = data.json();
    }

    if (data.status === 400) {
      alert(data.json);
      console.log("Ha ocrrido un error");
    }

    if (data.status === 204) {
      if (pathname.includes("logistica")) {
        console.log("dentro if logistica");
        historyRef.push("/concreco/logistica/clientes");
      } else if (pathname.includes("comercializacion")) {
        historyRef.push("/concreco/comercializacion/clientes");
      }
    }
  };

  return (
    <div style={{ width: "40px", cursor: "pointer" }} onClick={handleShow}>
      <IconoEliminar />

      <BootstrapModal
        text={`¿Esta seguro de eliminar el cliente?`}
        show={modalShow}
        onHide={handleClose}
        id={id}
        deleteFunc={DeleteClient}
        authtoken={authtoken}
        history={history}
      />
    </div>
  );
};
