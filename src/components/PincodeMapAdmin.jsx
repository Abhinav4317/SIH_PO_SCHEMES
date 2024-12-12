import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PincodeMapAdmin = ({ postOffices }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map || postOffices.length === 0) return;
    // Initialize the map
    const validOffices = postOffices.filter(
      (office) =>
        office.Latitude &&
        office.Longitude &&
        !isNaN(parseFloat(office.Latitude)) &&
        !isNaN(parseFloat(office.Longitude))
    );

    const initMap = L.map("map").setView(
      validOffices.length > 0
        ? [
            parseFloat(validOffices[0].Latitude),
            parseFloat(validOffices[0].Longitude),
          ]
        : [20.5937, 78.9629], // Default India center
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(initMap);

    setMap(initMap);
  }, [postOffices]);

  useEffect(() => {
    if (map) {
      // Add markers to the map
      postOffices
        .filter(
          (office) =>
            office.Latitude &&
            office.Longitude &&
            !isNaN(parseFloat(office.Latitude)) &&
            !isNaN(parseFloat(office.Longitude))
        )
        .forEach((office) => {
          L.marker([parseFloat(office.Latitude), parseFloat(office.Longitude)])
            .addTo(map)
            .bindPopup(
              `<b>${office.OfficeName}</b><br>Type: ${office.OfficeType}<br>State: ${office.StateName}`
            );
        });
    }
  }, [map, postOffices]);

  return (
    <div className="flex items-center justify-center mt-2">
      {postOffices.length > 0 ? (
        <div
          id="map"
          className="rounded-2xl mt-2"
          style={{ height: "60vh", width: "100%", zIndex: 0 }}
        />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default PincodeMapAdmin;
