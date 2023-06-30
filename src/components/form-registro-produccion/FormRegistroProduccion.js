import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

import { SuccessModal } from "../success-modal/SuccessModal";

const formInitialState = {
  m3: "1",
  numero_olla: "",
  ajuste: "",
  ollero: "",
  flete_vacio: "",
};

const MAX_M3_PARA_FLETE_VACIO = 3;

export const FormRegistroProduccion = ({ setRegistros, registros }) => {
  const [form, setForm] = useState(formInitialState);
  const [olleros, setOlleros] = useState([]);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
  const [show, setShow] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { id } = useParams();

  const ollaConsecutivaInputRef = useRef();
  const fleteVacioInputRef = useRef();

  useEffect(() => {
    fetchAndSetOlleros();
  }, []);

  useEffect(() => {
    if (form.m3 > MAX_M3_PARA_FLETE_VACIO) {
      setForm({
        ...form,
        flete_vacio: "",
      });
    }
  }, [form.m3]);

  const fetchAndSetOlleros = async () => {
    const fetchedData = await fetchData(

      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/?tipo_usuario=Ollero`,

      authtoken,
      dispatch,
      setCurrentUser
    );

    setOlleros(fetchedData);
  };

  const handleClose = () => setShow(false);

  const handleM3Buttons = (boolean) => {
    setForm((prevState) => {
      return {
        ...prevState,
        m3: boolean
          ? `${Number(prevState.m3) + 0.5}`
          : `${Number(prevState.m3) - 0.5}`,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitBtnDisabled(true);

    const formulario1 = {
      m3: form.m3,
      numero_olla: form.numero_olla,
      olla_consecutiva: ollaConsecutivaInputRef.current.value,
      primera_olla:
        Number(ollaConsecutivaInputRef.current.value) === 1 ? true : false,
      ajuste: form.ajuste,
      pedido: id,
    };

    if (form.flete_vacio) {
      formulario1.flete_de_vacio = form.flete_vacio;
    }

    let data1 = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/registro_produccion/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
        body: JSON.stringify(formulario1),
      }
    );

    let json1 = await data1.json();

    let newToken = null;

    if (json1.expired) {
      newToken = json1.token;
      dispatch(setCurrentUser({ token: newToken }));

      data1 = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/registro_produccion/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${newToken}`,
          },
          body: JSON.stringify(formulario1),
        }
      );

      json1 = await data1.json();
    }

    if (data1.status === 406) {
      alert(json1.error);
      setIsSubmitBtnDisabled(false);
      return;
    }

    if (data1.status === 201) {
      const formulario2 = {
        ollero: form.ollero,
        registro: json1.id,
      };

      let data2 = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/reporte_ollero/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${newToken ? newToken : authtoken}`,
          },
          body: JSON.stringify(formulario2),
        }
      );

      let json2 = await data2.json();

      if (json2.expired) {
        dispatch(setCurrentUser({ token: json2.token }));

        data2 = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/reporte_ollero/create/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json2.token}`,
            },
            body: JSON.stringify(formulario2),
          }
        );

        json2 = await data2.json();
      }

      if (data2.status === 406) {
        alert(json2.error);
        setIsSubmitBtnDisabled(false);
        return;
      }

      if (data2.status === 201) {
        fetchAndSetOlleros();

        setShow(true);

        setRegistros((prevState) => {
          const arr = [...prevState];

          arr.push(json1);

          return arr;
        });
      }
    }

    setForm(formInitialState);
    setIsSubmitBtnDisabled(false);
  };

  return (
    <>
      <SuccessModal
        show={show}
        handleClose={handleClose}
        title="Registro creado"
        text="Registro creado correctamente"
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="m3" className="form-label">
            M3
          </label>
          <div className="d-flex">
            <div
              className="btn btn-outline-primary rounded-3 me-2"
              style={{ width: "40px", minWidth: "40px" }}
              onClick={() => {
                handleM3Buttons(false);
              }}
            >
              -
            </div>
            <input
              type="number"
              id="m3"
              name="m3"
              className="form-control"
              step="any"
              value={form.m3}
              required
              onChange={handleChange}
              min="0.5"
              max="8"
              autoComplete="off"
              onWheel={(e) => {
                e.target.blur();
              }}
            />
            <div
              className="btn btn-outline-primary rounded-3 ms-2"
              style={{ width: "40px", minWidth: "40px" }}
              onClick={() => {
                handleM3Buttons(true);
              }}
            >
              +
            </div>
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="numero_olla" className="form-label">
            Número de olla
          </label>
          <select
            id="numero_olla"
            name="numero_olla"
            className="form-select"
            value={form.numero_olla}
            required
            onChange={handleChange}
          >
            <option></option>
            <option value="CR-01">CR-01</option>
            <option value="CR-02">CR-02</option>
            <option value="CR-05">CR-05</option>
            <option value="CR-06">CR-06</option>
            <option value="CR-07">CR-07</option>
            <option value="CR-08">CR-08</option>
            <option value="CR-11">CR-11</option>
            <option value="CR-12">CR-12</option>
            <option value="CR-13">CR-13</option>
            <option value="CR-14">CR-14</option>
            <option value="CR-15">CR-15</option>
            <option value="CR-16">CR-16</option>
            <option value="CR-17">CR-17</option>
            <option value="CR-18">CR-18</option>
            <option value="CR-19">CR-19</option>
            <option value="CR-20">CR-20</option>
            <option value="CR-23">CR-23</option>
            <option value="CR-24">CR-24</option>
            <option value="CR-25">CR-25</option>
            <option value="CR-27">CR-27</option>
            <option value="CR-30">CR-30</option>
            <option value="CR-32">CR-32</option>
            <option value="CR-34">CR-34</option>
            <option value="CR-35">CR-35</option>
            <option value="CR-36">CR-36</option>
            <option value="CR-37">CR-37</option>
            <option value="CR-38">CR-38</option>
            <option value="CR-39">CR-39</option>
            <option value="CR-47">CR-47</option>
            <option value="CR-48">CR-48</option>
            <option value="CR-49">CR-49</option>
            <option value="CR-50">CR-50</option>
            <option value="CR-54">CR-54</option>
          </select>
        </div>

        <div className="mb-2">
          <label htmlFor="flete_vacio" className="form-label">
            ¿Es flete de vacío?
          </label>
          <select
            id="flete_vacio"
            name="flete_vacio"
            className="form-select"
            value={form.flete_vacio}
            required
            ref={fleteVacioInputRef}
            onChange={handleChange}
            disabled={form.m3 <= MAX_M3_PARA_FLETE_VACIO ? false : true}
          >
            <option></option>
            <option value={true}>SI</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div className="mb-2">
          <label htmlFor="olla_consecutiva" className="form-label">
            Olla consecutiva
          </label>
          <input
            type="number"
            id="olla_consecutiva"
            className="form-control"
            value={registros.length + 1}
            ref={ollaConsecutivaInputRef}
            required
            readOnly
            min="1"
            max="35"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="ajuste" className="form-label">
            Ajuste
          </label>
          <select
            id="ajuste"
            name="ajuste"
            className="form-select"
            value={form.ajuste}
            required
            onChange={handleChange}
          >
            <option></option>
            <option value="Primero">Primero</option>
            <option value="Segundo">Segundo</option>
            <option value="Tercero">Tercero</option>
            <option value="Cuarto">Cuarto</option>
            <option value="N/A">N/A</option>
          </select>
        </div>

        <div className="mb-2">
          <label htmlFor="ollero" className="form-label">
            Ollero
          </label>
          <select
            id="ollero"
            name="ollero"
            className="form-select"
            value={form.ollero}
            onChange={handleChange}
            required
          >
            <option></option>
            {olleros.map((ollero, i) => (
              <option
                key={i}
                value={ollero.id}
              >{`${ollero.name} ${ollero.last_name}`}</option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          value="Crear registro"
          className="btn btn-success"
          disabled={isSubmitBtnDisabled}
        />
      </form>
    </>
  );
};
