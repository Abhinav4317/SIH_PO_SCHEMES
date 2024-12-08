import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import PincodeMap from "../components/PincodeMap";
import { UserData } from "../context/UserContext";
import FeedbackDisplay from "../components/FeedbackDisplay";
import DemographicDisplay from "../components/DemographicDisplay";

const Home = () => {
  const { user } = UserData();
  const { t } = useTranslation();
  //console.log(__dirname);
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <PincodeMap pincode={user?.postalID} />
      <FeedbackDisplay />
      <DemographicDisplay />
    </div>
  );
};
export default Home;
