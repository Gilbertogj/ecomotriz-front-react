import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import "./SearchInput.styles.scss";

const initialState = "";

export const SearchInput = ({
  setClientes,
  setPedidos,
  setCotizaciones,
  setProductos,
  setSumaM3,
  setUsuarios,
  url,
  setIsLoading,
  setTotalPedidos,
  setFinalPage,
  setCurrentPage,
  setBusquedaAplicada,
  setFiltrosAplicadosPedidos,
  setFiltrosAplicadosCotizaciones,
  setFiltrosAplicadosUsuarios,
  setFechasFiltroAplicados,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialState);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      let data = await fetch(`${url}${searchTerm}`, {
        headers: {
          Authorization: `Token ${authtoken}`,
        },
      });

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(`${url}${searchTerm}`, {
          headers: {
            Authorization: `Token ${json.token}`,
          },
        });

        json = await data.json();
      }

      if (setClientes) {
        setClientes(json.results);
      } else if (setPedidos) {
        setPedidos(json.results);
      } else if (setCotizaciones) {
        setCotizaciones(json.results);
      } else if (setProductos) {
        setProductos(json.results);
      } else if (setUsuarios) {
        setUsuarios(json.results);
      }
      if (setSumaM3) {
        setSumaM3(json.m3);
      }

      if (setTotalPedidos) {
        setTotalPedidos(json.count);
      }

      setCurrentPage(1);
      setFinalPage(Math.ceil(json.count / 10));

      if (setBusquedaAplicada) {
        setBusquedaAplicada(searchTerm);
      }

      if (setFechasFiltroAplicados) {
        setFechasFiltroAplicados("");
      }

      if (setFiltrosAplicadosPedidos) {
        setFiltrosAplicadosPedidos({
          planta: "",
          estatusPedido: "",
          forma: "",
          usuario: "",
        });
      }
      if (setFiltrosAplicadosCotizaciones) {
        setFiltrosAplicadosCotizaciones({
          fechaElaboracion: "",
          fechaVencimiento: "",
          tipoVenta: "",
          estatus: "",
          asesor: "",
        });
      }
      if (setFiltrosAplicadosUsuarios) {
        setFiltrosAplicadosUsuarios("");
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          placeholder="Buscar..."
          aria-label="Buscar..."
          aria-describedby="basic-addon2"
          type="text"
          name="termino"
          value={searchTerm}
          onChange={handleChange}
          autoComplete="off"
          size="sm"
        />
        <Button type="submit" variant="outline-secondary" id="button-addon2">
          Buscar
        </Button>
      </InputGroup>
    </Form>
  );
};
