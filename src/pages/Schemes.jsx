import { useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
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
const schemeArray = [
  [
    "PostOfficeSavingsAccount.InterestRates",
    "PostOfficeSavingsAccount.MinAmount",
    "PostOfficeSavingsAccount.MaxBalance",
    "PostOfficeSavingsAccount.TR1S1",
    "PostOfficeSavingsAccount.TR2S1",
    "PostOfficeSavingsAccount.TR3S1",
    "PostOfficeSavingsAccount.TR4S1",
  ],

  [
    "PostOfficeRD.InterestRates",
    "PostOfficeRD.MinAmount",
    "PostOfficeRD.MaxBalance",
    "PostOfficeRD.TR1S2",
    "PostOfficeRD.TR2S2",
    "PostOfficeRD.TR3S2",
    "PostOfficeRD.TR4S2",
  ],

  [
    "PostOfficeTD.InterestRates",
    "PostOfficeTD.MinAmount",
    "PostOfficeTD.MaxBalance",
    "PostOfficeTD.TR1S3",
    "PostOfficeTD.TR2S3",
    "PostOfficeTD.TR3S3",
    "PostOfficeTD.TR4S3",
  ],

  [
    "PostOfficeMIS.InterestRates",
    "PostOfficeMIS.MinAmount",
    "PostOfficeMIS.MaxBalance",
    "PostOfficeMIS.TR1S4",
    "PostOfficeMIS.TR2S4",
    "PostOfficeMIS.TR3S4",
    "PostOfficeMIS.TR4S4",
  ],

  [
    "SeniorCitizenSSS.InterestRates",
    "SeniorCitizenSSS.MinAmount",
    "SeniorCitizenSSS.MaxBalance",
    "SeniorCitizenSSS.TR1S5",
    "SeniorCitizenSSS.TR2S5",
    "SeniorCitizenSSS.TR3S5",
    "SeniorCitizenSSS.TR4S5",
  ],

  [
    "PPF.InterestRates",
    "PPF.MinAmount",
    "PPF.MaxBalance",
    "PPF.TR1S6",
    "PPF.TR2S6",
    "PPF.TR3S6",
    "PPF.TR4S6",
  ],

  [
    "NSC.InterestRates",
    "NSC.MinAmount",
    "NSC.MaxBalance",
    "NSC.TR1S7",
    "NSC.TR2S7",
    "NSC.TR3S7",
    "NSC.TR4S7",
  ],

  [
    "KVP.InterestRates",
    "KVP.MinAmount",
    "KVP.MaxBalance",
    "KVP.TR1S8",
    "KVP.TR2S8",
    "KVP.TR3S8",
    "KVP.TR4S8",
  ],

  [
    "SukanyaSamriddhi.InterestRates",
    "SukanyaSamriddhi.MinAmount",
    "SukanyaSamriddhi.MaxBalance",
    "SukanyaSamriddhi.TR1S9",
    "SukanyaSamriddhi.TR2S9",
    "SukanyaSamriddhi.TR3S9",
    "SukanyaSamriddhi.TR4S9",
  ],
];

const Schemes = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle open/close
  };
  return (
    <div className="w-full min-h-screen">
      <Header />
      <h1 className="mt-32 text-center text-black text-2xl font-bold font-serif">
        {t("Schemes Info")}
      </h1>
      <div className="w-full h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 p-8">
        {schemeArray?.length > 0 &&
          schemeArray.map((scheme, index) => (
            <div
              key={index}
              className="bg-primary text-black w-full my-2 px-3 py-2 rounded-md shadow-md shadow-black cursor-pointer transition-all"
              onClick={() => toggleDropdown(index)}
            >
              {/* Basic Details */}
              <div className="w-full flex justify-between items-center">
                <h2 className="font-bold text-xl">
                  {t(postOfficeSchemes[index]?.name)}
                </h2>
                <div>
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

              {/* Additional Details */}
              <div
                className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                {/* Wrap dropdown details in a child div to isolate height changes */}
                <div className="flex flex-col gap-2 text-md">
                  <div>
                    <strong>{t("IR")}:</strong> {t(scheme[0])}
                  </div>
                  <div>
                    <strong>{t("MA")}:</strong> {t(scheme[1])}
                  </div>
                  <div>
                    <strong>{t("MB")}:</strong> {t(scheme[2])}
                  </div>
                  <div>
                    <strong>{t("TR")}:</strong>
                    <ul className="list-disc pl-5">
                      <li>{t(scheme[3])}</li>
                      <li>{t(scheme[4])}</li>
                      <li>{t(scheme[5])}</li>
                      <li>{t(scheme[6])}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Schemes;
