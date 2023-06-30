import React, {
  useContext,
  useReducer,
  useState,
  useMemo,
  useRef,
} from "react";
import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { MyDatepicker } from "../my-datepicker/MyDatepicker";
import Select from "react-select";

import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

export const FormFiltrosGraficas = ({
  options,
  setData,
  optionValue,
  optionText1,
  optionText2,
  label,
  url,
  setDisableTab,
  onlyCalendar,
  urlParam,
  excelBtn,
  excelDocTitle,
}) => {
  const [state, datePickerDispatch] = useReducer(reducer, initialState);
  const [reactSelectForm, setReactSelectForm] = useState([]);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const filtrarBtnRef = useRef(null);
  const filtrarBtnSpinnerRef = useRef(null);
  const descargarExcelBtnRef = useRef(null);
  const descargarExcelBtnSpinnerRef = useRef(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setDisableTab(true);

      filtrarBtnRef.current.classList.add("d-none");
      filtrarBtnSpinnerRef.current.classList.remove("d-none");

      let startDate = "";
      let lastDate = "";

      if (state.startDate && state.endDate) {
        startDate = state.startDate
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-");

        lastDate = state.endDate
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-");
      }

      const indexesArr = [];

      reactSelectForm.forEach((selectedOption) => {
        indexesArr.push(selectedOption.value);
      });

      let data = await fetch(
        `${url}?${urlParam}=${indexesArr.toString()}&start_date=${startDate}&last_date=${lastDate}`,
        {
          headers: {
            Authorization: `Token ${authtoken}`,
          },
        }
      );

      let json = await data.json();

      let newToken = null;

      if (json.expired) {
        newToken = json.token;
        dispatch(setCurrentUser({ token: newToken }));

        data = await fetch(
          `${url}?${urlParam}=${indexesArr.toString()}&start_date=${startDate}&last_date=${lastDate}`,
          {
            headers: {
              Authorization: `Token ${newToken}`,
            },
          }
        );

        json = await data.json();
      }

      if (indexesArr.length === 1) {
        setData([json]);
      } else {
        setData(json);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setDisableTab(false);

      filtrarBtnSpinnerRef.current.classList.add("d-none");
      filtrarBtnRef.current.classList.remove("d-none");
    }
  };

  const descargarExcel = async (e) => {
    try {
      e.preventDefault();
      setDisableTab(true);

      descargarExcelBtnRef.current.classList.add("d-none");
      descargarExcelBtnSpinnerRef.current.classList.remove("d-none");

      let startDate = "";
      let lastDate = "";

      if (state.startDate && state.endDate) {
        startDate = state.startDate
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-");

        lastDate = state.endDate
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-");
      }

      const indexesArr = [];

      reactSelectForm.forEach((selectedOption) => {
        indexesArr.push(selectedOption.value);
      });

      let data = await fetch(
        `${url}?${
          indexesArr.length > 0 ? `${urlParam}=${indexesArr.toString()}` : ""
        }${
          startDate &&
          lastDate &&
          `&start_date=${startDate}&last_date=${lastDate}`
        }&excel=true`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
        }
      );

      if (data.headers.get("Content-Type") !== "application/ms-excel") {
        let json = await data.json();

        let newToken = null;

        if (json.expired) {
          newToken = json.token;
          dispatch(setCurrentUser({ token: newToken }));

          data = await fetch(
            `${url}${indexesArr.toString()}${
              startDate &&
              lastDate &&
              `&start_date=${startDate}&last_date=${lastDate}`
            }&excel=true`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authtoken}`,
              },
            }
          );
        }
      }

      const blob = await data.blob();
      const blobObj = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobObj;
      a.download = `${excelDocTitle}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setDisableTab(false);
      descargarExcelBtnSpinnerRef.current.classList.add("d-none");
      descargarExcelBtnRef.current.classList.remove("d-none");
    }
  };

  const reactSelectOptions = useMemo(() => {
    if (!options) return [];

    let arr = [];

    options.forEach((option) => {
      const obj = {
        value: option[optionValue],
        label:
          optionText1 && !optionText2
            ? option[optionText1]
            : optionText1 &&
              optionText2 &&
              `${option[optionText1]} ${option[optionText2]}`,
      };

      arr.push(obj);
    });

    return arr;
  }, [options]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-md-flex justify-content-between align-items-center">
        <div className="col-12 col-md-7">
          <MyDatepicker state={state} datePickerDispatch={datePickerDispatch} />
        </div>
      </div>
      <div className="select-and-submit-container">
        {!onlyCalendar && (
          <div className="mt-2">
            <label>{label}:</label>
            <Select
              options={reactSelectOptions}
              closeMenuOnSelect={false}
              isMulti
              components={animatedComponents}
              onChange={(values) => {
                setReactSelectForm(values);
              }}
              placeholder="Selecciona..."
              noOptionsMessage={() => "No hay más opciones"}
            />
          </div>
        )}
        <input
          type="submit"
          value="Filtrar"
          className="btn btn-primary mt-3 form-input"
          ref={filtrarBtnRef}
        />
        <button
          className="btn btn-primary d-none mt-3"
          type="button"
          ref={filtrarBtnSpinnerRef}
          disabled
        >
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Loading...</span>
        </button>
        {excelBtn && (
          <>
            <button
              className="btn btn-success mt-3 ms-3"
              onClick={descargarExcel}
              ref={descargarExcelBtnRef}
            >
              Descargar Excel
            </button>
            <button
              className="btn btn-success d-none mt-3 ms-3"
              type="button"
              ref={descargarExcelBtnSpinnerRef}
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Loading...</span>
            </button>
          </>
        )}
      </div>
    </form>
  );
};
