import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import {
  getAgeGroups,
  getPopulationByGender,
  getPopulationByIncome,
  getOccupationDistribution,
  demographicData,
} from "../util/data";
import "tailwindcss/tailwind.css";
import HeatMap from "react-heatmap-grid";
import { useTranslation } from "react-i18next";
import { UserData } from "../context/UserContext";

// Registering necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const DemographicDisplay = () => {
  const [openModal, setOpenModal] = useState(null);
  const { t } = useTranslation();
  const { getFontClass } = UserData();
  const ageGroups = getAgeGroups();
  const populationByGender = getPopulationByGender();
  const populationByIncome = getPopulationByIncome();
  const occupationDistribution = getOccupationDistribution();

  // Data for Bar Chart (Age vs Gender vs Population)
  const genderPopulationData = {
    labels: ageGroups,
    datasets: [
      {
        label: "Male",
        data: ageGroups.map((age) => populationByGender.Male[age] || 0),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Female",
        data: ageGroups.map((age) => populationByGender.Female[age] || 0),
        backgroundColor: "#FF5722",
      },
    ],
  };

  // Data for Pie Chart (Income Level vs Population)
  const incomeData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Income Distribution",
        data: populationByIncome.map((item) => item.population),
        backgroundColor: ["#FFEB3B", "#03A9F4", "#8BC34A"],
      },
    ],
  };

  // Data for Bar Chart (Occupation vs Population)
  const occupationData = {
    labels: ["Business", "Salaried", "Farmer"],
    datasets: [
      {
        label: "Occupation Distribution",
        data: occupationDistribution.map((item) => item.population),
        backgroundColor: ["#FF9800", "#2196F3", "#4CAF50"],
      },
    ],
  };

  // Data for Line Chart (Population Trend by Age)
  const populationTrendData = {
    labels: ageGroups,
    datasets: [
      {
        label: "Population Trend",
        data: ageGroups.map(
          (age) =>
            populationByGender.Male[age] + populationByGender.Female[age] || 0
        ),
        borderColor: "#2196F3",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Data for Bar Chart: Population by Occupation (Gender split)
  const occupationByGenderData = {
    labels: ["Business", "Salaried", "Farmer"],
    datasets: [
      {
        label: "Male",
        data: ["Business", "Salaried", "Farmer"].map((occupation) => {
          const population = demographicData
            .filter((d) => d.gender === "Male" && d.occupation === occupation)
            .reduce((acc, curr) => acc + curr.population, 0);
          return population || 0;
        }),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Female",
        data: ["Business", "Salaried", "Farmer"].map((occupation) => {
          const population = demographicData
            .filter((d) => d.gender === "Female" && d.occupation === occupation)
            .reduce((acc, curr) => acc + curr.population, 0);
          return population || 0;
        }),
        backgroundColor: "#FF5722",
      },
    ],
  };

  // Data for Heatmap (Population distribution by Age, Income, Occupation)
  const heatmapValues = ["Low", "Medium", "High"].map((income) =>
    ageGroups.map((age) => {
      return ["Business", "Salaried", "Farmer"].reduce((total, occupation) => {
        const population = demographicData
          .filter(
            (d) =>
              d.age === age &&
              d.income === income &&
              d.occupation === occupation
          )
          .reduce((acc, curr) => acc + curr.population, 0);
        return total + population;
      }, 0);
    })
  );

  // Function to close the modal
  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <div
      className={`w-full flex flex-col items-center gap-3 mt-4 ${getFontClass()}`}
    >
      <div className="w-[90%] bg-secondary border-8 border-primary text-center p-8 text-2xl font-serif rounded-lg cursor-pointer">
        #Visualization
        <br />
        <span className="text-lg text-gray-700">{t("DemoSub")}</span>
      </div>
      {/* Main Grid of Summary Divs */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          className="bg-white border-secondary border-2 p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => setOpenModal("genderPopulation")}
        >
          <h3 className="text-xl font-semibold flex flex-col items-center justify-center text-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="64"
              height="64"
            >
              <circle cx="20" cy="20" r="10" fill="#6ba4ff" />
              <circle cx="44" cy="20" r="10" fill="#ff6b6b" />
              <circle cx="32" cy="44" r="12" fill="#ffd93b" />
            </svg>
            {t("population_age_gender")}
          </h3>
        </div>
        <div
          className="bg-tertiary border-secondary border-2 p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => setOpenModal("incomeDistribution")}
        >
          <h3 className="text-xl font-semibold text-center flex flex-col items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="64"
              height="64"
            >
              <rect x="10" y="30" width="10" height="30" fill="#4caf50" />
              <rect x="25" y="20" width="10" height="40" fill="#ffeb3b" />
              <rect x="40" y="10" width="10" height="50" fill="#f44336" />
            </svg>
            {t("income_level_distribution")}
          </h3>
        </div>
        <div
          className="bg-white border-secondary border-2 p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => setOpenModal("occupationDistribution")}
        >
          <h3 className="text-xl font-semibold flex flex-col items-center justify-center text-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="64"
              height="64"
            >
              <path
                d="M32 2a30 30 0 1 0 30 30A30 30 0 0 0 32 2zm0 56a26 26 0 1 1 26-26 26 26 0 0 1-26 26z"
                fill="#2196f3"
              />
              <path
                d="M32 10a22 22 0 1 0 22 22A22 22 0 0 0 32 10zm0 40a18 18 0 1 1 18-18 18 18 0 0 1-18 18z"
                fill="#4caf50"
              />
              <path
                d="M32 18a14 14 0 1 0 14 14A14 14 0 0 0 32 18zm0 24a10 10 0 1 1 10-10 10 10 0 0 1-10 10z"
                fill="#ffeb3b"
              />
            </svg>
            Month-wise Accounts Opened-Pre-Model vs Post-Model
          </h3>
        </div>
        <div
          className="bg-tertiary border-secondary border-2 p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => setOpenModal("populationTrend")}
        >
          <h3 className="text-xl font-semibold flex flex-col items-center justify-center text-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="64"
              height="64"
            >
              <polyline
                points="10,50 20,40 30,45 40,30 50,35"
                fill="none"
                stroke="#f44336"
                strokeWidth="4"
              />
              <circle cx="10" cy="50" r="2" fill="#f44336" />
              <circle cx="20" cy="40" r="2" fill="#f44336" />
              <circle cx="30" cy="45" r="2" fill="#f44336" />
              <circle cx="40" cy="30" r="2" fill="#f44336" />
              <circle cx="50" cy="35" r="2" fill="#f44336" />
            </svg>
            {t("population_trend_age")}
          </h3>
        </div>
        <div
          className="bg-white border-secondary border-2 p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => setOpenModal("occupationByGender")}
        >
          <h3 className="text-xl font-semibold text-center flex flex-col items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="64"
              height="64"
            >
              <circle cx="20" cy="20" r="10" fill="#6ba4ff" />
              <text x="20" y="25" fontSize="10" textAnchor="middle" fill="#fff">
                M
              </text>
              <circle cx="44" cy="20" r="10" fill="#ff6b6b" />
              <text x="44" y="25" fontSize="10" textAnchor="middle" fill="#fff">
                F
              </text>
              <rect x="15" y="35" width="10" height="15" fill="#6ba4ff" />
              <rect x="39" y="35" width="10" height="15" fill="#ff6b6b" />
            </svg>
            {t("population_occupation_gender_split")}
          </h3>
        </div>
        <div
          className="bg-tertiary border-secondary border-2 p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => setOpenModal("heatmap")}
        >
          <h3 className="text-xl font-semibold text-center flex flex-col items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="64"
              height="64"
            >
              <rect x="5" y="5" width="18" height="18" fill="#ff6b6b" />
              <rect x="23" y="5" width="18" height="18" fill="#ffd93b" />
              <rect x="41" y="5" width="18" height="18" fill="#6ba4ff" />
              <rect x="5" y="23" width="18" height="18" fill="#ffd93b" />
              <rect x="23" y="23" width="18" height="18" fill="#6ba4ff" />
              <rect x="41" y="23" width="18" height="18" fill="#ff6b6b" />
              <rect x="5" y="41" width="18" height="18" fill="#6ba4ff" />
              <rect x="23" y="41" width="18" height="18" fill="#ff6b6b" />
              <rect x="41" y="41" width="18" height="18" fill="#ffd93b" />
            </svg>
            Scheme-Specific Conversion Rates-Pre-Model vs Post-Model
          </h3>
        </div>
      </div>

      {/* Modal with Blur Background */}
      {openModal && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-secondary border-2 border-primary p-6 rounded-lg shadow-lg flex flex-col gap-2 items-center justify-center w-[70vw] h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {openModal === "genderPopulation" && t("population_age_gender")}
                {openModal === "incomeDistribution" &&
                  t("income_level_distribution")}
                {openModal === "occupationDistribution" &&
                  "Month-wise Accounts Opened-Pre-Model vs Post-Model"}
                {openModal === "populationTrend" && t("population_trend_age")}
                {openModal === "occupationByGender" &&
                  t("population_occupation_gender_split")}
                {openModal === "heatmap" &&
                  "Scheme-Specific Conversion Rates-Pre-Model vs Post-Model"}
              </h3>
              <button
                className="text-xl font-semibold text-gray-700"
                onClick={closeModal}
              >
                X
              </button>
            </div>

            {/* Render the correct chart/modal content */}
            {openModal === "genderPopulation" && (
              <Bar data={genderPopulationData} options={{ responsive: true }} />
            )}
            {openModal === "incomeDistribution" && (
              <Pie data={incomeData} options={{ responsive: true }} />
            )}
            {openModal === "occupationDistribution" && (
              <div className="w-full h-full">
                <img src="/month_wise.jpg" alt="" className="w-full h-[80%]" />
              </div>
            )}
            {openModal === "populationTrend" && (
              <Line data={populationTrendData} options={{ responsive: true }} />
            )}
            {openModal === "occupationByGender" && (
              <Bar
                data={occupationByGenderData}
                options={{ responsive: true }}
              />
            )}
            {openModal === "heatmap" && (
              <div className="w-full h-full">
                <img
                  src="/conversion_rate.jpg"
                  alt=""
                  className="w-full h-[80%]"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DemographicDisplay;
