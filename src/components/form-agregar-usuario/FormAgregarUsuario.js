import React, { useContext, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";

const initialFormState = {
  nombre: "",
  apellido: "",
  username: "",
  email: "",
  tipo_usuario: "",
  password: "",
  confirmPassword: "",
};

export const FormAgregarUsuario = () => {
  const [form, setForm] = useState(initialFormState);
  const [checkingUser, setCheckingUser] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameUsed, setIsUsernameUsed] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isEmailUsed, setIsEmailUsed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const usernameInputRef = useRef();
  const usernameInputHelpTextRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setIsEmailUsed(false);
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUsernameValid && isValidPassword) {
      const formulario = {
        name: form.nombre,
        username: usernameInputRef.current.value,
        last_name: form.apellido,
        tipo_usuario: form.tipo_usuario,
        email: form.email,
        password: form.password,
      };

      let data = await fetch(
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/users/",
        {
          method: "POST",
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
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/users/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify(formulario),
          }
        );

        json = await data.json();
      }

      console.log(data);

      if (data.status === 400) {
        if (json.email) {
          setIsEmailUsed(true);
        }
        /* if (json.email) {
          $(".email").addClass("is-invalid");
          $(".invalid-email").text("Este correo ya ha sido registrado");
        }
        if (json.username) {
            $(".username").addClass("is-invalid");
            $(".invalid-username").text("Este teléfono ya ha sido registrado");
        }
        else {
            alert("Ocurrio un error, vuelva a intentarlo")
        } */
      }

      if (data.status === 201) {
        setShowConfirmModal(true);

        /* alert("Se ha creado correctamente el usuario."); */

        /* history.push(`/concreco/users/usuario/${json.id}`); */
      }

      if (data.status === 406) {
        alert(json.error);
      }
    } /* else {
      console.log("username", isUsernameValid, "password", isValidPassword);
    } */
  };

  const handlePasswordChange = (e) => {
    if (
      passwordInputRef.current.value ===
        confirmPasswordInputRef.current.value &&
      passwordInputRef.current.value &&
      confirmPasswordInputRef.current.value
    ) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const handleUsernameChange = async () => {
    setIsUsernameUsed(false);
    setIsUsernameValid(false);
    usernameInputHelpTextRef.current.style.color = "#6c757d";
    setCheckingUser(true);

    if (
      !usernameInputRef.current.value.match(/^[a-zA-ZñÑ]+$/g) ||
      usernameInputRef.current.value.length < 5
    ) {
      setCheckingUser(false);
      usernameInputHelpTextRef.current.style.color = "red";
      return;
    }

    let data = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/check_username/?username=${usernameInputRef.current.value}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
      }
    );

    let json = await data.json();

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/check_username/?username=${usernameInputRef.current.value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${json.token}`,
          },
        }
      );
      json = await data.json();
    }

    /*  console.log("json", json); */

    setCheckingUser(false);

    if (json.is_used) {
      setIsUsernameUsed(true);
      return;
    }

    setIsUsernameValid(true);
  };

  return (
    <>
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text="Se ha creado correctamente el usuario."
        link={`/concreco/users/usuarios`}
      />
      <form
        className="agregar-obra-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-2">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            id="apellido"
            value={form.apellido}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <DebounceInput
            minLength={5}
            debounceTimeout={1000}
            onChange={(e) => {
              /* handleChange(e); */
              handleUsernameChange(e);
            }}
            className="form-control"
            type="text"
            id="username"
            inputRef={usernameInputRef}
            required
            /* name="username"
          value={form.nombre} */
          />

          {checkingUser ? (
            <div className="d-flex align-items-center">
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="form-text">
                <strong>Comprobando usuario</strong>
              </div>
            </div>
          ) : isUsernameValid ? (
            <div className="form-text text-success">
              <strong>Usuario válido ✓</strong>
            </div>
          ) : isUsernameUsed ? (
            <div className="form-text text-danger">
              <strong>El usuario ya esta siendo usado</strong>
            </div>
          ) : (
            <div className="form-text" ref={usernameInputHelpTextRef}>
              <strong>
                El usuario no debe contener números, carácteres especiales, ni
                espacios y debe de tener al menos 5 letras.
              </strong>
            </div>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="tipo_usuario" className="form-label">
            Tipo de usuario
          </label>
          <select
            className="form-select"
            id="tipo_usuario"
            name="tipo_usuario"
            onChange={handleChange}
            required
          >
            <option></option>
            <option value="Administracion">Administracion</option>
            <option value="Ventas">Ventas</option>
            <option value="Produccion">Produccion</option>
            <option value="Dosificador">Dosificador</option>
            <option value="Operador">Operador</option>
            <option value="Ollero">Ollero</option>
          </select>
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={(e) => {
              handleChange(e);
              handlePasswordChange(e);
            }}
            className="form-control"
            ref={passwordInputRef}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="confirmPassword" className="form-label">
            Confirma contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              handlePasswordChange(e);
            }}
            className="form-control"
            ref={confirmPasswordInputRef}
            required
          />
        </div>

        {!isValidPassword && form.password && form.confirmPassword && (
          <div className="form-text text-danger">
            Las contraseñas no coinciden
          </div>
        )}

        <div
          className={`${
            isEmailUsed ? "visible" : "invisible"
          } form-text text-danger`}
        >
          Este correo ya ha sido registrado
        </div>

        <div className="d-flex justify-content-end ">
          <input
            type="submit"
            value="Crear Usuario"
            className="btn  mb-3 mt-2"
            style={{ backgroundColor: "#00C08B", color: "white" }}
            disabled={isUsernameValid && isValidPassword ? false : true}
          />
        </div>
      </form>
    </>
  );
};
