
import React, { useState, useEffect } from "react";

const RotatingLogo = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY / 3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Function to scroll to top on click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling animation
    });
  };

  return (
    <div className="moving-image-animation" onClick={scrollToTop}>
      <img
        src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1762515032/LOGO_3_bswo17.png"
        alt="logo"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.1s linear",
          cursor: "pointer", 
        }}
      />
    </div>
  );
};

export default RotatingLogo;
