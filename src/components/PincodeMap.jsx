import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Papa from "papaparse";

const PincodeMap = ({ pincode }) => {
  const [postOffices, setPostOffices] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Parse the CSV file and filter data by pincode
    const fetchPostOffices = async () => {
      try {
        const response = await fetch("/pincode-csv.csv"); // Adjust path to your CSV file
        const csvText = await response.text();

        // Use PapaParse to parse the CSV
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const filteredOffices = result.data.filter(
              (office) => office.Pincode === pincode
            );
            setPostOffices(filteredOffices);
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV file:", error);
      }
    };

    fetchPostOffices();
  }, [pincode]);

  useEffect(() => {
    if (map || postOffices.length === 0) return;

    // Initialize the map
    const initMap = L.map("map").setView(
      [
        postOffices[0]?.Latitude || 20.5937,
        postOffices[0]?.Longitude || 78.9629,
      ],
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
      postOffices.forEach((office) => {
        if (office.Latitude && office.Longitude) {
          L.marker([parseFloat(office.Latitude), parseFloat(office.Longitude)])
            .addTo(map)
            .bindPopup(
              `<b>${office.OfficeName}</b><br>Type: ${office.OfficeType}<br>State: ${office.StateName}`
            );
        }
      });
    }
  }, [map, postOffices]);

  return (
    <div className="flex items-center justify-center">
      {postOffices.length > 0 ? (
        <div id="map" style={{ height: "50vh", width: "100%" }} />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default PincodeMap;
