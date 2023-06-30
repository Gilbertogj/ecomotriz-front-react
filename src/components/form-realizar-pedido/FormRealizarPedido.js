import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";

import "./FormRealizarPedido.styles.scss";

const initialState = {
  m3: "1",
  mas_ajuste: "",
  forma: "",
  tipo_bomba: "",
  numero_bomba: "",
  metros_adicionales: "",
  fecha_pedido: "",
  hora: "",
  minutos: "",
  am_pm: "",
  tipo: "",
  resistencia: "",
  edad: "",
  tma: "",
  revenimiento: "",
  aditivo: "",
  elemento_colar: "",
  observaciones: "",
  espaciado_camiones: "",
  tiempo_colado_minutos: "",
  status_pago: "",
  planta: "",
  proveedor_bomba: "",
  restricciones_horario_obra:"",
  protocolo_acceso:"",
  confirmacion_cliente_escrito:"",
  extensibility:"",
  monto_pagado:"",
  observaciones_precio:"",
};

const MAX_CARGA_CAMIONES = 8;

export const FormRealizarPedido = ({ pedidoData }) => {
  const [form, setForm] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const history = useHistory();
  const { clienteId, obraId } = useParams();

  const cantidadRef = useRef();
  const cargaCamionesRef = useRef();
  const tipoBombaRef = useRef();
  const tipoRef = useRef();
  const numeroBombaRef = useRef();
  const metrosAdicionalesRef = useRef();
  const formaRef = useRef();
  const espaciadoCamionesRef = useRef();
  const comprobantePagoRef = useRef();
  const proveedorBombaRef = useRef();
  const extensibilityRef = useRef();
  const constanciaFiscalRef = useRef();
  

  useEffect(() => {
    if (form.m3 <= MAX_CARGA_CAMIONES) {
      espaciadoCamionesRef.current.value = "";
      espaciadoCamionesRef.current.disabled = true;

      setForm({
        ...form,
        espaciado_camiones: "",
      });
    } else {
      espaciadoCamionesRef.current.disabled = false;
    }
  }, [form.m3]);

  useEffect(() => {
    if (cargaCamionesRef.current.value < 2) {
      espaciadoCamionesRef.current.value = "";
      espaciadoCamionesRef.current.disabled = true;
    } else {
      espaciadoCamionesRef.current.disabled = false;
    }

    if (pedidoData) {
      if (pedidoData.tipo_bomba === "Pluma") {
        document.querySelector("#numeroBomba").innerHTML = `
        <option value=""></option>
        <option value="BC-02 Pluma">BC-02 Pluma Chica</option>
        <option value="BC-03 Pluma">BC-03 Pluma Chica</option>
        <option value="BC-04 Pluma">BC-04 Pluma</option>
        <option value="BC-05 Pluma">BC-05 Pluma</option>
        <option value="BC-07 Pluma">BC-07 Pluma</option>
        `;
      } else if (pedidoData.tipo_bomba === "Estacionaria") {
        document.querySelector("#numeroBomba").innerHTML = `
        <option value=""></option>
        <option value="BC-06 Estacionaria">BC-06 Estacionaria</option>
        `;
      }

      if (pedidoData.espaciado_camiones) {
        document.querySelector("#espaciado").disabled = false;
        document.querySelector("#espaciado").value =
          pedidoData.espaciado_camiones;
      } else {
        document.querySelector("#espaciado").disabled = true;
      }

      let horaPedido = parseInt(pedidoData.fecha_pedido.slice(11, 13));

      let time = "am";

      if (horaPedido >= 12) {
        time = "pm";
      }

      if (horaPedido > 12) {
        horaPedido -= 12;
      }

      if (horaPedido === 0) {
        horaPedido = 12;
      }

      setForm({
        ...form,
        m3: pedidoData.m3,
        mas_ajuste: pedidoData.mas_ajuste,
        forma: pedidoData.forma,
        tipo_bomba: pedidoData.tipo_bomba,
        numero_bomba: pedidoData.numero_bomba,
        metros_adicionales: pedidoData.metros_adicionales,
        fecha_pedido: pedidoData.fecha_pedido.slice(0, 10),
        tipo: pedidoData.tipo,
        resistencia: pedidoData.resistencia,
        edad: pedidoData.edad,
        tma: pedidoData.tma,
        revenimiento: pedidoData.revenimiento,
        aditivo: pedidoData.aditivo,
        elemento_colar: pedidoData.elemento_colar,
        observaciones: pedidoData.observaciones,
        tiempo_colado_minutos: pedidoData.tiempo_colado_minutos,
        status_pago: pedidoData.status_pago,
        planta: pedidoData.planta,
        espaciado_camiones: pedidoData.espaciado_camiones,
        hora: horaPedido > 9 ? `${horaPedido}` : `0${horaPedido}`,
        minutos: pedidoData.fecha_pedido.slice(14, 16),
        am_pm: time,
        proveedor_bomba: pedidoData.proveedor_bomba,
        restricciones_horario_obra: pedidoData.restricciones_horario_obra,
        protocolo_acceso: pedidoData.protocolo_acceso,
        confirmacion_cliente_escrito: pedidoData.confirmacion_cliente_escrito,
        extensibility: pedidoData.extensibility,
        monto_pagado:pedidoData.monto_pagado,
        observaciones_precio: pedidoData.observaciones_precio,
      });

      if (pedidoData.forma === "T" || pedidoData.forma === "BC") {
        document.querySelector("#tipoBomba").disabled = true;
        document.querySelector("#numeroBomba").disabled = true;
        document.querySelector("#metros_adicionales").disabled = true;
        document.querySelector("#proveedor_bomba").disabled = true;
      } else if (pedidoData.forma === "BR") {
        document.querySelector("#tipoBomba").disabled = true;
        document.querySelector("#numeroBomba").disabled = true;
      } else if (pedidoData.forma === "B") {
        document.querySelector("#proveedor_bomba").disabled = true;
      }
      if (pedidoData.tipo !== "AU" ) {
        document.querySelector("#extensibility").disabled = true;
        
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.name === "forma") {
      if (e.target.value === "T" || e.target.value === "BC") {
        setForm({
          ...form,
          forma: formaRef.current.value,
          extensibility: "",
          numero_bomba: "",
          metros_adicionales: "",
          proveedor_bomba: "",
        });

        tipoBombaRef.current.disabled = true;
        numeroBombaRef.current.disabled = true;
        metrosAdicionalesRef.current.disabled = true;
        proveedorBombaRef.current.disabled = true;
      } else if (e.target.value === "B") {
        setForm({
          ...form,
          forma: formaRef.current.value,
          tipo_bomba: tipoBombaRef.current.value,
          numero_bomba: numeroBombaRef.current.value,
          metros_adicionales: metrosAdicionalesRef.current.value,
          proveedor_bomba: "",
        });

        tipoBombaRef.current.disabled = false;
        numeroBombaRef.current.disabled = false;
        metrosAdicionalesRef.current.disabled = false;
        proveedorBombaRef.current.disabled = true;
      } else if (e.target.value === "BR") {
        setForm({
          ...form,
          forma: formaRef.current.value,
          tipo_bomba: "",
          numero_bomba: "",
          metros_adicionales: metrosAdicionalesRef.current.value,
          proveedor_bomba: proveedorBombaRef.current.value,
        });

        tipoBombaRef.current.disabled = true;
        numeroBombaRef.current.disabled = true;
        metrosAdicionalesRef.current.disabled = false;
        proveedorBombaRef.current.disabled = false;
      }

      return;
    }

    if (e.target.name === "tipo") {
      if (e.target.value !== "AU") {
        setForm({
          ...form,
          tipo: tipoRef.current.value,
          extensibility: "",
          
        });
        console.log("si");
        extensibilityRef.current.disabled = true;
        
      } else {
        setForm({
          ...form,
          tipo: tipoRef.current.value,
          extensibility: extensibilityRef.current.value,
          
        });

        extensibilityRef.current.disabled = false;
      } 

      return;
    }

    if (e.target.name === "tipo_bomba") {
      if (e.target.value === "Pluma") {
        document.querySelector("#numeroBomba").innerHTML = `
        <option value=""></option>
        <option value="BC-02 Pluma">BC-02 Pluma Chica</option>
        <option value="BC-03 Pluma">BC-03 Pluma Chica</option>
        <option value="BC-04 Pluma">BC-04 Pluma</option>
        <option value="BC-05 Pluma">BC-05 Pluma</option>
        <option value="BC-07 Pluma">BC-07 Pluma</option>
        `;
      } else if (e.target.value === "Estacionaria") {
        document.querySelector("#numeroBomba").innerHTML = `
        <option value=""></option>
        <option value="BC-06 Estacionaria">BC-06 Estacionaria</option>
        `;
      } else {
        document.querySelector("#numeroBomba").innerHTML = `
        <option value=""></option>`;
      }

      setForm({
        ...form,
        tipo_bomba: tipoBombaRef.current.value,
        numero_bomba: "",
      });
      console.log(tipoBombaRef.current.value)

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

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

  const handleBlur = (e) => {
    if (e.target.value <= MAX_CARGA_CAMIONES) {
      espaciadoCamionesRef.current.value = "";
      espaciadoCamionesRef.current.disabled = true;

      setForm({
        ...form,
        m3: cantidadRef.current.value,
        espaciado_camiones: "",
      });

      return;
    } else {
      espaciadoCamionesRef.current.disabled = false;
    }
  };

  const handleSubmit = async (e, historyRef) => {
    e.preventDefault();

    let hora =
      form.am_pm === "pm" && Number(form.hora) !== 12
        ? parseInt(form.hora) + 12
        : parseInt(form.hora);

    if (hora === 12) {
      if (form.am_pm === "am") {
        hora = "00";
      }
    }

    const formData = new FormData();

    if (comprobantePagoRef.current.files[0]) {
      formData.append("comprobante_pago", comprobantePagoRef.current.files[0]);
    }
    // if (constanciaFiscalRef.current.files[0]) {
    //   formData.append("constancia_fiscal", constanciaFiscalRef.current.files[0]);
    // }

    formData.append("m3", form.m3);
    formData.append("carga_camiones", cargaCamionesRef.current.value);
    formData.append("mas_ajuste", form.mas_ajuste);
    formData.append(
      "fecha_pedido",
      `${form.fecha_pedido}T${hora}:${form.minutos}`
    );
    formData.append("tipo", form.tipo);
    formData.append("resistencia", form.resistencia);
    formData.append("edad", form.edad);
    formData.append("tma", form.tma);
    formData.append("revenimiento", form.revenimiento);
    formData.append("forma", form.forma);
    formData.append("tipo_bomba", form.tipo_bomba || "N/A");
    formData.append("numero_bomba", form.numero_bomba || "N/A");
    formData.append("metros_adicionales", form.metros_adicionales);
    formData.append("aditivo", form.aditivo);
    formData.append("elemento_colar", form.elemento_colar);
    formData.append("observaciones", form.observaciones);
    formData.append("espaciado_camiones", form.espaciado_camiones || "N/A");
    formData.append("tiempo_colado_minutos", form.tiempo_colado_minutos);
    formData.append("status_pago", form.status_pago);
    formData.append("cliente", clienteId);
    formData.append("obra", obraId);
    formData.append("planta", form.planta);
    formData.append("fecha_filtro", `${form.fecha_pedido}`);
    formData.append("proveedor_bomba", form.proveedor_bomba);
    formData.append("restricciones_horario_obra", form.restricciones_horario_obra);
    formData.append("protocolo_acceso", form.protocolo_acceso);
    formData.append("confirmacion_cliente_escrito", form.confirmacion_cliente_escrito);
    formData.append("extensibility ", form.extensibility );
    formData.append("monto_pagado ", form.monto_pagado );
    formData.append("observaciones_precio ", form.observaciones_precio );

    if (pedidoData) {
      formData.delete("cliente");
      formData.delete("obra");

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedidoData.id}/update/`,
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
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedidoData.id}/update/`,
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
        setShowConfirmModal(true);
      } else if (data.status === 400) {
        alert(JSON.stringify(json));
      } else if (data.status === 406) {
        alert(json.error);
      }
    } else {
      let data = await fetch(
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/pedidos/create/",
        {
          method: "POST",
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
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/pedidos/create/",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 201) {
        setShowConfirmModal(true);
      } else if (data.status === 400) {
        alert(JSON.stringify(json));
      } else if (data.status === 406) {
        alert(json.error);
      } else {
        alert(
          "Ocurrio un error, por favor tome captura de pantalla e informe al desarrollador"
        );
      }
    }
  };

  return (
    <div className="container">
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text={
          pedidoData
            ? "Se ha actualizado correctamente el pedido"
            : "Se ha creado correctamente el pedido"
        }
        link={
          pedidoData
            ? `/concreco/logistica/pedido/${pedidoData.id}`
            : "/concreco/logistica/pedidos"
        }
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          {pedidoData ? (
            <h3 className="text-center">Editar Pedido</h3>
          ) : (
            <h3 className="text-center">Agregar Pedidos</h3>
          )}
          <form
            className="realizar-pedido-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="mb-2">
              <label htmlFor="cantidad" className="form-label">
                Cantidad (m3):
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
                  id="cantidad"
                  name="m3"
                  step="any"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={form.m3}
                  min="1"
                  required
                  className="form-control"
                  autoComplete="off"
                  ref={cantidadRef}
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
              <label htmlFor="cargaCamiones" className="form-label">
                Carga de camiones:
              </label>
              <input
                type="text"
                id="cargaCamiones"
                name="carga_camiones"
                onChange={handleChange}
                value={Math.ceil(form.m3 / MAX_CARGA_CAMIONES) || ""}
                readOnly
                className="form-control"
                ref={cargaCamionesRef}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="masAjuste" className="form-label">
                Más ajuste
              </label>
              <select
                name="mas_ajuste"
                id="masAjuste"
                onChange={handleChange}
                value={form.mas_ajuste}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="forma" className="form-label">
                Forma
              </label>
              <select
                name="forma"
                id="forma"
                onChange={handleChange}
                value={form.forma}
                className="form-select"
                required
                ref={formaRef}
              >
                <option value=""></option>
                <option value="T">Tirado</option>
                <option value="B">Bombeado</option>
                <option value="BC">Bomba Cliente</option>
                <option value="BR">Bomba Rentada</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="tipoBomba" className="form-label">
                Tipo de Bomba
              </label>
              <select
                id="tipoBomba"
                name="tipo_bomba"
                onChange={handleChange}
                value={form.tipo_bomba}
                ref={tipoBombaRef}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="Pluma">Bomba Pluma</option>
                <option value="Estacionaria">Bomba Estacionaria</option>
              </select>
            </div>

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
              >
                <option value=""></option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="proveedor_bomba" className="form-label">
                Proveedor de bomba
              </label>
              <select
                id="proveedor_bomba"
                name="proveedor_bomba"
                onChange={handleChange}
                value={form.proveedor_bomba}
                className="form-select"
                ref={proveedorBombaRef}
                required
              >
                <option value=""></option>
                <option value="Bomba Lancreto">Bomba Lancreto</option>
                <option value="Bombajío ">Bombajío</option>
                <option value="Bomba Euto">Bomba Euto</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="metros_adicionales" className="form-label">
                Metros adicionales
              </label>
              <input
                id="metros_adicionales"
                name="metros_adicionales"
                type="text"
                onChange={handleChange}
                value={form.metros_adicionales}
                className="form-control"
                ref={metrosAdicionalesRef}
                autoComplete="off"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="fechaPedido" className="form-label">
                Fecha de Pedido:
              </label>
              <input
                id="fechaPedido"
                type="date"
                name="fecha_pedido"
                onChange={handleChange}
                value={form.fecha_pedido}
                className="form-control"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="horas_bombas" className="form-label">
                Hora de pedido
              </label>
              <div className="row align-items-center">
                <div className="col">
                  <select
                    id="horas_bombas"
                    name="hora"
                    onChange={handleChange}
                    value={form.hora}
                    className="form-select"
                    required
                  >
                    <option value=""></option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                :
                <div className="col">
                  <select
                    name="minutos"
                    id="minutos_bombas"
                    onChange={handleChange}
                    value={form.minutos}
                    className="form-select"
                    required
                  >
                    <option value=""></option>
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                </div>
                <div className="col">
                  <select
                    name="am_pm"
                    id="am-pm"
                    onChange={handleChange}
                    value={form.am_pm}
                    className="form-select"
                    required
                  >
                    <option value=""></option>
                    <option value="am">am.</option>
                    <option value="pm">pm.</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="tipo" className="form-label">
                Tipo de Concreto
              </label>
              <select
                id="tipo"
                name="tipo"
                onChange={handleChange}
                value={form.tipo}
                className="form-select"
                required
                ref={tipoRef}
              >
                <option value=""></option>
                <option value="AR">Arquitectónico</option>
                <option value="AU">Autocompactable</option>
                <option value="CH">Autocurable</option>
                <option value="C">Convencional</option>
                <option value="ES">Estructural</option>
                <option value="JAL">Jalcreto</option>
                <option value="LZ">Lanzado</option>
                <option value="LV">Lavado</option>
                <option value="LG">Ligero</option>
                <option value="MO">Mortero</option>
                <option value="MR">MR (Módulo de Ruptura)</option>
                <option value="PB">Permeable</option>
                <option value="R">Rápido</option>
                <option value="RF">Relleno Fluido</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="resistencia" className="form-label">
                Resistencia
              </label>
              <select
                id="resistencia"
                name="resistencia"
                onChange={handleChange}
                value={form.resistencia}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="25">25</option>
                <option value="35">35</option>
                <option value="38">38</option>
                <option value="40">40</option>
                <option value="42">42</option>
                <option value="45">45</option>
                <option value="48">48</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
                <option value="125">125</option>
                <option value="150">150</option>
                <option value="175">175</option>
                <option value="200">200</option>
                <option value="250">250</option>
                <option value="300">300</option>
                <option value="350">350</option>
                <option value="400">400</option>
                <option value="650">650</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="edad" className="form-label">
                Edad
              </label>
              <select
                id="edad"
                name="edad"
                onChange={handleChange}
                value={form.edad}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="R01">R01</option>
                <option value="R03">R03</option>
                <option value="R07">R07</option>
                <option value="R14">R14</option>
                <option value="N">N</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="tma" className="form-label">
                Tamaño nominal
              </label>
              <select
                id="tma"
                name="tma"
                onChange={handleChange}
                value={form.tma}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="10">3/8 10mm</option>
                <option value="20">3/4 20mm</option>
                <option value="40">1 1/12 40mm</option>
                <option value="05">Arena 05mm</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="revenimiento" className="form-label">
                Revenimiento
              </label>
              <select
                id="revenimiento"
                name="revenimiento"
                onChange={handleChange}
                value={form.revenimiento}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="0">0 cm</option>
                <option value="06">06 cm</option>
                <option value="08">08 cm</option>
                <option value="10">10 cm</option>
                <option value="12">12 cm</option>
                <option value="14">14 cm</option>
                <option value="16">16 cm</option>
                <option value="18">18 cm</option>
                <option value="20">20 cm</option>
                <option value="22">22 cm</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="extensibility" className="form-label">
                Extensibilidad
              </label>
              <select
                id="extensibility"
                name="extensibility"
                onChange={handleChange}
                value={form.extensibility}
                className="form-select"
                ref={extensibilityRef}
                required
              >
                <option value=""></option>
                <option value="45">45</option>
                <option value="50">50</option>
                <option value="55">55</option>
                <option value="60">60</option>
                <option value="65">65</option>
                <option value="70">70</option>
                
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="aditivo" className="form-label">
                Aditivo
              </label>
              <select
                name="aditivo"
                id="aditivo"
                onChange={handleChange}
                value={form.aditivo}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="Autocompactable">Autocompactable</option>
                <option value="Autocurable">Autocurable</option>
                <option value="CLR4% Marshall">CLR4% Marshall</option>
                <option value="Fibra de acero">Fibra de acero</option>
                <option value="Fibra de polipropileno">
                  Fibra de polipropileno
                </option>
                <option value="Fluidizante">Fluidizante</option>
                <option value="Impermeabilizante al 1%">
                  Impermeabilizante al 1%
                </option>
                <option value="Impermeabilizante al 2%">
                  Impermeabilizante al 2%
                </option>
                <option value="Impermeabilizante al 4%">
                  Impermeabilizante al 4%
                </option>
                <option value="Inclusor de aire">Inclusor de aire</option>
                <option value="Perlita de polipropileno">
                  Perlita de polipropileno
                </option>
                <option value="Plastificantes">Plastificantes</option>
                <option value="Retardante">Retardante</option>
                <option value="Ninguno">Ninguno</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="elementoColar" className="form-label">
                Elemento a Colar
              </label>
              <select
                name="elemento_colar"
                id="elementoColar"
                onChange={handleChange}
                value={form.elemento_colar}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="Arroyo">Arroyo</option>
                <option value="Alberca">Alberca</option>
                <option value="Azotea plana">Azotea plana</option>
                <option value="Banqueta">Banqueta</option>
                <option value="Ballenas">Ballenas</option>
                <option value="Cabezales">Cabezales</option>
                <option value="Castillos">Castillos</option>
                <option value="Cimentación">Cimentación</option>
                <option value="Cisterna">Cisterna</option>
                <option value="Cochera">Cochera</option>
                <option value="Columnas">Columnas</option>
                <option value="Contra trabes">Contra trabes</option>
                <option value="Dados">Dados</option>
                <option value="Dalas">Dalas</option>
                <option value="Diamantes">Diamantes</option>
                <option value="Encofrado">Encofrado</option>
                <option value="Escaleras">Escaleras</option>
                <option value="Firme">Firme</option>
                <option value="Firme pulido">Firme pulido</option>
                <option value="Guarda loza">Guarda loza</option>
                <option value="Guarnición">Guarnición</option>
                <option value="Huellas">Huellas</option>
                <option value="Losacero">Losacero</option>
                <option value="Losa de azotea">Losa de azotea</option>
                <option value="Losa de entre piso">Losa de entre piso</option>
                <option value="Losa inclinada">Losa inclinada</option>
                <option value="Losa primer piso">Losa primer piso</option>
                <option value="Losa segundo piso">Losa segundo piso</option>
                <option value="Losa maciza">Losa maciza</option>
                <option value="Losa reticular">Losa reticular</option>
                <option value="Losa de vigueta y bovedilla">
                  Losa de vigueta y bovedilla
                </option>
                <option value="Mezzanine">Mezzanine</option>
                <option value="Muro de contención">Muro de contención</option>
                <option value="Muros de carga">Muros de carga</option>
                <option value="Nivelación de losa">Nivelación de losa</option>
                <option value="Rejillas">Rejillas</option>
                <option value="Semiviguetas">Semiviguetas</option>
                <option value="Pegado de tabique">Pegado de tabique</option>
                <option value="Piso pulido">Piso pulido</option>
                <option value="Plantilla">Plantilla</option>
                <option value="Rampa de acceso">Rampa de acceso</option>
                <option value="Repellado de muros">Repellado de muros</option>
                <option value="Talud">Talud</option>
                <option value="Viguetas">Viguetas</option>
                <option value="Zapata corrida">Zapata corrida</option>
                <option value="Zapata aislada">Zapata aislada</option>
                <option value="Zapatas">Zapatas</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="observaciones" className="form-label">
                Observaciones
              </label>
              <input
                id="observaciones"
                type="text"
                name="observaciones"
                onChange={handleChange}
                value={form.observaciones}
                className="form-control"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="espaciado" className="form-label">
                Espaciado de tiempo entre camiones
              </label>
              <select
                name="espaciado_camiones"
                id="espaciado"
                onChange={handleChange}
                value={form.espaciado_camiones}
                ref={espaciadoCamionesRef}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="15 min.">15 min</option>
                <option value="20 min.">20 min</option>
                <option value="25 min.">25 min</option>
                <option value="30 min.">30 min</option>
                <option value="35 min.">35 min</option>
                <option value="40 min.">40 min</option>
                <option value="45 min.">45 min</option>
                <option value="50 min.">50 min</option>
                <option value="55 min.">55 min</option>
                <option value="60 min.">1 hora</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="tiempoColado" className="form-label">
                Tiempo estimado del colado en minutos
              </label>
              <input
                id="tiempoColado"
                type="number"
                name="tiempo_colado_minutos"
                step="any"
                min="1"
                onChange={handleChange}
                value={form.tiempo_colado_minutos}
                className="form-control"
                required
                onWheel={(e) => {
                  e.target.blur();
                }}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="pago" className="form-label">
                Estatus de pago
              </label>
              <select
                id="pago"
                name="status_pago"
                onChange={handleChange}
                value={form.status_pago}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="Por pagar">Por pagar</option>
                <option value="Pagado">Pagado</option>
                <option value="Pagado por anticipo">Pagado por anticipo</option>
                <option value="Crédito">Crédito</option>
                <option value="Crédito check-plus">Crédito check-plus</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="planta" className="form-label">
                Planta
              </label>
              <select
                name="planta"
                id="planta"
                onChange={handleChange}
                value={form.planta}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="1">01 León</option>
                <option value="2">02 Puerto Interior</option>
                <option value="3">03 Salida a Lagos</option>
                <option value="4">04 San Miguel</option>
                <option value="5">05 San Pancho</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="restricciones" className="form-label">
                Restricciones horario en obra
              </label>
              <input
                id="restricciones"
                type="text"
                name="restricciones_horario_obra"
                onChange={handleChange}
                value={form.restricciones_horario_obra}
                className="form-control"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="protoclo" className="form-label">
                Protocolo de acceso
              </label>
              <input
                id="protoclo"
                type="text"
                name="protocolo_acceso"
                onChange={handleChange}
                value={form.protocolo_acceso}
                className="form-control"
                autoComplete="off"
                required
              />
            </div>
            
            <div className="mb-2">
              <label htmlFor="confirmacion" className="form-label">
                Confirmación del cliente
              </label>
              <select
                id="confirmacion"
                name="confirmacion_cliente_escrito"
                
                onChange={handleChange}
                value={form.confirmacion_cliente_escrito}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="true">Sí</option>
                <option value="false">No</option>
            </select>

            </div>

            <div className="mb-2">
              <label htmlFor="monto_pagado" className="form-label">
                Monto pagado
              </label>
              <input
                id="monto_pagado"
                type="number"
                name="monto_pagado"
                onChange={handleChange}
                value={form.monto_pagado}
                className="form-control"
                autoComplete="off"
                // required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="observaciones_precio" className="form-label">
                Observaciones precio 
              </label>
              <input
                id="observaciones_precio"
                type="text"
                name="observaciones_precio"
                onChange={handleChange}
                value={form.observaciones_precio}
                className="form-control"
                autoComplete="off"
                // required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="comprobante" className="form-label">
                Comprobante de pagoo
              </label>
              <input
                type="file"
                id="comprobante"
                className="form-control"
                ref={comprobantePagoRef}
              />
            </div>

            {/* <div className="mb-2">
              <label htmlFor="constancia_fiscal" className="form-label">
                Constancia Fiscal
              </label>
              <input
                type="file"
                id="constancia_fiscal"
                className="form-control"
                ref={constanciaFiscalRef}
              />
            </div> */}

            <div className="d-flex justify-content-end ">
              {pedidoData ? (
                <input
                  type="submit"
                  value="Guardar Cambios"
                  className="btn  mb-3 mt-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                />
              ) : (
                <input
                  type="submit"
                  value="Guardar Pedido"
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
