import React, { useState, useEffect, useRef } from "react";
import image_01 from "./MobileImagesPosters/1.JPEG"
import image_02 from "./MobileImagesPosters/2.JPEG"
import image_03 from "./MobileImagesPosters/3.JPEG"
import { useNavigate } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const DesktopPosterImage = [
  {
    product_id: 1000,
    _id: "hardcoded-1000",
    Brand_Name: "Fender",
    Model_number: "123456",
    Product_Category: "Electric Guitar",
    Product_Discripction: "Player II Modified Stratocaster HSS features a premium alder body, modern C-shaped maple neck, and versatile HSS pickup configuration for classic Fender tones with enhanced clarity and punch.",
    Product_Name: "Player II Modified Stratocaster HSS",
    Product_Quantity: 5,
    Product_price: 20500,
    Product_Type: "Guitars",
    VenderTex_Rate: 0.18,
    Vendor_price: 15000,
    new: "yes",
    __v: 0,
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/banners/PLAYER%20II%20MODIFIED%20STRATOCASTER%20HSS.gif",
    image_01: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/fender/Player%20II%20Modified%20Stratocaster%C2%AE%20HSS/Olympic%20Pearl/op.jpg",
    image_02: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/fender/Player%20II%20Modified%20Stratocaster%C2%AE%20HSS/Olympic%20Pearl/02.avif",
    image_03: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/fender/Player%20II%20Modified%20Stratocaster%C2%AE%20HSS/Olympic%20Pearl/01.avif",
    image_04: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/fender/Player%20II%20Modified%20Stratocaster%C2%AE%20HSS/Olympic%20Pearl/03.avif",
  },
  {
    product_id: 1001,
    _id: "hardcoded-1001",
    Brand_Name: "Fender",
    Model_number: "0145623010",
    Product_Category: "Electric Guitar",
    Product_Discripction: "Player Stratocaster delivers classic Strat tone with modern playability. Alder body, maple neck, and SSS pickup configuration for versatile Fender sound.",
    Product_Name: "Player Stratocaster PF",
    Product_Quantity: 8,
    Product_price: 18500,
    Product_Type: "Guitars",
    VenderTex_Rate: 0.18,
    Vendor_price: 14000,
    new: "yes",
    __v: 0,
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/banners/Nitro%20pro%20amp%201.png",
    image_01: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Nitro%20Amp%20Pro/assets_47c5d023e7b3451a86ac03602c65dce8_92174729ec3c475fba8d20c71b6c4ab6%20(1).webp",
    image_02: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Nitro%20Amp%20Pro/alesis.webp",
    image_03: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Nitro%20Amp%20Pro/assets_47c5d023e7b3451a86ac03602c65dce8_7926d1e0f6ac400aa96f850920481a8d.webp",
  }
];

const MobilePosterImage = [
  { id: 1, image: image_01 },
  { id: 2, image: image_02 },
  { id: 3, image: image_03 },
  { id: 4, image: image_01 },
];

export default function MainPoster() {
  const Nevigate = useNavigate()
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
    }, 10000);
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

  
  const goPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? PosterImage.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PosterImage.length);
  };

  const containerWidth = sliderRef.current?.offsetWidth || 0;
  const percentTranslate =
    -(currentIndex * 100) + (dragTranslate / containerWidth) * 100;

  return (
    <>
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
      <div className="decrement">
        <button onClick={goPrevious}> <GrPrevious/> </button> 
      </div>
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(${percentTranslate}%)`,
          transition: dragStart ? "none" : "transform 0.4s ease",
        }}
      >
        {PosterImage.map((item, index) => (  
          <img
            key={item.id || item.product_id || index}  
            className="slider-image margin-top-5"
            src={isMobile ? item.image : item.banner_image} 
            alt={`poster-${item.id || item.product_id}`}
            loading="lazy"
            draggable={false}
            style={{ cursor: "pointer" }}  
            onClick={() => {
              if (!isMobile) {  
                console.log("✅ Navigating with:", item);
                Nevigate("/productDetails", { state: item });
              }
            }}
          />
        ))}
      </div>

     <div className="increment">
        <button onClick={goNext}> <GrNext/> </button>  
      </div>
    

     
    </div>
  <div className="dots-container">
        {PosterImage.map((item, index) => (
          <span
            key={item.id || item.product_id || index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

    </>
  );
}
