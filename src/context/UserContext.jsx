import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { auth_server } from "../main";
import { useTranslation } from "react-i18next";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [showOTPWindow, setShowOTPWindow] = useState(false);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getFontClass = () => {
    if (currentLanguage.startsWith("hi")) return "font-hindi";
    if (currentLanguage.startsWith("ta")) return "font-tamil";
    return "font-english";
  };
  async function getLocationFromPincode(pincode) {
    try {
      if (!pincode) {
        throw new Error("Pincode is required.");
      }

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: pincode,
            format: "json",
            addressdetails: 1,
          },
        }
      );

      if (response.data.length === 0) {
        throw new Error("No location found for this pincode.");
      }

      const location = response.data[0]; // Take the first result
      return {
        latitude: location.lat,
        longitude: location.lon,
        loc: location.display_name,
      };
    } catch (error) {
      console.error("Error fetching location:", error.message);
      throw error; // Rethrow the error for further handling
    }
  }
  async function loginUser(
    email,
    postalID,
    password,
    selectedPostOffice,
    empID
  ) {
    setBtnLoading(true);
    try {
      const p = password ? password : "";
      const { data } = await axios.post(`${auth_server}/api/user/login`, {
        email,
        postalID,
        password: p,
        postOfficeName: selectedPostOffice,
        empID,
      });
      console.log(data);
      toast.success(data.message);
      localStorage.setItem("verifyToken", data.verifyToken);
      console.log("verify token stored in local storage");
      setShowOTPWindow(true);
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setBtnLoading(false);
    }
  }

  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  async function verifyUser(otp, navigate) {
    const verifyToken = localStorage.getItem("verifyToken");
    setBtnLoading(true);

    if (!verifyToken) return toast.error("Please give token");
    try {
      const { data } = await axios.post(`${auth_server}/api/user/verify`, {
        otp,
        verifyToken,
      });

      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data.token);
      navigate("/");
      setShowOTPWindow(false);
      setBtnLoading(false);
      setIsAuth(true);
      setUser(data.user);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${auth_server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(data);
      setIsAuth(true);
      setUser(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  const logoutHandler = (navigate) => {
    localStorage.clear();

    toast.success("logged out");
    setIsAuth(false);
    setUser([]);
    navigate("/");
  };
  const [place, setPlace] = useState("");
  useEffect(() => {
    fetchUser().then((data) => {
      console.log("user", data);
      getLocationFromPincode(data?.postalID)
        .then(({ latitude, longitude, loc }) => {
          setPlace(loc);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    });
  }, []);
  return (
    <>
      <UserContext.Provider
        value={{
          loginUser,
          btnLoading,
          isAuth,
          setIsAuth,
          user,
          verifyUser,
          loading,
          logoutHandler,
          showOTPWindow,
          getFontClass,
          currentLanguage,
          place,
        }}
      >
        {children}
      </UserContext.Provider>
      <Toaster />
    </>
  );
};

export const UserData = () => useContext(UserContext);
