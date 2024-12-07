import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { auth_server } from "../main";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [showOTPWindow, setShowOTPWindow] = useState(false);
  async function loginUser(email, postalID, password) {
    setBtnLoading(true);
    try {
      const p = password ? password : "";
      const { data } = await axios.post(`${auth_server}/api/user/login`, {
        email,
        postalID,
        password: p,
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

  useEffect(() => {
    fetchUser();
  }, []);
  return (
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
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
