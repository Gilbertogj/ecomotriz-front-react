import React, { useEffect, useState, useRef, useContext } from "react";

import { useParams, Link, useLocation } from "react-router-dom";

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
// import "./SolicitudRefacciones.styles.scss";

// const initialState = {
//   asset: "",
//   status: "",
//   folio: "",
//   deadline: "",
//   estimated_delivery_date: "",
//   location: "",
//   reported_fault_lines: "",

// };

const initialState = {
   
    price: "",
    work_order: "",
    part_lines:"",
  
  };

  const partsInitialState = [
    {
      id: 1,

   
      price:"",
      description:"",
      partsData:[],
      busquedaString:"",
      producto:"",
      rack:"",
      fault:"",


      

  
    },
  ];

// const fallasInitialState = [
//   {
//     id: 1,
//     fallaReportada: "",

//   },
// ];

// const diseñosInitialState = [
//   {
//     id: 1,
//     busquedaString: "",
//     description: "",
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



export const FallasEncontradas = ({ ordenTrabajoData }) => {
  const [form, setForm] = useState(initialState);

  const [obraData, setObraData] = useState({});
  const [show, setShow] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [diseños, setDiseños] = useState(diseñosInitialState);
  // const [fallas, setFallas] = useState(fallasInitialState);
  const [parts, setParts] = useState(partsInitialState);
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



//   useEffect(() => {
//     (async () => {
//       const fetchedData = await fetchDataWithoutAuthentication(
//         `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/assets/${id}/`,
//         authtoken,
//         dispatch,
//         setCurrentUser
//       );

//       // if (fetchedData.cliente_detail.pago === "F") {
//       //   setClientePagoF(true);
//       // }
      
//       // console.log(form.fiscal);

//       setUnidadData(fetchedData);
//     })();
//   }, []);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const getPartes = async (e, parteRef) => {
    setParts((prevState) => {
      const arr = [...prevState];

      arr[parteRef.id - 1] = {
        ...arr[parteRef.id - 1],
       
      };

      return arr;
    });

    const url = `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/foundfaults/?fault=${e.target.value}`;

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

    setParts((prevState) => {
      const arr = [...prevState];

      arr[parteRef.id - 1] = {
        ...arr[parteRef.id - 1],
        partsData: json.results,
      };

      return arr;
    });
  };


  const changeParteInput = (e, parteRef) => {
    setParts((prevState) => {
      const arr = [...prevState];

    
      if (e.target.name === "busquedaString") {
        arr[parteRef.id - 1] = {
          ...arr[parteRef.id - 1],
          description:"",
          producto: "",
          rack:"",
          
         
        };
      }

      if (e.target.name === "description") {
        arr[parteRef.id - 1] = {
          ...arr[parteRef.id - 1],
          rack: "",
       
        };
      }

      arr[parteRef.id - 1] = {
        ...arr[parteRef.id - 1],
        [`${e.target.name}`]: e.target.value,
      };
      return arr;
    });
  };


  const agregarParte = () => {
    setParts((prevState) => {
      const newArr = [...prevState];

      newArr.push({
        id: parts.length + 1,
   

        price:"",
        description:"",
        partsData:[],
        busquedaString:"",
        producto:"",
        rack:"",
  
       
      });

      return newArr;
    });
    
    
  };

  
  console.log(parts);

  const eliminarParte = () => {
    setParts((prevState) => {
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
  //       description: "",
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

    const formattedParts = [];

    parts.forEach((parte) => {
      const obj = {
       
        
        part: parte.producto,


        price: "0",


      };

      formattedParts.push(obj);
      // console.log(formattedParts);
    });

    const dict_data = {
  
      price: 0,
      work_order: String(ordenTrabajoData.id),
  

      part_lines: formattedParts,
   
    };

    console.log(formattedParts)

    let data = await fetch(
      "https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partsrequests/",
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
        "https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partsrequests/",
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


        {ordenTrabajoData.id && (
        <div className="cotizacion-container">
          <div className="d-flex justify-content-end mb-3">
            
            <Link
              to={`/ordenes-trabajo/orden/${ordenTrabajoData.id}`}
              className="btn btn-danger"
            >Cancelar
            </Link>
        

         
        </div>
          <ModalRedirect
            showConfirmModal={showConfirmModal}
            text="Se ha creado correctamente la Solicitude de Refacciones"
            link={`/ordenes-trabajo/orden/${ordenTrabajoData.id}`}
          />
          <form onSubmit={handleSumbit}>
            <div className="cotizacion-header-container">
              {/* <div className="d-flex align-items-center">
                <img src={Logo} alt="logo" />
              </div> */}
              <div className="d-flex flex-column align-items-center text-center">
                
              </div>
              
              <table className="blue-table">
              <tbody>
                <tr>
                  <td>Folio Orden:</td>
                  <td className="text-center">{ordenTrabajoData.folio}</td>
                </tr>
                <tr>
                  <td>Fecha de elaboración:</td>
                  <td className="text-center">
                  {ordenTrabajoData.created_at
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")} 
                  </td>
                </tr>
                <tr>
                  <td>Fecha estimada:</td>
                  <td className="text-center">
                  {ordenTrabajoData.estimated_delivery_date
                        
                        .split("-")
                        .reverse()
                        .join("-")} 
                  </td>
                </tr>
                
                <tr>
                  <td>Estado de la Orden:</td>
                  <td className="text-center">
                    {ordenTrabajoData.status == "Open" ? "No atendida": ordenTrabajoData.status == "Closed" ? "Cerrada": "En proceso"}</td>
                </tr>
              
              </tbody>
            </table>
              
            </div>
            <div className="text-center m-3">
              <h1>Orden de Trabajo {ordenTrabajoData.folio}</h1>
              <h1>Fallas Encontradas</h1>
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
                      <td className="col-2">{ordenTrabajoData.asset_data.empresa}</td>
                      <td className="col-2"><strong>Combustible:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.tipo_combustible}</td>
                      <td className="col-2"><strong>No. económico:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.numero_economico}</td>
                    </tr>
                    <tr>
                      <td className="col-2"><strong>Operador:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.transito.operador}</td>
                      <td className="col-2"><strong>Motor:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.modelo_motor}</td>
                      <td className="col-2"><strong>Descripción:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.description}</td>
                    </tr>
                    <tr>
                      <td className="col-2"><strong>Ubicación:</strong></td>
                      <td className="col-2">{ordenTrabajoData.location}</td>
                      <td className="col-2"><strong>Marca motor:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.marca_motor}</td>
                      <td className="col-2"><strong>Marca:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.marca_unidad}</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>Serie motor:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.numero_serie_motor}</td>
                      <td className="col-2"><strong>Modelo:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.modelo}</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>No. serie:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.numero_serie_unidad}</td>
                      
                    </tr>
                    <tr>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      <td colSpan={2} className="invisible-cells" ><strong></strong></td>
                      
                      <td className="col-2"><strong>Placas:</strong></td>
                      <td className="col-2">{ordenTrabajoData.asset_data.transito.placas}</td>
                      
                    </tr>
                  
                  
                  </tbody>
                </table>
              </div>
            </div>






            

            <div>
              <div className="table-responsive">
              <table className="blue-table tabla-diseños">
                  <thead>
                    <tr>
                      <th className="col-6">
                        <div className="d-flex justify-content-center">
                          Falla Encontrada
                        </div>
                      </th>
                      
                      {/* <th className="col-1">
                        {isDesktop ? (
                          <div className="d-flex justify-content-center">
                            
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center">
                            
                          </div>
                        )}
                      </th> */}
                  
                      {/* <th className="col-2">
                        <div className="d-flex justify-content-center">
                          
                        </div>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {parts.map((parte) => (
                      <tr key={parte.id}>
                        <td>
                          <input
                            type="text"
                            className="col-4"
                            name="busquedaString"
                            value={parte.busquedaString}
                            autoComplete="off"
                            onChange={(e) => {
                              getPartes(e, parte);
                              changeParteInput(e, parte);
                              
                            }}
                          />
                          <select
                            className="col-8"
                            name="description"
                            value={parte.description}
                            required
                            onChange={(e) => {
                              const newArr = parts[
                                parte.id - 1
                              ].partsData.filter(
                                (a) => a.fault === e.target.value
                              );

                              console.log(newArr);

                              // const precios = [];

                              // if (newArr[0].precio_contado.trim()) {
                              //   precios.push(newArr[0].precio_contado);
                              // }
                           

                              setParts((prevState) => {
                                const arr = [...prevState];

                                arr[parte.id - 1] = {
                                  ...arr[parte.id - 1],
                                 
                                  producto: newArr[0].id,
                                };

                                return arr;
                              });

                              changeParteInput(e, parte);
                       
                            }}
                          >
                            <option></option>
                            {parte.partsData.map((data) => (
                              <option key={data.id} value={data.fault}>
                                {data.job_code} {"-"} {data.fault}
                              </option>
                            ))}
                          </select>
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
                onClick={agregarParte}
              >
                Agregar Falla
              </button>
              {parts.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={eliminarParte}
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