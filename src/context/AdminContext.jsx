import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { auth_server } from "../main";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [showOTPWindow, setShowOTPWindow] = useState(false);
  const [role, setRole] = useState("");
  const [admin, setAdmin] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  async function loginAdmin(email, empID, password) {
    setBtnLoading(true);
    try {
      const p = password ? password : "";
      const { data } = await axios.post(`${auth_server}/api/admin/login`, {
        email,
        empID,
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
      //console.log("yahan hua error")
      toast.error(error?.response?.data?.message);
      setBtnLoading(false);
    }
  }

  async function verifyAdmin(otp, navigate) {
    const verifyToken = localStorage.getItem("verifyToken");
    setBtnLoading(true);

    if (!verifyToken) return toast.error("Please provide token");

    try {
      const { data } = await axios.post(`${auth_server}/api/admin/verify`, {
        otp,
        verifyToken,
      });

      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data.token);
      navigate("/"); // Navigate to the admin dashboard
      setShowOTPWindow(false);
      setBtnLoading(false);
      setIsAuth(true);
      setAdmin(data.admin);
    } catch (error) {
      //console.log("yahan bhi")
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  const [loading, setLoading] = useState(true);

  async function fetchAdmin() {
    try {
      const { data } = await axios.get(`${auth_server}/api/admin/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(data);
      setIsAuth(true);
      setAdmin(data);
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
    setAdmin([]);
    navigate("/");
  };

  useEffect(() => {
    fetchAdmin()
      .then((data) => {
        // Any additional logic can be added here
        console.log(data);
        if (data?.empID[12] === "5") {
          setRole("PMO");
        } else if (data?.empID[12] === "6") {
          setRole("State General");
        } else if (data?.empID[12] === "7") {
          setRole("Bhopal HQ");
        } else if (data?.empID[12] === "8") {
          setRole("Gwalior");
        } else if (data?.empID[12] === "9") {
          setRole("Indore");
        } else if (data?.empID[12] === "1") {
          setRole("District");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <AdminContext.Provider
        value={{
          loginAdmin,
          btnLoading,
          isAuth,
          setIsAuth,
          admin,
          verifyAdmin,
          loading,
          logoutHandler,
          showOTPWindow,
          role
        }}
      >
        {children}
      </AdminContext.Provider>
      <Toaster />
    </>
  );
};

export const AdminData = () => useContext(AdminContext);
