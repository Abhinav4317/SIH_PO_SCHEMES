import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserData } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuth, logoutHandler } = UserData();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <header className="flex justify-between items-center p-2 bg-white">
      <nav className="bg-white fixed w-full z-20 top-0 start-0">
        <div className="w-full flex flex-wrap items-center justify-between p-4">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center w-36 lg:w-64 space-x-3 rtl:space-x-reverse"
            >
              <img src="/logo_white_3.png" alt="" className="w-full" />
            </Link>
            <Link
              to={"/"}
              className="flex items-center w-0 h-0 lg:w-48 lg:h-24 border-l border-gray-200 space-x-3 rtl:space-x-reverse"
            >
              <img src="/ip_logo.jpg" alt="" className="w-full h-full" />
            </Link>
          </div>

          {/* Buttons and Hamburger Menu */}
          <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            {isAuth ? (
              <div className="flex gap-2">
                <Link
                  to={"/"}
                  className="flex gap-1 items-center justify-center bg-primary rounded-lg text-lg py-1 px-2 lg:py-2 lg:px-4 text-white"
                  style={{
                    boxShadow: "4px 4px 8px rgba(72, 46, 29,0.6)",
                  }}
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

                  {!!user && <div>{user?.email.split("g")[0]}</div>}
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex gap-1 items-center justify-center bg-secondary rounded-lg text-lg hidden md:flex py-1 px-2 lg:py-2 lg:px-4 text-primary shadow-md shadow-primary"
                >
                  LogOut
                </button>
              </div>
            ) : (
              <div className="flex gap-2 z-20">
                <Link
                  to={"/login"}
                  className="flex gap-1 items-center justify-center bg-primary rounded-lg text-lg py-1 px-2 lg:py-2 lg:px-4 text-white"
                  style={{
                    boxShadow: "4px 4px 8px rgba(72, 46, 29,0.6)",
                  }}
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

                  {"User Login"}
                </Link>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          </div>

          {/* Navigation Links */}
          <div>
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
                    location.pathname === "/about"
                      ? "text-primary"
                      : "text-black"
                  }`}
                >
                  {t("Help Center")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

{
  /* <Link to={"/"} className="w-72">
        <img
          src="https://res.cloudinary.com/agmern/image/upload/v1733151115/ywgwtmztp50yldwonefy.jpg"
          alt=""
          className="w-full"
        />
      </Link>
      <div className="flex gap-12 uppercase text-lg text-white">
        <Link to={"/"} className="font-semibold text-black">
          {t("Home")}
        </Link>
        <Link to={"/"} className="font-semibold text-black">
          {t("About")}
        </Link>
        <Link to={"/"} className="font-semibold text-black">
          {t("Explore")}
        </Link>
      </div>
      {isAuth ? (
        <div className="flex gap-2">
          <Link
            to={"/"}
            className="flex gap-1 items-center justify-center bg-primary rounded-lg text-lg py-2 px-4 text-white"
            style={{
              boxShadow: "4px 4px 8px rgba(72, 46, 29,0.6)",
            }}
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

            {!!user && <div>{user?.email.split("g")[0]}</div>}
          </Link>
          <button
            onClick={logoutHandler}
            className="flex gap-1 items-center justify-center bg-secondary rounded-lg text-lg py-2 px-4 text-primary shadow-md shadow-primary"
          >
            LogOut
          </button>
        </div>
      ) : (
        <div className="flex gap-2 z-20">
          <Link
            to={"/login"}
            className="flex gap-1 items-center justify-center bg-primary rounded-lg text-lg py-2 px-4 text-white"
            style={{
              boxShadow: "4px 4px 8px rgba(72, 46, 29,0.6)",
            }}
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

            {"User Login"}
          </Link>
        </div>
      )} */
}
