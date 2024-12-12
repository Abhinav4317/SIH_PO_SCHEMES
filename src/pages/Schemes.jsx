import { useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { UserData } from "../context/UserContext";
import { AdminData } from "../context/AdminContext";
const postOfficeSchemes = [
  { index: 1, name: "Post Office Savings Account" },
  { index: 2, name: "5-Year Post Office Recurring Deposit Account (RD)" },
  { index: 3, name: "Post Office Time Deposit Account (TD)" },
  { index: 4, name: "National Savings Certificates (NSC)" },
  { index: 5, name: "Kisan Vikas Patra (KVP)" },
  { index: 6, name: "15 year Public Provident Fund Account (PPF)" },
  { index: 7, name: "Sukanya Samriddhi Accounts" },
  { index: 8, name: "Senior Citizen Savings Scheme (SCSS)" },
  { index: 9, name: "Post Office Monthly Income Account Scheme (MIS)" },
];
const schemeArray = [
  [
    "Post Office Savings Account1.Description",
    "Post Office Savings Account1.Interest Rate",
    "Post Office Savings Account1.Minimum Deposit",
    "Post Office Savings Account1.Eligibility",
    "Post Office Savings Account1.Features",
  ],
  [
    "Recurring Deposit (RD)1.Description",
    "Recurring Deposit (RD)1.Interest Rate",
    "Recurring Deposit (RD)1.Tenure",
    "Recurring Deposit (RD)1.Minimum Deposit",
    "Recurring Deposit (RD)1.Features",
  ],
  [
    "Time Deposit (TD)1.Description",
    "Time Deposit (TD)1.Interest Rates.1 Year",
    "Time Deposit (TD)1.Interest Rates.2 Years",
    "Time Deposit (TD)1.Interest Rates.3 Years",
    "Time Deposit (TD)1.Interest Rates.5 Years",
    "Time Deposit (TD)1.Minimum Deposit",
    "Time Deposit (TD)1.Features",
  ],
  [
    "National Savings Certificate (NSC)1.Description",
    "National Savings Certificate (NSC)1.Interest Rate",
    "National Savings Certificate (NSC)1.Tenure",
    "National Savings Certificate (NSC)1.Minimum Deposit",
    "National Savings Certificate (NSC)1.Features",
  ],
  [
    "Kisan Vikas Patra (KVP)1.Description",
    "Kisan Vikas Patra (KVP)1.Interest Rate",
    "Kisan Vikas Patra (KVP)1.Maturity Period",
    "Kisan Vikas Patra (KVP)1.Minimum Deposit",
    "Kisan Vikas Patra (KVP)1.Features",
  ],
  [
    "Public Provident Fund (PPF)1.Description",
    "Public Provident Fund (PPF)1.Interest Rate",
    "Public Provident Fund (PPF)1.Tenure",
    "Public Provident Fund (PPF)1.Minimum Deposit",
    "Public Provident Fund (PPF)1.Maximum Deposit",
    "Public Provident Fund (PPF)1.Features",
  ],
  [
    "Sukanya Samriddhi Yojana (SSY)1.Description",
    "Sukanya Samriddhi Yojana (SSY)1.Interest Rate",
    "Sukanya Samriddhi Yojana (SSY)1.Tenure",
    "Sukanya Samriddhi Yojana (SSY)1.Minimum Deposit",
    "Sukanya Samriddhi Yojana (SSY)1.Maximum Deposit",
    "Sukanya Samriddhi Yojana (SSY)1.Features",
  ],
  [
    "Senior Citizen Savings Scheme (SCSS)1.Description",
    "Senior Citizen Savings Scheme (SCSS)1.Interest Rate",
    "Senior Citizen Savings Scheme (SCSS)1.Tenure",
    "Senior Citizen Savings Scheme (SCSS)1.Maximum Deposit",
    "Senior Citizen Savings Scheme (SCSS)1.Eligibility",
    "Senior Citizen Savings Scheme (SCSS)1.Features",
  ],
  [
    "Monthly Income Scheme (MIS)1.Description",
    "Monthly Income Scheme (MIS)1.Interest Rate",
    "Monthly Income Scheme (MIS)1.Tenure",
    "Monthly Income Scheme (MIS)1.Maximum Deposit",
    "Monthly Income Scheme (MIS)1.Features",
  ],
];
const pli = [
  [
    "Whole Life Assurance (Suraksha).Description",
    "Whole Life Assurance (Suraksha).Coverage",
    "Whole Life Assurance (Suraksha).Minimum Sum Assured",
    "Whole Life Assurance (Suraksha).Benefits",
  ],
  [
    "Convertible Whole Life Assurance (Suvidha).Description",
    "Convertible Whole Life Assurance (Suvidha).Coverage",
    "Convertible Whole Life Assurance (Suvidha).Minimum Sum Assured",
    "Convertible Whole Life Assurance (Suvidha).Loan Facility",
  ],
  [
    "Endowment Assurance (Santosh).Description",
    "Endowment Assurance (Santosh).Coverage",
    "Endowment Assurance (Santosh).Minimum Sum Assured",
    "Endowment Assurance (Santosh).Bonus",
  ],
  [
    "Joint Life Assurance (Yugal Suraksha).Description",
    "Joint Life Assurance (Yugal Suraksha).Coverage",
    "Joint Life Assurance (Yugal Suraksha).Minimum Sum Assured",
    "Joint Life Assurance (Yugal Suraksha).Bonus",
  ],
  [
    "Anticipated Endowment Assurance (Sumangal).Description",
    "Anticipated Endowment Assurance (Sumangal).Features",
  ],
];
const rpli = [
  ["Gram Suraksha.Description"],
  ["Gram Suvidha.Description"],
  ["Gram Santosh.Description"],
  ["Gram Sumangal.Description"],
  ["Gram Priya.Description"],
];

const Schemes = () => {
  const { t } = useTranslation();
  const { getFontClass } = UserData();
  const [show, setShow] = useState("banking");
  const { isAuth } = AdminData();
  return (
    <div
      className={`w-full min-h-screen ${getFontClass()} flex flex-col gap-2 items-center justify-center`}
    >
      {isAuth ? <Header /> : ""}
      <h1
        className={`${
          isAuth ? "mt-32" : "mt-8"
        } text-center text-black text-2xl font-bold font-serif`}
      >
        {t("Schemes Info")}
      </h1>
      <div className="flex gap-2">
        <button
          onClick={() => setShow("banking")}
          className={`px-4 py-2 rounded-full ${
            show === "banking" ? "bg-primary" : ""
          } border-2 border-black`}
        >
          Savings & Loan
        </button>
        <button
          onClick={() => setShow("insurance")}
          className={`px-4 py-2 rounded-full ${
            show === "insurance" ? "bg-primary" : ""
          } border-2 border-black`}
        >
          Insurance
        </button>
      </div>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-[98%] h-screen flex gap-2 p-4">
          <div className="w-1/4 h-[70%] flex flex-col gap-2 flex-wrap overflow-y-auto">
            <ul className="list-decimal pl-6">
              {show === "banking" &&
                postOfficeSchemes.map(({ index, name }) => (
                  <li
                    key={index}
                    className="w-full mb-4 hover:bg-primary px-4 py-2 rounded-lg"
                  >
                    <a href={`#${index - 1}`}>{name}</a>
                  </li>
                ))}
              {show === "insurance" && (
                <ul className="list-decimal pl-5">
                  <li>Postal Life Insurance</li>
                  <ul className="list-disc pl-7">
                    {pli.length &&
                      pli.map((is, index) => (
                        <li
                          key={index}
                          className="w-full mb-4 hover:bg-primary px-4 py-2 rounded-lg"
                        >
                          <a href={`#${index}`}>{is[0].split(".")[0]}</a>
                        </li>
                      ))}
                  </ul>
                  <li>Rural Postal Life Insurance</li>
                  <ul className="list-disc pl-7">
                    {rpli.length &&
                      rpli.map((ris, index) => (
                        <li
                          key={index}
                          className="w-full mb-4 hover:bg-primary px-4 py-2 rounded-lg"
                        >
                          <a href={`#${index + 6}`}>{ris[0].split(".")[0]}</a>
                        </li>
                      ))}
                  </ul>
                </ul>
              )}
            </ul>
          </div>
          <div className="w-3/4 h-full flex flex-col gap-2">
            {show === "banking" &&
              schemeArray.length &&
              schemeArray.map((scheme, index) => (
                <div
                  key={index}
                  className="w-[90%] bg-secondary p-10 rounded-lg mb-2"
                  id={index + 1}
                >
                  <h1 className="text-4xl mb-4">{scheme[0].split("1")[0]}</h1>
                  {scheme.length &&
                    scheme.map((desc, idx) => (
                      <div key={idx}>
                        <span className="font-bold mr-2">
                          {desc.split(".")[1]}:
                        </span>
                        {t(desc)}
                      </div>
                    ))}
                </div>
              ))}
            {show === "insurance" &&
              pli.length &&
              pli.map((is, index) => (
                <div
                  key={index}
                  className="w-[90%] bg-secondary p-10 rounded-lg mb-2"
                  id={index + 1}
                >
                  <h1 className="text-4xl mb-4">{is[0].split(".")[0]}</h1>
                  {is.length &&
                    is.map((desc, idx) => (
                      <div key={idx}>
                        <span className="font-bold mr-2">
                          {desc.split(".")[1]}:
                        </span>
                        {t(desc)}
                      </div>
                    ))}
                </div>
              ))}
            {show === "insurance" &&
              rpli.length &&
              rpli.map((ris, index) => (
                <div
                  key={index}
                  className="w-[90%] bg-secondary p-10 rounded-lg mb-2"
                  id={index + 6}
                >
                  <h1 className="text-4xl mb-4">{ris[0].split(".")[0]}</h1>
                  {ris.length &&
                    ris.map((desc, idx) => (
                      <div key={idx}>
                        <span className="font-bold mr-2">
                          {desc.split(".")[1]}:
                        </span>
                        {t(desc)}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Schemes;
