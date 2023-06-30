import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";
import { CustomSelect } from "../custom-select/CustomSelect";

import "./FormAgregarSeguro.styles.scss";

import {

    OpcionesSelectEmpresaAltaFinanzas,
    OpcionesSelectEmpresaResponsableFinanzas,
    
} from "../../utils/selects-opciones";

const initialState = {
    asegurada: "",
    fecha_vencimiento_poliza: "",
    numero_poliza: "",
    certificado: "",
    tipo_cobertura: "",
    valor_asegurado: "",
    tipo_deducible: "",
    carga_tipo_b: "",
    uso_unidad: "",
    servicio: "",
    remolque: "",
    valor_poliza: "",
    importe_valor_comercial:"",
    
};

export const FormAgregarSeguro = ({ unidadId, obraData }) => {
  const [form, setForm] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const imagenRef = useRef();

  const history = useHistory();
  const { pathname } = useLocation();

  const { obraId } = useParams();

  useEffect(() => {
    if (obraData) {
      setForm({
        nombre: obraData.nombre,
        residente: obraData.residente,
        direccion: obraData.direccion,
        telefono: obraData.telefono,
        email: obraData.email,
        linkObra: obraData.linkObra,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

  

    formData.append("asegurada", form.asegurada);
    formData.append("fecha_vencimiento_poliza", form.fecha_vencimiento_poliza);
    formData.append("numero_poliza", form.numero_poliza);
    formData.append("certificado", form.certificado);
    formData.append("tipo_cobertura", form.tipo_cobertura);
    formData.append("valor_asegurado", form.valor_asegurado);
    formData.append("tipo_deducible", form.tipo_deducible);
    formData.append("carga_tipo_b", form.carga_tipo_b);
    formData.append("uso_unidad", form.uso_unidad);
    formData.append("servicio", form.servicio);
    formData.append("remolque", form.remolque);
    formData.append("valor_poliza", form.valor_poliza);
    formData.append("importe_valor_comercial", form.importe_valor_comercial);
    formData.append("unidad", unidadId);
    formData.append("usuario", 1);

    

    if (obraData) {
      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/update/`,
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
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/update/`,
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
          alert("Ingresa un email válido");
          return;
        }
      }
      if (data.status === 200) {
        setShowConfirmModal(true);
      }
    } else {
      let data = await fetch(
        process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/seguros/",
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
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/obras/create/",
          {
            method: "POST",
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
          alert("Ingresa un email válido");
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
          obraData
            ? "Se ha actualizado correctamente la obra."
            : "Se ha creado correctamente la obra."
        }
        link={
            obraData
            ? `/unidades/unidad/${unidadId}`
            : `/unidades/unidad/${unidadId}`
        }
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          {obraData ? (
            <h3 className="text-center">Editar Seguro de la unidad</h3>
          ) : (
            <h3 className="text-center">Agregar Seguro de la unidad</h3>
          )}

          <form
            className="agregar-obra-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="mb-2">
          
            <label htmlFor="asegurada" className="form-label">
                Asegurada
              </label>
              <select
                className="form-select"
                id="asegurada"
                name="asegurada"
                onChange={handleChange}
                value={form.asegurada}
              >
                <option></option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
             
            </div>

            <div className="mb-2">
          
            <label htmlFor="fecha_vencimiento_poliza" className="form-label">
                Fecha de Vencimiento:
              </label>
              <input
                id="fecha_vencimiento_poliza"
                type="date"
                name="fecha_vencimiento_poliza"
                onChange={handleChange}
                value={form.fecha_vencimiento_poliza}
                className="form-control"
                required
              />
             
            </div>

            <div className="mb-2">

            <label htmlFor="numero_poliza" className="form-label">
                  Número de poliza
                </label>
                <input
                  type="text"
                  name="numero_poliza"
                  id="numero_poliza"
                  value={form.numero_poliza}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
            </div>

            <div className="mb-2">
            <label htmlFor="certificado" className="form-label">
                  Certificado
                </label>
                <input
                  type="text"
                  name="certificado"
                  id="certificado"
                  value={form.numero_poliza}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
            </div>

            <div className="mb-2">
          
            <label htmlFor="tipo_cobertura" className="form-label">
                Tipo de cobertura
              </label>
              <select
                className="form-select"
                id="tipo_cobertura"
                name="tipo_cobertura"
                onChange={handleChange}
                value={form.tipo_cobertura}
              >
                <option></option>
                <option value="Amplio pick ups">Amplio pick ups</option>
                <option value="Básica">Básica</option>
                <option value="Escencial">Escencial</option>
                <option value="Total">Total</option>
                <option value="Total Responsabilidad civil ecológica">Total Responsabilidad civil ecológica</option>
                <option value="Maquinaria para contratistas">Maquinaria para contratistas</option>
              </select>
             
            </div>

            <div className="mb-2">
            <label htmlFor="certificado" className="form-label">
                  Valor asegurado
                </label>
                <input
                  type="text"
                  name="certificado"
                  id="certificado"
                  value={form.numero_poliza}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
            </div>

            <div className="mb-2">
            <label htmlFor="tipo_deducible" className="form-label">
                  Tipo de deducible 
                </label>
                <input
                  type="text"
                  name="tipo_deducible"
                  id="tipo_deducible"
                  value={form.tipo_deducible}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
            </div>

            <div className="mb-2">
          
            <label htmlFor="carga_tipo_b" className="form-label">
                Carga tipo b
              </label>
              <select
                className="form-select"
                id="carga_tipo_b"
                name="carga_tipo_b"
                onChange={handleChange}
                value={form.carga_tipo_b}
              >
                <option></option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
             
            </div>

            <div className="mb-2">

            <label htmlFor="uso_unidad" className="form-label">
                Uso de la unidad
              </label>
              <select
                className="form-select"
                id="uso_unidad"
                name="uso_unidad"
                onChange={handleChange}
                value={form.uso_unidad}
              >
                <option></option>
                
                <option value="Carga comercial">Carga comercial</option>
              </select>
             
            </div>

            <div className="mb-2">
            <label htmlFor="servicio" className="form-label">
                  Servicio 
                </label>
                <input
                  type="text"
                  name="servicio"
                  id="servicio"
                  value={form.servicio}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
            </div>

            <div className="mb-2">
            <label htmlFor="remolque" className="form-label">
                Remolque
              </label>
              <select
                className="form-select"
                id="remolque"
                name="remolque"
                onChange={handleChange}
                value={form.remolque}
              >
                <option></option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-2">
            <label htmlFor="valor_poliza" className="form-label">
                  Valor poliza
                </label>
                <input
                  type="number"
                  name="valor_poliza"
                  id="valor_poliza"
                  value={form.valor_poliza}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                onWheel={(e) => {
                  e.target.blur();
                }}
                />
            </div>

            <div className="mb-2">
            <label htmlFor="importe_valor_comercial" className="form-label">
                  Importe valor comercial
              </label>
              <select
                className="form-select"
                id="importe_valor_comercial"
                name="importe_valor_comercial"
                onChange={handleChange}
                value={form.importe_valor_comercial}
              >
                <option></option>
                <option value="Comercial">Comercial</option>
                <option value="Convenio">Convenio</option>
              </select>
            </div>


           

           

            <div className="d-flex justify-content-end ">
              {obraData ? (
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