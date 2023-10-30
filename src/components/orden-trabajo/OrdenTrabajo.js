import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { setCurrentUser } from "../../redux/user/userSlice";
import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";
import { fetchDataWithoutAuthentication } from "../../utils/fetchDataWithoutAuthentication";

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
  asset: "",
  status: "",
  folio: "",
  deadline: "",
  estimated_delivery_date: "",
  location: "",
  reported_fault_lines: "",

};

const fallasInitialState = [
  {
    id: 1,
    fallaReportada: "",

  },
];

// const diseñosInitialState = [
//   {
//     id: 1,
//     busquedaString: "",
//     nombre: "",
//     precioUnitario: "",
//     cantidad: "",
//     diseñosData: [],
//     precios: [],
//     subtotal: "",
//     producto: "",
//     unidad: "",
//     estado:"",
//   },
// ];



export const OrdenTrabajo = () => {
  const [form, setForm] = useState(initialState);
  const [unidadData, setUnidadData] = useState({});
  const [obraData, setObraData] = useState({});
  const [show, setShow] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [diseños, setDiseños] = useState(diseñosInitialState);
  const [fallas, setFallas] = useState(fallasInitialState);
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

  const { id } = useParams();

  const isDesktop = useIsDesktop();

  const fechaHoy = new Date();

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchDataWithoutAuthentication(
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/assets/${id}/`,
        authtoken,
        dispatch,
        setCurrentUser
      );

      // if (fetchedData.cliente_detail.pago === "F") {
      //   setClientePagoF(true);
      // }
      
      // console.log(form.fiscal);

      setUnidadData(fetchedData);
    })();
  }, []);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const changeDiseñoInput = (e, diseñoRef) => {
    setFallas((prevState) => {
      const arr = [...prevState];

    

      arr[diseñoRef.id - 1] = {
        ...arr[diseñoRef.id - 1],
        [`${e.target.name}`]: e.target.value,
      };

      return arr;
    });
  };

  const agregarFalla = () => {
    setFallas((prevState) => {
      const newArr = [...prevState];

      newArr.push({
        id: fallas.length + 1,
        fallaReportada: "",
      });

      return newArr;
    });
  };



  console.log(fallas);
  const eliminarFalla = () => {
    setFallas((prevState) => {
      const newArr = [...prevState];
      newArr.pop();
      return newArr;
    });
  };


  // const agregarDiseño = () => {
  //   setDiseños((prevState) => {
  //     const newArr = [...prevState];

  //     newArr.push({
  //       id: diseños.length + 1,
  //       busquedaString: "",
  //       nombre: "",
  //       precioUnitario: "",
  //       cantidad: "",
  //       diseñosData: [],
  //       precios: [],
  //       subtotal: "",
  //       producto: "",
  //       unidad: "",
  //     });

  //     return newArr;
  //   });
  // };

  // const eliminarDiseño = () => {
  //   setDiseños((prevState) => {
  //     const newArr = [...prevState];
  //     newArr.pop();
  //     return newArr;
  //   });
  // };




  const handleSumbit = async (e) => {
    e.preventDefault();

    

  

    const fechaFiltroFormatted = `${fechaHoy.getFullYear()}-${String(
      fechaHoy.getMonth() + 1
    ).padStart(2, 0)}-${fechaHoy.getDate()}`;

    const formattedFallas = [];

    fallas.forEach((falla) => {
      const obj = {
        fault: falla.fallaReportada,

      };

      formattedFallas.push(obj);
      // console.log(formattedFallas);
    });

    const dict_data = {
      location: form.location,
      status: "Open",
      asset: String(unidadData.id),
      // folio: undefined, 
      estimated_delivery_date: form.estimated_delivery_date,
      reported_fault_lines: formattedFallas,
      folio: form.folio,
      // tipo_venta: obraData.cliente_detail.pago,
    };

    let data = await fetch(
      "https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/workorders/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
        body: JSON.stringify(dict_data),
      }
    );

    // console.log(dict_data);

    let json = await data.json();

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(
        "https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/workorders/",
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
        {unidadData.id && (
        <div className="cotizacion-container">
          <ModalRedirect
            showConfirmModal={showConfirmModal}
            text="Se ha creado correctamente la Orden de Trabajo"
            link={`/ordenes-trabajo/lista`}
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
                    <tr>
                      <td>Fecha estimada de entrega:</td>
                      
                        <input
                          id="fechaPedido"
                          type="date"
                          name="estimated_delivery_date"
                          onChange={handleChangeForm}
                         
                          value={form.estimated_delivery_date}
                          className="form-control"
                          required
                        />

                      
                    </tr>
                    <tr>
                  <td>Folio Orden:</td>
                  <input
                          type="text"
                          className="col-12"
                          name="folio"
                          value={form.folio}
                          onChange={handleChangeForm}
                          autoComplete="off"
                          required
                        />
                </tr>
          
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
                      <td className="col-2">{unidadData.empresa}</td>
                      <td className="col-2"><strong>Combustible:</strong></td>
                      <td className="col-2">{unidadData.tipo_combustible}</td>
                      <td className="col-2"><strong>No. económico:</strong></td>
                      <td className="col-2">{unidadData.numero_economico}</td>
                    </tr>
                    <tr>
                      <td className="col-2"><strong>Operador:</strong></td>
                      <td className="col-2">{unidadData.transito.operador}</td>
                      <td className="col-2"><strong>Motor:</strong></td>
                      <td className="col-2">{unidadData.modelo_motor}</td>
                      <td className="col-2"><strong>Descripción:</strong></td>
                      <td className="col-2">{unidadData.nombre}</td>
                    </tr>
                    <tr>
                      <td className="col-2"><strong>Ubicación:</strong></td>
                      <td className="col-2">
                        <input
                          type="text"
                          className="col-12"
                          name="location"
                          value={form.location}
                          onChange={handleChangeForm}
                          autoComplete="off"
                          required
                        /></td>
                      <td className="col-2"><strong>Marca motor:</strong></td>
                      <td className="col-2">{unidadData.marca_motor}</td>
                      <td className="col-2"><strong>Marca:</strong></td>
                      <td className="col-2">{unidadData.marca_unidad}</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>Serie motor:</strong></td>
                      <td className="col-2">{unidadData.numero_serie_motor}</td>
                      <td className="col-2"><strong>Modelo:</strong></td>
                      <td className="col-2">{unidadData.modelo}</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>No. serie:</strong></td>
                      <td className="col-2">{unidadData.numero_serie_unidad}</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>Placas:</strong></td>
                      <td className="col-2">{unidadData.transito.placas}</td>
                      
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
                  {fallas.map((falla) => (
                      <tr key={falla.id}>
                      
                      <td colSpan={3}>
                      <input
                            type="text"
                            className="col-12"
                            name="fallaReportada"
                            value={falla.fallaReportada}
                            autoComplete="off"
                            onChange={(e) => {
                              changeDiseñoInput(e, falla);
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
                onClick={agregarFalla}
              >
                Agregar Falla
              </button>
              {fallas.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={eliminarFalla}
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
      )}
      {/* <CotizacionModal
        show={show}
        handleClose={handleClose}
        modalSelectRef={modalSelectRef}
        modalSelectFiscalRef={modalSelectFiscalRef}
      /> */}
    </>
  );
};
