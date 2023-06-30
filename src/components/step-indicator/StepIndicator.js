import React from "react";

import "./StepIndicator.styles.scss";

export const StepIndicator = ({ steps }) => {
  return (
    <div className="step-indicator-container">
      <section className="step-indicator">
        {steps.map((step, i, stepsArr) => (
          <React.Fragment key={i}>
            <div className={`${step.value && "step-active"}  step step1 `}>
              <div className="step-icon">{step.value ? "✓" : "X"}</div>
              <p>{step.text}</p>
              <span>{step.value && step.value.slice(11, 16)}</span>
            </div>
            {i !== stepsArr.length - 1 && (
              <div
                className={`${step.value && "step-active"} indicator-line`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </section>
    </div>
  );
};
