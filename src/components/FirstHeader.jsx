import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { UserData } from "../context/UserContext";
const FirstHeader = ({ headerRef }) => {
  const { t } = useTranslation();
  const { getFontClass } = UserData();
  return (
    <header
      ref={headerRef}
      className={`flex justify-between items-center p-2 bg-white ${getFontClass()}`}
    >
      <div className="w-full flex items-center justify-center md:gap-10 lg:gap-80 p-2">
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
            className="flex items-center w-36 lg:w-64 border-l border-gray-200 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://res.cloudinary.com/agmern/image/upload/v1733666951/ourilab8jsoml5pau64c.png"
              alt=""
              className="w-full"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2">
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
    </header>
  );
};
export default FirstHeader;
