import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import PincodeMap from "../components/PincodeMap";
import { UserData } from "../context/UserContext";
import FeedbackDisplay from "../components/FeedbackDisplay";
import DemographicDisplay from "../components/DemographicDisplay";
import LanguageSelector from "../components/LanguageSelector";
import axios from "axios";
import { useEffect, useState } from "react";
import { AdminData } from "../context/AdminContext";
import RoleBasedPlaces from "../components/RoleBasedPlaces";
import { fetchPostOfficeLocations } from "../util/filterUtils2";
import PincodeMapAdmin from "../components/PincodeMapAdmin";
import PredictedDisplay from "../components/PredictedDisplay";
import { Link } from "react-router-dom";
import MarqueeModern from "../components/MarqueeModern";

const Home = () => {
  const { user, getFontClass, place, isAuth } = UserData();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const { role, isAuth: isAdminAuth } = AdminData();
  const [locations, setLocations] = useState([]);
  const [showSchemeModal, setShowSchemeModal] = useState(false);

  useEffect(() => {
    if (isAdminAuth === false) return;
    const loadLocations = async () => {
      const officeLocations = await fetchPostOfficeLocations(role);
      console.log("office loc", officeLocations);
      setLocations(officeLocations);
    };

    loadLocations();
  }, [isAdminAuth, role]);

  const predict = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8001/promotion_plans",
        {
          post_office_name: "C.T.T.Nagar H.O",
          top_n_schemes: 3,
          include_neighbor_vote: false,
        }
      );
      console.log(predict);
      setSchemes(response?.data?.promotion_plans);
      setShowSchemeModal(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const closeSchemeModal = () => {
    setShowSchemeModal(false);
  };

  return (
    <div className={`w-full min-h-screen bg-white ${getFontClass()}`}>
      {/* Scheme Prediction Modal */}
      {showSchemeModal && schemes.length > 0 && (
        <div
          className="fixed inset-0 z-50 
          flex items-center justify-center 
          bg-black bg-opacity-50 backdrop-blur-sm 
          transition-all duration-300 ease-in-out"
          onClick={closeSchemeModal}
        >
          <div
            className="bg-white rounded-lg w-[90%] max-w-md 
            max-h-[70vh] h-[70vh]
            overflow-y-auto
            shadow-2xl transform 
            transition-all duration-300 ease-in-out 
            scale-100 hover:scale-105
            flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-primary rounded-t-lg sticky top-0 z-10">
              <h1 className="text-xl font-bold text-center">
                Schemes to Promote in Your Region
              </h1>
            </div>

            <div className="p-6 space-y-4">
              {schemes.map((scheme, index) => (
                <div key={index} className="bg-secondary p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">
                    {scheme?.scheme_name || ""}
                  </h2>
                  <p className="text-sm">
                    {scheme?.plan || "No additional details available"}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white rounded-b-lg border-t sticky bottom-0 z-10">
              <button
                onClick={closeSchemeModal}
                className="w-full bg-primary text-black px-4 py-2 
                rounded-md hover:bg-secondary 
                transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Header />
      {isAdminAuth ? (
        ""
      ) : (
        <h1 className="text-center font-serif text-lg mt-32">
          Currently signed-in from-<span className="font-bold">{place}</span>
        </h1>
      )}
      {role === "PMO" && (
        <h1 className="text-center font-serif text-xl font-bold mt-32">
          Country Head
        </h1>
      )}
      {role === "State General" && (
        <h1 className="text-center font-serif text-xl font-bold mt-32">
          State Head
        </h1>
      )}
      {(role === "Bhopal HQ" || role === "Gwalior" || role === "Indore") && (
        <h1 className="text-center font-serif text-xl font-bold mt-32">
          Region Head
        </h1>
      )}
      {role === "District" && (
        <h1 className="text-center font-serif text-xl font-bold mt-32">
          District Head
        </h1>
      )}
      <div
        className={`w-full flex gap-2 h-[500px] bg-primary p-8 ${
          isAdminAuth ? "mt-4" : ""
        }`}
      >
        <div className="w-1/2 p-8">
          <h1 className="text-white font-bold text-5xl">
            {t("welcome")}{" "}
            <span className="text-black">{t("platformName")}</span>
          </h1>
          <h1 className="text-white font-bold text-3xl mt-6">
            {t("portalMessage")}
          </h1>
          <h1 className="text-black font-serif text-xl mt-4">
            {'"'}
            {t("slogan")}
            {'"'}
          </h1>
          <div className="w-full flex gap-3 mt-10">
            <div className="w-1/3 bg-secondary p-4 flex flex-col gap-1 rounded-xl items-center justify-center">
              <h1 className="text-xl font-bold">10</h1>
              <h2>Banking Schemes</h2>
            </div>
            <div className="w-1/3 bg-secondary p-4 flex flex-col gap-1 rounded-xl items-center justify-center">
              <h1 className="text-xl font-bold">10</h1>
              <h2>Insurance Schemes</h2>
            </div>
            <div className="w-1/3 bg-secondary p-4 flex flex-col gap-1 rounded-xl items-center justify-center">
              <h1 className="text-xl font-bold">36</h1>
              <h2>States & UTs</h2>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full">
          {isAdminAuth ? (
            <PincodeMapAdmin postOffices={locations} />
          ) : (
            <PincodeMap pincode={user?.postalID} />
          )}
        </div>
      </div>
      <MarqueeModern />
      {isAuth === true && (
        <div>
          <div className="w-full flex flex-col gap-2 items-center justify-center p-4">
            <button
              onClick={predict}
              className="bg-primary text-black shadow shadow-md shadow-black text-center px-8 py-4 rounded-lg text-xl"
            >
              Predict Schemes
            </button>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center p-4">
            <Link
              to={"/psr"}
              className="bg-primary text-black shadow shadow-md shadow-black text-center px-8 py-4 rounded-lg text-xl"
            >
              Personalised Scheme Recommendation
            </Link>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center p-4">
            <Link
              to={"/farmer"}
              className="bg-primary text-black shadow shadow-md shadow-black text-center px-8 py-4 rounded-lg text-xl"
            >
              Farming Loan Prediction
            </Link>
          </div>
          <FeedbackDisplay />
          <DemographicDisplay />
          <PredictedDisplay />
        </div>
      )}
      {isAdminAuth === true && <RoleBasedPlaces role={role} />}
    </div>
  );
};
export default Home;
