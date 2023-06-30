import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import {

    OpcionesSelectEstatusUnidad,
    OpcionesSelectCategoriaUnidad,
    OpcionesSelectUbicacionResguardo,
    OpcionesSelectTipoCombustible,
    OpcionesSelectMarcaUnidad,
    OpcionesSelectMarcaMotor,
    
} from "../../utils/selects-opciones";

import { CustomSelect } from "../custom-select/CustomSelect";
import { ModalRedirect } from "../modal-redirect/ModalRedirect";

import "./FormAgregarUnidad.styles.scss";

const formInitialState = {
  status_unidad: "",
  ubicacion_resguardo: "",
  ano_unidad: "",
  categoria: "",
  familia: "",
  subfamilia: "",
  marca_unidad: "",
  modelo: "",
  modelo_motor: "",
  marca_motor: "",
  numero_serie_motor: "",
  numero_serie_unidad: "",
  numero_serie_chasis: "",
  numero_economico: "",
  tipo_combustible: "",
  comentarios_generales: "",
  
 
  

};

export const FormAgregarUnidad = ({formToEdit}) => {
  const [form, setForm] = useState(formInitialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const history = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();

 

  const estatusRef = useRef();
  const ubicacionResguardoRef = useRef();
  const categoriaUnidadRef = useRef();
  const familiaUnidadRef = useRef();
  const subFamiliaRef = useRef();
  const fotoFrontalUnidadRef = useRef();
  const fotoDerechaUnidadRef = useRef();
  const fotoIzquierdaUnidadRef = useRef();
  const fotoTraseraUnidadRef = useRef();
  const fotoCabinaUnidadRef = useRef();
  const fotoPlacaIdentificacionRef =useRef();
  const fotoFrontalMotorRef =useRef();
  const fotoDerechaMotorRef =useRef();
  const fotoIzquierdaMotorRef =useRef();
  const fotoSerieMotorRef =useRef();
  const fotoSerieUnidadRef =useRef();






  const pagoRef = useRef();
 
  const rfcInputRef = useRef();
  const cfdiInputRef = useRef();
  const metodoPagoInputRef = useRef();
  const formaPagoInputRef = useRef();
  const correoFacturasInputRef = useRef();
  const estadoInputRef = useRef();


  // const [dataJson, setData] = useState([]);

  useEffect(() => {
    
   

    const verificarSiClienteExiste = async () => {
      let data = await fetch(
        `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/${id}/`,
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
          `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/${id}/`,
          {
            headers: {
              // Authorization: `Token ${json.token}`,
            },
          }
        );

        json = await data.json();
      }
      
      if(json.categoria === "Construcción"){
        console.log("si");
      document.querySelector("#familia").innerHTML = `
      <option value=""></option>
      <option value="Bulldozer">Bulldozer</option>
      <option value="Cargadores/Payloaders">Cargadores/Payloaders</option>
      <option value="Compactadoras">Compactadoras</option>
      <option value="Excavadoras">Excavadoras</option>
      <option value="Generadores">Generadores</option>
      <option value="Retroexcavadora con cargador">Retroexcavadora con cargador</option>
      <option value="Aditamentos">Aditamentos</option>
      `;
          
      }else if (json.categoria === "Logística") {
        document.querySelector("#familia").innerHTML = `
        <option value=""></option>
        <option value="Tracto camión (Tráiler)">Tracto camión (Tráiler)</option>
        <option value="Góndola (30m3)">Góndola (30m3)</option>
        <option value="Remolque">Remolque</option>
        <option value="Dolly">Dolly</option>
        `;
        }else if (json.categoria === "Carga y manipulación") {
          document.querySelector("#familia").innerHTML = `
          <option value=""></option>
          <option value="Montacargas">Montacargas</option>
          <option value="Grúas">Grúas</option>
          `;
        }else if (json.categoria === "Equipo de Asfalto") {
            document.querySelector("#familia").innerHTML = `
            <option value=""></option>
            <option value="Pavimentación de Asfalto">Pavimentación de Asfalto</option>
            <option value="Plantas y componentes de asfalto">Plantas y componentes de asfalto</option>
            <option value="Equipo de Molienda">Equipo de Molienda</option>
            <option value="Petrolizadora">Petrolizadora</option>
            <option value="Compactadoras">Compactadoras</option>
            `;
        }else if (json.categoria === "Concreto") {
          document.querySelector("#familia").innerHTML = `
          <option value=""></option>
          <option value="Camiones mezcladores de concreto">Camiones mezcladores de concreto</option>
          <option value="Bomba estacionaria">Bomba estacionaria</option>
          <option value="Planta de concreto">Planta de concreto</option>
          <option value="Silo de concreto">Silo de concreto</option>
          <option value="Equipo de dosificación de concreto">Equipo de dosificación de concreto</option>
          `;
        }else if (json.categoria === "Trituración") {
          document.querySelector("#familia").innerHTML = `
          <option value=""></option>
          <option value="Criba">Criba</option>
          <option value="Transportador">Transportador</option>
          <option value="Trituradora">Trituradora</option>
          `;
        }else if (json.categoria === "Unidades utilitarias") {
          document.querySelector("#familia").innerHTML = `
          <option value=""></option>
          <option value="Comercialización">Comercialización</option>
          <option value="Transporte de personal">Transporte de personal</option>
          <option value="Atenciones emergentes en obra/trituradoras">Atenciones emergentes en obra/trituradoras</option>
          `;
        }

      
          if(json.familia === "Compactadoras"){
          document.querySelector("#subfamilia").innerHTML = `
          <option value=""></option>
          <option value="Pata de cabra">Pata de cabra</option>
          <option value="Doble rodillo">Doble rodillo</option>
          <option value="Rodillo vibratorio">Rodillo vibratorio</option>
          <option value="Rodillo vibratorio doble">Rodillo vibratorio doble</option>
          <option value="Rodillo neumático">Rodillo neumático</option>
          <option value="Mini compactador">Mini compactador</option>
          `;
        
              
          }else if (json.familia === "Aditamentos") {
          document.querySelector("#subfamilia").innerHTML = `
          <option value=""></option>
          <option value="Martillos hidráulicos">Martillos hidráulicos</option>
          <option value="Barredoras">Barredoras</option>
          `;
       
    
        
          }else if (json.familia === "Plantas y componentes de asfalto") {
            document.querySelector("#subfamilia").innerHTML = `
            <option value=""></option>
            <option value="Planta de asfalto">Planta de asfalto</option>
            <option value="Silo de Asfalto">Silo de Asfalto</option>
            <option value="Calentador de aceite">Calentador de aceite</option>
            `;
          
           
          }else if (json.familia === "Equipo de Molienda") {
              document.querySelector("#subfamilia").innerHTML = `
              <option value=""></option>
              <option value="Recicladora de pavimento asfáltico">Recicladora de pavimento asfáltico</option>
              `;
         
        
             
          }else if (json.familia === "Compactadoras") {
            document.querySelector("#subfamilia").innerHTML = `
            <option value=""></option>
            <option value="Compactador vibratorio">Compactador vibratorio</option>
            <option value="Compactador Vibratorio doble">Compactador Vibratorio doble</option>
            <option value="Compactador Neumático">Compactador Neumático</option>
            `;
     
      
          
          }else if (json.familia === "Trituradora") {
            document.querySelector("#subfamilia").innerHTML = `
            <option value=""></option>
            <option value="Trituradora de impacto">Trituradora de impacto</option>
            <option value="Trituradora de cono">Trituradora de cono</option>
            <option value="Trituradora de Quijada">Trituradora de Quijada</option>
            <option value="Quebradora">Quebradora</option>
            <option value="Trituradora de rodillos">Trituradora de rodillos</option>
            `;
          
          }else{
            subFamiliaRef.current.disabled = true;

          }
          
    


      setForm({
        nombre: json.nombre,
        status_unidad: json.status_unidad,
        ubicacion_resguardo: json.ubicacion_resguardo,
        ano_unidad: json.ano_unidad,
        categoria: json.categoria,
        familia: json.familia,
        subfamilia: json.subfamilia,
        marca_unidad: json.marca_unidad,
        modelo: json.modelo,
        modelo_motor: json.modelo_motor,
        marca_motor: json.marca_motor,
        numero_serie_motor: json.numero_serie_motor,
        numero_serie_unidad: json.numero_serie_unidad,
        numero_serie_chasis: json.numero_serie_chasis,
        numero_economico: json.numero_economico,
        municipio: json.municipio,
        tipo_combustible: json.tipo_combustible,
        comentarios_generales: json.comentarios_generales,
     
        



        // CFDI: json.CFDI === "N/A" ? "" : json.CFDI,
        // metodo_pago: json.metodo_pago === "N/A" ? "" : json.metodo_pago,
        // forma_pago: json.forma_pago === "N/A" ? "" : json.forma_pago,
    
      });

      console.log(json.categoria);

      if (json.status_unidad === "Bajo resguardo/Pausada") {
       

        ubicacionResguardoRef.current.disabled = false;
        
      } else {
       
        ubicacionResguardoRef.current.disabled = true;
      } 





      if (json.categoria == "Construcción" ) {
        document.querySelector("#familia").disabled = false;
        
      }


      
       

      // setData(json);

      // if (pagoRef.current.value === "G" || pagoRef.current.value === "Público General") {
      //   rfcInputRef.current.disabled = true;
      //   cfdiInputRef.current.disabled = true;
      //   metodoPagoInputRef.current.disabled = true;
      //   formaPagoInputRef.current.disabled = true;
      //   correoFacturasInputRef.current.disabled = true;
      // }

      // if(json.pago ==="F"){
      //   console.log("si es f");
      //   document.querySelector("#tipo-venta").innerHTML = `
      //   <option value=""></option>
      //   <option value="Contado">Contado</option>
      //   <option value="Credito Check Plus">Crédito Check Plus</option>
      //   <option value="Credito Concreco">Credito Concreco</option>
      //   <option value="Anticipo">Anticipo</option>
        
      //   `;
      // } else {
      //   document.querySelector("#tipo-venta").innerHTML = `
      //   <option value=""></option>
      //   <option value="Contado">Contado</option>
      //   <option value="Credito">Crédito</option>
      //   <option value="Anticipo">Anticipo</option>
      //   `;
      // }
      

    
    };

    if (id) {
      verificarSiClienteExiste();
      // console.log("si es para editar");
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (e.target.name === "status_unidad") {
      if (e.target.value === "Bajo resguardo/Pausada") {
        setForm({
          ...form,
          status_unidad: estatusRef.current.value,
          ubicacion_resguardo: ubicacionResguardoRef.current.value,
          
        });

        ubicacionResguardoRef.current.disabled = false;
        
      } else {
        setForm({
          ...form,
          status_unidad: estatusRef.current.value,
          ubicacion_resguardo: "",
        });

        ubicacionResguardoRef.current.disabled = true;
      } 

      return;
    }


    if(e.target.name === "categoria"){
        if(e.target.value === "Construcción"){
        document.querySelector("#familia").innerHTML = `
        <option value=""></option>
        <option value="Bulldozer">Bulldozer</option>
        <option value="Cargadores/Payloaders">Cargadores/Payloaders</option>
        <option value="Compactadoras">Compactadoras</option>
        <option value="Excavadoras">Excavadoras</option>
        <option value="Generadores">Generadores</option>
        <option value="Retroexcavadora con cargador">Retroexcavadora con cargador</option>
        <option value="Aditamentos">Aditamentos</option>
        `;
            
        }else if (e.target.value === "Logística") {
        document.querySelector("#familia").innerHTML = `
        <option value=""></option>
        <option value="Tracto camión (Tráiler)">Tracto camión (Tráiler)</option>
        <option value="Góndola (30m3)">Góndola (30m3)</option>
        <option value="Remolque">Remolque</option>
        <option value="Dolly">Dolly</option>
        `;
        }else if (e.target.value === "Carga y manipulación") {
          document.querySelector("#familia").innerHTML = `
          <option value=""></option>
          <option value="Montacargas">Montacargas</option>
          <option value="Grúas">Grúas</option>
          `;
        }else if (e.target.value === "Equipo de Asfalto") {
            document.querySelector("#familia").innerHTML = `
            <option value=""></option>
            <option value="Pavimentación de Asfalto">Pavimentación de Asfalto</option>
            <option value="Plantas y componentes de asfalto">Plantas y componentes de asfalto</option>
            <option value="Equipo de Molienda">Equipo de Molienda</option>
            <option value="Petrolizadora">Petrolizadora</option>
            <option value="Compactadoras">Compactadoras</option>
            `;
        }else if (e.target.value === "Concreto") {
          document.querySelector("#familia").innerHTML = `
          <option value=""></option>
          <option value="Camiones mezcladores de concreto">Camiones mezcladores de concreto</option>
          <option value="Bomba estacionaria">Bomba estacionaria</option>
          <option value="Planta de concreto">Planta de concreto</option>
          <option value="Silo de concreto">Silo de concreto</option>
          <option value="Equipo de dosificación de concreto">Equipo de dosificación de concreto</option>
          `;
        }else if (e.target.value === "Trituración") {
          document.querySelector("#familia").innerHTML = `
          <option value=""></option>
          <option value="Criba">Criba</option>
          <option value="Transportador">Transportador</option>
          <option value="Trituradora">Trituradora</option>
          `;
        }else if (e.target.value === "Unidades utilitarias") {
          document.querySelector("#familia").innerHTML = `
          <option value=""></option>
          <option value="Comercialización">Comercialización</option>
          <option value="Transporte de personal">Transporte de personal</option>
          <option value="Atenciones emergentes en obra/trituradoras">Atenciones emergentes en obra/trituradoras</option>
          `;
        }
        
        setForm({
          ...form,
         categoria:categoriaUnidadRef.current.value,
         familia: "",
        });
        return;

    }

    if(e.target.name === "familia"){
      if(e.target.value === "Compactadoras"){
      document.querySelector("#subfamilia").innerHTML = `
      <option value=""></option>
      <option value="Pata de cabra">Pata de cabra</option>
      <option value="Doble rodillo">Doble rodillo</option>
      <option value="Rodillo vibratorio">Rodillo vibratorio</option>
      <option value="Rodillo vibratorio doble">Rodillo vibratorio doble</option>
      <option value="Rodillo neumático">Rodillo neumático</option>
      <option value="Mini compactador">Mini compactador</option>
      `;
      setForm({
        ...form,
        familia:familiaUnidadRef.current.value,
        subfamilia:subFamiliaRef.current.value,
      });

      subFamiliaRef.current.disabled = false;
    
          
      }else if (e.target.value === "Aditamentos") {
      document.querySelector("#subfamilia").innerHTML = `
      <option value=""></option>
      <option value="Martillos hidráulicos">Martillos hidráulicos</option>
      <option value="Barredoras">Barredoras</option>
      `;
      setForm({
        ...form,
        familia:familiaUnidadRef.current.value,
        subfamilia:subFamiliaRef.current.value,
      });

      subFamiliaRef.current.disabled = false;
      }else if (e.target.value === "Plantas y componentes de asfalto") {
        document.querySelector("#subfamilia").innerHTML = `
        <option value=""></option>
        <option value="Planta de asfalto">Planta de asfalto</option>
        <option value="Silo de Asfalto">Silo de Asfalto</option>
        <option value="Calentador de aceite">Calentador de aceite</option>
        `;
        setForm({
          ...form,
          familia:familiaUnidadRef.current.value,
          subfamilia:subFamiliaRef.current.value,
        });
  
        subFamiliaRef.current.disabled = false;
      }else if (e.target.value === "Equipo de Molienda") {
          document.querySelector("#subfamilia").innerHTML = `
          <option value=""></option>
          <option value="Recicladora de pavimento asfáltico">Recicladora de pavimento asfáltico</option>
          `;
          setForm({
            ...form,
            familia:familiaUnidadRef.current.value,
            subfamilia:subFamiliaRef.current.value,
          });
    
          subFamiliaRef.current.disabled = false;
      }else if (e.target.value === "Compactadoras") {
        document.querySelector("#subfamilia").innerHTML = `
        <option value=""></option>
        <option value="Compactador vibratorio">Compactador vibratorio</option>
        <option value="Compactador Vibratorio doble">Compactador Vibratorio doble</option>
        <option value="Compactador Neumático">Compactador Neumático</option>
        `;
        setForm({
          ...form,
          familia:familiaUnidadRef.current.value,
          subfamilia:subFamiliaRef.current.value,
        });
  
        subFamiliaRef.current.disabled = false;
      }else if (e.target.value === "Trituradora") {
        document.querySelector("#subfamilia").innerHTML = `
        <option value=""></option>
        <option value="Trituradora de impacto">Trituradora de impacto</option>
        <option value="Trituradora de cono">Trituradora de cono</option>
        <option value="Trituradora de Quijada">Trituradora de Quijada</option>
        <option value="Quebradora">Quebradora</option>
        <option value="Trituradora de rodillos">Trituradora de rodillos</option>
        `;
        setForm({
          ...form,
          familia:familiaUnidadRef.current.value,
          subfamilia:subFamiliaRef.current.value,
        });
  
        subFamiliaRef.current.disabled = false;
      }else{
        setForm({
          ...form,
          familia:familiaUnidadRef.current.value,
          subfamilia:"",
        });

        subFamiliaRef.current.disabled = true;
      }
      
      setForm({
        ...form,
        familia:familiaUnidadRef.current.value,
        subfamilia:"",
      });
      return;

  }


    
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e, historyRef) => {
    e.preventDefault();

    const formData = new FormData();

    if (fotoFrontalUnidadRef.current.files[0]) {
      formData.append("fotografia_frontal", fotoFrontalUnidadRef.current.files[0]);
    }
    if (fotoDerechaUnidadRef.current.files[0]) {
      formData.append("fotografia_derecha", fotoDerechaUnidadRef.current.files[0]);
    }
    if (fotoIzquierdaUnidadRef.current.files[0]) {
      formData.append("fotografia_izquierda", fotoIzquierdaUnidadRef.current.files[0]);
    }
    if (fotoTraseraUnidadRef.current.files[0]) {
      formData.append("fotografia_trasera", fotoTraseraUnidadRef.current.files[0]);
    }
    if (fotoCabinaUnidadRef.current.files[0]) {
      formData.append("fotografia_cabina", fotoCabinaUnidadRef.current.files[0]);
    }
    if (fotoPlacaIdentificacionRef.current.files[0]) {
      formData.append("fotografia_placa_identificacion", fotoPlacaIdentificacionRef.current.files[0]);
    }
    if (fotoFrontalMotorRef.current.files[0]) {
      formData.append("foto_motor_frontal", fotoFrontalMotorRef.current.files[0]);
    }
    if (fotoDerechaMotorRef.current.files[0]) {
      formData.append("foto_lateral_dereacha", fotoDerechaMotorRef.current.files[0]);
    }
    if (fotoIzquierdaMotorRef.current.files[0]) {
      formData.append("foto_lateral_izquierda", fotoIzquierdaMotorRef.current.files[0]);
    }
    if (fotoSerieMotorRef.current.files[0]) {
      formData.append("foto_numero_serie_motor", fotoSerieMotorRef.current.files[0]);
    }
    if (fotoSerieUnidadRef.current.files[0]) {
      formData.append("foto_numero_serie_chasis", fotoSerieUnidadRef.current.files[0]);
    }
    formData.append("nombre", form.nombre);
    formData.append("status_unidad", form.status_unidad);
    formData.append("ubicacion_resguardo", form.ubicacion_resguardo);
    formData.append("ano_unidad", form.ano_unidad);
    formData.append("categoria", form.categoria);
    formData.append("familia", form.familia);
    formData.append("subfamilia", form.subfamilia);
    formData.append("marca_unidad", form.marca_unidad);
    formData.append("modelo", form.modelo);
    formData.append("modelo_motor", form.modelo_motor);
    formData.append("marca_motor", form.marca_motor);
    formData.append("numero_serie_motor", form.numero_serie_motor);
    formData.append("numero_serie_unidad", form.numero_serie_unidad);
    formData.append("numero_serie_chasis", form.numero_serie_chasis);
    formData.append("numero_economico", form.numero_economico);
    formData.append("municipio", form.municipio);
    formData.append("tipo_combustible", form.tipo_combustible);
    formData.append("comentarios_generales", form.comentarios_generales);
    formData.append("usuario", 1);

    // const formulario = {
    //   ...form,
    //   CFDI: form.CFDI || "N/A",
    //   metodo_pago: form.metodo_pago || "N/A",
    //   forma_pago: form.forma_pago || "N/A",
    // };
    
    console.log(formData);

    if (formToEdit) {
      let data2 = await fetch(
        `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/${id}/`,
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
          `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/${id}/`,
          {
            method: "PATCH",
            headers: {
              // "Content-Type": "application/json",
              // Authorization: `Token ${json2.token}`,
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
          alert("Error");
          return;
        } else {
          alert("Error en datos");
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
        process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/unidades/",
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
          alert("Error");
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
            ? "Se han actualizado correctamente los datos de la unidad."
            : "Se ha creado correctamente la unidad."
        }
        link={
          formToEdit
            ? "/unidades/lista"
            : "/unidades/lista"
        }
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          {formToEdit ? (
            <h3 className="text-center">Editar Cliente</h3>
          ) : (
            <h3 className="text-center">Agregar Unidad</h3>
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
                  Nombre
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
              {/* <div className="col-12 col-md-6">
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
              </div> */}

              <div className="col-12 col-md-6">
                <label htmlFor="numero_economico" className="form-label">
                  Número económico
                </label>
                <input
                  type="text"
                  name="numero_economico"
                  id="numero_economico"
                  value={form.numero_economico}
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
                  datos={OpcionesSelectEstatusUnidad}
                  handleChange={handleChange}
                  isRequired={true}
                  // form={form.status_unidad}
                  form={form}
                  selectRef={estatusRef}
                />
              </div>

              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectUbicacionResguardo}
                  handleChange={handleChange}
                  isRequired={true}
                  // form={form.ubicacion_resguardo}
                  form={form}
                  selectRef={ubicacionResguardoRef}
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectCategoriaUnidad}
                  handleChange={handleChange}
                  selectRef={categoriaUnidadRef}
                  form={form}
                />
              </div>

              <div className="mb-col-12 col-md-6">
              <label htmlFor="familia" className="form-label">
                Familia
              </label>
              <select
                id="familia"
                name="familia"
                onChange={handleChange}
                // value={form.familia}
                value={form.familia}
                ref={familiaUnidadRef}
                className="form-select"
                required
              >
                <option value=""></option>
              </select>
              </div>
            </div>

            <div className="row mb-2">
            <div className="mb-col-12 col-md-6">
              <label htmlFor="subfamilia" className="form-label">
                Subfamilia
              </label>
              <select
                id="subfamilia"
                name="subfamilia"
                onChange={handleChange}
                value={form.subfamilia}
                ref={subFamiliaRef}
                className="form-select"
                required
              >
                <option value=""></option>
              </select>
              </div>

              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectTipoCombustible}
                  handleChange={handleChange}
                  // selectRef={categoriaUnidadRef}
                  form={form}
                />
              </div>
            </div>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectMarcaUnidad}
                  handleChange={handleChange}
                  // selectRef={categoriaUnidadRef}
                  form={form}
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="modelo" className="form-label">
                  Modelo de la unidad
                </label>
                <input
                  type="text"
                  name="modelo"
                  id="modelo"
                  value={form.modelo}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                />
              </div>

              
            </div>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                <label htmlFor="ano_unidad" className="form-label">
                  Año de la unidad
                </label>
                <input
                  type="number"
                  name="ano_unidad"
                  id="ano_unidad"
                  value={form.ano_unidad}
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
                <label htmlFor="numero_serie_unidad" className="form-label">
                  Número de serie de la unidad
                </label>
                <input
                  type="text"
                  name="numero_serie_unidad"
                  id="numero_serie_unidad"
                  value={form.numero_serie_unidad}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>

            <h5 className="text-center titulo-aux">Fotografías Unidad </h5>

            <div className="row mb-2">
              {/* mb-2 */}
                <div className="col-12 col-md-6">
                  <label htmlFor="fotografia_frontal" className="form-label">
                    Fotografía frontal unidad
                  </label>
                  <input
                    type="file"
                    id="fotografia_frontal"
                    className="form-control"
                    ref={fotoFrontalUnidadRef}
                   
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="fotografia_trasera" className="form-label">
                  Fotografía trasera unidad
                  </label>
                  <input
                    type="file"
                    id="fotografia_trasera"
                    className="form-control"
                    ref={fotoTraseraUnidadRef}
                  />
                </div>

              
            </div>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                  <label htmlFor="fotografia_derecha" className="form-label">
                    Fotografía derecha unidad
                  </label>
                  <input
                    type="file"
                    id="fotografia_derecha"
                    className="form-control"
                    ref={fotoDerechaUnidadRef}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="fotografia_derecha" className="form-label">
                  Fotografía izquierda unidad
                  </label>
                  <input
                    type="file"
                    id="fotografia_derecha"
                    className="form-control"
                    ref={fotoIzquierdaUnidadRef}
                  />
                </div>
            </div>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                  <label htmlFor="fotoSerieUnidadRef" className="form-label">
                    Fotografía cabina unidad
                  </label>
                  <input
                    type="file"
                    id="fotoSerieUnidadRef"
                    className="form-control"
                    ref={fotoCabinaUnidadRef}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="numero_serie_unidad" className="form-label">
                  Fotografía serie unidad
                  </label>
                  <input
                    type="file"
                    id="numero_serie_unidad"
                    className="form-control"
                    ref={fotoSerieUnidadRef}
                  />
                </div>
            </div>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                  <label htmlFor="fotografia_placa_identificacion" className="form-label">
                    Fotografía placa identificación
                  </label>
                  <input
                    type="file"
                    id="fotografia_placa_identificacion"
                    className="form-control"
                    ref={fotoPlacaIdentificacionRef}
                  />
                </div>

               
            </div>

            <h5 className="text-center titulo-aux">Motor </h5>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                <label htmlFor="modelo_motor" className="form-label">
                  Modelo del motor
                </label>
                <input
                  type="text"
                  name="modelo_motor"
                  id="modelo_motor"
                  value={form.modelo_motor}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                />
              </div>

              <div className="col-12 col-md-6">
                <CustomSelect
                  datos={OpcionesSelectMarcaMotor}
                  handleChange={handleChange}
                  // selectRef={categoriaUnidadRef}
                  form={form}
                />
              </div>
            </div>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                <label htmlFor="numero_serie_motor" className="form-label">
                  Numero serie del motor
                </label>
                <input
                  type="text"
                  name="numero_serie_motor"
                  id="numero_serie_motor"
                  value={form.numero_serie_motor}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                />
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="numero_serie_chasis" className="form-label">
                  Numero serie del chasis
                </label>
                <input
                  type="text"
                  name="numero_serie_chasis"
                  id="numero_serie_chasis"
                  value={form.numero_serie_chasis}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                  <label htmlFor="foto_motor_frontal" className="form-label">
                    Fotografía frontal motor
                  </label>
                  <input
                    type="file"
                    id="foto_motor_frontal"
                    className="form-control"
                    ref={fotoFrontalMotorRef}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="foto_numero_serie_motor" className="form-label">
                  Fotografía numero serie motor 
                  </label>
                  <input
                    type="file"
                    id="foto_numero_serie_motor"
                    className="form-control"
                    ref={fotoSerieMotorRef}
                  />
                </div>
            </div>

            <div className="row mb-2">
            <div className="col-12 col-md-6">
                  <label htmlFor="foto_lateral_dereacha" className="form-label">
                    Fotografía derecha motor
                  </label>
                  <input
                    type="file"
                    id="foto_lateral_dereacha"
                    className="form-control"
                    ref={fotoDerechaMotorRef}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="foto_lateral_izquierda" className="form-label">
                  Fotografía izquierda motor 
                  </label>
                  <input
                    type="file"
                    id="foto_lateral_izquierda"
                    className="form-control"
                    ref={fotoIzquierdaMotorRef}
                  />
                </div>
            </div>


            <div className="mb-2">
            
                <label htmlFor="comentarios_generales" className="form-label">
                  Comentarios generales
                </label>
                <input
                  type="text"
                  name="comentarios_generales"
                  id="comentarios_generales"
                  value={form.comentarios_generales}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
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
