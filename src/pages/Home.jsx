import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import PincodeMap from "../components/PincodeMap";
import { UserData } from "../context/UserContext";
import LanguageSelector from "../components/LanguageSelector";

const Home = () => {
  const { user } = UserData();
  const { t } = useTranslation();
  //console.log(__dirname);
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <LanguageSelector />
      <PincodeMap pincode={user?.postalID} />
    </div>
  );
};
export default Home;
