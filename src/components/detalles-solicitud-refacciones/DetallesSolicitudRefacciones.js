import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";
import { fetchData } from "../../utils/fetchData";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { useParams } from "react-router-dom";
import { SuccessModal } from "../success-modal/SuccessModal";


export const DetallesSolicitudRefacciones = ({  solicitudData }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);




  const { pathname } = useLocation();
  const { idOrden } = useParams();
  const [ordenTrabajoData, setOrdenTrabajoData] = useState(null);

  const [dataFetched, setDataFetched] = useState(false);

  const { authtoken, dispatch, userRol } = useContext(ReactReduxContext);

//   useEffect(() => {
//     (async () => {
//       const fetchedData = await fetchData(
//         `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/workorders/${idOrden}/`,
//         authtoken,
//         dispatch,
//         setCurrentUser, idOrden
//       );

//       // if (fetchedData.cliente_detail.pago === "F") {
//       //   setClientePagoF(true);
//       // }
      
//       // console.log(form.fiscal);

//       setordenTrabajoData(fetchedData);
//     })();
//   }, []);
   

useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData = await fetchData(
          `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/workorders/${idOrden}/`,
          authtoken,
          dispatch,
          setCurrentUser,
          idOrden
        );

        setOrdenTrabajoData(fetchedData);
        setIsLoading(false);
        setDataFetched(true); // Set dataFetched to true after the fetch is completed.
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);



  const handleClose = () => setShow(false);

//   const handleClick = async (e, pedido) => {
//     try {
//       e.target.classList.add("d-none");

//       e.target.nextSibling.classList.remove("d-none");

//       let formData = new FormData();

//       let status_pedido;

//       if (pedido.status_pedido === "Desactivado") {
//         status_pedido = "Activado";
//       }

//       if (pedido.status_pedido === "Activado") {
//         status_pedido = "Desactivado";
//       }

//       formData.append("status_pedido", status_pedido);

//       let data = await fetch(
//         `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedido.id}/update/`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Token ${authtoken}`,
//           },
//           body: formData,
//         }
//       );

//       let json = await data.json();

//       if (json.expired) {
//         dispatch(setCurrentUser({ token: json.token }));

//         data = await fetch(
//           `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${pedido.id}/update/`,
//           {
//             method: "PATCH",
//             headers: {
//               Authorization: `Token ${json.token}`,
//             },
//             body: formData,
//           }
//         );

//         json = await data.json();
//       }

//       if (data.status === 201 || data.status === 200) {
//         setShow(true);
//         setPedidos((prevState) => {
//           const arr = [...prevState];

//           const arrElementsStringifed = arr.map((el) => JSON.stringify(el));

//           const idx = arrElementsStringifed.indexOf(JSON.stringify(pedido));

//           arr.splice(idx, 1, json);

//           return arr;
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       alert(error);
//     } finally {
//       e.target.nextSibling.classList.add("d-none");
//       e.target.classList.remove("d-none");
//     }
//   };


