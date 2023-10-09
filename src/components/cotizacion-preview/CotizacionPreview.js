import React, { useEffect, useState, useRef, useContext } from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { formatNumToMxnCurrency } from "../../utils/formatNumToMxnCurrency";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

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
    estado:"",
  },
];
export const CotizacionPreview = ({
  cotizacionData,
  form,
  handleSubmit,
  handleChange,
  handleDescargarPdf,
  actualizarEstatusBtnRef,
}) => {
  const isDesktop = useIsDesktop();
  const [diseños, setDiseños] = useState(diseñosInitialState);
  const { authtoken, dispatch } = useContext(ReactReduxContext);

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

  return (
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
              value={form.estado}
              className="select-pedido form-select"
              id="status"
              onChange={handleChange}
              required
            >
              <option value="Open">Abierta</option>
              <option value="Closed">Cerrada</option>
              <option value="In Progress">En proceso</option>
            </select>
          </div>
          {/* <div className="d-flex flex-column mx-0 mx-md-3 my-3 my-md-0">
            <label htmlFor="status">Estatus</label>
            <select
              name="estado"
              value={form.estado}
              className="select-pedido form-select"
              id="status"
              onChange={handleChange}
              required
            >
              <option value="Aprobada">Aprobada</option>
              <option value="Por aprobar">Por aprobar</option>
              
            </select>
          </div> */}
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

      <div className="to-image">
        <div className="cotizacion-header-container  mx-md-3 py-3">
          {/* <div className="d-flex align-items-center">
            <img src={Logo} alt="logo" />
          </div> */}
          
          <div className="d-flex align-items-center">
            <table className="blue-table">
              <tbody>
                <tr>
                  <td>Folio Cotización:</td>
                  <td className="text-center">M-125</td>
                </tr>
                <tr>
                  <td>Fecha de elaboración:</td>
                  <td className="text-center">
                    prueba
                  </td>
                </tr>
                
                <tr>
                  <td>Estado de la Orden:</td>
                  <td className="text-center">prueba</td>
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
                 
                      <tr >
                      
                      <td colSpan={3}>
                      <input
                            type="text"
                            className="col-12"
                            name="busquedaString"
                            value="Falla reportada 1"
                            autoComplete="off"
                           
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
                          Fallas ecnontradas
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



        

     

        
        

        
      </div>
    </div>
  );
};
