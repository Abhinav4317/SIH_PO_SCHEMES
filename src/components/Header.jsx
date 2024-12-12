import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserData } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { AdminData } from "../context/AdminContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuth, logoutHandler, getFontClass } = UserData();
  const { t } = useTranslation();
  const location = useLocation();
  const {
    isAuth: isAdminAuth,
    role,
    logoutHandler: logoutHandlerAdmin,
  } = AdminData();
  return (
    <header
      className={`flex justify-between items-center p-2 bg-white ${getFontClass()}`}
    >
      <nav className="bg-white fixed w-full z-20 top-0 start-0">
        <div className="w-full flex flex-wrap items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link
              to={"/"}
              className="flex items-center w-0 h-0 lg:w-48 lg:h-24 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://res.cloudinary.com/agmern/image/upload/v1733666900/x4o0jdxfbgsrctteihlm.jpg"
                alt="Secondary Logo"
                className="w-full h-full"
              />
            </Link>
            <Link
              to="/"
              className="flex items-center w-36 lg:w-64 border-l border-gray-200 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://res.cloudinary.com/agmern/image/upload/v1733666951/ourilab8jsoml5pau64c.png"
                alt="Logo"
                className="w-full"
              />
            </Link>
          </div>

          <div className="relative flex items-center lg:order-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center mr-2 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            {(isAuth || isAdminAuth) && (user || role) ? (
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-36 flex gap-1 items-center justify-center bg-primary rounded-lg text-lg py-1 px-2 lg:py-2 lg:px-4 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {isAdminAuth ? role : user?.email.split("g")[0]}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg">
                    <button
                      onClick={isAdminAuth ? logoutHandlerAdmin : logoutHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {t("LogOut")}
                    </button>
                    <div className="block px-4 py-2">
                      <LanguageSelector />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex gap-1 items-center justify-center bg-primary rounded-lg text-lg py-1 px-2 lg:py-2 lg:px-4 text-white"
              >
                {t("Login")}
              </Link>
            )}
          </div>
          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:w-auto lg:block`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0">
              <li>
                <Link
                  to="/"
                  className={`block my-2 py-2 px-3 rounded lg:p-0 lg:text-xl ${
                    location.pathname === "/" ? "text-primary" : "text-black"
                  }`}
                  aria-current={location.pathname === "/" ? "page" : undefined}
                >
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/schemes"
                  className={`block my-2 py-2 px-3 rounded lg:p-0 lg:text-xl ${
                    location.pathname === "/schemes"
                      ? "text-primary"
                      : "text-black"
                  }`}
                >
                  {t("Schemes")}
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className={`block my-2 py-2 px-3 rounded lg:p-0 lg:text-xl ${
                    location.pathname === "/feedback"
                      ? "text-primary"
                      : "text-black"
                  }`}
                >
                  {t("Suggestion")}
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className={`block my-2 py-2 px-3 rounded lg:p-0 lg:text-xl ${
                    location.pathname === "/help"
                      ? "text-primary"
                      : "text-black"
                  }`}
                >
                  {t("Help Center")}
                </Link>
              </li>
            </ul>
          </div>

          {/* User Dropdown */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
