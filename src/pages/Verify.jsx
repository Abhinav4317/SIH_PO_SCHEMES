import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { UserData } from "../context/UserContext";
import { AdminData } from "../context/AdminContext"; // Import AdminContext

const Verify = ({ closeOTPWindow, portal }) => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnLoading: userBtnLoading } = UserData();
  const { verifyAdmin, btnLoading: adminBtnLoading } = AdminData() || {}; // Default to an empty object if AdminContext is not available

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (portal === "user") {
      verifyUser(Number(otp), navigate); // For user portal, verify using user function
    } else if (portal === "admin") {
      verifyAdmin(Number(otp), navigate); // For admin portal, verify using admin function
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-primary p-6 rounded-lg shadow-md w-full
     md:w-[500px]  border-4 border-secondary"
        onSubmit={submitHandler}
      >
        <div className="mb-4">
          <label
            className="text-lg block text-black mb-2 font-serif"
            htmlFor="otp"
          >
            One Time Password(OTP) has been sent to your mail:
          </label>
          <input
            type="number"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex gap-2 w-full items-center justify-center">
          <button
            onClick={submitHandler}
            className="w-[20%] text-center font-bold py-1 bg-secondary rounded-lg text-black"
            disabled={userBtnLoading || adminBtnLoading}
          >
            {userBtnLoading || adminBtnLoading ? <LoadingSpinner /> : "Submit"}
          </button>
          <button
            onClick={closeOTPWindow}
            className="w-[20%] text-center font-bold py-1 bg-black rounded-lg text-white"
            disabled={userBtnLoading || adminBtnLoading}
          >
            {"Back"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
