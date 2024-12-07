import { Link } from "react-router-dom";

const FirstHeader = ({ headerRef }) => {
  return (
    <header
      ref={headerRef}
      className="flex justify-between items-center p-2 bg-white"
    >
      <div className="w-full flex flex-wrap items-center justify-center sm:gap-20 md:gap-40 lg:gap-80 p-4">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center w-36 lg:w-64 space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo_white_3.png" alt="" className="w-full" />
          </Link>
          <Link
            to={"/"}
            className="flex items-center w-0 h-0 lg:w-48 lg:h-16 border-l border-gray-200 space-x-3 rtl:space-x-reverse"
          >
            <img src="/ip_logo.jpg" alt="" className="w-full h-full" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={"/login"}
            className="flex gap-1 items-center justify-center bg-primary rounded-lg text-lg py-1 px-2 lg:py-2 lg:px-4 text-white"
            style={{
              boxShadow: "4px 4px 8px rgba(72, 46, 29,0.6)",
            }}
          >
            Sign-In
          </Link>
          <Link
            to={"/feedback"}
            className="flex gap-1 items-center justify-center bg-black rounded-lg text-lg md:flex py-1 px-2 lg:py-2 lg:px-4 text-white"
            style={{
              boxShadow: "4px 4px 8px rgba(72, 46, 29,0.6)",
            }}
          >
            Feedback
          </Link>
        </div>
      </div>
    </header>
  );
};
export default FirstHeader;
