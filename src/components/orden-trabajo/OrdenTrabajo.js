import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { setCurrentUser } from "../../redux/user/userSlice";
import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";
import { fetchData } from "../../utils/fetchData";

import { CotizacionModal } from "../cotizacion-modal/CotizacionModal";
import { ModalRedirect } from "../modal-redirect/ModalRedirect";

import Localizacion from "../../assets/img/Localizacion.png";
import Telefono from "../../assets/img/telefono.png";
import Internet from "../../assets/img/internet.png";
import Logo from "../../assets/img/logo-slogan.png";
import Tarjetas from "../../assets/img/tarjetas.png";
import Credito from "../../assets/img/credito.png";
import "./OrdenTrabajo.styles.scss";

const initialState = {
  folio: "",
  vigencia: "",
  atencion: "",
  subtotal: "",
  total: "",
  cliente: "",
  obra: "",
  lineas: "",
  cantidad: "",
  servicios: "",
  ciudad: "",
  fiscal:"",
  observasiones:"",
};

const diseñosInitialState = [
  {
    id: 1,
    busquedaString: "",
    nombre: "",
    precioUnitario: "",
    cantidad: "",
    diseñosData: [],
    precios: [],
    subtotal: "",
    producto: "",
    unidad: "",
    estado:"",
  },
];

const IVA = 0.16;

