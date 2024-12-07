import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FirstHeader from "../components/FirstHeader";

const postOfficeSchemes = [
  { index: 1, name: "Post Office Savings Account" },
  { index: 2, name: "5-Year Post Office Recurring Deposit Account (RD)" },
  { index: 3, name: "Post Office Time Deposit Account (TD)" },
  { index: 4, name: "Post Office Monthly Income Account Scheme (MIS)" },
  { index: 5, name: "Senior Citizen Savings Scheme (SCSS)" },
  { index: 6, name: "15 year Public Provident Fund Account (PPF)" },
  { index: 7, name: "National Savings Certificates (NSC)" },
  { index: 8, name: "Kisan Vikas Patra (KVP)" },
  { index: 9, name: "Sukanya Samriddhi Accounts" },
];

const Feedback = () => {
  const [pincode, setPincode] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [suggestion, setSuggestion] = useState(""); // State to hold text input from React Quill

  const handleCheckboxChange = (scheme) => {
    if (schemes.includes(scheme)) {
      setSchemes(schemes.filter((selectedScheme) => selectedScheme !== scheme));
    } else {
      setSchemes([...schemes, scheme]);
    }
  };

  return (
    <div>
      <FirstHeader />
      <div>
        <div>
          <label htmlFor="pincode" className="block font-bold">
            PIN Code:
          </label>
          <input
            type="text"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div>
          <h3 className="font-bold mt-2">Select Schemes:</h3>
          {postOfficeSchemes.map((scheme) => (
            <div key={scheme.index}>
              <label>
                <input
                  type="checkbox"
                  value={scheme.name}
                  checked={schemes.includes(scheme.name)}
                  onChange={() => handleCheckboxChange(scheme.name)}
                />
                {scheme.name}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-bold mt-2">Other Suggestions:</h3>
          <ReactQuill
            value={suggestion}
            onChange={(value) => setSuggestion(value)}
            placeholder="Enter your suggestions here (supports multiple languages)..."
            className="h-32 mx-12 my-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
