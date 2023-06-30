import React, { useContext, useState } from "react";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";
import { fetchData } from "../../utils/fetchData";

export const FormFiltrosUsuarios = ({
  setUsuarios,
  setCurrentPage,
  setFinalPage,
  setBusquedaAplicada,
  setFiltrosAplicadosUsuarios,
  setIsLoading,
}) => {
  const [tipoUsuario, setTipoUsuario] = useState("");

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const fetchedData = await fetchData(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/users/?tipo_usuario=${tipoUsuario}`,
        authtoken,
        dispatch,
        setCurrentUser
      );

      setUsuarios(fetchedData.results);

      setCurrentPage(1);
      setFinalPage(Math.ceil(fetchedData.count / 10));

      if (setBusquedaAplicada) {
        setBusquedaAplicada("");
      }
      setFiltrosAplicadosUsuarios(tipoUsuario);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setTipoUsuario(e.target.value);
  };

  return (
    <form
      className="d-flex justify-content-between align-items-end mb-3"
      onSubmit={handleSubmit}
    >
      <div className="col-6 col-md-3">
        <label htmlFor="tipo-usuario" className="form-label">
          Tipo de usuario
        </label>
        <select
          id="tipo-usuario"
          name="planta"
          className="form-select"
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="Administracion">Administración</option>
          <option value="Ventas">Ventas</option>
          <option value="Produccion">Producción</option>
          <option value="Dosificador">Dosificador</option>
          <option value="Ollero">Ollero</option>
          <option value="Operador">Operador</option>
        </select>
      </div>
      <input type="submit" value="Filtrar" className="btn btn-primary" />
    </form>
  );
};
