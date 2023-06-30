import React, { useContext, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { BootstrapModal } from "../BootstrapModal/BootstrapModal";

import { ReactComponent as IconoEliminar } from "../../assets/svg/iconoEliminar.svg";

export const DeleteObraButton = ({ clienteId }) => {
  const [modalShow, setModalShow] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const DeleteObra = async (token, obraId, historyRef) => {
    let data = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/destroy/`,
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
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/destroy/`,
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
      console.log("Ha ocrrido un error");
    }

    if (data.status === 204) {
      if (pathname.includes("logistica")) {
        historyRef.push(`/concreco/logistica/cliente/${clienteId}/obras`);
      } else if (pathname.includes("comercializacion")) {
        historyRef.push(
          `/concreco/comercializacion/cliente/${clienteId}/obras`
        );
      }
    }
  };

  return (
    <div style={{ width: "40px", cursor: "pointer" }} onClick={handleShow}>
      <IconoEliminar />
      <BootstrapModal
        text={`¿Esta seguro de eliminar la obra?`}
        show={modalShow}
        onHide={handleClose}
        id={id}
        deleteFunc={DeleteObra}
        authtoken={authtoken}
        history={history}
      />
    </div>
  );
};
