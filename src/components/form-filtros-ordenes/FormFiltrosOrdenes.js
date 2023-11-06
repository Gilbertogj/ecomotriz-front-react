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
    deadlineDesde: "",
    deadlineHasta: "",
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
  
  export const FormFiltrosOrdenes = ({
    setOrdenes,
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
          `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/workorders/?&fecha_intervalo=${fechaIntervalo}`,
          authtoken,
          dispatch,
          setCurrentUser
        );
  
        setCurrentPage(1);
        setOrdenes(fetchedData.results);
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
  
            {/* <CustomSelect
                  datos={OpcionesSelectCategoriaUnidadFiltros}
                  handleChange={handleChange}
                  selectRef={categoriaUnidadRef}
                  form={form}
                /> */}
  
  
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
  
        {/* <div className="col-6 col-md-3">
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
        </div> */}
  
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