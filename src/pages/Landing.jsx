import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FirstHeader from "../components/FirstHeader";
import { Link } from "react-router-dom";

const Landing = () => {
  const headerRef = useRef(null);
  const imageRef = useRef(null);
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

      <div ref={imageRef} className="w-full max-h-screen mt-0 flex gap-2">
        <div className="w-3/5 h-full ml-32">
          <img src="/landing_page_png.png" alt="" className="w-full h-full" />
        </div>
        <div className="w-2/5 h-full flex flex-col gap-2">
          <h1 className="text-7xl mt-16">Explore</h1>
          <h1 className="text-7xl">Schemes</h1>
          <h1 className="text-7xl">
            with <span className="text-primary font-semibold">Yojna</span>
          </h1>
          <h1 className="text-7xl text-primary font-semibold">Sahayak!</h1>
          <Link
            to={"/schemes"}
            className="bg-primary w-[400px] px-6 py-6 rounded-lg flex gap-1 items-center justify-center mt-6 text-white"
          >
            <h2 className="text-2xl">Explore Schemes</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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
