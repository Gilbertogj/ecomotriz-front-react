import React from "react";

export const CustomSelect = ({
  datos,
  handleChange,
  selectRef,
  isRequired,
  form,
}) => {
  return (
    <>
      <label htmlFor={datos.id} className="form-label">
        {datos.label}:{" "}
      </label>
      <select
        id={datos.id}
        name={datos.name}
        onChange={handleChange}
        ref={selectRef}
        required={isRequired}
        value={form && form[datos.name]}
        className="form-select"
      >
        {datos.opciones.map((opcion, i) => (
          <option key={i} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
    </>
  );
};
