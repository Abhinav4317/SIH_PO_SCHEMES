import { UserData } from "../context/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isAuth, logoutHandler } = UserData();
  return (
    <header className="flex justify-between items-center p-4 bg-secondary">
      <Link to={"/"} className="w-72">
        <img
          src="https://res.cloudinary.com/agmern/image/upload/v1733151115/ywgwtmztp50yldwonefy.jpg"
          alt=""
          className="w-full"
        />
      </Link>
      <div className="flex gap-12 uppercase text-lg text-white">
        <Link to={"/"} className="font-semibold text-black">
          Home
        </Link>
        <Link to={"/"} className="font-semibold text-black">
          About
        </Link>
        <Link to={"/"} className="font-semibold text-black">
          Explore Nearby Museums
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
      )}
    </header>
  );
};

export default Header;
