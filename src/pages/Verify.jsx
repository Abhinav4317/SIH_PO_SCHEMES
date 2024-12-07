import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { UserData } from "../context/UserContext";

const Verify = ({ closeOTPWindow }) => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate);
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
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingSpinner /> : "Submit"}
          </button>
          <button
            onClick={closeOTPWindow}
            className="w-[20%] text-center font-bold py-1 bg-black rounded-lg text-white"
            disabled={btnLoading}
          >
            {"Back"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
