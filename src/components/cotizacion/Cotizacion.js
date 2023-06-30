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
import "./Cotizacion.styles.scss";

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
  },
];

const IVA = 0.16;

export const Cotizacion = () => {
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

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/`,
        authtoken,
        dispatch,
        setCurrentUser
      );

      if (fetchedData.cliente_detail.pago === "F") {
        setClientePagoF(true);
      }

      setObraData(fetchedData);
    })();
  }, []);

  const handleClose = () => {
    setForm({
      ...form,
      ciudad: modalSelectRef.current.value,
    });

    setShow(false);
  };

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
      tipo_venta: obraData.cliente_detail.pago,
      fecha_filtro: fechaFiltroFormatted,
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
      {obraData.id && (
        <div className="cotizacion-container">
          <ModalRedirect
            showConfirmModal={showConfirmModal}
            text="Se ha creado correctamente la cotización."
            link={`/concreco/comercializacion/cotizaciones`}
          />
          <form onSubmit={handleSumbit}>
            <div className="cotizacion-header-container">
              <div className="d-flex align-items-center">
                <img src={Logo} alt="logo" />
              </div>
              <div className="d-flex flex-column align-items-center text-center">
                <h5>Premezclados Concreco S.A de C.V</h5>
                <div className="text-dark">
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
                </div>
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
                    <tr>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center m-3">
              <h1>COTIZACIÓN</h1>
            </div>

            <div className="mb-3">
              <div className="table-responsive">
                <table className="w-100 blue-table tabla-cliente">
                  <thead>
                    <tr className="text-center">
                      <th colSpan={4}>Datos Generales del Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Razon social :</td>
                      <td colSpan={3}>{obraData.cliente_detail.nombre}</td>
                    </tr>
                    <tr>
                      <td>Atención :</td>
                      <td colSpan={3}>
                        <input
                          type="text"
                          className="col-12"
                          name="atencion"
                          value={form.atencion}
                          onChange={handleChangeForm}
                          autoComplete="off"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Obra :</td>
                      <td colSpan={3}>{obraData.nombre}</td>
                    </tr>
                    {isDesktop ? (
                      <tr>
                        <td className="col-3">Asesor Comercial:</td>
                        <td className="col-3">
                          {obraData.cliente_detail.ventas_detail.name}
                        </td>
                        <td className="col-3">Correo electrónico asesor:</td>
                        <td className="col-3">
                          {obraData.cliente_detail.ventas_detail.email}
                        </td>
                      </tr>
                    ) : (
                      <>
                        <tr>
                          <td>Asesor Comercial:</td>
                          <td>{obraData.cliente_detail.ventas_detail.name}</td>
                        </tr>
                        <tr>
                          <td>Correo electrónico asesor:</td>
                          <td>{obraData.cliente_detail.ventas_detail.email}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="table-responsive">
                <table className="blue-table tabla-diseños">
                  <thead>
                    <tr>
                      <th className="col-5">
                        <div className="d-flex justify-content-center">
                          Diseño del Concreto
                        </div>
                      </th>
                      <th className="col-2">
                        <div className="d-flex justify-content-center">
                          Precio Unitario
                        </div>
                      </th>
                      <th className="col-1">
                        {isDesktop ? (
                          <div className="d-flex justify-content-center">
                            Cantidad
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center">
                            Cant.
                          </div>
                        )}
                      </th>
                      <th className="col-2">
                        <div className="d-flex justify-content-center">
                          Unidad
                        </div>
                      </th>
                      <th className="col-2">
                        <div className="d-flex justify-content-center">
                          Precio Subtotal
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {diseños.map((diseño) => (
                      <tr key={diseño.id}>
                        <td>
                          <input
                            type="text"
                            className="col-6"
                            name="busquedaString"
                            value={diseño.busquedaString}
                            autoComplete="off"
                            onChange={(e) => {
                              getDiseños(e, diseño);
                              changeDiseñoInput(e, diseño);
                              actualizarSubtotal(diseño);
                            }}
                          />
                          <select
                            className="col-6"
                            name="nombre"
                            value={diseño.nombre}
                            required
                            onChange={(e) => {
                              const newArr = diseños[
                                diseño.id - 1
                              ].diseñosData.filter(
                                (a) => a.diseño === e.target.value
                              );

                              const precios = [];

                              if (newArr[0].precio_contado.trim()) {
                                precios.push(newArr[0].precio_contado);
                              }
                              precios.push(newArr[0].precio_3);
                              precios.push(newArr[0].precio_2);
                              precios.push(newArr[0].precio_1);

                              setDiseños((prevState) => {
                                const arr = [...prevState];

                                arr[diseño.id - 1] = {
                                  ...arr[diseño.id - 1],
                                  precios: precios,
                                  producto: newArr[0].id,
                                };

                                return arr;
                              });

                              changeDiseñoInput(e, diseño);
                              actualizarSubtotal(diseño);
                            }}
                          >
                            <option></option>
                            {diseño.diseñosData.map((data) => (
                              <option key={data.id} value={data.diseño}>
                                {data.diseño}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className="col-12"
                            ref={precioUnitarioSelectRef}
                            onChange={(e) => {
                              changeDiseñoInput(e, diseño);
                              actualizarSubtotal(diseño);
                            }}
                            name="precioUnitario"
                            value={diseño.precioUnitario}
                            required
                          >
                            <option></option>
                            {diseño.precios.map((precio, i) => (
                              <option key={i} value={precio}>
                                {precio}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="col-12"
                            name="cantidad"
                            value={diseño.cantidad}
                            onChange={(e) => {
                              changeDiseñoInput(e, diseño);
                              actualizarSubtotal(diseño);
                            }}
                            autoComplete="off"
                            required
                            onWheel={(e) => {
                              e.target.blur();
                            }}
                          />
                        </td>
                        <td>
                          <select
                            className="col-12"
                            name="unidad"
                            value={diseño.unidad}
                            onChange={(e) => {
                              changeDiseñoInput(e, diseño);
                            }}
                            required
                          >
                            <option></option>
                            <option value="M3">Metro Cubico</option>
                            <option value="ML">Metro Lineal</option>
                            <option value="PZ">Pieza</option>
                            <option value="ACT">Actividad</option>
                            <option value="HRS">Actividad/Horas</option>
                            <option value="LTR">Litro</option>
                          </select>
                        </td>
                        <td>{formatNumToMxnCurrency(diseño.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-primary"
                onClick={agregarDiseño}
              >
                Agregar Diseño
              </button>
              {diseños.length > 1 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={eliminarDiseño}
                >
                  Eliminar Diseño
                </button>
              )}
            </div>

            <div className="d-flex flex-md-row flex-column justify-content-between my-3">
              <div className="d-flex flex-column col-12 col-md-6 text-dark">
                <div>
                  <strong>PLAZOS Y CUENTAS BANCARIAS:</strong>
                </div>
                <div>
                  El pago es de Contado(1 día antes del suministro), excepto los
                  Clientes que tengan una Línea de Crédito disponible, de
                  acuerdo a lo solicitado por el Comité de Crédito.
                </div>
                <div className="">
                  Aceptamos todas las tarjetas.
                  <img src={Tarjetas} alt="tarjetas" />
                </div>
                <div>
                  Tramita con nosotros tu crédito
                  <img src={Credito} alt="credito" />
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex align-items-center order-first order-md-last">
                <table className="col-12 blue-table text-center my-3">
                  <tbody>
                    {clientePagoF && (
                      <>
                        <tr>
                          <td className="col-6">
                            <strong>Subtotal:</strong>
                          </td>
                          <td className="text-dark">
                            {formatNumToMxnCurrency(sumaSubTotales)}
                          </td>
                        </tr>
                        <tr>
                          <td className="col-6">
                            <strong>IVA:</strong>
                          </td>
                          <td className="text-dark">
                            {formatNumToMxnCurrency(ivaTotal)}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td className="col-6">
                        <strong>Total:</strong>
                      </td>
                      <td className="text-dark">
                        {formatNumToMxnCurrency(total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <table className="w-100 blue-table text-center tabla-servicios">
                <thead>
                  <tr className="text-center">
                    <th colSpan={4}>Servicios Adicionales</th>
                  </tr>
                </thead>
                <tbody className="tabla-servicios-body">
                  <tr>
                    <td rowSpan={5} className="col-3">
                      Cargo por flete de vacío
                    </td>
                    <td rowSpan={5} className="col-3">
                      Pedidos menores a 3.5m3 tendrán un cargo adicional
                    </td>
                    <td
                      className="col-3 servicio servicio-1"
                      onClick={() => {
                        handleClickServicio("servicio-1");
                      }}
                    >
                      Olla c/3 m3
                    </td>
                    <td
                      className="col-3 servicio servicio-1"
                      onClick={() => {
                        handleClickServicio("servicio-1");
                      }}
                    >
                      $210.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="servicio servicio-2"
                      onClick={() => {
                        handleClickServicio("servicio-2");
                      }}
                    >
                      Olla c/2.5 m3
                    </td>
                    <td
                      className="servicio servicio-2"
                      onClick={() => {
                        handleClickServicio("servicio-2");
                      }}
                    >
                      $255.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="servicio servicio-3"
                      onClick={() => {
                        handleClickServicio("servicio-3");
                      }}
                    >
                      Olla c/2 m3
                    </td>
                    <td
                      className="servicio servicio-3"
                      onClick={() => {
                        handleClickServicio("servicio-3");
                      }}
                    >
                      $380.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="servicio servicio-4"
                      onClick={() => {
                        handleClickServicio("servicio-4");
                      }}
                    >
                      Olla c/1.5 m3
                    </td>
                    <td
                      className="servicio servicio-4"
                      onClick={() => {
                        handleClickServicio("servicio-4");
                      }}
                    >
                      $500.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="servicio servicio-5"
                      onClick={() => {
                        handleClickServicio("servicio-5");
                      }}
                    >
                      Olla c/1 m3
                    </td>
                    <td
                      className="servicio servicio-5"
                      onClick={() => {
                        handleClickServicio("servicio-5");
                      }}
                    >
                      $640.00
                    </td>
                  </tr>
                  <tr>
                    <td className="col-3">Servicio de bomba pluma</td>
                    <td
                      colSpan={2}
                      className="col-6 servicio servicio-6"
                      onClick={() => {
                        handleClickServicio("servicio-6");
                      }}
                    >
                      El mínimo de bombeo para un servicio es de 10m3 ($220.00
                      más IVA x10m3)
                    </td>
                    <td
                      className="col-3 servicio servicio-6"
                      onClick={() => {
                        handleClickServicio("servicio-6");
                      }}
                    >
                      $2,200.00
                    </td>
                  </tr>
                  <tr>
                    <td>Servicio de bomba estacionaria</td>
                    <td
                      colSpan={2}
                      className="servicio servicio-7"
                      onClick={() => {
                        handleClickServicio("servicio-7");
                      }}
                    >
                      El mínimo de bombeo para un servicio es de 15m3 ($264.00
                      más IVA x15m3)
                    </td>
                    <td
                      className="servicio servicio-7"
                      onClick={() => {
                        handleClickServicio("servicio-7");
                      }}
                    >
                      $3,959.00
                    </td>
                  </tr>
                  <tr>
                    <td>Apertura de planta fuera de horario</td>
                    <td
                      colSpan={2}
                      className="servicio servicio-8"
                      onClick={() => {
                        handleClickServicio("servicio-8");
                      }}
                    >
                      El horario de atención es de lunes a viernes de
                      7:00-18:00hrs y sábados de 7:00-14:00hrs. Fuera de este
                      horario se tendrá una tarifa por hora adicional.
                    </td>
                    <td
                      className="servicio servicio-8"
                      onClick={() => {
                        handleClickServicio("servicio-8");
                      }}
                    >
                      $1577.58
                    </td>
                  </tr>
                  <tr>
                    <td>Apertura de planta en día festivo de horario</td>
                    <td
                      colSpan={2}
                      className="servicio servicio-9"
                      onClick={() => {
                        handleClickServicio("servicio-9");
                      }}
                    >
                      La apertura de planta es por un volumen mínimo de 60m3
                    </td>
                    <td
                      className="servicio servicio-9"
                      onClick={() => {
                        handleClickServicio("servicio-9");
                      }}
                    >
                      $8448.27
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-md-row flex-column justify-content-between my-3 text-dark">
              <div className="col-12 col-md-6 cotizacion-condiciones">
                <div>
                  <strong>CONDICIONES:</strong>
                </div>
                <p>
                  * Precio con Cobertura de 15 Kilómetros a la redonda, según
                  ubicación de planta.
                </p>
                <p>
                  <strong>* Precios exclusivos para esta obra.</strong>
                </p>
                <p>* Cotización sujeta a cambios sin previo aviso.</p>
                <p>
                  * El cliente dispone de máximo 30 mins para la recepción del
                  concreto a partir de la llegada del mismo a la obra, después
                  de este lapso, la empresa no se resposabiliza de las
                  características (revenimiento, resistencia, etc) del producto
                  conforme a la norma NMX C-155.
                </p>
                <p>
                  * Para realizar alguna cancelación y/o modificación se
                  requiere que se realice mínimo 3:30 hrs antes del suministro
                </p>
                <p>
                  * En caso de modificaciones al concreto en obra, adicionando
                  materia prima, agua, fibras u otros elementos, la empresa no
                  se hace responsable del comportamiento del concreto.
                </p>
              </div>
              <div className="col-12 col-md-6 d-flex align-items-center">
                <div>
                  <div className="my-3">
                    <strong>
                      En espera de vernos favorecidos con su preferencia me
                      despido quedando a sus órdenes para cualquier duda o
                      aclaración.
                    </strong>
                  </div>
                  <div className="mt-3">
                    <div>
                      <strong>Asesor comercial:</strong>_________________
                    </div>
                    <div>
                      <strong>Contacto:</strong>________________________
                    </div>
                    <div>
                      <strong>Razón social:</strong>_____________________
                    </div>
                    <div>
                      <strong>Atención:</strong>_________________________
                    </div>
                  </div>
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
      )}
      <CotizacionModal
        show={show}
        handleClose={handleClose}
        modalSelectRef={modalSelectRef}
      />
    </>
  );
};