const handleClick = async (e, linea) => {
    try {
      e.target.classList.add("d-none");

      e.target.nextSibling.classList.remove("d-none");

      let formData = new FormData();

      let status;
      let bought;


      if (linea.status=== "Por Suministrar") {
        status = "Suministrado";
        bought = false;
        
      }

      if (linea.status === "Suministrado") {
        status = "Por Suministrar";
        bought = false;
      }

      formData.append("status", status);
      formData.append("bought", bought);

      let data = await fetch(
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/${linea.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/${linea.id}/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 201 || data.status === 200) {
        setShow(true);
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
      alert(error);
    } finally {
      e.target.nextSibling.classList.add("d-none");
      e.target.classList.remove("d-none");
    }
  };

  const handleClickCompras = async (e, linea) => {
    try {
      e.target.classList.add("d-none");

      e.target.nextSibling.classList.remove("d-none");

      let formData = new FormData();

      let status;
      let bought;


      
        status = "Compras";
        bought = true;
        
    
    

      formData.append("status", status);
      formData.append("bought", bought);

      let data = await fetch(
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/${linea.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/partslines/${linea.id}/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 201 || data.status === 200) {
        setShow(true);
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
      alert(error);
    } finally {
      e.target.nextSibling.classList.add("d-none");
      e.target.classList.remove("d-none");
    }
  };

  const handleReload = () => {
    window.location.reload(); // Reload the page when the button is clicked
  };


  return (
    <>
    <SuccessModal
        show={show}
        handleClose={handleReload}
        title="Linea refaccion actualizada"
      />
    <div className="cotizacion-container">
    <div className="d-flex justify-content-end mb-3">
            
            <Link
              to={pathname.includes('/compras') ? '/compras/lista-refacciones' : `/ordenes-trabajo/orden/${idOrden}`}
              className="btn btn-secondary"
            >Regresar
            </Link>
        

         
        </div>
    

      {dataFetched ? ( // Check if the data has been fetched

      


      

      <div className="to-image">
        <div className="cotizacion-header-container  mx-md-3 py-3">
         
          
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
                        .join("-")
                        } 
                  </td>
                </tr>
                <tr>
                  <td>Fecha estimada:</td>
                  <td className="text-center">
                  {ordenTrabajoData.estimated_delivery_date
                        
                        .split("-")
                        .reverse()
                        .join("-")
                        } 
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

        
        
            <div className="mb-3">
            
              <div className="table-responsive">
                <table className="w-100 blue-table tabla-cliente">
                  <thead>
                  
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
           

            {/* <div>
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
            </div> */}

            

            <div>
            <div className="text-center m-3">
          <h3>Solicitudes de Refacciones {solicitudData.folio}</h3>
        </div>
              <div className="table-responsive">
           
                <table className="w-100 blue-table tabla-diseños">
                
                  <thead>
                    <tr>
                    <th className="col-1">
                        <div className="d-flex justify-content-center">
                          Cantidad
                        </div>
                      </th>
                      <th className="col-2">
                        <div className="d-flex justify-content-center">
                          Num. parte 
                        </div>
                      </th>
                    
                      <th className="col-2">
                        <div className="d-flex justify-content-center">
                          Descripción
                        </div>
                      </th>
                      <th className="col-1">
                        <div className="d-flex justify-content-center">
                          Precio
                        </div>
                      </th>
                      <th className="col-3">
                        <div className="d-flex justify-content-center">
                          Estatus
                        </div>
                      </th>
                      <th className="col-3">
                        <div className="d-flex justify-content-center">
                          Suministro
                        </div>
                      </th>
                    
                     
                     
                    </tr>
                  </thead>
                  {/* <tbody className="table-body">

                  {SolicitudData.parts_data.map((parte, i) => (
                    <tr key={i}>

                
                   {SolicitudData.part_line.map((linea, j) => (
                    <tr key={j}>

                  <td>
                  <Link
                    to={ `/ordenes-trabajo/orden/${ordenTrabajoData.id}/solicitud-refacciones/${linea.id}`
                    }
                  >{linea.quantity}
                  </Link>
                </td>
                     
                
                    </tr>
            ))}

                  
                    </tr>
            ))}

         



                  
                   
                  </tbody> */}

<tbody>
        {solicitudData.part_lines.map((linea, i) => (
          <tr key={i}>
            <td>{linea.quantity}</td>
            <td>{linea.part_data[0].sae_key}</td>
            <td>{linea.part_data[0].description}</td>
            <td>{linea.price}</td>
            
            {pathname.includes('/ordenes-trabajo') ? 
            
            <td>{linea.status}
            {linea.status != "Compras" ? (
            <button
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            handleClick(e, linea);
                          }}
                        >
                          {linea.status === "Suministrado" && "Por Suministrar"}
                          {linea.status === "Por Suministrar" && "Suministrado"}
                         
                          
                        </button>

) : (
  null // or any other content you want to show when status is not "Suministrado"
)}
                        {linea.status === "Por Suministrar" ? (
                          <button
                        className="btn btn-warning btn-sm"
                              onClick={(e) => {
                                handleClickCompras(e, linea);
                              }}
                            >
                              Compras
                            </button>
                          ) : (
                            null // or any other content you want to show when status is not "Suministrado"
                          )}
            <button
                          className="btn btn-primary d-none"
                          type="checkbox"
                          
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </button>
            </td>
            :  <td>{linea.status}</td>}

            <td>{linea.bought || linea.status=="Por suministrar" ? "Compras" : "Suministrado"}</td>
            
          
          </tr>
          
        ))}
    
      </tbody>
                </table>
              </div>
            </div>

           



        

     

        
        

        
      </div>
      ) : (
        <p>Loading...</p>
       )}
      


    </div>
    </>
  );
};
