import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import toast from "react-hot-toast";

const LoanCredibilityPredictor = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [landSize, setLandSize] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [insuranceHistory, setInsuranceHistory] = useState("");
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !age ||
      !gender ||
      !annualIncome ||
      !landSize ||
      !rainfall ||
      !insuranceHistory
    ) {
      toast.error("Please enter all necessary fields");
      return;
    }
    axios
      .post("http://localhost:8001/assess_farmer_risk", {
        income: parseInt(annualIncome),
        land_size: parseInt(landSize),
        rainfall: parseInt(rainfall),
        insurance_history: insuranceHistory,
      })
      .then((response) => toast.success(response?.data?.Recommendation))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <Header />
      <h1 className="text-xl text-primary font-bold mt-32">
        Loan Credibility Predictor
      </h1>
      <div></div>
      <div className="w-[90%] md:w-[40%] p-6 bg-[#FFF7E6] border-[3px] border-[#FDAA3B] rounded-lg shadow-lg">
        <h1 className="text-[#333333] text-2xl font-bold text-center mb-4">
          Fill your details
        </h1>
        <form className="flex flex-col gap-4">
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
            <input
              type="text"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            />
          </div>
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
          <div className="flex justify-between items-center">
            <label
              htmlFor="annualIncome"
              className="text-[#333333] font-medium"
            >
              Annual income (INR):
            </label>
            <input
              type="number"
              id="annualIncome"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              placeholder="Enter annual income"
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="landSize" className="text-[#333333] font-medium">
              Land Size (acres):
            </label>
            <input
              type="number"
              id="landSize"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
              placeholder="Enter land size"
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="rainfall" className="text-[#333333] font-medium">
              Rainfall (mm):
            </label>
            <input
              type="number"
              id="rainfall"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              placeholder="Enter rainfall"
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center">
            <label
              htmlFor="insuranceHistory"
              className="text-[#333333] font-medium"
            >
              Insurance History:
            </label>
            <select
              id="insuranceHistory"
              value={insuranceHistory}
              onChange={(e) => setInsuranceHistory(e.target.value)}
              className="w-[70%] p-2 border-[1px] border-gray-300 rounded-md focus:outline-none"
            >
              <option value="">Select</option>
              <option value="No Previous Claims">No Previous Claims</option>
              <option value="Existing Policy">Existing Policy</option>
            </select>
          </div>
          <button
            type="button"
            onClick={submitHandler}
            className="w-full mt-4 p-3 bg-[#FDAA3B] text-white font-bold text-lg rounded-md hover:bg-[#e89c33] transition duration-300"
          >
            Make Predictions!
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanCredibilityPredictor;
