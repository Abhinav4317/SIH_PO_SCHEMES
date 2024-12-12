import { useState } from "react";
import { UserData } from "../context/UserContext";
import { AdminData } from "../context/AdminContext"; // Import AdminContext
import { LoadingSpinner } from "../components/Loading";
import toast from "react-hot-toast";
import PostOfficeList from "../components/PostOfficeList";
import Verify from "./Verify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [empID, setEmpID] = useState(""); // For admin empID
  const [postalID, setPostalID] = useState(""); // For user postalID
  const [password, setPassword] = useState("");
  const [showPostOfficeList, setShowPostOfficeList] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState("user"); // State for selecting between user and admin login
  const {
    btnLoading,
    showOTPWindow,
    setShowOTPWindow,
    loginUser,
    getFontClass,
  } = UserData();
  const {
    btnLoading: adminBtnLoading,
    showOTPWindow: adminShowOTPWindow,
    setShowOTPWindow: setAdminShowOTPWindow,
    loginAdmin,
  } = AdminData() || {};

  const { t } = useTranslation();

  const showDetails = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (
      !email ||
      !password ||
      (selectedPortal === "user" && !postalID) ||
      (selectedPortal === "admin" && !empID)
    ) {
      toast.error("Please enter all necessary fields.");
      return;
    }

    if (selectedPortal === "user") {
      setShowPostOfficeList(true); // Show PostOfficeList for user login
    } else {
      // For admin, first login and then show OTP window
      try {
        await loginAdmin(email, empID, password); // Perform admin login
        setAdminShowOTPWindow(true); // Show OTP window after admin login
      } catch (error) {
        toast.error("Admin login failed!");
      }
    }
  };

  const closePostOfficeList = () => setShowPostOfficeList(false);
  const closeOTPWindow = () => setShowOTPWindow(false);
  const closeAdminOTPWindow = () => setAdminShowOTPWindow(false);

  return (
    <>
      <div
        className={`flex flex-col min-h-screen gap-6 justify-center items-center py-10 font-serif px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 ${
          showPostOfficeList ? "blur-sm" : ""
        } ${getFontClass()}`}
        style={{
          backgroundImage: `url(https://res.cloudinary.com/agmern/image/upload/v1733125071/csihr0v0x1qxtikg9wcl.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "repeat",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      >
        <div className="w-full max-w-md relative flex flex-col gap-4 justify-center items-center bg-secondary border-[16px] border-primary shadow-lg rounded-lg p-6 sm:p-4 md:p-6 lg:p-8">
          {/* Tabs for Switching Between User and Admin */}
          <div className="w-full">
            <img
              src="https://res.cloudinary.com/agmern/image/upload/v1733151115/ywgwtmztp50yldwonefy.jpg"
              alt=""
              className="w-full"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSelectedPortal("user")}
              className={`${
                selectedPortal === "user"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } py-2 px-6 rounded-lg font-semibold`}
            >
              {t("India Post Official")}
            </button>
            <button
              onClick={() => setSelectedPortal("admin")}
              className={`${
                selectedPortal === "admin"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } py-2 px-6 rounded-lg font-semibold`}
            >
              {t("Administrative Level")}
            </button>
          </div>

          {/* Form Section (Switches Based on Selected Portal) */}
          <div className="w-full h-full p-8 rounded-xl bg-tertiary">
            <h1 className="playfair-display-500 text-xl text-center text-black mb-2 sm:text-3xl md:text-4xl font-bold">
              {t("LogIn")}/{t("Register")}
            </h1>
            <div className="w-full mb-4">
              <label className="self-start text-left mb-2" htmlFor="email">
                {t("Email")}:
              </label>
              <input
                id="email"
                type="text"
                placeholder="officialEmail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Conditional Input for PostalID (User) or EmpID (Admin) */}
            <div className="w-full mb-4">
              <label className="self-start text-left mb-2" htmlFor="empID">
                {t("Employee ID")}:
              </label>
              <input
                id="empID"
                type="text"
                placeholder="Your Employee ID"
                value={empID}
                onChange={(e) => setEmpID(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {selectedPortal === "user" ? (
              <div className="w-full mb-4">
                <label className="self-start text-left mb-2" htmlFor="postalID">
                  {t("Pincode")}:
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
            ) : (
              ""
            )}

            <div className="w-full mb-4">
              <label className="self-start text-left mb-2" htmlFor="password">
                {t("Password")}:
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
                disabled={btnLoading || adminBtnLoading}
              >
                {btnLoading || adminBtnLoading ? <LoadingSpinner /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for PostOfficeList */}
      {showPostOfficeList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-transparent rounded-lg shadow-lg p-4 max-w-4xl w-full popup-animation">
            <PostOfficeList
              postalID={postalID}
              email={email}
              password={password}
              empID={empID}
              closePostOfficeList={closePostOfficeList}
            />
          </div>
        </div>
      )}

      {/* Modal for OTP Window (Admin) */}
      {adminShowOTPWindow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-transparent rounded-lg shadow-lg p-4 max-w-4xl w-full popup-animation">
            <Verify
              closeOTPWindow={closeAdminOTPWindow}
              portal={selectedPortal}
            />
          </div>
        </div>
      )}
      {showOTPWindow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-transparent rounded-lg shadow-lg p-4 max-w-4xl w-full popup-animation">
            <Verify closeOTPWindow={closeOTPWindow} portal={selectedPortal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
