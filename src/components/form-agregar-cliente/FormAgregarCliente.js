import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import {
  OpcionesSelectPago,
  OpcionesSelectCfdi,
  OpcionesSelectMetodoPago,
  OpcionesSelectFormaPago,
  OpcionesSelectContacto,
  OpcionesSelectGiro,
  OpcionesSelectTipoVenta,
} from "../../utils/selects-opciones";

import { CustomSelect } from "../custom-select/CustomSelect";
import { ModalRedirect } from "../modal-redirect/ModalRedirect";

import "./FormAgregarCliente.styles.scss";

const formInitialState = {
  nombre: "",
  alias: "",
  pago: "",
  rfc: "",
  CFDI: "",
  metodo_pago: "",
  forma_pago: "",
  correo_facturas: "",
  direccion: "",
  telefono: "",
  email: "",
  sitio_web: "",
  codigo_postal: "",
  estado_republica: "",
  municipio: "",
  giro_de_empresa: "",
  medio_contacto: "",
  tipo_venta: "",
  constancia_fiscal:"",

};

export const FormAgregarCliente = ({ choicesData, formToEdit }) => {
  const [form, setForm] = useState(formInitialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();

  const pagoRef = useRef();
  const municipioRef = useRef();
  const tipoVentaRef =useRef();
  const rfcInputRef = useRef();
  const cfdiInputRef = useRef();
  const metodoPagoInputRef = useRef();
  const formaPagoInputRef = useRef();
  const correoFacturasInputRef = useRef();
  const estadoInputRef = useRef();
  const municipioInputRef = useRef();
  const constanciaFiscalRef = useRef();

  // const [dataJson, setData] = useState([]);

  useEffect(() => {
    for (let estado in choicesData.Estados) {
      let option = document.createElement("option");
      option.value = estado;
      option.textContent = estado;
      document.querySelector("#estados-select").appendChild(option);
    }

    document
      .querySelector("#estados-select")
      .addEventListener("change", (e) => {
        document.querySelector("#municipios-select").innerHTML =
          "<option></option>";
        for (let municipio of choicesData.Estados[e.target.value]) {
          const option = document.createElement("option");
          option.value = municipio;
          option.textContent = municipio;
          document.querySelector("#municipios-select").appendChild(option);
        }
      });

    const verificarSiClienteExiste = async () => {
      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${id}/`,
        {
          headers: {
            Authorization: `Token ${authtoken}`,
          },
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${id}/`,
          {
            headers: {
              Authorization: `Token ${json.token}`,
            },
          }
        );

        json = await data.json();
      }
      console.log(json.pago);

      setForm({
        nombre: json.nombre,
        alias: json.alias,
        pago: json.pago,
        rfc: json.rfc,
        CFDI: json.CFDI === "N/A" ? "" : json.CFDI,
        metodo_pago: json.metodo_pago === "N/A" ? "" : json.metodo_pago,
        forma_pago: json.forma_pago === "N/A" ? "" : json.forma_pago,
        correo_facturas: json.correo_facturas,
        direccion: json.direccion,
        telefono: json.telefono,
        email: json.email,
        sitio_web: json.sitio_web,
        codigo_postal: json.codigo_postal,
        estado_republica: json.estado_republica,
        municipio: json.municipio,
        giro_de_empresa: json.giro_de_empresa,
        medio_contacto: json.medio_contacto,
        tipo_venta: json.tipo_venta,
      });

      // setData(json);

      if (pagoRef.current.value === "G" || pagoRef.current.value === "Público General") {
        rfcInputRef.current.disabled = true;
        cfdiInputRef.current.disabled = true;
        metodoPagoInputRef.current.disabled = true;
        formaPagoInputRef.current.disabled = true;
        correoFacturasInputRef.current.disabled = true;
      }

      if(json.pago ==="F"){
        console.log("si es f");
        document.querySelector("#tipo-venta").innerHTML = `
        <option value=""></option>
        <option value="Contado">Contado</option>
        <option value="Credito Check Plus">Crédito Check Plus</option>
        <option value="Credito Concreco">Credito Concreco</option>
        <option value="Anticipo">Anticipo</option>
        
        `;
      } else {
        document.querySelector("#tipo-venta").innerHTML = `
        <option value=""></option>
        <option value="Contado">Contado</option>
        <option value="Credito">Crédito</option>
        <option value="Anticipo">Anticipo</option>
        `;
      }
      

      document.querySelector("#municipios-select").addEventListener(
        "focus",
        (e) => {
          if (
            choicesData.Estados[estadoInputRef.current.value].includes(
              json.municipio
            )
          ) {
            document.querySelector(
              "#municipios-select"
            ).innerHTML = `<option value="${json.municipio}">${json.municipio}</option>`;
          } else {
            console.log("no lo incluye");
            document.querySelector(
              "#municipios-select"
            ).innerHTML = `<option value=""></option>`;
          }

          for (let municipio of choicesData.Estados[
            estadoInputRef.current.value
          ]) {
            const option = document.createElement("option");
            option.value = municipio;
            option.textContent = municipio;
            document.querySelector("#municipios-select").appendChild(option);
          }
        },
        { once: true }
      );
    };

    if (id) {
      verificarSiClienteExiste();
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (e.target.name === "pago") {
      if (e.target.value === "G" || e.target.value === "Público General") {
        document.querySelector("#tipo-venta").innerHTML = `
        <option value=""></option>
        <option value="Contado">Contado</option>
        <option value="Credito">Crédito</option>
        <option value="Anticipo">Anticipo</option>
        `;
        
        setForm({
          ...form,
          pago: pagoRef.current.value,
          rfc: "",
          CFDI: "",
          metodo_pago: "",
          forma_pago: "",
          correo_facturas: "",
        });

        rfcInputRef.current.disabled = true;
        cfdiInputRef.current.disabled = true;
        metodoPagoInputRef.current.disabled = true;
        formaPagoInputRef.current.disabled = true;
        correoFacturasInputRef.current.disabled = true;
      } else {
        document.querySelector("#tipo-venta").innerHTML = `
        <option value=""></option>
        <option value="Contado">Contado</option>
        <option value="Credito Check Plus">Crédito Check Plus</option>
        <option value="Credito Concreco">Credito Concreco</option>
        <option value="Anticipo">Anticipo</option>
        
        `;
        setForm({
          ...form,
          pago: "F",
          CFDI: cfdiInputRef.current.value,
          metodo_pago: metodoPagoInputRef.current.value,
          forma_pago: formaPagoInputRef.current.value,
        });

        rfcInputRef.current.disabled = false;
        cfdiInputRef.current.disabled = false;
        metodoPagoInputRef.current.disabled = false;
        formaPagoInputRef.current.disabled = false;
        correoFacturasInputRef.current.disabled = false;
      }

      return;
    }

    if (e.target.name === "estado_republica") {
      setForm({
        ...form,
        estado_republica: estadoInputRef.current.value,
        municipio: "",
      });

      return;
    }

    // if (e.target.name === "pago") {
    //   if (e.target.value === "Pluma") {
    //     document.querySelector("#numeroBomba").innerHTML = `
    //     <option value=""></option>
    //     <option value="BC-02 Pluma">BC-02 Pluma Chica</option>
    //     <option value="BC-03 Pluma">BC-03 Pluma Chica</option>
    //     <option value="BC-04 Pluma">BC-04 Pluma</option>
    //     <option value="BC-05 Pluma">BC-05 Pluma</option>
    //     <option value="BC-07 Pluma">BC-07 Pluma</option>
    //     `;
    //   } else if (e.target.value === "Estacionaria") {
    //     document.querySelector("#numeroBomba").innerHTML = `
    //     <option value=""></option>
    //     <option value="BC-06 Estacionaria">BC-06 Estacionaria</option>
    //     `;
    //   } else {
    //     document.querySelector("#numeroBomba").innerHTML = `
    //     <option value=""></option>`;
    //   }

    //   setForm({
    //     ...form,
    //     tipo_bomba: tipoBombaRef.current.value,
    //     numero_bomba: "",
    //   });

    //   return;
    // }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e, historyRef) => {
    e.preventDefault();

    const formData = new FormData();

    if (constanciaFiscalRef.current.files[0]) {
      formData.append("constancia_fiscal", constanciaFiscalRef.current.files[0]);
    }
    formData.append("nombre", form.nombre);
    formData.append("alias", form.alias);
    formData.append("pago", form.pago);
    formData.append("rfc", form.rfc);
    formData.append("CFDI", form.CFDI || "N/A");
    formData.append("metodo_pago", form.metodo_pago || "N/A");
    formData.append("forma_pago", form.forma_pago || "N/A");
    formData.append("correo_facturas", form.correo_facturas);
    formData.append("direccion", form.direccion);
    formData.append("telefono", form.telefono);
    formData.append("email", form.email);
    formData.append("sitio_web", form.sitio_web);
    formData.append("codigo_postal", form.codigo_postal);
    formData.append("estado_republica", form.estado_republica);
    formData.append("municipio", form.municipio);
    formData.append("giro_de_empresa", form.giro_de_empresa);
    formData.append("medio_contacto", form.medio_contacto);
    formData.append("tipo_venta", form.tipo_venta);
    

    // const formulario = {
    //   ...form,
    //   CFDI: form.CFDI || "N/A",
    //   metodo_pago: form.metodo_pago || "N/A",
    //   forma_pago: form.forma_pago || "N/A",
    // };
    
    console.log(formData);

    if (formToEdit) {
      let data2 = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${id}/`,
        {
          method: "PATCH",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          // body: JSON.stringify(formulario),
          body: formData,
        }
      );

      let json2 = await data2.json();

      if (json2.expired) {
        dispatch(setCurrentUser({ token: json2.token }));

        data2 = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/${id}/`,
          {
            method: "PATCH",
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Token ${json2.token}`,
            },
            // body: JSON.stringify(formulario), 
            body: formData,
          }
        );

        json2 = await data2.json();
      }

      if (data2.status === 400) {
        if (json2.email) {
          alert("Este correo ya ha sido registrado");
        }
        if (json2.telefono) {
          alert("Este teléfono ya ha sido registrado");
          return;
        } else {
          alert("Ingresa un teléfono");
        }
      }

      if (data2.status === 200) {
        setShowConfirmModal(true);
      }

      if (data2.status === 406) {
        alert(json2.error);
      }
    } else {
      let data = await fetch(
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/clientes/",
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          // body: JSON.stringify(formulario),
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/clientes/`,
          {
            method: "POST",
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            // body: JSON.stringify(formulario),
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 400) {
        if (json.email) {
          alert("Este correo ya ha sido registrado");
        }
        if (json.telefono) {
          alert("Este teléfono ya ha sido registrado");
          return;
        } else {
          alert("Ingresa un teléfono");
        }
      }

      if (data.status === 201) {
        setShowConfirmModal(true);
      }

      if (data.status === 406) {
        alert(json.error);
      }
    }
  };

  return (
    <div className="container">
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text={
          formToEdit
            ? "Se han actualizado correctamente los datos del cliente."
            : "Se ha creado correctamente el nuevo cliente."
        }
        link={
          formToEdit
            ? pathname.includes("logistica")
              ? pathname.includes("realizar-pedido")
                ? `/concreco/logistica/cliente/${id}/realizar-pedido`
                : `/concreco/logistica/cliente/${id}`
              : pathname.includes("comercializacion") &&
                `/concreco/comercializacion/cliente/${id}`
            : pathname.includes("logistica")
            ? pathname.includes("realizar-pedido")
              ? "/concreco/logistica/clientes-pedido"
              : "/concreco/logistica/clientes"
            : pathname.includes("comercializacion") &&
              "/concreco/comercializacion/clientes"
        }
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          {formToEdit ? (
            <h3 className="text-center">Editar Cliente</h3>
          ) : (
            <h3 className="text-center">Agregar Cliente</h3>
          )}

          <form
            className="agregar-cliente-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="alias" className="form-label">
                  Alias
                </label>
                <input
                  type="text"
                  name="alias"
                  id="alias"
                  value={form.alias}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectPago}
                  handleChange={handleChange}
                  isRequired={true}
                  form={form}
                  selectRef={pagoRef}
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="rfc" className="form-label">
                  RFC
                </label>
                <input
                  type="text"
                  name="rfc"
                  id="rfc"
                  value={form.rfc}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={rfcInputRef}
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectCfdi}
                  handleChange={handleChange}
                  selectRef={cfdiInputRef}
                  form={form}
                />
              </div>

              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectMetodoPago}
                  handleChange={handleChange}
                  selectRef={metodoPagoInputRef}
                  form={form}
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectFormaPago}
                  handleChange={handleChange}
                  selectRef={formaPagoInputRef}
                  form={form}
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="correo_facturas" className="form-label">
                  Correo para envio de facturas
                </label>
                <input
                  type="email"
                  name="correo_facturas"
                  id="correo_facturas"
                  value={form.correo_facturas}
                  onChange={handleChange}
                  ref={correoFacturasInputRef}
                  autoComplete="off"
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <label htmlFor="direccion" className="form-label">
                  Dirección (calle, número y colonia)
                </label>
                <input
                  type="text"
                  name="direccion"
                  id="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="telefono" className="form-label">
                  Teléfono de oficinas
                </label>
                <input
                  type="number"
                  name="telefono"
                  id="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  required
                  onWheel={(e) => {
                    e.target.blur();
                  }}
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
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
                  autoComplete="off"
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="sitio_web" className="form-label">
                  Sitio Web
                </label>
                <input
                  type="text"
                  name="sitio_web"
                  id="sitio_web"
                  value={form.sitio_web}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <label htmlFor="estados-select" className="form-label">
                  Estado de la República
                </label>
                <select
                  id="estados-select"
                  name="estado_republica"
                  onChange={handleChange}
                  ref={estadoInputRef}
                  value={form && form.estado_republica}
                  className="form-select"
                  required
                >
                  <option></option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label
                  htmlFor="municipios-select"
                  ref={municipioRef}
                  className="form-label"
                >
                  Municipio
                </label>
                <select
                  id="municipios-select"
                  name="municipio"
                  onChange={handleChange}
                  ref={municipioInputRef}
                  value={form.municipio && form.municipio}
                  className="form-select"
                  required
                >
                  <option>{form.municipio && form.municipio}</option>
                </select>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <label htmlFor="codigo_postal" className="form-label">
                  Código Postal
                </label>
                <input
                  type="number"
                  name="codigo_postal"
                  id="codigo_postal"
                  value={form.codigo_postal}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  required
                  onWheel={(e) => {
                    e.target.blur();
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectGiro}
                  handleChange={handleChange}
                  isRequired={true}
                  form={form}
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectContacto}
                  handleChange={handleChange}
                  isRequired={true}
                  form={form}
                />
              </div>

              {/* <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectTipoVenta}
                  handleChange={handleChange}
                  isRequired={true}
                  form={form}
                />
              </div> */}

              <div className="mb-col-12 col-md-6">
              <label htmlFor="tipo-venta" className="form-label">
                Pago
              </label>
              <select
                id="tipo-venta"
                name="tipo_venta"
                onChange={handleChange}
                value={form.tipo_venta}
                ref={tipoVentaRef}
                className="form-select"
                required
              >
                <option value=""></option>
              </select>
            </div>


            </div>

            <div className="mb-2">
              <label htmlFor="constancia_fiscal" className="form-label">
                Constancia Fiscal
              </label>
              <input
                type="file"
                id="constancia_fiscal"
                className="form-control"
                ref={constanciaFiscalRef}
              />
            </div>

            <div className="d-flex justify-content-end ">
              {formToEdit ? (
                <input
                  type="submit"
                  value="Guardar Cambios"
                  className="btn  mb-3 mt-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                />
              ) : (
                <input
                  type="submit"
                  value="Agregar"
                  className="btn mb-3 mt-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
