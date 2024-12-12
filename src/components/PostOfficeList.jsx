import toast from "react-hot-toast";
import { UserData } from "../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner, LoadingSpinnerDark } from "./Loading";

const PostOfficeList = ({
  postalID = "243122",
  password,
  email,
  empID,
  closePostOfficeList,
}) => {
  const { loginUser, btnLoading } = UserData();
  const [POList, setPOList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // Track which dropdown is open
  const [selectedPostOffice, setSelectedPostOffice] = useState(null); // New state to store selected post office

  useEffect(() => {
    const url = "https://api.postalpincode.in/pincode/" + postalID;
    axios.get(url).then((response) => {
      console.log(response);
      if (response.data[0].Status === "Error") {
        setPOList([]);
        toast.error(
          "The entered PIN Code does not exist. Please enter a valid PIN code."
        );
      } else {
        const PostOfficeList = response.data[0].PostOffice;
        setPOList(PostOfficeList);
      }
    });
  }, [postalID]);

  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle open/close
  };

  const handlePostOfficeSelect = (postOfficeName) => {
    setSelectedPostOffice(postOfficeName); // Save the selected post office name
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPostOffice) {
      toast.error("Please select a post office name.");
      return;
    }

    if (!postalID || !password || !email || !empID) {
      toast.error("Please enter all necessary fields.");
      return;
    }

    loginUser(email, postalID, password, selectedPostOffice,empID); // Pass selected post office name
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div
        className="h-[32rem] bg-secondary rounded-2xl border-2 border-primary flex flex-col items-center 
        w-full max-w-[28rem] sm:max-w-[34rem] md:max-w-[40rem] lg:max-w-[50rem]"
      >
        <div className="w-full flex items-center justify-center mt-2">
          <img
            src="https://res.cloudinary.com/agmern/image/upload/v1733291230/trabzxyeesswxgil0kim.png"
            alt=""
            className="rounded-2xl"
          />
        </div>
        <div className="bg-primary w-[90%] h-[24rem] mt-2 rounded-2xl p-4 md:p-8 flex flex-col gap-3 items-center">
          <div className="grid grid-cols-[1fr_2fr_2fr_2fr] font-bold w-full text-sm md:text-base">
            <h1>S.No.</h1>
            <h1>Branch Name</h1>
            <h1>PIN Code</h1>
            <h1 className="flex justify-between items-center">
              Branch Type
              <span></span>
            </h1>
          </div>
          <div className="w-full h-full overflow-y-auto">
            {POList?.length === 0 && (
              <div className="h-full w-full flex items-center justify-center">
                <LoadingSpinnerDark />
              </div>
            )}
            {POList?.length > 0 &&
              POList.map((postOffice, index) => (
                <div
                  key={index}
                  className={`text-black w-full my-2 px-3 py-2 rounded-md shadow-md shadow-black cursor-pointer transition-all ${
                    selectedPostOffice === postOffice.Name?"bg-secondary":"bg-white"
                  }`}
                  onClick={() => {
                    toggleDropdown(index);
                    handlePostOfficeSelect(postOffice.Name); // Set selected post office name
                  }}
                >
                  {/* Basic Details */}
                  <div className="grid grid-cols-[1fr_2fr_2fr_2fr]">
                    <h2 className="font-semibold">
                      {index + 1}
                      {"."}
                    </h2>
                    <h2 className="font-semibold">{postOffice.Name}</h2>
                    <h2 className="font-semibold">{postOffice.Pincode}</h2>
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold">{postOffice.BranchType}</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform duration-500 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Additional Details (Visible only if this dropdown is open) */}
                  <div
                    className={`mt-4 overflow-hidden transition-max-height duration-500 ease-in-out ${
                      openIndex === index ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Delivery Status:</strong>{" "}
                        {postOffice.DeliveryStatus}
                      </div>
                      <div>
                        <strong>District:</strong> {postOffice.District}
                      </div>
                      <div>
                        <strong>Division:</strong> {postOffice.Division}
                      </div>
                      <div>
                        <strong>Region:</strong> {postOffice.Region}
                      </div>
                      <div>
                        <strong>Block:</strong> {postOffice.Block}
                      </div>
                      <div>
                        <strong>State:</strong> {postOffice.State}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex gap-2 w-full items-center justify-center">
            <button
              onClick={submitHandler}
              className="w-[20%] text-center font-bold py-1 bg-secondary rounded-lg text-black"
              disabled={btnLoading}
            >
              {btnLoading ? <LoadingSpinner /> : "OK"}
            </button>
            <button
              onClick={closePostOfficeList}
              className="w-[20%] text-center font-bold py-1 bg-black rounded-lg text-white"
              disabled={btnLoading}
            >
              {"Back"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostOfficeList;
