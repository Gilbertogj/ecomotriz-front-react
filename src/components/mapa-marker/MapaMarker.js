import React from "react";

export const MapaMarker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);

      marker.addListener("click", () => {
        options.setObraSeleccionada(options.obra);
        options.handleShow();
      });
    }
  }, [marker, options]);

  return null;
};
