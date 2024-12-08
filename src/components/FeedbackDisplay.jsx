import { useEffect, useState } from "react";
import axios from "axios";
import { feedback_server } from "../main";
import { UserData } from "../context/UserContext";

// Import Chart.js and React-Chart.js-2 components
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const shortScheme = {
  "15 year Public Provident Fund Account (PPF)": "PPF",
  "Sukanya Samriddhi Accounts": "SSA",
  "Kisan Vikas Patra (KVP)": "KVP",
  "Senior Citizen Savings Scheme (SCSS)": "SCSS",
  "Post Office Savings Account": "POSA",
  "5-Year Post Office Recurring Deposit Account (RD)": "RD",
  "Post Office Monthly Income Account Scheme (MIS)": "MIS",
};
const FeedbackDisplay = () => {
  const [schemeToScore, setSchemeToScore] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { user } = UserData();
  const pincode = user?.postalID;

  useEffect(() => {
    axios
      .get(`${feedback_server}/api/get-feedback/${pincode}`)
      .then(({ data }) => {
        let temp = [];
        let temp2 = [];
        data.map((feedback) => {
          let schemes = feedback?.schemes;
          let weight = feedback?.weight;
          let suggestion = feedback?.suggestion;
          temp2.push(suggestion);
          if (schemes.length > 0) {
            schemes.map((scheme) => {
              let curScore = 1 * weight;
              let found = false;
              for (let obj of temp) {
                if (
                  Object.prototype.hasOwnProperty.call(obj, shortScheme[scheme])
                ) {
                  obj[shortScheme[scheme]] += curScore; // Update the value if key exists
                  found = true;
                  break;
                }
              }
              if (!found) {
                temp.push({ [shortScheme[scheme]]: curScore });
              }
            });
          }
        });
        setSchemeToScore(temp);
        setSuggestions(temp2);
      })
      .catch((error) => console.log(error));
  }, [pincode]);

  // Prepare data for the chart
  const chartData = {
    labels: schemeToScore.map((item) => Object.keys(item)[0]), // Extract scheme names (x-axis)
    datasets: [
      {
        label: "Scheme Scores",
        data: schemeToScore.map((item) => Object.values(item)[0]), // Extract scores (y-axis)
        backgroundColor: schemeToScore.map((item) => {
          // Assign vibrant, unique colors to each bar
          const colors = [
            "rgba(255, 99, 132, 0.6)", // Red
            "rgba(54, 162, 235, 0.6)", // Blue
            "rgba(255, 206, 86, 0.6)", // Yellow
            "rgba(75, 192, 192, 0.6)", // Green
            "rgba(153, 102, 255, 0.6)", // Purple
            "rgba(255, 159, 64, 0.6)", // Orange
            "rgba(0, 255, 255, 0.6)", // Cyan
            "rgba(255, 165, 0, 0.6)", // Orange Red
            "rgba(128, 0, 128, 0.6)", // Purple Red
            "rgba(0, 255, 0, 0.6)", // Lime Green
          ];
          return colors[schemeToScore.indexOf(item) % colors.length]; // Cycle through colors
        }),
        borderColor: schemeToScore.map(() => "rgba(0, 0, 0, 1)"), // Set border color for each bar
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Schemes",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Scores",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 mt-4">
      <div className="w-[90%] bg-primary text-center p-8 text-2xl font-serif rounded-lg">
        Feedback from Civilians in your Region
      </div>
      <h1 className="text-xl text-center font-serif">
        Following is a representation of the demand for different schemes in
        your region:
      </h1>
      {/* Bar Chart for schemes vs scores */}
      <div className="w-[70%] h-[400px] mt-6">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Legend for short forms and full names */}
      <div className="w-[70%] mt-4">
        <h2 className="text-lg font-bold mb-2">Legend:</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(shortScheme).map(([full, short], index) => (
            <li key={index} className="flex items-center">
              <span className="font-bold text-primary">{short}:</span>
              <span className="ml-2">{full}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Carousel for suggestions */}
      <div
        id="carouselExampleIndicators"
        className="!bg-primary carousel slide w-[80%] mt-6 mb-3 !rounded-lg"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          {suggestions.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="!bg-primary carousel-inner !rounded-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div
                className="d-block w-100 p-36 text-center text-lg font-bold !bg-primary rounded-lg"
                dangerouslySetInnerHTML={{ __html: suggestion }}
              ></div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
