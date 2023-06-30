import { toPng } from "html-to-image";

export const graphicsToPdf = async (
  descargarBtnRef,
  spinnerBtnRef,
  setStateFn
) => {
  descargarBtnRef.current.classList.add("d-none");
  spinnerBtnRef.current.classList.remove("d-none");
  const toImageNodes = document.querySelectorAll(".to-image");

  toImageNodes.forEach((node) => {
    if (node.querySelector(".graph-container")) {
      node.querySelector(".graph-container").style.overflow = "hidden";
    }

    if (node.querySelector(".select-and-submit-container")) {
      node
        .querySelector(".select-and-submit-container")
        .classList.add("d-none");
    }
  });

  const imagesSourceUrls = [];

  for (const node of toImageNodes) {
    const imageSrcUrl = await toPng(node);

    imagesSourceUrls.push(imageSrcUrl);
  }

  setStateFn(imagesSourceUrls);

  toImageNodes.forEach((node) => {
    if (node.querySelector(".graph-container")) {
      node.querySelector(".graph-container").style.overflow = "auto";
    }

    if (node.querySelector(".select-and-submit-container")) {
      node
        .querySelector(".select-and-submit-container")
        .classList.remove("d-none");
    }
  });

  setTimeout(() => {
    document.querySelector(".download-btn").click();
    spinnerBtnRef.current.classList.add("d-none");
    descargarBtnRef.current.classList.remove("d-none");
  }, 3000);
};
