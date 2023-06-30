import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import {
    OpcionesSelectPago,
    OpcionesSelectCfdi,
    OpcionesSelectMetodoPago,
    OpcionesSelectFormaPago,
  } from "../../utils/selects-opciones";

  import { CustomSelect } from "../custom-select/CustomSelect";
import { ModalRedirect } from "../modal-redirect/ModalRedirect";

import "./FormAgregarCondicionVenta.styles.scss";

const initialState = {
  CFDI: "",
  metodo_pago: "",
  forma_pago: "",
  pago: "",
  tipo_facturacion: "",
};

export const FormAgregarCondicionVenta = ({ clienteId, condicionVentaData }) => {
    const [form, setForm] = useState(initialState);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
  
    const { authtoken, dispatch } = useContext(ReactReduxContext);
  
    const history = useHistory();
    const { pathname } = useLocation();
  
    const { condicionVentaId } = useParams();

    const pagoRef = useRef();
    const cfdiInputRef = useRef();
    const metodoPagoInputRef = useRef();
    const formaPagoInputRef = useRef();
    const tipo_facturacionInputRef = useRef();

    
  
    useEffect(() => {
      if (condicionVentaData) {
        setForm({
          CFDI: condicionVentaData.CFDI,
          metodo_pago: condicionVentaData.metodo_pago,
          forma_pago: condicionVentaData.forma_pago,
          pago: condicionVentaData.pago,
          tipo_facturacion: condicionVentaData.tipo_facturacion,
        });
      }
    }, []);
  
    const handleChange = (e) => {
      // const { name, value } = e.target;
      const value = e.target.value;
      const name = e.target.name;

      if (e.target.name === "pago") {
        if (e.target.value === "G") {
          setForm({
            ...form,
            pago: "G",
            CFDI: "",
            metodo_pago: "",
            forma_pago: "",
            //tipo_facturacion: "N/A",
          });
  
          cfdiInputRef.current.disabled = true;
          metodoPagoInputRef.current.disabled = true;
          formaPagoInputRef.current.disabled = true;
          //tipo_facturacionInputRef.current.disabled = true;
        } else {
          setForm({
            ...form,
            pago: "F",
            tipo_facturacion: "",
            CFDI: cfdiInputRef.current.value,
            metodo_pago: metodoPagoInputRef.current.value,
            forma_pago: formaPagoInputRef.current.value,
            //tipo_facturacion: tipo_facturacionInputRef.current.value,
          });
  
          
          cfdiInputRef.current.disabled = false;
          metodoPagoInputRef.current.disabled = false;
          formaPagoInputRef.current.disabled = false;
          tipo_facturacionInputRef.current.disabled = false;
        }
  
        return;
      }
      
  
      setForm({ ...form, [name]: value, });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const formulario = {
        ...form,
        CFDI: form.CFDI || "N/A",
        metodo_pago: form.metodo_pago || "N/A",
        forma_pago: form.forma_pago || "N/A",
        tipo_facturacion: form.tipo_facturacion || "N/A",
      };
  
      const formData = new FormData();
  
  
      formData.append("pago", form.pago);
      formData.append("CFDI", form.CFDI);
      formData.append("metodo_pago", form.metodo_pago);
      formData.append("forma_pago", form.forma_pago);
      formData.append("tipo_facturacion", form.tipo_facturacion);
      formData.append("cliente", clienteId);
  
      if (condicionVentaData) {
        let data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/condicion-venta/${condicionVentaId}`,
          {
            method: "PATCH",
            headers: {
              /* "Content-Type": "application/json", */
              Authorization: `Token ${authtoken}`,
            },
            body: formData,
          }
        );
  
        let json = await data.json();
  
        // console.log(json);
  
        if (json.expired) {
          dispatch(setCurrentUser({ token: json.token }));
  
          data = await fetch(
            `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/condicion-venta/${condicionVentaId}/`,
            {
              method: "PATCH",
              headers: {
                /* "Content-Type": "application/json", */
                Authorization: `Token ${json.token}`,
              },
              body: formData,
            }
          );
  
          json = await data.json();
        }
  
        if (data.status === 400) {
          if (json.email) {
            alert("Ocurrio un error en el registro");
            return;
          }
        }
        if (data.status === 200) {
          setShowConfirmModal(true);
        }
      } else {
        let data = await fetch(
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/condicion-venta/",
          {
            method: "POST",
            headers: {
              /* "Content-Type": "application/json", */
              Authorization: `Token ${authtoken}`,
            },
            body: formData,
          }
        );
  
        let json = await data.json();
  
        if (json.expired) {
          dispatch(setCurrentUser({ token: json.token }));
  
          data = await fetch(
            process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/condicion-venta/",
            {
              method: "POST",
              headers: {
                /* "Content-Type": "application/json", */
                Authorization: `Token ${json.token}`,
              },
              body: JSON.stringify(formulario),
            }
          );
  
          json = await data.json();
        }
  
        if (data.status === 400) {
          if (json.email) {
            alert("Ocurrio un error en el registro");
            return;
          }
        }
  
        if (data.status === 201) {
          setShowConfirmModal(true);
        }
      }
    };
  
    return (
      <div className="container">
        <ModalRedirect
          showConfirmModal={showConfirmModal}
          text={
            condicionVentaData
              ? "Se ha actualizado correctamente la condidicon de venta."
              : "Se ha creado correctamente la condidicon de venta."
          }
          link={
            condicionVentaData
              ? pathname.includes("logistica")
                ? `/concreco/logistica/condicion-venta/`
                : pathname.includes("comercializacion") &&
                  `/concreco/logistica/condicion-venta/${condicionVentaId}`
              : pathname.includes("logistica")
              ? `/concreco/logistica/cliente/${clienteId}/condicion-venta/`
              : pathname.includes("comercializacion") &&
                `/concreco/logistica/condicion-venta/${condicionVentaId}`
          }
        />
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8">
            {condicionVentaData ? (
              <h3 className="text-center">Editar Obra</h3>
            ) : (
              <h3 className="text-center">Agregar Condicion de Venta</h3>
            )}
  
            <form
              className="agregar-condicionventa-form"
              onSubmit={(e) => {
                handleSubmit(e, history);
              }}
            >
              <div className="mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectPago}
                  handleChange={handleChange}
                  isRequired={true}
                  form={form}
                  selectRef={pagoRef}
                />
              </div>
              </div>
  
              <div className="mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectCfdi}
                  handleChange={handleChange}
                  selectRef={cfdiInputRef}
                  isRequired={true}
                  form={form}
                />
              </div>
              </div>
  
              <div className="mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectMetodoPago}
                  handleChange={handleChange}
                  selectRef={metodoPagoInputRef}
                  isRequired={true}
                  form={form}
                />
              </div>
              </div>
  
              <div className="mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectFormaPago}
                  handleChange={handleChange}
                  selectRef={formaPagoInputRef}
                  isRequired={true}
                  form={form}
                />
              </div>
              </div>
  
              <div className="mb-2">
              <div className="col-12 col-md-6">
                <label htmlFor="tipo_facturacion" className="form-label">
                  Tipo facturación
                </label>
                <input
                  type="text"
                  name="tipo_facturacion"
                  id="tipo_facturacion"
                  value={form.tipo_facturacion}
                  onChange={handleChange}
                  //ref={tipo_facturacionInputRef}
                  className="form-control"
                  autoComplete="off"
                  isRequired={true}
                  required
                  
                  
                />
              </div>
              </div>
  
              
  
              <div className="d-flex justify-content-end ">
                {condicionVentaData ? (
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
                    className="btn  mb-3 mt-2"
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
  
