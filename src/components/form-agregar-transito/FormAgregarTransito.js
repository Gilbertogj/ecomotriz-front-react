import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";
import { CustomSelect } from "../custom-select/CustomSelect";

import "./FormAgregarTransito.styles.scss";

import {

    OpcionesSelectEmpresaAltaFinanzas,
    OpcionesSelectEmpresaResponsableFinanzas,
    
} from "../../utils/selects-opciones";

const initialState = {
    placas: "",
    operador: "",
    fecha_vencimiento_licencia: "",
    fecha_inicio_operacion: "",
 
    
};

export const FormAgregarTransito = ({ unidadId, obraData }) => {
  const [form, setForm] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const imagenRef = useRef();

  const fotoPlacasFrontalRef = useRef();
  const fotoPlacasTraseraRef = useRef();
  const fotoTarjetaCirculacionRef = useRef();
  const fotoOperadorRef = useRef();
  const fotoLicenciaOperadorFrontalRef = useRef();
  const fotoLicenciaOperadorPosteriorRef = useRef();
  const cartaResponsivaEntregaRef = useRef();
  const cartaResponsivaOperadorRef = useRef();
  const permisoCargaSCTRef = useRef();
  const permisoEmpresaRef = useRef();
  const verificacionEstatalRef = useRef();
  const verificacionFederalRef = useRef();


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

    if (fotoPlacasFrontalRef.current.files[0]) {
        formData.append("foto_placas_frontal", fotoPlacasFrontalRef.current.files[0]);
    }

    if (fotoPlacasTraseraRef.current.files[0]) {
      formData.append("foto_placas_trasera", fotoPlacasTraseraRef.current.files[0]);
    }

    if (fotoTarjetaCirculacionRef.current.files[0]) {
        formData.append("foto_tarjeta_circulacion", fotoTarjetaCirculacionRef.current.files[0]);
    }
    if (fotoOperadorRef.current.files[0]) {
        formData.append("foto_operador", fotoOperadorRef.current.files[0]);
    }
    if (fotoLicenciaOperadorFrontalRef.current.files[0]) {
        formData.append("foto_licencia_operador_frontal", fotoLicenciaOperadorFrontalRef.current.files[0]);
    }
    if (fotoLicenciaOperadorPosteriorRef.current.files[0]) {
        formData.append("foto_licencia_operador_posterior", fotoLicenciaOperadorPosteriorRef.current.files[0]);
    }
    if (cartaResponsivaEntregaRef.current.files[0]) {
        formData.append("carta_responsiva_entrega", cartaResponsivaEntregaRef.current.files[0]);
    }
    if (cartaResponsivaOperadorRef.current.files[0]) {
        formData.append("carta_responsiva_operador", cartaResponsivaOperadorRef.current.files[0]);
    }
    if (permisoCargaSCTRef.current.files[0]) {
        formData.append("permiso_carga_sct", permisoCargaSCTRef.current.files[0]);
    }
    if (permisoEmpresaRef.current.files[0]) {
        formData.append("permiso_empresa", permisoEmpresaRef.current.files[0]);
    }
    if (verificacionEstatalRef.current.files[0]) {
        formData.append("verificacion_estatal", verificacionEstatalRef.current.files[0]);
    }
    if (verificacionFederalRef.current.files[0]) {
        formData.append("verificacion_federal", verificacionFederalRef.current.files[0]);
    }

  

    formData.append("placas", form.placas);
    formData.append("operador", form.operador);
    formData.append("fecha_vencimiento_licencia", form.fecha_vencimiento_licencia);
    formData.append("fecha_inicio_operacion", form.fecha_inicio_operacion);
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
        process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/transitos/",
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
            <h3 className="text-center">Editar Tránsito de la unidad</h3>
          ) : (
            <h3 className="text-center">Agregar Tránsito de la unidad</h3>
          )}

          <form
            className="agregar-obra-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="mb-2">
          
            <label htmlFor="placas" className="form-label">
                  Placas
                </label>
                <input
                  type="text"
                  name="placas"
                  id="placas"
                  value={form.placas}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
            </div>

            <div className="mb-2">
          
           
                  <label htmlFor="foto_placas_frontal" className="form-label">
                    Fotografía Placas Frontal
                  </label>
                  <input
                    type="file"
                    id="foto_placas_frontal"
                    className="form-control"
                    ref={fotoPlacasFrontalRef}
                  />
                

             
            </div>

            <div className="mb-2">

            <label htmlFor="foto_placas_trasera" className="form-label">
                    Fotografía Placas Trasera
                  </label>
                  <input
                    type="file"
                    id="foto_placas_trasera"
                    className="form-control"
                    ref={fotoPlacasTraseraRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="foto_tarjeta_circulacion" className="form-label">
                    Fotografía Tarjeta de Circulación
                  </label>
                  <input
                    type="file"
                    id="foto_tarjeta_circulacion"
                    className="form-control"
                    ref={fotoTarjetaCirculacionRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="operador" className="form-label">
                  Operador
                </label>
                <input
                  type="text"
                  name="operador"
                  id="operador"
                  value={form.operador}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
          
            
            </div>

            <div className="mb-2">
            <label htmlFor="foto_operador" className="form-label">
                    Fotografía Operador
                  </label>
                  <input
                    type="file"
                    id="foto_operador"
                    className="form-control"
                    ref={fotoOperadorRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="foto_licencia_operador_frontal" className="form-label">
                    Fotografía Licencia Operador Frontal
                  </label>
                  <input
                    type="file"
                    id="foto_licencia_operador_frontal"
                    className="form-control"
                    ref={fotoLicenciaOperadorFrontalRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="foto_licencia_operador_posterior" className="form-label">
                    Fotografía Licencia Operador Posterior
                  </label>
                  <input
                    type="file"
                    id="foto_licencia_operador_posterior"
                    className="form-control"
                    ref={fotoLicenciaOperadorPosteriorRef}
                  />
            </div>


            <div className="mb-2">
            <label htmlFor="fecha_vencimiento_licencia" className="form-label">
                Fecha de Vencimiento Licencia:
              </label>
              <input
                id="fecha_vencimiento_licencia"
                type="date"
                name="fecha_vencimiento_licencia"
                onChange={handleChange}
                value={form.fecha_vencimiento_licencia}
                className="form-control"
                required
              />
              </div>

              <div className="mb-2">
            <label htmlFor="fecha_inicio_operacion" className="form-label">
                Fecha de Inicio de Operación:
              </label>
              <input
                id="fecha_inicio_operacion"
                type="date"
                name="fecha_inicio_operacion"
                onChange={handleChange}
                value={form.fecha_inicio_operacion}
                className="form-control"
                required
              />
              </div>

            <div className="mb-2">
            <label htmlFor="carta_responsiva_entrega" className="form-label">
                    Carta Responsiva Entrega
                  </label>
                  <input
                    type="file"
                    id="carta_responsiva_entrega"
                    className="form-control"
                    ref={cartaResponsivaEntregaRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="carta_responsiva_operador" className="form-label">
                    Carta Responsiva Operador
                  </label>
                  <input
                    type="file"
                    id="carta_responsiva_operador"
                    className="form-control"
                    ref={cartaResponsivaOperadorRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="permiso_carga_sct" className="form-label">
                    Permiso Carga SCT
                  </label>
                  <input
                    type="file"
                    id="permiso_carga_sct"
                    className="form-control"
                    ref={permisoCargaSCTRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="permiso_empresa" className="form-label">
                    Permiso Empresa
                  </label>
                  <input
                    type="file"
                    id="permiso_empresa"
                    className="form-control"
                    ref={permisoEmpresaRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="verificacion_estatal" className="form-label">
                    Verificación Estatal
                  </label>
                  <input
                    type="file"
                    id="verificacion_estatal"
                    className="form-control"
                    ref={verificacionEstatalRef}
                  />
            </div>

            <div className="mb-2">
            <label htmlFor="verificacion_federal" className="form-label">
                    Verificación Federal
                  </label>
                  <input
                    type="file"
                    id="verificacion_federal"
                    className="form-control"
                    ref={verificacionFederalRef}
                  />
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