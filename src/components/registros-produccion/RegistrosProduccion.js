import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactReduxContext } from "../../context/reactReduxContext";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";
import { setCurrentUser } from "../../redux/user/userSlice";
import { ConfirmModal } from "../confirm-modal/ConfirmModal";

import { FormRegistroProduccion } from "../form-registro-produccion/FormRegistroProduccion";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { TablaRegistrosProduccion } from "../tabla-registros-produccion/TablaRegistrosProduccion";

export const RegistrosProduccion = ({ estatusPedido, pedidoData, setData }) => {
  const [registros, setRegistros] = useState([]);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(false);
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api_produccion/registro_produccion/?pedido=${id}`,
    id
  );

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  useEffect(() => {
    if (data) {
      setRegistros(data.results);
    }
  }, [data]);

  const SumaM3DeRegistrosHechos = useMemo(
    () => registros.reduce((accu, registro) => accu + Number(registro.m3), 0),
    [registros]
  );

  const m3Restantes = useMemo(() => {
    if (Number(pedidoData.m3) - SumaM3DeRegistrosHechos > 0) {
      return Number(pedidoData.m3) - SumaM3DeRegistrosHechos;
    } else {
      return 0;
    }
  }, [SumaM3DeRegistrosHechos, pedidoData.m3]);

  const m3Exedentes = useMemo(() => {
    if (SumaM3DeRegistrosHechos > Number(pedidoData.m3)) {
      return SumaM3DeRegistrosHechos - Number(pedidoData.m3);
    } else {
      return 0;
    }
  }, [SumaM3DeRegistrosHechos, pedidoData.m3]);

  const cerrarPedido = async () => {
    try {
      setDisabledSubmitBtn(true);

      const formData = new FormData();

      formData.append("tiro", true);

      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${id}/update/`,
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
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/pedidos/${id}/update/`,
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
        setShow(false);
        setDisabledSubmitBtn(false);
        setData(json);
      } else if (data.status === 406) {
        alert(json.error);
        setDisabledSubmitBtn(false);
      }
    } catch (error) {
      alert(error);
      console.log(error);
      setDisabledSubmitBtn(false);
    }
  };

  return (
    <div className="mt-3">
      {isLoading ? (
        <LoadingSpinner />
      ) : registros.length !== 0 ? (
        <>
          <ConfirmModal
            text="¿Esta seguro de cerrar el pedido?"
            show={show}
            onHide={handleClose}
            functionRef={cerrarPedido}
          />
          <h5 className="text-center">Registros de Producción</h5>
          <TablaRegistrosProduccion registros={registros} />
          <div className="d-flex justify-content-between">
            <div>
              <p className="my-2">
                <strong className="text-success">
                  M3 restantes: {m3Restantes}
                </strong>
              </p>
              <p className="my-2">
                <strong className="text-danger">
                  M3 exedentes: {m3Exedentes}
                </strong>
              </p>
            </div>

            {!pedidoData.tiro && (
              <button
                className="btn btn-danger align-self-center"
                onClick={handleOpen}
                disabled={disabledSubmitBtn}
              >
                Cerrar Pedido
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-center">
          Este pedido no tiene registros de producción.
        </p>
      )}
      {estatusPedido === "Activado" && !pedidoData.tiro && (
        <>
          <h5 className="text-center">Nuevo registro de producción</h5>
          <FormRegistroProduccion
            setRegistros={setRegistros}
            registros={registros}
          />
        </>
      )}
    </div>
  );
};