export const OrdenTrabajo = () => {
  const [form, setForm] = useState(initialState);
  const [obraData, setObraData] = useState({});
  const [show, setShow] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [diseños, setDiseños] = useState(diseñosInitialState);
  const [sumaSubTotales, setSumaSubTotales] = useState(0);
  const [ivaTotal, setIvaTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [clientePagoF, setClientePagoF] = useState(false);
  const [servicios, setServicios] = useState([]);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const modalSelectRef = useRef();
  const modalSelectFiscalRef = useRef();
  const precioUnitarioSelectRef = useRef();
  const vigenciaRef = useRef();

  const { obraId } = useParams();

  const isDesktop = useIsDesktop();

  const fechaHoy = new Date();
  const fechaVigencia = new Date();
  fechaVigencia.setDate(fechaHoy.getDate() + 28);

  useEffect(() => {
    setSumaSubTotales(
      diseños.reduce((accu, diseño) => {
        return Number(accu) + Number(diseño.subtotal);
      }, 0)
    );
  }, [diseños]);

  useEffect(() => {
    if (clientePagoF) {
      setIvaTotal(sumaSubTotales * IVA);
    }
  }, [sumaSubTotales]);

  useEffect(() => {
    setTotal(ivaTotal + sumaSubTotales);
  }, [ivaTotal, sumaSubTotales]);

  // const handleClose = () => {
  //   setForm({
  //     ...form,
  //     ciudad: modalSelectRef.current.value,
  //     fiscal: modalSelectFiscalRef.current.value,
  //   });
  //   if (modalSelectFiscalRef.current.value === "F") {
  //     setClientePagoF(true);
  //   }
    
  //   console.log(modalSelectFiscalRef.current.value);
  //   setShow(false);
  // };
  
  // useEffect(() => {
  //   (async () => {
  //     const fetchedData = await fetchData(
  //       `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/`,
  //       authtoken,
  //       dispatch,
  //       setCurrentUser
  //     );

  //     // if (fetchedData.cliente_detail.pago === "F") {
  //     //   setClientePagoF(true);
  //     // }
      
  //     // console.log(form.fiscal);

  //     setObraData(fetchedData);
  //   })();
  // }, []);

  // const handleClose = () => {
  //   setForm({
  //     ...form,
  //     ciudad: modalSelectRef.current.value,
  //     fiscal: modalSelectFiscalRef.current.value
  //   });
  //   // console.log(modalSelectFiscalRef.current.value);
  //   setShow(false);
  // };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const getDiseños = async (e, diseñoRef) => {
    setDiseños((prevState) => {
      const arr = [...prevState];

      arr[diseñoRef.id - 1] = {
        ...arr[diseñoRef.id - 1],
        precios: [],
      };

      return arr;
    });

    const url = `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/productos/?ubicacion=${form.ciudad}&diseño=${e.target.value}`;

    let data = await fetch(url, {
      headers: {
        Authorization: `Token ${authtoken}`,
      },
    });

    let json = await data.json();

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(url, {
        headers: {
          Authorization: `Token ${json.token}`,
        },
      });

      json = await data.json();
    }

    setDiseños((prevState) => {
      const arr = [...prevState];

      arr[diseñoRef.id - 1] = {
        ...arr[diseñoRef.id - 1],
        diseñosData: json.results,
      };

      return arr;
    });
  };

  const actualizarSubtotal = (diseñoRef) => {
    setDiseños((prevState) => {
      const arr = [...prevState];

      arr[diseñoRef.id - 1] = {
        ...arr[diseñoRef.id - 1],
        subtotal:
          prevState[diseñoRef.id - 1].precioUnitario &&
          prevState[diseñoRef.id - 1].cantidad &&
          Number(prevState[diseñoRef.id - 1].precioUnitario) *
            Number(prevState[diseñoRef.id - 1].cantidad),
      };

      return arr;
    });
  };

  const changeDiseñoInput = (e, diseñoRef) => {
    setDiseños((prevState) => {
      const arr = [...prevState];

      if (e.target.name === "busquedaString") {
        arr[diseñoRef.id - 1] = {
          ...arr[diseñoRef.id - 1],
          precioUnitario: "",
          nombre: "",
          producto: "",
        };
      }

      if (e.target.name === "nombre") {
        arr[diseñoRef.id - 1] = {
          ...arr[diseñoRef.id - 1],
          precioUnitario: "",
        };
      }

      arr[diseñoRef.id - 1] = {
        ...arr[diseñoRef.id - 1],
        [`${e.target.name}`]: e.target.value,
      };

      return arr;
    });
  };

  const agregarDiseño = () => {
    setDiseños((prevState) => {
      const newArr = [...prevState];

      newArr.push({
        id: diseños.length + 1,
        busquedaString: "",
        nombre: "",
        precioUnitario: "",
        cantidad: "",
        diseñosData: [],
        precios: [],
        subtotal: "",
        producto: "",
        unidad: "",
      });

      return newArr;
    });
  };

  const eliminarDiseño = () => {
    setDiseños((prevState) => {
      const newArr = [...prevState];
      newArr.pop();
      return newArr;
    });
  };

  const handleClickServicio = (claseDeServicio) => {
    const elem = document.querySelectorAll(`.${claseDeServicio}`);

    elem.forEach((e) => {
      e.classList.toggle("servicio-activo");
    });

    const numeroDeServicio = Number(
      claseDeServicio[claseDeServicio.length - 1]
    );

    if (elem[0].classList.contains("servicio-activo")) {
      if (!servicios.includes(numeroDeServicio)) {
        setServicios((prevState) => {
          const newArr = [...prevState];
          newArr.push(numeroDeServicio);
          return newArr;
        });
      }
    } else {
      setServicios((prevState) => {
        const newArr = [...prevState];
        return newArr.filter((num) => num !== numeroDeServicio);
      });
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    servicios.sort((a, b) => a - b);

    const fechaVigenciaFormatted = `${fechaVigencia.getFullYear()}-${String(
      fechaVigencia.getMonth() + 1
    ).padStart(2, 0)}-${fechaVigencia.getDate()}`;

    const fechaFiltroFormatted = `${fechaHoy.getFullYear()}-${String(
      fechaHoy.getMonth() + 1
    ).padStart(2, 0)}-${fechaHoy.getDate()}`;

    const formattedDiseños = [];

    diseños.forEach((diseño) => {
      const obj = {
        cantidad: diseño.cantidad,
        diseño: diseño.nombre,
        precio_neto: Number(diseño.subtotal.toFixed(2)),
        precio_unitario: diseño.precioUnitario,
        producto: diseño.producto,
        unidad: diseño.unidad,
      };

      formattedDiseños.push(obj);
    });

    const dict_data = {
      atencion: form.atencion,
      cantidad: 1,
      cliente: String(obraData.cliente),
      folio: undefined,
      obra: String(obraData.id),
      servicios: servicios.length > 0 ? servicios : [10],
      subtotal: sumaSubTotales.toFixed(2),
      total: total.toFixed(2),
      vigencia: fechaVigenciaFormatted,
      lineas: formattedDiseños,
      // tipo_venta: obraData.cliente_detail.pago,
      tipo_venta: form.fiscal,
      fecha_filtro: fechaFiltroFormatted,
      observasiones: form.observasiones,
      estado:"Aprobada",
    };

    let data = await fetch(
      process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/cotizaciones/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
        body: JSON.stringify(dict_data),
      }
    );

    let json = await data.json();

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/cotizaciones/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${json.token}`,
          },
          body: JSON.stringify(dict_data),
        }
      );

      json = await data.json();
    }

    if (data.status === 201) {
      /* alert("Se ha creado correctamente la cotización."); */

      setShowConfirmModal(true);

      /* history.push(`/concreco/comercializacion/cotizaciones`); */
    } else if (data.status === 406) {
      alert(json.error);
    } else {
      alert(JSON.stringify(json));
    }
  };

  return (
    <>
      
        <div className="cotizacion-container">
          <ModalRedirect
            showConfirmModal={showConfirmModal}
            text="Se ha creado correctamente la cotización."
            link={`/concreco/comercializacion/cotizaciones`}
          />
          <form onSubmit={handleSumbit}>
            <div className="cotizacion-header-container">
              {/* <div className="d-flex align-items-center">
                <img src={Logo} alt="logo" />
              </div> */}
              <div className="d-flex flex-column align-items-center text-center">
                {/* <h1>Orden de Trabajo</h1> */}
                {/* <div className="text-dark">
                  <div>
                    <img src={Localizacion} alt="localizacion-pgn" />
                    <strong>
                      Blvd. José Ma. Morelos #2735 <br /> Col. Las Maravillas
                    </strong>
                  </div>
                  <div>
                    <img src={Telefono} alt="telefono-png" />
                    <strong>(477) 771 6550 y 90</strong>
                  </div>
                  <div>
                    <img src={Internet} alt="internet-png" />
                    <strong>www.concreco.com</strong>
                  </div>
                </div> */}
              </div>
              <div className="d-flex align-items-center">
                <table className="blue-table">
                  <tbody>
                    <tr>
                      <td>Fecha de elaboración:</td>
                      <td>
                        <input
                          type="text"
                          readOnly
                          value={new Date()
                            .toLocaleDateString()
                            .replaceAll("/", "-")}
                        />
                      </td>
                    </tr>
                    {/* <tr>
                      <td>Vigencia de cotización:</td>
                      <td>
                        <input
                          type="text"
                          readOnly
                          value={fechaVigencia
                            .toLocaleDateString()
                            .replaceAll("/", "-")}
                          ref={vigenciaRef}
                        />
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center m-3">
              <h1>Orden de Trabajo</h1>
            </div>

            <div className="mb-3">
              <div className="table-responsive">
                <table className="w-100 blue-table tabla-cliente">
                  <thead>
                    {/* <tr className="text-center">
                      <th colSpan={4}>Datos Generales del Cliente</th>
                    </tr> */}
                    <th className="col-4" colSpan={2}>
                        <div className="d-flex justify-content-center">
                          Información Unidad
                        </div>
                      </th>
                      <th className="col-4" colSpan={2}>
                        <div className="d-flex justify-content-center">
                          Información Motor
                        </div>
                      </th>
                      <th className="col-4" colSpan={2}>
                        <div className="d-flex justify-content-center">
                        Información Unidad
                        </div>
                      </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col-2"><strong>Cliente: </strong> </td>
                      <td className="col-2">Concreco</td>
                      <td className="col-2"><strong>Combustible:</strong></td>
                      <td className="col-2">Diesel</td>
                      <td className="col-2"><strong>No. económico:</strong></td>
                      <td className="col-2">RE-20</td>
                    </tr>
                    <tr>
                      <td className="col-2"><strong>Operador:</strong></td>
                      <td className="col-2">Luis Perez</td>
                      <td className="col-2"><strong>Motor:</strong></td>
                      <td className="col-2">RP-2000</td>
                      <td className="col-2"><strong>Descripción:</strong></td>
                      <td className="col-2">Retroexcavadora</td>
                    </tr>
                    <tr>
                      <td className="col-2"><strong>Ubicación:</strong></td>
                      <td className="col-2">El Calvario</td>
                      <td className="col-2"><strong>Marca motor:</strong></td>
                      <td className="col-2">RP-2000</td>
                      <td className="col-2"><strong>Marca:</strong></td>
                      <td className="col-2">CASE</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>Serie motor:</strong></td>
                      <td className="col-2">RT-555-662</td>
                      <td className="col-2"><strong>Modelo:</strong></td>
                      <td className="col-2">580M</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>No. serie:</strong></td>
                      <td className="col-2">56451DSE</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>Placas:</strong></td>
                      <td className="col-2">TR656TR</td>
                      
                    </tr>
                  
                  
                  </tbody>
                </table>
              </div>
            </div>






            

            <div>
              <div className="table-responsive">
                <table className="w-100 blue-table tabla-diseños">
                  <thead>
                    <tr>
                      <th className="col-12">
                        <div className="d-flex justify-content-center">
                          Fallas reportadas
                        </div>
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody className="table-body">
                  {diseños.map((diseño) => (
                      <tr key={diseño.id}>
                      
                      <td colSpan={3}>
                      <input
                            type="text"
                            className="col-12"
                            name="busquedaString"
                            value={diseño.busquedaString}
                            autoComplete="off"
                            onChange={(e) => {
                              getDiseños(e, diseño);
                              changeDiseñoInput(e, diseño);
                              actualizarSubtotal(diseño);
                            }}
                          />
                          {/* <input
                          type="text"
                          className="col-12"
                          name="atencion"
                          value={form.atencion}
                          onChange={handleChangeForm}
                          autoComplete="off"
                          required
                        /> */}
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-success"
                onClick={agregarDiseño}
              >
                Agregar Falla
              </button>
              {diseños.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={eliminarDiseño}
                >
                  Eliminar Falla
                </button>
              )}
            </div>

            





















            

            

           

           

            <div className="d-flex flex-md-row flex-column justify-content-between my-3 text-dark">
              <div className="col-12 col-md-6 cotizacion-condiciones">
                <div>
                  
                </div>
               
               
                
                
              </div>
             
            </div>

            <div className="d-flex justify-content-end">
              <input
                type="submit"
                className="btn btn-success"
                value="Agregar"
              />
            </div>
          </form>
        </div>
      
      {/* <CotizacionModal
        show={show}
        handleClose={handleClose}
        modalSelectRef={modalSelectRef}
        modalSelectFiscalRef={modalSelectFiscalRef}
      /> */}
    </>
  );
};
