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
  import { fetchData } from "../../utils/fetchData";
  
  import { MyDatepicker } from "../my-datepicker/MyDatepicker";
  
  const formInitialState = {
    planta: "",
    estatusPedido: "",
    forma: "",
    usuario: "",
    fechaDesde: "",
    fechaHasta: "",
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
  
  export const FormFiltrosVentas = ({
    setPedidos,
    setFiltrosAplicadosPedidos,
    setCurrentPage,
    setFinalPage,
    setSumaM3,
    setTotalPedidos,
    setIsLoading,
    fecha,
    noCalendar,
    setFechasFiltroAplicados,
    setBusquedaAplicada,
    fechasFiltroAplicados,
    filtrosAplicadosPedidos,
    busquedaAplicada,
  }) => {
    const [form, setForm] = useState(formInitialState);
    const [asesores, setAsesores] = useState([]);
    const [asesoresInputFocused, setAsesoresInputFocused] = useState(false);
    const [showAsesoresSpinner, setShowAsesoresSpinner] = useState(false);
    const [state, datePickerDispatch] = useReducer(reducer, initialState);
  
    const { authtoken, dispatch } = useContext(ReactReduxContext);
  
    const { pathname } = useLocation();
  
    const descargarExcelBtnSpinnerRef = useRef(null);
    const descargarExcelBtnRef = useRef(null);
  
    useEffect(() => {
      if (!noCalendar) {
        document.querySelector("#startDateInput").placeholder = "Desde";
        document.querySelector("#endDateInput").placeholder = "Hasta";
      }
    }, []);
  
    const fetchAsesores = async () => {
      setShowAsesoresSpinner(true);
  
      const fetchedData = await fetchData(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/asesores/`,
        authtoken,
        dispatch,
        setCurrentUser
      );
  
      setAsesores(fetchedData);
      setShowAsesoresSpinner(false);
    };
  
    const descargarExcel = async (e) => {
      try {
        e.preventDefault();
        descargarExcelBtnRef.current.classList.add("d-none");
        descargarExcelBtnSpinnerRef.current.classList.remove("d-none");
  
        const fechaIntervalo = fecha
          ? `${fecha}/${fecha}`
          : fechasFiltroAplicados
          ? fechasFiltroAplicados
          : "";
  
        const link = `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/reporte/?planta_id=${
          filtrosAplicadosPedidos.planta
        }&status_pedido=${filtrosAplicadosPedidos.estatusPedido}&forma=${
          filtrosAplicadosPedidos.forma
        }&Ventas=${
          filtrosAplicadosPedidos.usuario
        }&fecha_intervalo=${fechaIntervalo}&search=${
          busquedaAplicada ? busquedaAplicada : ""
        }`;
  
        let response = await fetch(link, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
        });
  
        if (response.headers.get("Content-Type") !== "application/ms-excel") {
          let json = await response.json();
  
          if (json.expired) {
            dispatch(setCurrentUser({ token: json.token }));
  
            response = await fetch(link, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${json.token}`,
              },
            });
          }
        }
  
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Pedidos${fechaIntervalo && ` [${fechaIntervalo}]`}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        descargarExcelBtnSpinnerRef.current.classList.add("d-none");
        descargarExcelBtnRef.current.classList.remove("d-none");
      }
    };
  
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
  
        const fetchedData = await fetchData(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/ventas/?fecha_filtro=${
            fecha ? fecha : ""
          }&planta_id=${form.planta}&status_pedido=${form.estatusPedido}&forma=${
            form.forma
          }&Ventas=${form.usuario}&fecha_intervalo=${fechaIntervalo}`,
          authtoken,
          dispatch,
          setCurrentUser
        );
  
        setCurrentPage(1);
        setPedidos(fetchedData.results);
        setFinalPage(Math.ceil(fetchedData.count / 10));
        setSumaM3(fetchedData.m3);
        setTotalPedidos(fetchedData.count);
        if (setBusquedaAplicada) {
          setBusquedaAplicada("");
        }
        setFiltrosAplicadosPedidos({
          planta: form.planta,
          estatusPedido: form.estatusPedido,
          forma: form.forma,
          usuario: form.usuario,
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
          <label htmlFor="planta" className="form-label">
            Planta
          </label>
          <select
            id="planta"
            name="planta"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Todas</option>
            <option value="1">01 León</option>
            <option value="2">02 Puerto Interior</option>
            <option value="3">03 Salida a Lagos</option>
            <option value="4">04 San Miguel</option>
            <option value="5">05 San Pancho</option>
          </select>
        </div>
  
        
  
        {/* <div className="col-6 col-md-3">
          <label htmlFor="forma" className="form-label">
            Forma
          </label>
          <select
            id="forma"
            name="forma"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Todas</option>
            <option value="T">Tirado</option>
            <option value="B">Bombeado</option>
            <option value="BC">Bomba cliente</option>
            <option value="BR">Bomba rentada</option>
          </select>
        </div> */}
  
        <div className="col-6 col-md-3">
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
        </div>
  
        {!noCalendar && (
          <MyDatepicker state={state} datePickerDispatch={datePickerDispatch} />
        )}
  
        <div className="d-flex justify-content-between align-items-center mt-3">
          {pathname.includes("logistica") && (
            <>
              <button
                className="btn btn-success"
                onClick={descargarExcel}
                ref={descargarExcelBtnRef}
              >
                Descargar Excel
              </button>
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
  