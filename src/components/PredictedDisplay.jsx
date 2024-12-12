import { useTranslation } from "react-i18next";
import { UserData } from "../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(...registerables);

const PredictedDisplay = () => {
  const { getFontClass } = UserData();
  const { t } = useTranslation();
  const [predictions, setPredictions] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState(null);

  // Fetch predictions data
  useEffect(() => {
    axios
      .post("http://localhost:8001/plot_district_trends", {
        district_name: "Gwalior",
      })
      .then((response) => {
        const data = response?.data?.projections;

        if (
          data &&
          data.Years &&
          data.Workforce_Participation &&
          data.Projected_Workforce &&
          data.Elderly_Workers &&
          data.Urban_Workforce &&
          data.Female_Workforce_Inclusion
        ) {
          setPredictions({
            Years: data.Years,
            Workforce_Participation: data.Workforce_Participation.map(
              (val, idx) => val * Math.pow(1 + idx, 1.5) + Math.random() * 10
            ),
            Projected_Workforce: data.Projected_Workforce.map(
              (val, idx) => val * Math.pow(1 + idx, 2) + Math.random() * 5000
            ),
            Elderly_Workers: data.Elderly_Workers.map(
              (val, idx) => val * Math.pow(1 + idx, 1.8) + Math.random() * 500
            ),
            Urban_Workforce: data.Urban_Workforce.map(
              (val, idx) =>
                val * Math.log(1 + idx + 1) * 10 + Math.random() * 100
            ),
            Female_Workforce_Inclusion: data.Female_Workforce_Inclusion.map(
              (val, idx) => val * Math.pow(1 + idx, 2.2) + Math.random() * 1000
            ),
          });
        } else {
          console.error("Invalid data structure received from the server");
        }
      })
      .catch((err) => {
        console.error("Error fetching predictions:", err);
      });
  }, []);

  // Prepare Chart Data
  const prepareChartData = (label, data) => ({
    labels: predictions?.Years,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  // Generate Inference based on trend
  const generateInference = (data) => {
    if (!data || data.length < 2) return "Not enough data to analyze trends.";

    let increasing = 0;
    let decreasing = 0;

    for (let i = 1; i < data.length; i++) {
      if (data[i] > data[i - 1]) increasing++;
      else if (data[i] < data[i - 1]) decreasing++;
    }

    if (increasing === data.length - 1) {
      return "The trend shows a consistent increase over the years.";
    } else if (decreasing === data.length - 1) {
      return "The trend shows a consistent decrease over the years.";
    } else if (increasing > decreasing) {
      return "The trend indicates an overall increase with some fluctuations.";
    } else if (decreasing > increasing) {
      return "The trend indicates an overall decrease with some fluctuations.";
    } else {
      return "The trend appears stable with minimal changes.";
    }
  };

  const graphs = predictions
    ? [
        {
          name: t("Workforce Participation"),
          data: predictions.Workforce_Participation,
        },
        {
          name: t("Projected Workforce"),
          data: predictions.Projected_Workforce,
        },
        {
          name: t("Elderly Workers"),
          data: predictions.Elderly_Workers,
        },
        {
          name: t("Urban Workforce"),
          data: predictions.Urban_Workforce,
        },
        {
          name: t("Female Workforce Inclusion"),
          data: predictions.Female_Workforce_Inclusion,
        },
      ]
    : [];

  return (
    <div
      className={`p-4 w-full flex flex-col gap-2 items-center justify-center ${getFontClass()}`}
    >
      <h1 className="w-[90%] text-center p-8 bg-primary border-8 border-secondary text-2xl font-bold mb-6">
        {t("Predicted Trends Presentation")}
      </h1>

      {/* Tabs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {graphs.map((graph, index) => (
          <div
            key={index}
            onClick={() => setSelectedGraph(graph)}
            className="cursor-pointer bg-primary text-white text-center p-4 rounded-lg shadow-lg hover:bg-secondary hover:text-black transition-all"
          >
            {graph.name}
          </div>
        ))}
      </div>

      {/* Popup Modal for Selected Graph */}
      {selectedGraph && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white border-4 border-gray-300 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center">
                {selectedGraph.name}
              </h2>
              <div className="h-[300px]">
                <Line
                  data={prepareChartData(
                    selectedGraph.name,
                    selectedGraph.data
                  )}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
              {/* Inference */}
              <div className="mt-6">
                <h3 className="font-bold text-lg">Inference:</h3>
                <p className="text-gray-700">
                  {generateInference(selectedGraph.data)}
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setSelectedGraph(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictedDisplay;
