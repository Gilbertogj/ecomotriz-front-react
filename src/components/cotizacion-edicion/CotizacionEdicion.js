import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { setCurrentUser } from "../../redux/user/userSlice";
import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";

import { SuccessModal } from "../success-modal/SuccessModal";

import Localizacion from "../../assets/img/Localizacion.png";
import Telefono from "../../assets/img/telefono.png";
import Internet from "../../assets/img/internet.png";
import Logo from "../../assets/img/logo-slogan.png";
import Tarjetas from "../../assets/img/tarjetas.png";
import Credito from "../../assets/img/credito.png";

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
    lineaId: null,
  },
];

const IVA = 0.16;

export const CotizacionEdicion = ({ cotizacionData }) => {
  const [diseños, setDiseños] = useState(diseñosInitialState);
  /* const [sumaSubTotales, setSumaSubTotales] = useState(0); */
  const [ivaTotal, setIvaTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [clientePagoF, setClientePagoF] = useState(false);
  const [servicios, setServicios] = useState([]);

  const [showSussModalActualizar, setShowSussModalActualizar] = useState(false);
  const [showSussModalEliminar, setShowSussModalEliminar] = useState(false);
  const [showSussModalCrear, setShowSussModalCrear] = useState(false);
  const [showSussModalGuardar, setShowSussModalGuardar] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const vigenciaInputRef = useRef();
  const atencionInputRef = useRef();

  const isDesktop = useIsDesktop();

  const history = useHistory();

  useEffect(() => {
    if (cotizacionData.tipo_venta === "F") {
      setClientePagoF(true);
    }

    const diseñosNewInitialState = [];

    cotizacionData.lineas_pedido.forEach((linea, idx) => {
      const obj = {
        id: idx + 1,
        busquedaString: "",
        nombre: linea.producto_detail.diseño,
        precioUnitario: linea.precio_unitario,
        cantidad: linea.cantidad,
        diseñosData: [
          {
            id: linea.producto_detail.id,
            diseño: linea.producto_detail.diseño,
          },
        ],
        precios: [
          linea.producto_detail.precio_1,
          linea.producto_detail.precio_2,
          linea.producto_detail.precio_3,
          linea.producto_detail.precio_contado
            ? linea.producto_detail.precio_contado
            : null,
        ],
        subtotal: linea.precio_neto,
        producto: linea.producto_detail.id,
        unidad: linea.unidad,
        lineaId: linea.id,
      };

      diseñosNewInitialState.push(obj);
    });

    setDiseños(diseñosNewInitialState);

    setServicios(cotizacionData.servicios);

    const serviciosEle = document.querySelectorAll(".servicio");

    serviciosEle.forEach((servicio) => {
      if (
        cotizacionData.servicios.includes(
          Number(servicio.classList.value[servicio.classList.value.length - 1])
        )
      ) {
        servicio.classList.add("servicio-activo");
      }
    });
  }, []);

  const sumaSubTotales = useMemo(() => {
    const sum = diseños.reduce((accu, diseño) => {
      return Number(accu) + Number(diseño.subtotal);
    }, 0);

    return sum;
  }, [diseños]);

  /* useEffect(() => {
    setSumaSubTotales(
      diseños.reduce((accu, diseño) => {
        return Number(accu) + Number(diseño.subtotal);
      }, 0)
    );
  }, [diseños]); */

  useEffect(() => {
    if (clientePagoF) {
      setIvaTotal(sumaSubTotales * IVA);
    }
  }, [sumaSubTotales]);

  useEffect(() => {
    setTotal(ivaTotal + sumaSubTotales);
  }, [ivaTotal, sumaSubTotales]);

  const getDiseños = async (e, diseñoRef) => {
    setDiseños((prevState) => {
      const arr = [...prevState];

      arr[diseñoRef.id - 1] = {
        ...arr[diseñoRef.id - 1],
        precios: [],
      };

      return arr;
    });

    const url = `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/productos/?ubicacion=${cotizacionData.lineas_pedido[0].producto_detail.ubicacion}&diseño=${e.target.value}`;

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

      if (e.target.name === "precioUnitarioCustom") {
        arr[diseñoRef.id - 1] = {
          ...arr[diseñoRef.id - 1],
          precioUnitario: e.target.value,
        };
      } else {
        arr[diseñoRef.id - 1] = {
          ...arr[diseñoRef.id - 1],
          [`${e.target.name}`]: e.target.value,
        };
      }

      return arr;
    });

    if (
      e.target.name === "precioUnitario" ||
      e.target.name === "busquedaString" ||
      e.target.name === "nombre"
    ) {
      document.querySelector(`.precioUnitarioCustom-${diseñoRef.id}`).value =
        "";
    }
  };

  const agregarFilaDiseños = () => {
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
        lineaId: null,
      });

      return newArr;
    });
  };

  const eliminarFilaDiseños = async () => {
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
    try {
      e.preventDefault();

      servicios.sort((a, b) => a - b);

      const dict_data = {
        atencion: atencionInputRef.current.value,

        servicios: servicios.length > 0 ? servicios : [10],
        subtotal: sumaSubTotales.toFixed(2),
        total: total.toFixed(2),
        vigencia: vigenciaInputRef.current.value,
      };

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/${cotizacionData.id}/`,
        {
          method: "PATCH",
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
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/${cotizacionData.id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify(dict_data),
          }
        );

        json = await data.json();
      }

      if (data.status === 200) {
        setShowSussModalGuardar(true);
      } else if (data.status === 406) {
        alert(json.error);
      } else {
        alert(JSON.stringify(json));
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const actualizarSubtotalYTotal = async (showThisModal, diseño) => {
    try {
      const dict_data = {
        subtotal:
          showThisModal === "eliminar"
            ? (sumaSubTotales - diseño.subtotal).toFixed(2)
            : sumaSubTotales.toFixed(2),
        total: total.toFixed(2),
      };

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/${cotizacionData.id}/`,
        {
          method: "PATCH",
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
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/${cotizacionData.id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify(dict_data),
          }
        );

        json = await data.json();
      }

      if (data.status === 200) {
        if (showThisModal === "actualizar") {
          setShowSussModalActualizar(true);
        }

        if (showThisModal === "crear") {
          setShowSussModalCrear(true);
        }
        if (showThisModal === "eliminar") {
          setShowSussModalEliminar(true);
        }
      } else if (data.status === 406) {
        alert(json.error);
      } else {
        alert(JSON.stringify(json));
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const actualizarDiseño = async (e, diseñoRef) => {
    try {
      e.target.disabled = true;
      e.target.textContent = "Actualizando...";

      const obj = {
        cantidad: diseñoRef.cantidad,
        diseño: diseñoRef.nombre,
        precio_neto: Number(Number(diseñoRef.subtotal).toFixed(2)),
        precio_unitario: diseñoRef.precioUnitario,
        producto: diseñoRef.producto,
        unidad: diseñoRef.unidad,
      };

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/lineas/${diseñoRef.lineaId}/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          body: JSON.stringify(obj),
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/lineas/${diseñoRef.lineaId}/update/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify(obj),
          }
        );

        json = await data.json();
      }

      if (data.status === 200) {
        actualizarSubtotalYTotal("actualizar");
      }
      if (data.status === 400) {
        alert(JSON.stringify(json));
      }
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      e.target.textContent = "Actualizar diseño";
      e.target.disabled = false;
    }
  };

  const crearDiseño = async (e, diseñoRef) => {
    try {
      e.target.disabled = true;
      e.target.textContent = "Creando...";

      const obj = {
        cantidad: diseñoRef.cantidad,
        precio_neto: Number(Number(diseñoRef.subtotal).toFixed(2)),
        precio_unitario: diseñoRef.precioUnitario,
        producto: diseñoRef.producto,
        unidad: diseñoRef.unidad,
        cotizacion: cotizacionData.id,
      };

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/lineas/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          body: JSON.stringify(obj),
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/lineas/create/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
            body: JSON.stringify(obj),
          }
        );

        json = await data.json();
      }

      if (data.status === 201) {
        setDiseños((prevState) => {
          const arr = [...prevState];

          arr.forEach((diseño) => {
            if (diseño.producto === json.producto) {
              diseño.lineaId = json.id;
            }
          });

          return arr;
        });

        actualizarSubtotalYTotal("crear");
      }
      if (data.status === 400) {
        alert(JSON.stringify(json));
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      e.target.textContent = "Crear diseño";
      e.target.disabled = false;
    }
  };

  const eliminarDiseño = async (e, diseñoRef) => {
    try {
      const confirm = window.confirm("¿Esta seguro de eliminar el diseño?");

      if (!confirm) return;

      e.target.disabled = true;
      e.target.textContent = "Eliminando...";

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/lineas/${diseñoRef.lineaId}/destroy/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${authtoken}`,
          },
        }
      );

      if (data.headers.get("Content-Type") !== null) {
        let json = await data.json();

        if (json.expired) {
          dispatch(setCurrentUser({ token: json.token }));

          data = await fetch(
            `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/lineas/${diseñoRef.lineaId}/destroy/`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Token ${json.token}`,
              },
            }
          );
        }
      }

      if (data.status === 204) {
        setDiseños((prevState) => {
          const arr = [...prevState];

          const filteredArr = arr.filter(
            (diseño) => diseño.lineaId !== diseñoRef.lineaId
          );

          return filteredArr;
        });

        actualizarSubtotalYTotal("eliminar", diseñoRef);
      }
      if (data.status === 400) {
        alert(JSON.stringify(data.json));
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      e.target.textContent = "Eliminar diseño";
      e.target.disabled = false;
    }
  };

  return (
    <>
      <SuccessModal
        show={showSussModalActualizar}
        handleClose={() => {
          setShowSussModalActualizar(false);
        }}
        title="Diseño Actualizado"
        text="Se ha actualizado el diseño correctamente"
      />
      <SuccessModal
        show={showSussModalEliminar}
        handleClose={() => {
          setShowSussModalEliminar(false);
        }}
        title="Diseño Eliminado"
        text="Se ha eliminado el diseño correctamente"
      />
      <SuccessModal
        show={showSussModalCrear}
        handleClose={() => {
          setShowSussModalCrear(false);
        }}
        title="Diseño Creado"
        text="Se ha creado el diseño correctamente"
      />
      <SuccessModal
        show={showSussModalGuardar}
        handleClose={() => {
          setShowSussModalGuardar(false);

          history.push("/concreco/comercializacion");

          setTimeout(() => {
            history.replace(
              `/concreco/comercializacion/cotizacion/${cotizacionData.id}`
            );
          }, 10);
        }}
        title="Cotización Guardada"
        text="Se ha guardado la cotización correctamente"
      />
      <div className="cotizacion-container">
        <form onSubmit={handleSumbit}>
          <div className="d-flex justify-content-end">
            <input
              type="submit"
              className="btn btn-success"
              value="Guardar cambios"
            />
          </div>
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
                      {cotizacionData.created_at
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                  </tr>
                  <tr>
                    <td>Vigencia de cotización:</td>
                    <td>
                      <input
                        type="date"
                        defaultValue={cotizacionData.vigencia}
                        ref={vigenciaInputRef}
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
                    <td colSpan={3}>{cotizacionData.cliente_nombre}</td>
                  </tr>
                  <tr>
                    <td>Atención :</td>
                    <td colSpan={3}>
                      <input
                        type="text"
                        className="col-12"
                        defaultValue={cotizacionData.atencion}
                        autoComplete="off"
                        required
                        ref={atencionInputRef}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Obra :</td>
                    <td colSpan={3}>{cotizacionData.obra_nombre}</td>
                  </tr>
                  {isDesktop ? (
                    <tr>
                      <td className="col-3">Asesor Comercial:</td>
                      <td className="col-3">
                        {cotizacionData.is_ventas
                          ? cotizacionData.vendedor
                          : "Administración"}
                      </td>
                      <td className="col-3">Correo electrónico asesor:</td>
                      <td className="col-3">
                        {cotizacionData.is_ventas
                          ? cotizacionData.vendedor
                          : "concreco@concreco.com"}
                      </td>
                    </tr>
                  ) : (
                    <>
                      <tr>
                        <td>Asesor Comercial:</td>
                        <td>
                          {cotizacionData.is_ventas
                            ? cotizacionData.vendedor
                            : "Administración"}
                        </td>
                      </tr>
                      <tr>
                        <td>Correo electrónico asesor:</td>
                        <td>
                          {cotizacionData.is_ventas
                            ? cotizacionData.vendedor
                            : "concreco@concreco.com"}
                        </td>
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
                    <th className="col-3 col-md-5">
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
                        <div className="d-flex flex-column flex-md-row ">
                          <input
                            type="text"
                            placeholder="Buscar..."
                            className="col-12 col-md-6"
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
                            className="col-12 col-md-6"
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
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column flex-md-row ">
                          <select
                            className="w-100 w-md-50"
                            /* ref={precioUnitarioSelectRef} */
                            onChange={(e) => {
                              changeDiseñoInput(e, diseño);
                              actualizarSubtotal(diseño);
                            }}
                            name="precioUnitario"
                            value={diseño.precioUnitario}
                          >
                            <option></option>
                            {diseño.precios.map((precio, i) => (
                              <option key={i} value={precio}>
                                {precio}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            placeholder="Otro..."
                            defaultValue={
                              diseño.precios.includes(diseño.precioUnitario)
                                ? ""
                                : diseño.precioUnitario
                            }
                            name="precioUnitarioCustom"
                            className={`precioUnitarioCustom-${diseño.id} w-100 w-md-50`}
                            onChange={(e) => {
                              changeDiseñoInput(e, diseño);
                              actualizarSubtotal(diseño);
                            }}
                          />
                        </div>
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
                      <td>
                        <div className="d-flex flex-column">
                          <div>{formatNumToMxnCurrency(diseño.subtotal)}</div>
                          {diseño.lineaId ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={(e) => {
                                  actualizarDiseño(e, diseño);
                                }}
                              >
                                Actualizar diseño
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm mt-1"
                                onClick={(e) => {
                                  eliminarDiseño(e, diseño);
                                }}
                              >
                                Eliminar diseño
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                              onClick={(e) => {
                                crearDiseño(e, diseño);
                              }}
                            >
                              Crear diseño
                            </button>
                          )}
                        </div>
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
              className="btn btn-primary"
              onClick={agregarFilaDiseños}
            >
              Agregar fila
            </button>
            {diseños.length > 0 && !diseños[diseños.length - 1].lineaId && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={eliminarFilaDiseños}
              >
                Eliminar fila
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
                Clientes que tengan una Línea de Crédito disponible, de acuerdo
                a lo solicitado por el Comité de Crédito.
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
                    El mínimo de bombeo para un servicio es de 10m3 ($220.00 más
                    IVA x10m3)
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
                    El mínimo de bombeo para un servicio es de 15m3 ($264.00 más
                    IVA x15m3)
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
                concreto a partir de la llegada del mismo a la obra, después de
                este lapso, la empresa no se resposabiliza de las
                características (revenimiento, resistencia, etc) del producto
                conforme a la norma NMX C-155.
              </p>
              <p>
                * Para realizar alguna cancelación y/o modificación se requiere
                que se realice mínimo 3:30 hrs antes del suministro
              </p>
              <p>
                * En caso de modificaciones al concreto en obra, adicionando
                materia prima, agua, fibras u otros elementos, la empresa no se
                hace responsable del comportamiento del concreto.
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
        </form>
      </div>
    </>
  );
};
