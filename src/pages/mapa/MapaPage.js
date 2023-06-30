import React, { useContext, useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { markerSvgPaths } from "../../utils/markerSvgPaths";
import { fetchData } from "../../utils/fetchData";
import { getRandomColor } from "../../utils/getRandomColor";

import { MapaGoogle } from "../../components/mapa-google/MapaGoogle";
import { MapaMarker } from "../../components/mapa-marker/MapaMarker";
import { MarkerModal } from "../../components/marker-modal/MarkerModal";
import { AgregarObraAcordeon } from "../../components/agregar-obra-acordeon/AgregarObraAcordeon";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

const mapInitialCoords = {
  lat: 21.121192,
  lng: -101.6847947,
};

let marker;

export const MapaPage = () => {
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState(mapInitialCoords);

  const [fetchedData, setFetchedData] = useState({});
  const [asesores, setAsesores] = useState([]);
  const [obras, setObras] = useState([]);
  const [obraSeleccionada, setObraSeleccionada] = useState({});
  const [nuevaObraPosicion, setNuevaObraPosicion] = useState({
    latitud: "",
    longitud: "",
  });
  const [show, setShow] = useState(false);
  const [colores, setColores] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const añoObraRef = useRef();
  const mesObraRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [map, setMap] = useState();

  const fetchMaps = async (url, isFilter = false) => {
    if (!isFilter) {
      setIsLoading(true);
    }
    const data = await fetchData(url, authtoken, dispatch, setCurrentUser);

    setFetchedData(data);
    setObras(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMaps(
      process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api_comercializacion/maps/"
    );
  }, []);

  useEffect(() => {
    const arr = [];

    if (fetchedData.results) {
      fetchedData.results.forEach((result) => {
        if (!arr.includes(result.nombre_asesor)) {
          arr.push(result.nombre_asesor);
        }
      });
    }

    setAsesores([...arr]);
  }, [fetchedData]);

  useEffect(() => {
    const obj = {};

    asesores.forEach((asesor) => {
      obj[asesor] = getRandomColor();
    });

    setColores(obj);
  }, [asesores]);

  const agregarObra = () => {
    if (!nuevaObraPosicion.latitud && !nuevaObraPosicion.longitud) {
      const coord = { lat: 21.121192, lng: -101.6847947 };
      marker = new window.google.maps.Marker({
        position: coord,
        map: map,
        draggable: true,
      });

      setNuevaObraPosicion({
        latitud: coord.lat,
        longitud: coord.lng,
      });
    } else {
      marker = new window.google.maps.Marker({
        position: {
          lat: nuevaObraPosicion.latitud,
          lng: nuevaObraPosicion.longitud,
        },
        map: map,
        draggable: true,
      });
    }

    marker.addListener("dragend", (e) => {
      setNuevaObraPosicion({
        latitud: marker.getPosition().lat(),
        longitud: marker.getPosition().lng(),
      });
    });
  };

  const eliminarObra = () => {
    marker.setMap(null);
  };

  const filtrarObras = async (e) => {
    e.preventDefault();

    fetchMaps(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/maps/?mes=${mesObraRef.current.value}&anio=${añoObraRef.current.value}`,
      true
    );
  };

  const descargarExcel = async () => {
    let json = null;

    let blob = null;

    let response = await fetch(
      `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/maps/excel/?mes=${mesObraRef.current.value}&anio=${añoObraRef.current.value}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authtoken}`,
        },
      }
    );

    if (response.headers.get("Content-Type") !== "application/ms-excel") {
      json = await response.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        response = await fetch(

          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_comercializacion/maps/excel/?mes=${mesObraRef.current.value}&anio=${añoObraRef.current.value}`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${json.token}`,
            },
          }
        );
      }
    }

    blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Obras_mapa.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      {obraSeleccionada.id && (
        <MarkerModal
          show={show}
          handleClose={handleClose}
          obraSeleccionada={obraSeleccionada}
          setObras={setObras}
          setObraSeleccionada={setObraSeleccionada}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-end justify-content-between  mb-3">
            <div className="mb-3 mb-md-0">
              <button className="btn btn-success" onClick={descargarExcel}>
                Descargar Excel
              </button>
            </div>
            <form
              className="d-flex w-auto justify-content-center"
              onSubmit={filtrarObras}
            >
              <div className="">
                <label htmlFor="añoObra" className="form-label">
                  Año:
                </label>
                <input
                  type="number"
                  id="añoObra"
                  defaultValue="2022"
                  className="form-control"
                  min="2000"
                  max="2100"
                  minLength={4}
                  maxLength={4}
                  ref={añoObraRef}
                  onWheel={(e) => {
                    e.target.blur();
                  }}
                />
              </div>

              <div className="mx-3">
                <label htmlFor="mesObra" className="form-label">
                  Mes:
                </label>
                <select
                  name=""
                  id="mesObra"
                  className="form-select"
                  ref={mesObraRef}
                >
                  <option value="">Todos</option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
              <div className=" d-flex align-items-end">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Filtrar"
                />
              </div>
            </form>
          </div>
          <div className="mb-3">
            <AgregarObraAcordeon
              agregarObra={agregarObra}
              eliminarObra={eliminarObra}
              nuevaObraPosicion={nuevaObraPosicion}
              setNuevaObraPosicion={setNuevaObraPosicion}
              setObras={setObras}
            />
          </div>
          <div className="d-flex flex-column flex-md-row">
            <div className="mapa-asesores-container d-flex justify-content-center mb-3 mt-md-0 ">
              <div className="me-0 me-md-3 text-dark">
                <div className="text-center">Asesores</div>
                <ul className="d-flex flex-column list-group w-100">
                  {asesores.map((asesor, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex align-items-center text-dark"
                    >
                      <div
                        className="bullet-list-asesor m-1"
                        style={{
                          backgroundColor: colores[asesor] || "rgb(0,0,0)",
                        }}
                      ></div>
                      <span>{asesor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Wrapper
              apiKey={"AIzaSyADAJWSaibbmdeDcVeLtFacprQ0VGSE0Io"}
              render={LoadingSpinner}
            >
              <MapaGoogle center={center} zoom={zoom} map={map} setMap={setMap}>
                {obras.map((obra, i) => (
                  <MapaMarker
                    key={i}
                    handleShow={handleShow}
                    setObraSeleccionada={setObraSeleccionada}
                    obra={obra}
                    position={{
                      lat: Number(obra.latitud),
                      lng: Number(obra.longitud),
                    }}
                    icon={{
                      path:
                        obra.estado === "Activa"
                          ? markerSvgPaths.pathPinActive
                          : obra.estado === "Pendiente"
                          ? markerSvgPaths.pathPinGuion
                          : obra.estado === "Ganada"
                          ? markerSvgPaths.pathPinStar
                          : markerSvgPaths.pathPinFail,
                      fillColor: colores[obra.nombre_asesor],
                      fillOpacity: 1,
                      strokeWeight: 0,
                      rotation: 0,
                      scale: obra.estado === "Activa" ? 1.7 : 0.09,
                    }}
                  />
                ))}
              </MapaGoogle>
            </Wrapper>
          </div>
        </>
      )}
    </>
  );
};
