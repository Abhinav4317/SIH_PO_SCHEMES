import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  getPMOPlaces,
  getStateGeneralPlaces,
  getBhopalHQPlaces,
  getGwaliorPlaces,
  getIndorePlaces,
  getDistrictPlaces,
} from "../util/filterUtils";
import toast from "react-hot-toast";
import axios from "axios";
import { feedback_server } from "../main";
import TargetsBarChart from "./TargetBarcHarts";

const savingsSchemes = [
  "Savings Account",
  "Recurring Deposit",
  "Time Deposit",
  "Monthly Income Scheme",
  "Public Provident Fund",
  "Senior Citizen Savings Scheme",
  "Kisan Vikas Patra",
  "National Savings Certificate",
  "Sukanya Samriddhi Yojana",
];

const insuranceSchemes = {
  pli: [
    "Whole Life Assurance",
    "Endowment Assurance",
    "Convertible Whole Life",
    "Anticipated Endowment Assurance",
    "Joint Life Assurance",
  ],
  rpli: [
    "Gram Suraksha",
    "Gram Santosh",
    "Gram Suvidha",
    "Gram Sumangal",
    "Gram Priya",
  ],
};

const RoleBasedPlaces = ({ role }) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(""); // Selected place
  const [targets, setTargets] = useState([]); // Target values for schemes as strings
  const [currentTargets, setCurrentTargets] = useState([]);
  // Initialize targets array with default values as strings
  const initializeTargets = () => {
    const allSchemes = [
      ...savingsSchemes.map((scheme) => ({ name: scheme, target: "" })),
      ...insuranceSchemes.pli.map((scheme) => ({
        name: `PLI - ${scheme}`,
        target: "",
      })),
      ...insuranceSchemes.rpli.map((scheme) => ({
        name: `RPLI - ${scheme}`,
        target: "",
      })),
    ];
    setTargets(allSchemes);
  };

  // Load and parse CSV using PapaParse
  const loadDataset = async () => {
    try {
      const filePath = "/dataset_all_po.csv"; // Update path if needed
      const response = await fetch(filePath);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setFilteredPlaces(result.data);
        },
      });
    } catch (error) {
      toast.error("Error loading dataset");
      console.error(error);
    }
  };

  // Function to set filtered places based on role
  const setFilteredPlaces = (data) => {
    switch (role) {
      case "PMO":
        setPlaces(getPMOPlaces(data));
        break;
      case "State General":
        setPlaces(getStateGeneralPlaces(data, "MADHYA PRADESH"));
        break;
      case "Bhopal HQ":
        setPlaces(getBhopalHQPlaces(data, "MADHYA PRADESH", "Bhopal HQ"));
        break;
      case "Gwalior":
        setPlaces(getGwaliorPlaces(data, "MADHYA PRADESH", "Gwalior"));
        break;
      case "Indore":
        setPlaces(getIndorePlaces(data, "MADHYA PRADESH", "Indore"));
        break;
      case "District":
        setPlaces(
          getDistrictPlaces(data, "MADHYA PRADESH", "Bhopal HQ", "Bhopal")
        );
        break;
      default:
        setPlaces([]);
        break;
    }
  };

  const handleTargetChange = (index, value) => {
    const updatedTargets = [...targets];
    updatedTargets[index].target = value; // Store as string
    setTargets(updatedTargets);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPlace === "" || targets.length === 0) {
      toast.error("Please enter all necessary fields").return;
    }
    try {
      const response = await axios.post(`${feedback_server}/api/saveTarget`, {
        place: selectedPlace,
        targets,
      });
      toast.success("Targets set successfully!")
      setTargets([]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadDataset();
    initializeTargets();
  }, [role]);
  const getPlaceName = (role) => {
    switch (role) {
      case "PMO":
        return "";
      case "State General":
        return "MADHYA PRADESH";
      case "Bhopal HQ":
        return "Bhopal HQ";
      case "Gwalior":
        return "Gwalior";
      case "Indore":
        return "Indore";
      case "District":
        return "Bhopal";
      default:
        return "";
    }
  };
  useEffect(() => {
    if (role === "PMO") return;
    axios
      .get(`${feedback_server}/api/getTarget/${getPlaceName(role)}`)
      .then((response) => {
        setCurrentTargets(response?.data[0].targets);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* <h2 className="text-xl font-bold mb-4 text-center">Role: {role}</h2> */}
      {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-2">
        {currentTargets.length && <h1>Current Targets are as follows:</h1>}
        {currentTargets.length &&
          currentTargets.map((curTarget, idx) => (
            <div key={idx} className="p-6 bg-secondary flex gap-2 rounded-lg">
              <h1>{curTarget.name}:</h1>
              <h1>{curTarget.target}</h1>
            </div>
          ))}
      </div> */}
      <h2 className="mx-auto w-[30%] rounded-xl text-xl font-bold mb-4 text-center font-serif mt-4 p-4 bg-secondary border-4 border-primary">
        CURRENT TRENDS:
      </h2>
      <div className="w-full flex gap-2">
        <div className="w-1/2">
          <img src="/trend1.jpg" alt="" />
        </div>
        <div className="w-1/2">
          <img src="/trend2.jpg" alt="" />
        </div>
      </div>
      <h2 className="mx-auto w-[30%] rounded-xl text-xl font-bold mb-4 text-center font-serif mt-4 p-4 bg-secondary border-4 border-primary">
        CURRENTLY ALLOTTED TARGETS:
      </h2>
      <TargetsBarChart targets={currentTargets} />
      {/* Dropdown for Places */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select Place:</label>
        <select
          value={selectedPlace}
          onChange={(e) => setSelectedPlace(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="" disabled>
            -- Choose a Place --
          </option>
          {places.map((place, index) => (
            <option key={index} value={place}>
              {place}
            </option>
          ))}
        </select>
      </div>
      <h2 className="mx-auto w-[30%] rounded-xl text-xl font-bold mb-4 text-center font-serif mt-4 p-4 bg-primary border-4 border-secondary">
        SET YOUR OWN TARGETS:
      </h2>
      {/* Display Targets Input for Schemes */}
      <div className="bg-secondary border-2 border-primary p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Set Targets for Schemes:</h3>
        {targets.map((scheme, index) => (
          <div key={index} className="flex items-center mb-2">
            <label className="w-1/2">{scheme.name}:</label>
            <input
              type="text"
              value={scheme.target||0} // Use string value
              onChange={(e) => handleTargetChange(index, e.target.value)}
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-black w-full py-2 px-4 text-center text-white rounded-xl mt-2"
      >
        Submit
      </button>
      {/* Display Selected Place and Targets */}
      {/* <div className="mt-6">
        <h3 className="font-bold">Selected Place:</h3>
        <p>{selectedPlace || "No place selected"}</p>

        <h3 className="font-bold mt-4">Scheme Targets:</h3>
        <ul>
          {targets.map((scheme, index) => (
            <li key={index}>
              {scheme.name}: {scheme.target || "0"}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default RoleBasedPlaces;
