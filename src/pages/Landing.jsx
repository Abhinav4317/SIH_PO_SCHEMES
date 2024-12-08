import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FirstHeader from "../components/FirstHeader";

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
      <div ref={imageRef} className="w-full max-h-screen">
        <img
          src="https://res.cloudinary.com/agmern/image/upload/v1733667035/ghbyubfqmjiibk6ezuew.png"
          alt=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Landing;
