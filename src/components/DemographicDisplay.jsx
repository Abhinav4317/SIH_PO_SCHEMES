import React from "react";
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
        backgroundColor: "#FF9800",
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

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Bar Chart: Age vs Gender vs Population */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">
            Population by Age and Gender
          </h3>
          <Bar data={genderPopulationData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart: Income Level Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">
            Income Level Distribution
          </h3>
          <Pie data={incomeData} options={{ responsive: true }} />
        </div>

        {/* Bar Chart: Occupation Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">
            Occupation Distribution
          </h3>
          <Bar data={occupationData} options={{ responsive: true }} />
        </div>

        {/* Line Chart: Population Trend by Age */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">
            Population Trend by Age
          </h3>
          <Line data={populationTrendData} options={{ responsive: true }} />
        </div>

        {/* Bar Chart: Population by Occupation (Gender split) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">
            Population by Occupation (Gender Split)
          </h3>
          <Bar data={occupationByGenderData} options={{ responsive: true }} />
        </div>

        {/* Heatmap: Population by Age, Income, and Occupation */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">
            Heatmap: Population by Age, Income, and Occupation
          </h3>
          <HeatMap
            xLabels={ageGroups}
            yLabels={["Low", "Med", "High"]}
            data={heatmapValues}
            height={30}
            width={60}
            cellStyle={(background, value) => ({
              background: `rgba(0, 255 , 0, ${value / 3000})`,
              border: "1px solid rgba(0, 0, 0, 0.1)",
            })}
            cellRender={(value) => (value ? `${value}` : "0")}
          />
        </div>
      </div>
    </div>
  );
};

export default DemographicDisplay;
