

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user/userSlice";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import "./LoginForm.styles.scss";
import { apiConcrecoUsers } from "../../api/users";

const initialState = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const errorMessageRef = useRef();

  const handleSumbit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    errorMessageRef.current.classList.add("hidden");

    const { username, password } = form;

    try {
      const body = {
        username,
        password,
      }
      
      // const resp = await apiConcrecoUsers.post('/login/', body)
      const resp = await fetch(
        process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/core/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      console.log(resp);

      const json = await resp.json();

      if (resp.status === 200) {
        dispatch(setCurrentUser(json));
      }

      if (resp.status === 400) {
        errorMessageRef.current.classList.remove("hidden");
        setForm(initialState);
        setIsLoading(false);
        
      }

      if (resp.status !== 200 && resp.status !== 400) {
        setForm(initialState);
        setIsLoading(false);
        console.log(json);
        alert(json);
      }
    } catch (error) {
      alert(error);
      console.log(error);
      setForm(initialState);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          name="username"
          required
          value={form.username}
          onChange={handleChange}
          className="form-control login-user-input"
          placeholder="Usuario"
        ></input>
        <input
          type="password"
          name="password"
          required
          value={form.password}
          onChange={handleChange}
          id=""
          className="form-control login-input"
          placeholder="Contraseña"
        ></input>
        <p className="bad-user-pass-msg hidden" ref={errorMessageRef}>
          Usuario o contraseña incorrectos
        </p>

        {!isLoading ? (
          <button type="submit" className="btn btn-success login-submit">
            Ingresar
          </button>
        ) : (
          <Button variant="secondary" className="login-submit" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Ingresando...
          </Button>
        )}
      </form>
    </>
  );
};
