import { useState } from "react";
import { UserData } from "../context/UserContext";
import { LoadingSpinner } from "../components/Loading";
import toast from "react-hot-toast";
import PostOfficeList from "../components/PostOfficeList";
import Verify from "./Verify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [postalID, setPostalID] = useState("");
  const [password, setPassword] = useState("");
  const [showPostOfficeList, setShowPostOfficeList] = useState(false); // State to show PostOfficeList
  const { btnLoading, showOTPWindow, setShowOTPWindow } = UserData();

  const showDetails = (e) => {
    e.preventDefault();
    if (!postalID || !password || !email) {
      toast.error("Please enter all necessary fields.");
      return;
    }
    setShowPostOfficeList(true); // Show PostOfficeList
  };

  const closePostOfficeList = () => setShowPostOfficeList(false); // Close PostOfficeList
  const closeOTPWindow = () => setShowOTPWindow(false);

  return (
    <>
      <div
        className={`flex flex-col gap-6 justify-center items-center py-10 font-serif px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 ${
          showPostOfficeList ? "blur-sm" : ""
        }`}
        style={{
          backgroundImage: `url(https://res.cloudinary.com/agmern/image/upload/v1733125071/csihr0v0x1qxtikg9wcl.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "repeat",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div className="w-full max-w-md relative flex flex-col gap-4 justify-center items-center bg-secondary border-[16px] border-primary shadow-lg rounded-lg p-6 sm:p-4 md:p-6 lg:p-8">
          {/* Existing Login Form */}
          <div className="w-full">
            <img
              src="https://res.cloudinary.com/agmern/image/upload/v1733151115/ywgwtmztp50yldwonefy.jpg"
              alt=""
              className="w-full"
            />
          </div>
          <div className="w-full h-full p-8 rounded-xl bg-tertiary">
            <h1 className="playfair-display-500 text-xl text-center text-black mb-2 sm:text-3xl md:text-4xl font-bold">
              LogIn/SignUp
            </h1>
            <div className="w-full mb-4">
              <label className="self-start text-left mb-2" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="text"
                placeholder="officialPOEmail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full mb-4">
              <label className="self-start text-left mb-2" htmlFor="postalID">
                PostalID:
              </label>
              <input
                id="postalID"
                type="text"
                placeholder="Your Post Office's Postal ID"
                value={postalID}
                onChange={(e) => setPostalID(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full mb-4">
              <label className="self-start text-left mb-2" htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full mb-2">
              <button
                onClick={showDetails}
                className="bg-black text-white py-2 px-3 w-full text-white rounded-full"
                disabled={btnLoading}
              >
                {btnLoading ? <LoadingSpinner /> : "Submit"}
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-sm sm:text-base text-black">
                By creating an account, you agree to the{" "}
                <span className="text-primary spirax-regular">
                  yojna sahayak
                </span>{" "}
                Terms of Service and Privacy Policy
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for PostOfficeList */}
      {showPostOfficeList && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
            showOTPWindow ? "blur-sm" : ""
          }`}
        >
          <div className="relative bg-transparent rounded-lg shadow-lg p-4 max-w-4xl w-full popup-animation">
            <PostOfficeList
              postalID={postalID}
              email={email}
              password={password}
              closePostOfficeList={closePostOfficeList}
            />
          </div>
        </div>
      )}
      {showOTPWindow && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div className="relative bg-transparent rounded-lg shadow-lg p-4 max-w-4xl w-full popup-animation">
            <Verify closeOTPWindow={closeOTPWindow} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
