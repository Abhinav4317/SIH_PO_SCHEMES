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
  const [insurances, setInsurances] = useState([]);
  const [schemeScore, setSchemeScore] = useState(null);
  const [insuranceScore, setInsuranceScore] = useState(null);
  const { role, isAuth: isAdminAuth } = AdminData();
  const [locations, setLocations] = useState([]);
  const [showSchemeModal, setShowSchemeModal] = useState(false);

  const plans = {
    "5-Year Post Office Recurring Deposit (RD)":
      "To promote the 5-Year Post Office Recurring Deposit, focus on middle-income families, salaried individuals, and small business owners. Tailor messaging around the discipline of monthly savings and guaranteed returns, emphasizing its suitability for achieving medium-term goals like children's education or emergency funds. Use digital platforms to engage tech-savvy youth and traditional media like radio and newspapers for rural audiences. Partner with local influencers, host financial literacy drives, and leverage post office networks for community-level promotions. Highlight trust in government-backed schemes, risk-free investment, and tax benefits, addressing concerns about flexibility by showcasing options for premature withdrawal.",
    "Post Office Time Deposit Account (TD)":
      "For the Post Office Time Deposit Account, target retired individuals, homemakers, and small investors seeking safe, fixed returns. Communicate benefits like flexible deposit terms and competitive interest rates, positioning it as an alternative to fixed deposits. Use SMS campaigns, postal brochures, and radio ads in regional languages to reach rural and senior populations. Conduct awareness events at post offices, emphasizing the simplicity of opening and managing accounts. Address barriers like perceived complexity by demonstrating ease of access and maturity benefits, assuring government-backed security and reliability.",
    "Convertible Whole Life Assurance (Gram Suvidha)":
      "For Gram Suvidha, focus on rural households, self-employed individuals, and young professionals. Highlight lifetime coverage with a savings component and the flexibility of converting to an endowment plan. Utilize local fairs, mobile vans, and community meetings to engage rural audiences. Build trust by featuring testimonials from existing policyholders and leveraging post office agents for door-to-door communication. Offer simplified explanations of premiums and payouts, addressing doubts about affordability with affordable installment plans. Emphasize the dual benefit of protection and savings, ensuring cultural and linguistic sensitivity in messaging.",
  };

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
        "http://localhost:8001/predict_schemes",
        {
          post_office_name: user?.postOfficeName,
          top_n_schemes: 3,
          include_neighbor_vote: false,
        }
      );
      console.log(response);
      setSchemes(response?.data?.recommended_schemes);
      setInsurances(response?.data?.recommeded_insurances);
      setSchemeScore(response?.data?.scheme_confidence);
      setInsuranceScore(response?.data?.insurance_confidence);
      console.log(response?.data?.scheme_confidence);
      console.log(response?.data?.insurance_confidence);
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
                    {scheme || ""}:{schemeScore[scheme] * 100}
                    {"%"}
                  </h2>
                  <h3 className="font-bold text-sm">Promotion Plan:</h3>
                  <p className="text-sm">
                    {plans[scheme] || "No additional details available"}
                  </p>
                </div>
              ))}
              {insurances.map((insurance, index) => (
                <div key={index} className="bg-secondary p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">
                    {insurance || ""}:{insuranceScore[insurance] * 100}
                    {"%"}
                  </h2>
                  <h3 className="font-bold text-sm">Promotion Plan:</h3>
                  <p className="text-sm">
                    {plans[insurance] || "No additional details available"}
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
          Currently signed-in from-
          <span className="font-bold">{user?.postOfficeName}</span>
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
          {/* {JSON.stringify(user)} */}
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
