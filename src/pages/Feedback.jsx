import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FirstHeader from "../components/FirstHeader";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { feedback_server } from "../main";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
const postOfficeSchemes = [
  { index: 1, name: "Post Office Savings Account" },
  { index: 2, name: "5-Year Post Office Recurring Deposit Account (RD)" },
  { index: 3, name: "Post Office Time Deposit Account (TD)" },
  { index: 4, name: "Post Office Monthly Income Account Scheme (MIS)" },
  { index: 5, name: "Senior Citizen Savings Scheme (SCSS)" },
  { index: 6, name: "15 year Public Provident Fund Account (PPF)" },
  { index: 7, name: "National Savings Certificates (NSC)" },
  { index: 8, name: "Kisan Vikas Patra (KVP)" },
  { index: 9, name: "Sukanya Samriddhi Accounts" },
];

const Feedback = () => {
  const [pincode, setPincode] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [redirect, setRedirect] = useState(""); // State to hold text input from React Quill
  const { isAuth, getFontClass } = UserData();
  console.log(isAuth);
  const { t } = useTranslation();
  const handleCheckboxChange = (scheme) => {
    if (schemes.includes(scheme)) {
      setSchemes(schemes.filter((selectedScheme) => selectedScheme !== scheme));
    } else {
      setSchemes([...schemes, scheme]);
    }
    console.log(schemes);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!suggestion && schemes.length === 0) {
      toast.error("You need to enter some form of feedback.");
      return;
    }
    try {
      const { data } = await axios.post(
        `${feedback_server}/api/post-feedback`,
        {
          pincode,
          schemes,
          suggestion,
          weight: isAuth ? 1 : 0.3,
          role: isAuth ? "employee" : "civilian",
        }
      );
      console.log(data);
      toast.success(data.message);
      setRedirect("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
      setRedirect("/");
    }
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className={`w-full h-full ${isAuth ? "mt-32" : ""} ${getFontClass()}`}>
      {isAuth ? <Header /> : <FirstHeader />}
      <div className="w-full flex flex-col gap-4 items-center">
        <h1 className="text-primary font-bold text-3xl font-serif">
          {t("Suggestion Form")}
        </h1>
        <div className="flex flex-col w-[75%] bg-[#FFD5A0] px-10 py-8 rounded-2xl mb-4">
          <div>
            <label htmlFor="pincode" className="text-xl font-bold mr-4">
              {t("Pincode")}*:
            </label>
            <input
              type="text"
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <hr className="mt-2 border-t-4 border-black" />
          <div>
            <h3 className="font-bold mt-2 text-xl">{t("Select Schemes")}:</h3>
            <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-8 mt-2">
              {postOfficeSchemes.map((scheme) => (
                <div key={scheme.index} className="flex items-center space-x-2">
                  <label className="flex items-center">
                    {/* Hidden default checkbox */}
                    <input
                      type="checkbox"
                      value={scheme.name}
                      checked={schemes.includes(scheme.name)}
                      onChange={() => handleCheckboxChange(scheme.name)}
                      className="hidden"
                    />

                    {/* Custom checkbox */}
                    <span
                      className={`min-w-6 min-h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 
            ${
              schemes.includes(scheme.name)
                ? "bg-primary border-primary"
                : "bg-white border-gray-400"
            }
            ${
              schemes.includes(scheme.name)
                ? "after:block after:w-0 after:h-0 after:bg-white after:rounded-full"
                : ""
            }`}
                    >
                      {/* This is for the white tick mark when checked */}
                      {schemes.includes(scheme.name) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.293 5.293a1 1 0 011.414 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>

                    <h2 className="inline font-semibold text-md ml-2">
                      {t(scheme.name)}
                    </h2>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <hr className="mt-2 border-t-4 border-black" />
          <div>
            <h3 className="font-bold mt-2 text-xl">
              {t("Other Suggestions")}:
            </h3>
            <ReactQuill
              value={suggestion}
              onChange={(value) => setSuggestion(value)}
              placeholder={t("SD")}
              className="w-full my-2"
              style={{ border: "2px solid black", borderRadius: "8px" }}
            />
          </div>
          <div className="w-full">
            <button
              className="w-full bg-black/70 text-white text-centre py-2 rounded-lg"
              onClick={submitHandler}
            >
              {t("Submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
