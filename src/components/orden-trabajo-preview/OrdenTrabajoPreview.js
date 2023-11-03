import React, { useEffect, useState, useRef, useContext } from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";
import { fetchData } from "../../utils/fetchData";

import Localizacion from "../../assets/img/Localizacion.png";
import Telefono from "../../assets/img/telefono.png";
import Internet from "../../assets/img/internet.png";
import Logo from "../../assets/img/logo-slogan.png";
import Tarjetas from "../../assets/img/tarjetas.png";
import Credito from "../../assets/img/credito.png";
import { SuccessModal } from "../success-modal/SuccessModal";


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

// const serviciosInitialState = [
//   {
//     id: 1,

 
//     price:"",
//     notes:"",
//     labor_type:"",
//     user:"",

//   },
// ];

const manoObraInitialState = [
  {
    id: 1,

  

 
    price:"",
    notes:"",
    labor_type:"",
    
    mechanic:"",

  },
];




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
export const OrdenTrabajoPreview = ({
  ordenTrabajoData,
  form,
  handleSubmit,
  handleChange,
  handleDescargarPdf,
  actualizarEstatusBtnRef,
}) => {
  const isDesktop = useIsDesktop();
  const [diseños, setDiseños] = useState(diseñosInitialState);
  const { authtoken, dispatch } = useContext(ReactReduxContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [parts, setParts] = useState(partsInitialState);
  // const [servicios, setServicios] = useState(serviciosInitialState);
  const [manoObra, setManoObra] = useState(manoObraInitialState);
  const [mecanicosInputFocused, setMecanicosInputFocused] = useState(false);
  const [mecanicos, setMecanicos] = useState([]);
  const [showMecanicosSpinner, setShowMecanicosSpinner] = useState(false);
  const history = useHistory();
  

 



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

    
      // if (e.target.name === "busquedaString") {
      //   arr[parteRef.id - 1] = {
      //     ...arr[parteRef.id - 1],
      //     description:"",
      //     producto: "",
      //     rack:"",
          
         
      //   };
      // }

      // if (e.target.name === "description") {
      //   arr[parteRef.id - 1] = {
      //     ...arr[parteRef.id - 1],
      //     rack: "",
       
      //   };
      // }

      arr[parteRef.id - 1] = {
        ...arr[parteRef.id - 1],
        [`${e.target.name}`]: e.target.value,
      };
      return arr;
    });

    
  };

  console.log(parts);
  console.log(changeParteInput);

  const changeServicioInput = (e, servicioRef) => {
    setManoObra((prevState) => {
      const arr = [...prevState];

     

    
      

      arr[servicioRef.id - 1] = {
        ...arr[servicioRef.id - 1],
        [`${e.target.name}`]: e.target.value,
    
      };
      return arr;
      
     
    });


    
  };
