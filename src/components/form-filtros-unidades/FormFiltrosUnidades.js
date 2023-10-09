import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchDataWithoutAuthentication } from "../../utils/fetchDataWithoutAuthentication";

import { MyDatepicker } from "../my-datepicker/MyDatepicker";
import { CustomSelect } from "../custom-select/CustomSelect";
import {

  
  OpcionesSelectCategoriaUnidadFiltros
  
} from "../../utils/selects-opciones";

const formInitialState = {


  categoria: "",
  familia: "",
  subfamilia: "",
  fechaDesde: "",
  fechaHasta: "",
  // empresa_alta:"",
 
};

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

export const FormFiltrosUnidades = ({
  setUnidades,
  setFiltrosAplicadosUnidades,
  setCurrentPage,
  setFinalPage,

  setTotalUnidades,
  setIsLoading,
  fecha,
  noCalendar,
  setFechasFiltroAplicados,
  setBusquedaAplicada,
  fechasFiltroAplicados,
  filtrosAplicadosUnidades,
  busquedaAplicada,
}) => {
  const [form, setForm] = useState(formInitialState);
  const categoriaUnidadRef = useRef();
  const [asesores, setAsesores] = useState([]);
  const [asesoresInputFocused, setAsesoresInputFocused] = useState(false);
  const [showAsesoresSpinner, setShowAsesoresSpinner] = useState(false);
  const [state, datePickerDispatch] = useReducer(reducer, initialState);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const { pathname } = useLocation();
  const familiaUnidadRef = useRef();
  const subFamiliaRef = useRef();

  const descargarExcelBtnSpinnerRef = useRef(null);
  const descargarExcelBtnRef = useRef(null);

  useEffect(() => {
    if (!noCalendar) {
      document.querySelector("#startDateInput").placeholder = "Desde";
      document.querySelector("#endDateInput").placeholder = "Hasta";
    }
  }, []);

  // const fetchAsesores = async () => {
  //   setShowAsesoresSpinner(true);

  //   const fetchedData = await fetchData(
  //     `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/asesores/`,
  //     authtoken,
  //     dispatch,
  //     setCurrentUser
  //   );

  //   setAsesores(fetchedData);
  //   setShowAsesoresSpinner(false);
  // };

  // const descargarExcel = async (e) => {
  //   try {
  //     e.preventDefault();
  //     descargarExcelBtnRef.current.classList.add("d-none");
  //     descargarExcelBtnSpinnerRef.current.classList.remove("d-none");

  //     const fechaIntervalo = fecha
  //       ? `${fecha}/${fecha}`
  //       : fechasFiltroAplicados
  //       ? fechasFiltroAplicados
  //       : "";

  //     const link = `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/unidades/reporte/?planta_id=${
  //       filtrosAplicadosUnidades.planta
  //     }&status_pedido=${filtrosAplicadosUnidades.estatusPedido}&forma=${
  //       filtrosAplicadosUnidades.forma
  //     }&Ventas=${
  //       filtrosAplicadosUnidades.usuario
  //     }&fecha_intervalo=${fechaIntervalo}&search=${
  //       busquedaAplicada ? busquedaAplicada : ""
  //     }`;

  //     let response = await fetch(link, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${authtoken}`,
  //       },
  //     });

  //     if (response.headers.get("Content-Type") !== "application/ms-excel") {
  //       let json = await response.json();

  //       if (json.expired) {
  //         dispatch(setCurrentUser({ token: json.token }));

  //         response = await fetch(link, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Token ${json.token}`,
  //           },
  //         });
  //       }
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `Pedidos${fechaIntervalo && ` [${fechaIntervalo}]`}.xlsx`;
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();
  //   } catch (error) {
  //     console.log(error);
  //     alert(error);
  //   } finally {
  //     descargarExcelBtnSpinnerRef.current.classList.add("d-none");
  //     descargarExcelBtnRef.current.classList.remove("d-none");
  //   }
  // };

  const handleChange = (e) => {
    /* setFiltrarBtnDisabled(false); */

    const { name, value } = e.target;

   


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
        <option value="Motoconformadoras">Motoconformadoras</option>
        <option value="Torres de iluminación">Torres de iluminación</option>
        `;
            
        }else if (e.target.value === "Logística") {
        document.querySelector("#familia").innerHTML = `
        <option value=""></option>
        <option value="Tracto camión (Tráiler)">Tracto camión (Tráiler)</option>
        <option value="Góndola (30m3)">Góndola (30m3)</option>
        <option value="Remolque">Remolque</option>
        <option value="Dolly">Dolly</option>
        <option value="Torton 14m3">Torton 14m3</option>
        <option value="Volteo 7m3">Volteo 7m3</option>
        <option value="Remolque">Remolque</option>
        <option value="Lowboy cama alta">Lowboy cama alta</option>
        <option value="Lowboy cama baja">Lowboy cama baja</option>
        <option value="Pipas">Pipas</option>
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
      <option value="Duo Pactor">Duo Pactor</option>
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
      <option value="Bote para retroexcavadora">Bote para retroexcavadora</option>
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
      }else if (e.target.value === "Montacargas") {
        document.querySelector("#subfamilia").innerHTML = `
        <option value=""></option>
        <option value="4 Ruedas">4 Ruedas</option>
        <option value="3 Ruedas">3 Ruedas</option>
        `;
        setForm({
          ...form,
          familia:familiaUnidadRef.current.value,
          subfamilia:subFamiliaRef.current.value,
        });
  
        subFamiliaRef.current.disabled = false;
      }
      else if (e.target.value === "Pipas") {
        document.querySelector("#subfamilia").innerHTML = `
        <option value=""></option>
        <option value="Agua 10,000 lts.">Agua 10,000 lts.</option>
        <option value="Agua 20,000 lts.">Agua 20,000 lts.</option>
        <option value="Diésel 5,000 lts.">Diésel 5,000 lts.</option>
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      let fechaIntervalo = "";

      if (state.startDate && state.endDate) {
        const fechaInicio = state.startDate
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-");

        const fechaFinal = state.endDate
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-");

        fechaIntervalo = `${fechaInicio}/${fechaFinal}`;
      }

      const fetchedData = await fetchDataWithoutAuthentication(
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/assets/?&fecha_intervalo=${fechaIntervalo}&categoria=${form.categoria}&familia=${form.familia
        }&subfamilia=${form.subfamilia}`,
        authtoken,
        dispatch,
        setCurrentUser
      );

      setCurrentPage(1);
      setUnidades(fetchedData.results);
      setFinalPage(Math.ceil(fetchedData.count / 10));
     
      setTotalUnidades(fetchedData.count);
      if (setBusquedaAplicada) {
        setBusquedaAplicada("");
      }
      setFiltrosAplicadosUnidades({
        // empresa_alta: form.empresa_alta,
        empresa_responsable: form.empresa_responsable,
        categoria: form.categoria,
        familia: form.familia,
        subfamilia: form.subfamilia,
      });
     

      if (setFechasFiltroAplicados) {
        setFechasFiltroAplicados(fechaIntervalo);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="row mb-3">
      <div className="col-6 col-md-3">
        {/* <label htmlFor="categoria" className="form-label">
          Categoría
        </label>
        <select
          id="categoria"
          name="categoria"
          className="form-select"
          onChange={handleChange}
        >
          <option value="">Todas</option>
          <option value="1">01 León</option>
          <option value="2">02 Puerto Interior</option>
          <option value="3">03 Salida a Lagos</option>
          <option value="4">04 San Miguel</option>
          <option value="5">05 San Pancho</option>
        </select> */}

          <CustomSelect
                datos={OpcionesSelectCategoriaUnidadFiltros}
                handleChange={handleChange}
                selectRef={categoriaUnidadRef}
                form={form}
              />


      </div>

      <div className="col-6 col-md-3">
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
              <option value="">Todas</option>
            </select>
      </div>

      {/* <div className="col-6 col-md-3">
        <label htmlFor="estatusPedido" className="form-label">
          Estatus de pedido
        </label>
        <select
          id="estatusPedido"
          name="estatusPedido"
          className="form-select"
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="Activado">Activado</option>
          <option value="Desactivado">Desactivado</option>
        </select>
      </div> */}

      <div className="col-6 col-md-3">
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
              <option value="">Todas</option>
            </select>
      </div>

      {/* <div className="col-6 col-md-3">
        <label htmlFor="usuario" className="form-label">
          Usuario
        </label>

        {showAsesoresSpinner && (
          <div className="spinner-border spinner-border-sm ms-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        <select
          id="usuario"
          name="usuario"
          className="form-select"
          onChange={handleChange}
          onFocus={() => {
            if (!asesoresInputFocused) {
              fetchAsesores();
            }

            setAsesoresInputFocused(true);
          }}
        >
          <option value="">Todos</option>
          {asesores.map((asesor) => (
            <option key={asesor.id} value={asesor.id}>
              {asesor.fullname}
            </option>
          ))}
        </select>
      </div> */}

      {!noCalendar && (
        <MyDatepicker state={state} datePickerDispatch={datePickerDispatch} />
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        {pathname.includes("unidades") && (
          <>
            {/* <button
              className="btn btn-success"
              onClick={descargarExcel}
              ref={descargarExcelBtnRef}
            >
              Descargar Excel
            </button> */}
            <button
              className="btn btn-success d-none"
              type="button"
              ref={descargarExcelBtnSpinnerRef}
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Loading...</span>
            </button>
          </>
        )}

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
};