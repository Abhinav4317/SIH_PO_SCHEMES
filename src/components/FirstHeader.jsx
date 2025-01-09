import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { UserData } from "../context/UserContext";
import { useState } from "react";

const FirstHeader = ({ headerRef }) => {
  const { t } = useTranslation();
  const { getFontClass } = UserData();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      ref={headerRef}
      className={`flex flex-col md:flex-row justify-between items-center p-2 bg-white ${getFontClass()}`}
    >
      <div className="w-full flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Link
            to={"/"}
            className="flex items-center w-0 h-0 lg:w-48 lg:h-16 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://res.cloudinary.com/agmern/image/upload/v1733666900/x4o0jdxfbgsrctteihlm.jpg"
              alt=""
              className="w-full h-full"
            />
          </Link>
          <Link
            to="/"
            className="flex items-center w-64 lg:border-l border-gray-200 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://res.cloudinary.com/agmern/image/upload/v1733666951/ourilab8jsoml5pau64c.png"
              alt=""
              className="w-full"
            />
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <button
          className="block md:hidden text-black text-2xl focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "\u2715" : "\u2630"} {/* Cross and Hamburger Icons */}
        </button>

        {/* Buttons and Language Selector for large screens */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to={"/login"}
            className="flex gap-1 items-center justify-center bg-primary rounded-lg text-lg py-1 px-2 lg:py-2 lg:px-4 text-white"
          >
            {t("LogIn")}
          </Link>
          <Link
            to={"/feedback"}
            className="flex gap-1 items-center justify-center bg-black rounded-lg text-lg md:flex py-1 px-2 lg:py-2 lg:px-4 text-white"
          >
            {t("Suggestion")}
          </Link>
          <LanguageSelector />
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {menuOpen && (
        <div className="flex flex-col items-start gap-2 mt-2 md:hidden w-full px-4">
          <ul className="list-none w-full">
            <li className="w-full text-left py-2 pl-2 rounded-lg border-b border-gray-200 hover:bg-primary">
              <Link to={"/login"} className="text-black text-lg">
                {t("LogIn")}
              </Link>
            </li>
            <li className="w-full text-left py-2 pl-2 rounded-lg border-b border-gray-200 hover:bg-primary">
              <Link to={"/feedback"} className="text-black text-lg">
                {t("Suggestion")}
              </Link>
            </li>
            <li className="w-full text-left py-2">
              <LanguageSelector />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default FirstHeader;
