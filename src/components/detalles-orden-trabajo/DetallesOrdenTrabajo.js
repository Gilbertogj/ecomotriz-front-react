import React, { useContext, useEffect, useRef, useState } from "react";

import { useParams, useLocation, useHistory  } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { SuccessModal } from "../success-modal/SuccessModal";
import { CotizacionEdicion } from "../cotizacion-edicion/CotizacionEdicion";
import { CotizacionPreview } from "../cotizacion-preview/CotizacionPreview";
import { OrdenTrabajoPreview } from "../orden-trabajo-preview/OrdenTrabajoPreview";
import { OrdenTrabajoCompras } from "../orden-trabajo-compras/OrdenTrabajoCompras";
import { CotizacionPdfDocument } from "../cotizacion-pdf-document/CotizacionPdfDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toPng } from "html-to-image";

export const DetallesOrdenTrabajo = ({ data }) => {
  console.log(data)
  const [form, setForm] = useState({
    status: data.status,
    // aprobacion: data.aprobacion,
  });
  const [show, setShow] = useState(false);
  const [ordenTrabajoData, setCotizacionData] = useState(data);
  const [editMode, setEditMode] = useState(false);
  const [imgSrcUrl, setImgSrcUrl] = useState("");
  const { pathname } = useLocation();

  const { authtoken, dispatch, userRol } = useContext(ReactReduxContext);

  const history = useHistory();

  const actualizarEstatusBtnRef = useRef();

  // useEffect(() => {
  //   if (!editMode) {
  //     const serviciosEle = document.querySelectorAll(".servicio");

  //     serviciosEle.forEach((servicio) => {
  //       if (
  //         cotizacionData.servicios.includes(
  //           Number(
  //             servicio.classList.value[servicio.classList.value.length - 1]
  //           )
  //         )
  //       ) {
  //         // servicio.classList.add("servicio-activo");
  //         servicio.textContent = servicio.textContent + " ✓";
  //       }
  //     });
  //   }
  // }, [editMode]);

  const handleChange = (e) => {
    actualizarEstatusBtnRef.current.disabled = false;

    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("status", form.status);
    
    let data = await fetch(
      `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/workorders/${ordenTrabajoData.id}/`,
      {
        method: "PATCH",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
        body: formData,
      }
    );

    let json = await data.json();

    if (json.expired) {
      dispatch(setCurrentUser({ token: json.token }));

      data = await fetch(
        `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/core/workorders/${ordenTrabajoData.id}/`,
        {
          method: "PATCH",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Token ${json.token}`,
          },
          body: formData,
        }
      );

      json = await data.json();
    }

    if (data.status === 201 || data.status === 200) {
      setShow(true);
      setCotizacionData(json);
      actualizarEstatusBtnRef.current.disabled = true;
    }
  };

  // const eliminarCotizacion = async (e) => {
  //   try {
  //     const confirm = window.confirm("¿Esta seguro de eliminar la cotización?");

  //     if (!confirm) return;

  //     e.target.disabled = true;
  //     e.target.textContent = "Eliminando...";

  //     let data = await fetch(
  //       `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/${cotizacionData.id}/`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Token ${authtoken}`,
  //         },
  //       }
  //     );

  //     if (data.headers.get("Content-Type") !== null) {
  //       let json = await data.json();

  //       if (json.expired) {
  //         dispatch(setCurrentUser({ token: json.token }));

  //         data = await fetch(
  //           `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/cotizaciones/${cotizacionData.id}/`,
  //           {
  //             method: "DELETE",
  //             headers: {
  //               Authorization: `Token ${json.token}`,
  //             },
  //           }
  //         );
  //       }
  //     }

  //     if (data.status === 204) {
  //       alert("Cotización eliminada correctamente.");
  //       history.push(`/concreco/comercializacion/cotizaciones`);
  //     }
  //     if (data.status === 400) {
  //       alert(JSON.stringify(data.json));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert(error);
  //   } finally {
  //     e.target.textContent = "Eliminar Cotización";
  //     e.target.disabled = false;
  //   }
  // };

  const handleDescargarPdf = async (e) => {
    try {
      e.target.disabled = true;
      e.target.textContent = "Descargando...";

      const toImageNode = document.querySelector(".to-image");

      const imageSrcUrl = await toPng(toImageNode);

      setImgSrcUrl(imageSrcUrl);

      setTimeout(() => {
        document.querySelector(".download-btn").click();
        e.target.textContent = "Descargar PDF";
        e.target.disabled = false;
      }, 3000);
    } catch (error) {
      e.target.textContent = "Descargar PDF";
      e.target.disabled = false;
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      
        <>

                {/* {userRol === "Administracion" && (
                  <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    eliminarCotizacion(e);
                  }}
                >
                  Eliminar Cotización
                </button>
                                
            )} */}



          {/* <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              {editMode ? "Cancelar edición" : "Editar Orden de trabajo"}
            </button>
          
          </div> */}

          {editMode ? (
            <CotizacionEdicion ordenTrabajoData={data} />
          ) : pathname.includes("compras") ? (
            <OrdenTrabajoCompras  
            ordenTrabajoData={ordenTrabajoData}
            form={form}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleDescargarPdf={handleDescargarPdf}
            actualizarEstatusBtnRef={actualizarEstatusBtnRef} />
            // <p>Tabla detalle orden compras 2 </p>
          ) : (
            <>
              <OrdenTrabajoPreview
                ordenTrabajoData={ordenTrabajoData}
                form={form}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                // handleDescargarPdf={handleDescargarPdf}
                actualizarEstatusBtnRef={actualizarEstatusBtnRef}
              />

              {/* <div className="invisible">
                <PDFDownloadLink
                  document={<CotizacionPdfDocument imgSrcUrl={imgSrcUrl} />}
                  fileName={`Cotizacion-${cotizacionData.id}.pdf`}
                >
                  <button className="download-btn">Descargar PDF</button>
                </PDFDownloadLink>
              </div> */}

              <SuccessModal
                show={show}
                handleClose={() => {
                  setShow(false);
                }}
                title="Orden de Trabajo Actualizada"
                text="Se ha actualizado la orden de trabajo correctamente"
              />
            </>
          ) }
        </>
      
    </>
  );
};