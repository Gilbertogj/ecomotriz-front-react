import React, { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";
import { DeleteUserButton } from "../delete-user-button/DeleteUserButton";
import axios from "axios";

const initialFormState = {
  nuevoEmail: "",
  nuevoRol: "",
};

export const DetallesUsuario = ({ detallesUsuario, urlId }) => {
  const [form, setForm] = useState(initialFormState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [password, setPassword] = useState("")

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { id } = useParams();
  const { pathname } = useLocation();

  const  changePassword = async (e) => {
    e.preventDefault()
    let resp = await axios.post(`${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/${id}/password/`, {password}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authtoken}`,
      }
    } )

    console.log(resp.status);
    if (resp.status === 200) {
      setShowConfirmModal(true);
      setPassword("")
    }

    if (resp.status === 400) {
     
      alert("Ha habido un error, asegurese de enviar un passord válido");
      
    }

  }

  const editarUsuario = async (e, input) => {
    e.preventDefault();

    if (!form.nuevoEmail && !form.nuevoRol) return;

    let formulario;

    if (input === "email") {
      formulario = { email: form.nuevoEmail };
    } else if (input === "rol") {
      formulario = { tipo_usuario: form.nuevoRol };
    }

    let data = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
        body: JSON.stringify(formulario),
      }
    );

    let json = await data.json();

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${json.token}`,
          },
          body: JSON.stringify(formulario),
        }
      );

      json = await data.json();
    }
    if (data.status === 200) {
      setShowConfirmModal(true);
    }

    if (data.status === 400) {
      if (json.email) {
        alert("Ingrese un email válido");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  return (
    <div className="container">
      {detallesUsuario.id ? (
        <>
          <ModalRedirect
            showConfirmModal={showConfirmModal}
            text="Se han actualizado correctamente los datos del usuario"
            link="/concreco/users/usuarios"
          />
          <div className="row mb-3">
            <div className="col-8 .col-sm-10 d-flex justify-content-center align-items-center text-center">
              <h2>{detallesUsuario.name}</h2>
            </div>
            <div className="col">
              <div className="d-flex  flex-column align-items-center">
                {detallesUsuario.id && !pathname.includes("pedido") && (
                  <DeleteUserButton />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Id: </strong> {detallesUsuario.id}
              </li>
              <li className="list-group-item">
                <strong>Username:</strong> {detallesUsuario.username}
              </li>
              <li className="list-group-item">
                <strong>Nombre:</strong>{" "}
                {`${detallesUsuario.name} ${detallesUsuario.last_name}`}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {detallesUsuario.email}
              </li>
              <li className="list-group-item">
                <strong>Rol de usuario:</strong> {detallesUsuario.tipo_usuario}
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <div className="text-center">
              <h4>Editar usuario</h4>
            </div>
            <form
              onSubmit={(e) => {
                editarUsuario(e, "email");
              }}
            >
              <label htmlFor="nuevoEmail" className="form-label">
                Nuevo Email
              </label>
              <input
                type="email"
                id="nuevoEmail"
                name="nuevoEmail"
                className="form-control"
                onChange={handleChange}
                value={form.nuevoEmail}
              />
              <input
                type="submit"
                value="Editar"
                className="btn btn-primary"
                disabled={form.nuevoEmail ? false : true}
              />
            </form>
            <form
              onSubmit={(e) => {
                editarUsuario(e, "rol");
              }}
            >
              <label htmlFor="nuevoRol" className="form-label">
                Nuevo rol de usuario
              </label>
              <select
                className="form-select"
                id="nuevoRol"
                name="nuevoRol"
                onChange={handleChange}
                value={form.nuevoRol}
              >
                <option></option>
                <option value="Administracion">Administracion</option>
                <option value="Ventas">Ventas</option>
                <option value="Produccion">Produccion</option>
              </select>
              <input
                type="submit"
                value="Editar"
                className="btn btn-primary"
                disabled={form.nuevoRol ? false : true}
              />
            </form>
          </div>

          <div className="mt-3">
            <div className="text-center">
              <h4>Cambiar contraseña</h4>
            </div>
            <form
              onSubmit={(e) => {
                changePassword(e);
              }}
            >
              <label htmlFor="nuevoEmail" className="form-label">
                Nueva contraseña
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
              <input
                type="submit"
                value="Editar"
                className="btn btn-primary"
                disabled={password ? false : true}
              />
            </form>
           
          </div>
        </>
      ) : (
        <p>No existe el usuario #{urlId} </p>
      )}
    </div>
  );
};
