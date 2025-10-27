import React, { useState, useEffect, useRef } from "react";

const PosterImage = [
  { id: 1, image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757337859/11111_eoy6fh.jpg" },
  { id: 2, image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757337859/11111_eoy6fh.jpg" },
  { id: 3, image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757337859/11111_eoy6fh.jpg" },
  { id: 4, image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757337859/11111_eoy6fh.jpg" },
];

export default function MainPoster() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragTranslate, setDragTranslate] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PosterImage.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Mouse / Touch handlers
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
      // swipe right - previous image
      setCurrentIndex((prev) => (prev === 0 ? PosterImage.length - 1 : prev - 1));
    } else if (dragTranslate < -threshold) {
      // swipe left - next image
      setCurrentIndex((prev) => (prev + 1) % PosterImage.length);
    }
    setDragStart(null);
    setDragTranslate(0);
  };

  // Mouse events

  const handleMouseDown = (e) => onDragStart(e.clientX);
  const handleMouseMove = (e) => { if (dragStart !== null) onDragMove(e.clientX); };
  const handleMouseUp = () => onDragEnd();

  // Touch events
  const handleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => onDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => onDragEnd();


  const containerWidth = sliderRef.current?.offsetWidth || 0;
  const percentTranslate = -(currentIndex * 100) + (dragTranslate / containerWidth) * 100;

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
        style={{ transform: `translateX(${percentTranslate}%)`, transition: dragStart ? "none" : "transform 0.4s ease" }}
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
