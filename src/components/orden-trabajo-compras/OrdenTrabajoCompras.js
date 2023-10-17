import React, { useEffect, useState, useRef, useContext } from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { useParams, Link, useLocation } from "react-router-dom";

import Localizacion from "../../assets/img/Localizacion.png";
import Telefono from "../../assets/img/telefono.png";
import Internet from "../../assets/img/internet.png";
import Logo from "../../assets/img/logo-slogan.png";
import Tarjetas from "../../assets/img/tarjetas.png";
import Credito from "../../assets/img/credito.png";
import { SuccessModal } from "../success-modal/SuccessModal";

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
export const OrdenTrabajoCompras = ({
  ordenTrabajoData,
  form,
  handleSubmit,
  handleChange,
//   handleDescargarPdf,
  actualizarEstatusBtnRef,
}) => {
  const isDesktop = useIsDesktop();
  const [diseños, setDiseños] = useState(diseñosInitialState);
  const { authtoken, dispatch } = useContext(ReactReduxContext);
  const [show, setShow] = useState(false);

  console.log(form.estado)

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
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/foundfaults/${linea.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${authtoken}`,
          },
     
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/foundfaults/${linea.id}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Token ${json.token}`,
            },
       
          }
        );

        json = await data.json();
      }

      if (data.status === 204 || data.status === 200) {
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
        title="Falla encontrada eliminada"
      />
    <div className="cotizacion-container">
      {/* <div className="d-flex justify-content-md-between justify-content-center mb-1 mb-md-5 actualizar-estatus">
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
        {isDesktop && (
          <div className="d-flex align-items-end">
            <button className="btn btn-success" onClick={handleDescargarPdf}>
              Descargar PDF
            </button>
          </div>
        )}

        
      </div>
      <div className="d-flex justify-content-end mb-3">
            
            <Link
              to={`/ordenes-trabajo/orden/${ordenTrabajoData.id}/fallas-encontradas`}
              className="btn btn-primary"
            >Agregar Fallas Encontradas
            </Link>
        

         
        </div>
      <div className="d-flex justify-content-end mb-3">
            
            <Link
              to={`/ordenes-trabajo/orden/${ordenTrabajoData.id}/crear-solicitud`}
              className="btn btn-primary"
            >Agregar Solicitud de refacciones
            </Link>
        

         
        </div> */}

        <div className="d-flex justify-content-end mb-3">
            
            <Link
              to={`/compras/lista-refacciones/`}
              className="btn btn-secondary"
            >Regresar
            </Link>
        

         
        </div>

      

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
                      <th className="col-11">
                        <div className="d-flex justify-content-center">
                          Fallas ecnontradas
                        </div>
                      </th>
                      <th className="col-1">
                        <div className="d-flex justify-content-center">
                        
                        </div>
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody className="table-body">
                  {ordenTrabajoData.found_fault_lines.map((linea, i) => (
                    <tr key={i}>
                      <td>{linea.found_fault.fault}
                      
          </td>

                        <td>
                      
                      <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => {
                            handleClick(e, linea);
                          }}
                        >
                          {linea.found_fault.fault && "Eliminar"}
                         
                        </button>
            <button
                          className="btn btn-danger d-none"
                          type="checkbox"
                          
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
                    to={ `/compras/orden/${ordenTrabajoData.id}/solicitud-refacciones/${linea.id}`
                    }
                  >{linea.folio}
                  </Link>
                </td>
                     
                <td>
                  <Link
                    to={ `/compras/orden/${ordenTrabajoData.id}/solicitud-refacciones/${linea.id}`
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