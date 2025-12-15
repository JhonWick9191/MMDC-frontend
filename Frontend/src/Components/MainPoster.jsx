import React, { useState, useEffect, useRef } from "react";
import image_01 from "./MobileImagesPosters/1.JPEG"
import image_02 from "./MobileImagesPosters/2.JPEG"
import image_03 from "./MobileImagesPosters/3.JPEG"
const DesktopPosterImage = [
  { id: 1, image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762935467/banner_vfnbdo.png" },
  { id: 2, image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762951748/banner_2_zae1l4.png" },
  { id: 3, image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1763034168/4_va7zw4.png" },
  { id: 4, image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1763029634/3_lam3yf.png" },
];

const MobilePosterImage = [
  { id: 1, image: image_01 },
  { id: 2, image: image_02 },
  { id: 3, image: image_03 },
  { id: 4, image: image_01 },
];

export default function MainPoster() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragTranslate, setDragTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const sliderRef = useRef(null);

  const PosterImage = isMobile ? MobilePosterImage : DesktopPosterImage;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PosterImage.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [PosterImage.length]);

  const onDragStart = (clientX) => {
    setDragStart(clientX);
  };

  const onDragMove = (clientX) => {
    if (dragStart !== null) {
      const deltaX = clientX - dragStart;
      setDragTranslate(deltaX);
    }
  };

  const onDragEnd = () => {
    const threshold = 50;
    if (dragTranslate > threshold) {
      setCurrentIndex((prev) => (prev === 0 ? PosterImage.length - 1 : prev - 1));
    } else if (dragTranslate < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % PosterImage.length);
    }
    setDragStart(null);
    setDragTranslate(0);
  };

  const handleMouseDown = (e) => onDragStart(e.clientX);
  const handleMouseMove = (e) => { if (dragStart !== null) onDragMove(e.clientX); };
  const handleMouseUp = () => onDragEnd();

  const handleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => onDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => onDragEnd();

  const containerWidth = sliderRef.current?.offsetWidth || 0;
  const percentTranslate =
    -(currentIndex * 100) + (dragTranslate / containerWidth) * 100;

  return (
    <div
      className="slider-container"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: dragStart !== null ? "grabbing" : "grab", userSelect: "none" }}
    >
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(${percentTranslate}%)`,
          transition: dragStart ? "none" : "transform 0.4s ease",
        }}
      >
        {PosterImage.map((item) => (
          <img
            key={item.id}
            className="slider-image margin-top-5"
            src={item.image}
            alt={`poster-${item.id}`}
            draggable={false}
          />
        ))}
      </div>

      <div className="dots-container">
        {PosterImage.map((item, index) => (
          <span
            key={item.id}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
