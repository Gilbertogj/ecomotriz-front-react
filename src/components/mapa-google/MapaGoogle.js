import React, { useRef, useState, useEffect } from "react";

export const MapaGoogle = ({ center, zoom, children, map, setMap }) => {
  const mapRef = useRef(null);
  /* const [map, setMap] = useState(); */

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, { center, zoom }));
    }
  }, [mapRef, map]);

  return (
    <>
      <div ref={mapRef} className="mapa" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};