console.log(manoObra);



  const handleClick = async (e, linea) => {
    try {
      e.target.classList.add("d-none");

      e.target.nextSibling.classList.remove("d-none");

      let formData = new FormData();

      // let status;
      // let bought;


      // if (linea.status=== "Por Suministrar") {
      //   status = "Suministrado";
      //   bought = false;
        
      // }

      // if (linea.status === "Suministrado") {
      //   status = "Por Suministrar";
      //   bought = true;
      // }

      // formData.append("status", status);
      // formData.append("bought", bought);

      let data = await fetch(
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/foundfaultslines/${linea.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${authtoken}`,
          },
     
        }
      );

      // let json = await data.json();

      // if (json.expired) {
      //   dispatch(setCurrentUser({ token: json.token }));

      //   data = await fetch(
      //     `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/foundfaultslines/${linea.id}/`,
      //     {
      //       method: "DELETE",
      //       headers: {
      //         Authorization: `Token ${json.token}`,
      //       },
       
      //     }
      //   );

      //   // json = await data.json();
      // // }
      // handleReload();

      if (data.status === 204 || data.status === 200 || data.status === 201) {
        // setShow(true);
        handleReload();
        // setPedidos((prevState) => {
        //   const arr = [...prevState];

        //   const arrElementsStringifed = arr.map((el) => JSON.stringify(el));

        //   const idx = arrElementsStringifed.indexOf(JSON.stringify(pedido));

        //   arr.splice(idx, 1, json);

        //   return arr;
        // });
      }
    } catch (error) {
      console.log(error);
      // alert(error);
    } finally {
      e.target.nextSibling.classList.add("d-none");
      e.target.classList.remove("d-none");
    }
  };


  const handleReload = () => {
    window.location.reload(); // Reload the page when the button is clicked
  };

  const handleSubmitManoObra = async (e) => {
    e.preventDefault();

    

  



    const formattedServices = [];
    

    manoObra.forEach((servicio) => {
      console.log(servicio);

  
      const obj = {
       
        
        price:servicio.price,
        notes:servicio.notes,
        labor_type:servicio.labor_type,
        // user:1,
        mechanic:servicio.mechanic,
        work_order: String(ordenTrabajoData.id),


        


       


      };
      formattedServices.push(obj);
    });

      

 

    let falla=0;

    formattedServices.forEach((formattedService) => {
     falla= formattedServices.part;
     console.log(falla);
    });

   
    console.log(formattedServices);



    const dict_data = {
  
  
      // price: 0,
      // work_order: String(ordenTrabajoData.id),
  

      price: formattedServices[0].price,
      notes: formattedServices[0].notes,
      labor_type: formattedServices[0].labor_type,
      work_order: String(ordenTrabajoData.id),
      // user:1,
      mechanic:formattedServices[0].mechanic,

  

     
   
    };

    console.log(formattedServices)

    let data = await fetch(
      "https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/internalservicelines/",
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
        "https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/internalservicelines/",
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
      handleReload();
      /* alert("Se ha creado correctamente la cotización."); */

      // setShowConfirmModal(true);

      /* history.push(`/concreco/comercializacion/cotizaciones`); */
    } else if (data.status === 406) {
      alert(json.error);
    } else {
      alert(JSON.stringify(json));
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    

  



    const formattedParts = [];

    parts.forEach((parte) => {
      const obj = {
       
        
        found_fault: parte.producto,
        work_order: String(ordenTrabajoData.id),


        


       


      };

      formattedParts.push(obj);

    });

    let falla=0;

    formattedParts.forEach((formattedPart) => {
     falla= formattedPart.part;
     console.log(falla);
    });

   
    console.log(formattedParts.found_fault);



    const dict_data = {
  
  
      // price: 0,
      // work_order: String(ordenTrabajoData.id),
  

      found_fault: formattedParts[0].found_fault,
      work_order: String(ordenTrabajoData.id),

  

     
   
    };

    console.log(formattedParts)

    let data = await fetch(
      "https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/foundfaultslines/",
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
      // handleReload();
      /* alert("Se ha creado correctamente la cotización."); */

      // setShowConfirmModal(true);

      /* history.push(`/concreco/comercializacion/cotizaciones`); */
    } else if (data.status === 406) {
      alert(json.error);
    } else {
      alert(JSON.stringify(json));
    }
   
  };

  
  const fetchMecanicos = async () => {
    setShowMecanicosSpinner(true);

    const fetchedData = await fetchData(
      `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/users/?user_type=Mechanic`,
      authtoken,
      dispatch,
      setCurrentUser
    );

    setMecanicos(fetchedData.results);
    setShowMecanicosSpinner(false);
  };


  return (
    <>
    <SuccessModal
        show={show}
        handleClose={handleReload}
        title="Falla encontrada eliminada"
      />
    <div className="cotizacion-container">
      <div className="d-flex justify-content-md-between justify-content-center mb-1 mb-md-5 actualizar-estatus">
        <form
          className="d-flex flex-column flex-md-row align-items-center align-items-md-end mt-3"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column me-3">
            <label htmlFor="status">Estatus de la orden</label>
            <select
              name="status"
              value={form.status}
              className="select-pedido form-select"
              id="status"
              onChange={handleChange}
              required
            >
              <option value="Open">No atendida</option>
              <option value="Closed">Cerrada</option>
              <option value="In Progress">En proceso</option>
            </select>
          </div>
         
          <div>
            <input
              type="submit"
              value="Actualizar"
              className="btn btn-success"
              ref={actualizarEstatusBtnRef}
              disabled
            />
          </div>

          
        </form>
        {/* {isDesktop && (
          <div className="d-flex align-items-end">
            <button className="btn btn-success" onClick={handleDescargarPdf}>
              Descargar PDF
            </button>
          </div>
        )} */}

        
      </div>



    
      {/* <div className="d-flex justify-content-end mb-3">
            
            <Link
              to={`/ordenes-trabajo/orden/${ordenTrabajoData.id}/fallas-encontradas`}
              className="btn btn-primary"
            >Agregar Fallas Encontradas
            </Link>
        

         
        </div> */}
      <div className="d-flex justify-content-end mb-3">
            
            <Link
              to={`/ordenes-trabajo/orden/${ordenTrabajoData.id}/crear-solicitud`}
              className="btn btn-primary"
            >Agregar Solicitud de refacciones
            </Link>
        

         
        </div>

        {/* {ordenTrabajoData.status === "Closed" && (
  <div className="d-flex justify-content-end mb-3">
    <Link
      to={`/ordenes-trabajo/orden/${ordenTrabajoData.id}/crear-solicitud`}
      className="btn btn-success"
    >
      Agregar Solicitud de refacciones
    </Link>
  </div>
)} */}



      

      <div className="to-image">
        <div className="cotizacion-header-container  mx-md-3 py-3">
          {/* <div className="d-flex align-items-center">
            <img src={Logo} alt="logo" />
          </div> */}
          
          <div className="d-flex align-items-center">
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
        </div>

        <div className="text-center m-3">
          <h1>Orden de Trabajo</h1>
        </div>

        {/* <div className="mb-3">
          <div className="table-responsive">
            <table className="w-100 blue-table tabla-cliente text-dark">
              <thead>
                <tr className="text-center">
                  <th colSpan={4}>Datos Generales del Cliente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Razon social :</td>
                  <td colSpan={3}>p</td>
                </tr>
                <tr>
                  <td>Atención :</td>
                  <td colSpan={3}>p</td>
                </tr>
                <tr>
                  <td>Obra :</td>
                  <td colSpan={3}>p</td>
                </tr>
                {isDesktop ? (
                  <tr>
                    <td className="col-3">Asesor Comercial:</td>
                    <td className="col-3">
                      p
                    </td>
                    <td className="col-3">Correo electrónico asesor:</td>
                    <td className="col-3">
                      p
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td>Asesor Comercial:</td>
                      <td>
                        pp
                      </td>
                    </tr>
                    <tr>
                      <td>Correo electrónico asesor:</td>
                      <td>
                        ppp
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div> */}

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
                      <td className="col-2">{ordenTrabajoData.asset_data.nombre}</td>
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
                  {ordenTrabajoData.reported_fault_lines.map((linea, i) => (
                    <tr key={i}>
                      <td>{linea.fault}</td>
                    </tr>
            ))}
                   
                  </tbody>
                </table>
              </div>
            </div>
            
           
            
            <div>
              <div className="table-responsive">
                <table className="w-100 blue-table tabla-diseños">
                  <thead>
                    <tr>
                      <th className="col-12" colSpan="2">
                        <div className="d-flex justify-content-center">
                          Fallas encontradas
                        </div>
                      </th>
                      {/* <th className="col-1">
                        <div className="d-flex justify-content-center">
                        
                        </div>
                      </th> */}
                     
                    </tr>
                  </thead>
              
                  <tbody className="table-body">
                  {parts.map((parte) => (
                      <tr key={parte.id}>
                        <td className="col-11">
                          <input
                            type="text"
                            className="col-4"
                            name="busquedaString"
                            value={parte.busquedaString}
                            placeholder="Busqueda de falla"
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
                       
                            onChange={(e) => {
                              const newArr = parts[
                                parte.id - 1
                              ].partsData.filter(
                                (a) => a.fault === e.target.value
                              );

                              console.log(newArr);
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

                        <td className="col-1">
     
              <button
                          className="btn btn-success btn-sm col-12"
                          onClick={(e) => {
                            handleSumbit(e);
                          }}
                        >
                          {"Agregar"}
                         
                        </button>
            <button
                          className="btn btn-danger d-none col-12"
                          type="button"
                          
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </button>
                        </td>
                        
                      
                       
                          
                     
                     
                      </tr>

                      
                    ))}








                  {ordenTrabajoData.found_fault_lines.map((linea, i) => (
                    <tr key={i}>
                      <td className="col-10">{linea.found_fault_data.job_code+" - "+linea.found_fault_data.fault}
                      
                      </td>

                        <td className="col-2">
                      
                      <button
                          className="btn btn-danger btn-sm col-12"
                          onClick={(e) => {
                            handleClick(e, linea);
                          }}
                        >
                          {linea.found_fault_data.id && "Eliminar"}
                         
                        </button>
            <button
                          className="btn btn-danger d-none"
                          type="button"
                          
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </button></td>
                    </tr>

                    
            ))}
                  </tbody>
            
                </table>






              </div>
            </div>
          

            {/* <div className="mt-3 d-flex justify-content-between">
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
            </div> */}

            <div>

              
            <div className="text-center m-3">
          <h3>Solicitudes de Refacciones</h3>
        </div>
              <div className="table-responsive">
           
                <table className="w-100 blue-table tabla-diseños">
                
                  <thead>
                    <tr>
                    
                      <th className="col-3">
                        <div className="d-flex justify-content-center">
                          Folio
                        </div>
                      </th>
                      <th className="col-3">
                        <div className="d-flex justify-content-center">
                          Precio
                        </div>
                      </th>
                    
                     
                     
                    </tr>
                  </thead>
                  <tbody className="table-body">
                  {ordenTrabajoData.parts_requests.map((linea, i) => (
                    <tr key={i}>

                  <td>
                  <Link
                    to={ `/ordenes-trabajo/orden/${ordenTrabajoData.id}/solicitud-refacciones/${linea.id}`
                    }
                  >{linea.folio}
                  </Link>
                </td>
                     
                <td>
                  <Link
                    to={ `/ordenes-trabajo/orden/${ordenTrabajoData.id}/solicitud-refacciones/${linea.id}`
                    }
                  >{linea.price}
                  </Link>
                </td>
                    </tr>
            ))}
                   
                  </tbody>
                </table>
              </div>
            </div>




            <div>
            <div className="text-center m-3">
          <h3>Mano de obra</h3>
        </div>
              <div className="table-responsive">
                <table className="w-100 blue-table tabla-diseños">
                  <thead>
                    <tr>
                      <th className="col-4" colSpan="1">
                        <div className="d-flex justify-content-center">
                          Tipo de trabajo 
                        </div>
                      </th>
                      <th className="col-1" colSpan="1">
                        <div className="d-flex justify-content-center">
                          Precio
                        </div>
                      </th>
                      <th className="col-3" colSpan="1">
                        <div className="d-flex justify-content-center">
                          Mecánico 
                        </div>
                      </th>
                      <th className="col-4" colSpan="2">
                        <div className="d-flex justify-content-center">
                          Notas
                        </div>
                      </th>
                    
                     
                    </tr>
                  </thead>
              
                  <tbody className="table-body">
                  {manoObra.map((servicio) => (
                      <tr key={servicio.id}>
                        <td className="col-3">

                        <select
                            className="col-12"
                            name="labor_type"
                            value={servicio.labor_type}
                            
                       
                            onChange={(e) => {
                        

                              changeServicioInput(e, servicio);
                       
                            }}
                          >
                            <option></option>
                            
                            <option value="Soldadura">Soldadura</option>
                            <option value="Suspensión y/o llantas">Suspensión y/o llantas</option>
                          <option value="Pintura">Pintura</option>
                          <option value="Eléctrico">Eléctrico</option>
                          <option value="Torno">Torno</option>
                          <option value="Trabajo mecánico">Trabajo mecánico</option>
                          
                          </select>
                          
                     
                        </td>



                      <td className="col-1">
                      <input
                            type="number"
                            className="col-12"
                            name="price"
                            value={servicio.price}
                            onChange={(e) => {
                              changeServicioInput(e, servicio);
                              
                            }}
                            autoComplete="off"
                            required
                            onWheel={(e) => {
                              e.target.blur();
                            }}
                          /> </td>

                    <td className="col-3">
                    {showMecanicosSpinner && (
                        <div className="spinner-border spinner-border-sm ms-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      {/* <input
                            type="text"
                            className="col-12"
                            name="mechanic"
                            value={servicio.mechanic}
                            onChange={(e) => {
                              changeServicioInput(e, servicio);
                              
                            }}
                            autoComplete="off"
                            required
                            onWheel={(e) => {
                              e.target.blur();
                            }}
                          />  */}
                          <select
                          
                                id="mechanic"
                                name="mechanic"
                                // className="form-select "
                                className="col-12"
                                onChange={(e) => {
                        

                                  changeServicioInput(e, servicio);
                           
                                }}
                                value={servicio.mechanic}
                                onFocus={() => {
                                  if (!mecanicosInputFocused) {
                                    fetchMecanicos();
                                  }

                                  setMecanicosInputFocused(true);
                                }}
                              >
                                {/* <option value="">Todos</option> */}
                                <option></option>
                                {mecanicos.map((mecanico) => (
                                  <option key={mecanico.id} value={mecanico.id}>
                                    {mecanico.name}
                                  </option>
                                ))}
{/* 
                                  <option  value="1">
                                    "sss"
                                  </option> */}
                          </select>
                          
                          </td>






                      <td className="col-4">
                      <input
                            type="text"
                            className="col-12"
                            name="notes"
                            value={servicio.notes}
                            onChange={(e) => {
                              changeServicioInput(e, servicio);
                              
                            }}
                            autoComplete="off"
                            required
                            onWheel={(e) => {
                              e.target.blur();
                            }}
                          /> </td>
                       

                        <td className="col-2">
     
              <button
                          className="btn btn-success btn-sm col-12"
                          onClick={(e) => {
                            handleSubmitManoObra(e);
                          }}
                        >
                          {"Agregar"}
                         
                        </button>
            <button
                          className="btn btn-danger d-none col-12"
                          type="button"
                          
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </button>
                        </td>
                        
                        
                       
                          
                     
                     
                      </tr>
                      ))}

{ordenTrabajoData.internal_serivice_lines.map((linea, i) => (
                    <tr key={i}>
                      <td className="col-4">{linea.labor_type}
                      
                      </td>
                      <td className="col-2">{"$"+linea.price}
                      
                      </td>
                      <td className="col-3">{linea.mechanic_data.name+" "+linea.mechanic_data.last_name}
                      
                      </td>
                      <td className="col-3">{linea.notes}
                      
                      </td>

                       
                    </tr>

                    
            ))}

                      
                    

                   










                  {/* {ordenTrabajoData.found_fault_lines.map((linea, i) => (
                    <tr key={i}>
                      <td className="col-10">{linea.found_fault_data.fault}
                      
                      </td>

                        <td className="col-2">
                      
                      <button
                          className="btn btn-danger btn-sm col-12"
                          onClick={(e) => {
                            handleClick(e, linea);
                          }}
                        >
                          {linea.found_fault_data.id && "Eliminar"}
                         
                        </button>
            <button
                          className="btn btn-danger d-none"
                          type="button"
                          
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </button></td>
                    </tr>

                    
            ))} */}
                  </tbody>
            
                </table>






              </div>
            </div>

            {/* <div className="mt-3 d-flex justify-content-between">
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
            </div> */}



        

     

        
        

        
      </div>
    </div>


    </>
  );
};