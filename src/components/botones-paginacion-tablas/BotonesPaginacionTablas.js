import React from "react";

export const BotonesPaginacionTablas = ({
  currentPage,
  finalPage,
  changePage,
}) => {
  return (
    <div className="text-center mt-3 d-flex  justify-content-center">
      <div className="paginacion-btns-container">
        <button
          className={`${
            currentPage > 4 ? "visible" : "invisible"
          } btn btn-outline-primary btn-sm`}
          onClick={() => changePage(-(currentPage - 1))}
        >
          1
        </button>

        <span className={`${currentPage > 4 ? "visible" : "invisible"}`}>
          ...
        </span>

        <button
          className={`${
            currentPage - 3 > 0 ? "visible" : "invisible"
          } btn btn-outline-primary btn-sm`}
          onClick={() => changePage(-3)}
        >
          {currentPage - 3}
        </button>

        <button
          className={`${
            currentPage - 2 > 0 ? "visible" : "invisible"
          } btn btn-outline-primary btn-sm`}
          onClick={() => changePage(-2)}
        >
          {currentPage - 2}
        </button>

        <button
          className={`${
            currentPage - 1 > 0 ? "visible" : "invisible"
          } btn btn-outline-primary btn-sm`}
          onClick={() => changePage(-1)}
        >
          {currentPage - 1}
        </button>

        <button className="btn btn-primary pe-none btn-sm">
          {currentPage}
        </button>

        <button
          className={`${
            currentPage + 1 <= finalPage ? "visible" : "invisible"
          } btn btn-outline-primary btn-sm`}
          onClick={() => changePage(1)}
        >
          {currentPage + 1}
        </button>

        <button
          className={`${
            currentPage + 2 <= finalPage ? "visible" : "invisible"
          } btn btn-outline-primary btn-sm`}
          onClick={() => changePage(2)}
        >
          {currentPage + 2}
        </button>

        <button
          className={`${
            currentPage + 3 <= finalPage ? "visible" : "invisible"
          } btn btn-outline-primary btn-sm`}
          onClick={() => changePage(3)}
        >
          {currentPage + 3}
        </button>

        <span
          className={`${
            currentPage + 4 <= finalPage ? "visible" : "invisible"
          }`}
        >
          ...
        </span>

        <button
          className={`${
            currentPage + 4 <= finalPage ? "visible" : "invisible"
          } btn btn-outline-primary btn-sm`}
          onClick={() => changePage(finalPage - currentPage)}
        >
          {finalPage}
        </button>
      </div>
    </div>
  );
};
