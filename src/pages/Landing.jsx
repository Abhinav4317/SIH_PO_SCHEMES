import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FirstHeader from "../components/FirstHeader";
import { Link } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Landing = () => {
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const {currentLanguage}=UserData();
  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline();

    // Animate header from above
    tl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Animate image from below
    tl.fromTo(
      imageRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "<" // Start at the same time as the previous animation
    );
  }, []);

  return (
    <div className="w-full min-h-screen">
      <FirstHeader headerRef={headerRef} />

      <div
        ref={imageRef}
        className="relative w-full h-screen mt-0 flex flex-col lg:flex-row lg:gap-2"
      >
        <div className="hidden lg:block lg:w-3/5 lg:h-full lg:ml-32">
          <img src="/landing_page_png.png" alt="" className="w-full h-full" />
        </div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50 lg:hidden"
          style={{ backgroundImage: "url('/landing_page_png.png')" }}
        ></div>
        <div className="absolute inset-0 flex flex-col bg-black bg-opacity-50 lg:bg-transparent items-center justify-center gap-4 lg:relative lg:w-2/5 lg:h-full lg:items-start lg:justify-start">
          <h1 className="text-white font-bold lg:text-black text-4xl md:text-5xl lg:text-7xl text-center lg:text-left mt-0 md:mt-8">
            {currentLanguage.startsWith("en") == true ? "Explore" : ""}
            {currentLanguage.startsWith("hi") == true ? "खोजें" : ""}
          </h1>
          <h1 className="text-white font-bold lg:text-black text-4xl md:text-5xl lg:text-7xl text-center lg:text-left">
            {currentLanguage.startsWith("en") == true ? "Schemes" : ""}
            {currentLanguage.startsWith("hi") == true ? "योजनाएं" : ""}
          </h1>
          <h1 className="text-white font-bold lg:text-black text-4xl md:text-5xl lg:text-7xl text-center lg:text-left">
            {currentLanguage.startsWith("en") == true ? "with" : ""}{" "}
            <span className="text-primary font-semibold">
              {currentLanguage.startsWith("en") == true ? "Yojna" : ""}
              {currentLanguage.startsWith("hi") == true ? "योजना सहायाक" : ""}
            </span>
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-primary font-semibold text-center lg:text-left">
            {currentLanguage.startsWith("en") == true ? (
              "Yojna"
            ) : (
              <span className="text-black">के साथ!</span>
            )}
          </h1>
          <Link
            to={"/schemes"}
            className="bg-primary px-6 py-4 md:px-8 md:py-6 rounded-lg flex gap-1 items-center justify-center text-white text-xl md:text-2xl mt-4"
          >
            <h2>{currentLanguage.startsWith("en") == true ? "Explore Schemes" : ""}</h2>
            <h2>
              {currentLanguage.startsWith("hi") == true
                ? "योजनाओं के बारे में जानें"
                : ""}
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

/**
 * <div
        ref={imageRef}
        className="w-full h-screen relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/landing_page_png.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            Explore
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            Schemes
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            with <span className="text-primary font-semibold">Yojna</span>
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-primary font-semibold">
            Sahayak!
          </h1>
          <Link
            to={"/schemes"}
            className="bg-primary inline-block px-6 py-4 rounded-lg flex items-center justify-center mt-6 text-white"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl">Explore Schemes</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
 */
