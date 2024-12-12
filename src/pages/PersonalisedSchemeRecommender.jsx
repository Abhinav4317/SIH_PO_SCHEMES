import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import toast from "react-hot-toast";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Modal Component
const Modal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data).map((val) => (val * 100).toFixed(2)), // Convert values to percentages
        backgroundColor: "rgba(255, 165, 0, 0.6)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y}%` } },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => `${value}%` },
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[60%] border-2 border-orange-400 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold text-red-500 hover:text-red-700"
        >
          &times;
        </button>
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

const PersonalisedSchemeRecommender = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");
  const [scores, setScores] = useState(null);
  const [iscores, setIscores] = useState(null);
  const [showModal, setShowModal] = useState({ type: null, open: false });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!name || !age || !gender || !occupation || !income) {
        toast.error("Please enter all necessary fields");
        return;
      }
      const response = await axios.post(
        "http://localhost:8001/calculate_nbf_scores",
        {
          Name: name,
          Age_Group: age,
          Gender: gender,
          Income_Level: income,
          Occupation: occupation,
          is_insurance: false,
        }
      );
      console.log(response);
      setScores(response?.data?.NBF_Scores);
      toast.success("Savings schemes calculated successfully");
      setShowModal({ type: "savings", open: true });
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error("Error processing savings schemes");
    }
  };

  const isubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!name || !age || !gender || !occupation || !income) {
        toast.error("Please enter all necessary fields");
        return;
      }
      const response = await axios.post(
        "http://localhost:8001/calculate_nbf_scores",
        {
          Name: name,
          Age_Group: age,
          Gender: gender,
          Income_Level: income,
          Occupation: occupation,
          is_insurance: true,
        }
      );
      setIscores(response?.data?.NBF_Scores);
      toast.success("Insurance schemes calculated successfully");
      setShowModal({ type: "insurance", open: true });
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error("Error processing insurance schemes");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <Header />
      <h1 className="text-xl text-primary font-bold mt-16">
        Personalised Scheme Predictor
      </h1>
      <div className="w-[90%] md:w-[40%] p-6 bg-[#FFF7E6] border-[3px] border-[#FDAA3B] rounded-lg shadow-lg">
        <h1 className="text-[#333333] text-2xl font-bold text-center mb-4">
          Fill your details
        </h1>
        <form className="flex flex-col gap-4">
          {/* Input fields */}
          <div className="flex justify-between items-center">
            <label htmlFor="name" className="text-[#333333] font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="age" className="text-[#333333] font-medium">
              Age:
            </label>
            <select
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            >
              <option value="">Select</option>
              <option value="0-18">0-18</option>
              <option value="19-35">19-35</option>
              <option value="36-60">36-60</option>
              <option value="60+">60+</option>
            </select>
          </div>
          {/* Other fields remain unchanged */}
          <div className="flex justify-between items-center">
            <label htmlFor="gender" className="text-[#333333] font-medium">
              Gender:
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Occupation Dropdown */}
          <div className="flex justify-between items-center">
            <label htmlFor="occupation" className="text-[#333333] font-medium">
              Occupation:
            </label>
            <select
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Salaried Individual">Salaried Individual</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Farmer">Farmer</option>
              <option value="Retired">Retired</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {/* Annual Income Input */}
          <div className="flex justify-between items-center">
            <label htmlFor="income" className="text-[#333333] font-medium">
              Annual income:
            </label>
            <select
              id="income"
              value={income}
              onChange={(e) => setIncome(parseInt(e.target.value))}
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="w-full flex gap-2">
            <button
              type="button"
              onClick={submitHandler}
              className="w-full mt-4 p-3 bg-[#FDAA3B] text-white font-bold text-lg rounded-md hover:bg-[#e89c33] transition duration-300"
            >
              Predict Savings Schemes
            </button>
            <button
              type="button"
              onClick={isubmitHandler}
              className="w-full mt-4 p-3 bg-[#FDAA3B] text-white font-bold text-lg rounded-md hover:bg-[#e89c33] transition duration-300"
            >
              Predict Insurance Schemes
            </button>
          </div>
        </form>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showModal.type === "savings" && showModal.open}
        onClose={() => setShowModal({ ...showModal, open: false })}
        title="Savings Scheme Recommendations"
        data={scores || {}}
      />
      <Modal
        isOpen={showModal.type === "insurance" && showModal.open}
        onClose={() => setShowModal({ ...showModal, open: false })}
        title="Insurance Scheme Recommendations"
        data={iscores || {}}
      />
    </div>
  );
};

export default PersonalisedSchemeRecommender;
