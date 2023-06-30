import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

const formInitialState = {
  numero_bomba: "",
};

export const SelectNumeroBomba = ({ tipoBomba, numeroBomba, setData }) => {
  const [form, setForm] = useState(formInitialState);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { id } = useParams();

  const numeroBombaRef = useRef();

  useEffect(() => {
    if (tipoBomba === "Estacionaria") {
      numeroBombaRef.current.innerHTML = `
        <option value=""></option>
        <option value="BC-06 Estacionaria">BC-06 Estacionaria</option>`;

      setForm({
        numero_bomba: numeroBomba,
      });
    }
    if (tipoBomba === "Pluma") {
      numeroBombaRef.current.innerHTML = `
        <option value=""></option>
        <option value="BC-02 Pluma">BC-02 Pluma Chica</option>
        <option value="BC-03 Pluma">BC-03 Pluma Chica</option>
        <option value="BC-04 Pluma">BC-04 Pluma</option>
        <option value="BC-05 Pluma">BC-05 Pluma</option>
        <option value="BC-07 Pluma">BC-07 Pluma</option>
        `;

      setForm({
        numero_bomba: numeroBomba,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisabledSubmitBtn(false);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setDisabledSubmitBtn(true);

      const formData = new FormData();

      formData.append("numero_bomba", form.numero_bomba || "N/A");

      formData.delete("cliente");
      formData.delete("obra");

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${id}/update/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${id}/update/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 201 || data.status === 200) {
        /* setShowConfirmModal(true); */
        alert("Bomba cambiada correctamente");
        setData(json);
        setDisabledSubmitBtn(true);
      } else if (data.status === 406) {
        alert(json.error);
      }
    } catch (error) {
      alert(error);
      console.log(error);
      setDisabledSubmitBtn(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="numeroBomba" className="form-label">
          Número de Bomba
        </label>
        <select
          id="numeroBomba"
          name="numero_bomba"
          onChange={handleChange}
          value={form.numero_bomba}
          ref={numeroBombaRef}
          className="form-select"
          required
        ></select>
      </div>

      <input
        type="submit"
        value="Cambiar bomba"
        className="btn btn-success"
        disabled={disabledSubmitBtn}
      />
    </form>
  );
};
