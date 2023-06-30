import React, { useEffect } from "react";
import { DateRangeInput } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";

import { useIsDesktop } from "../../hooks/useIsDesktop";

export const MyDatepicker = ({ state, datePickerDispatch }) => {
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const calendarStartDateInputs =
      document.querySelectorAll("#startDateInput");
    const calendarEndDateInputs = document.querySelectorAll("#endDateInput");

    calendarStartDateInputs.forEach((input) => {
      input.placeholder = "Desde";
    });

    calendarEndDateInputs.forEach((input) => {
      input.placeholder = "Hasta";
    });
  }, []);

  return (
    <div className="calendar-container">
      <label className="form-label">Fechas:</label>

      <ThemeProvider
        theme={{
          reactDatepicker: {
            daySize: [36],
            fontFamily: "Mulish, system-ui, -apple-system",
            colors: {
              accessibility: "#000000",
              selectedDay: "#0D6EFD",
              selectedDayHover: "#4790fc",
              primaryColor: "#212C56",
            },
            inputLabelDisplay: "true",
          },
        }}
      >
        <DateRangeInput
          onDatesChange={(data) => {
            return datePickerDispatch({ type: "dateChange", payload: data });
          }}
          onFocusChange={(focusedInput) =>
            datePickerDispatch({ type: "focusChange", payload: focusedInput })
          }
          startDate={state.startDate}
          endDate={state.endDate}
          focusedInput={state.focusedInput}
          vertical={isDesktop ? false : true}
          displayFormat="yyyy/MM/dd"
          phrases={{
            datepickerStartDatePlaceholder: "Desde",
            datepickerEndDatePlaceholder: "Hasta",
          }}
          startDateInputId="startDateInput"
          endDateInputId="endDateInput"
          numberOfMonths={isDesktop ? 2 : 1}
        />
      </ThemeProvider>
    </div>
  );
};
