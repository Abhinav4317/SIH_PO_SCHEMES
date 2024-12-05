import Header from "../components/Header";
import PincodeMap from "../components/PincodeMap";
import { UserData } from "../context/UserContext";

const Home = () => {
  const { user } = UserData();
  //console.log(__dirname);
  return (
    <div className="w-full min-h-screen bg-secondary">
      <Header />
      Home
      <PincodeMap pincode={user.postalID} />
    </div>
  );
};
export default Home;
