import React, { useState, useEffect, useRef } from "react";
import image_01 from "./MobileImagesPosters/1.jpeg"
import image_02 from "./MobileImagesPosters/2.jpeg"
import image_03 from "./MobileImagesPosters/3.jpeg"
import { useNavigate } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";




const DesktopPosterImage = [
  {
    product_id: 998,
    _id: "hardcoded-1000",
    Brand_Name: "Akai",
    Model_number: "Thump 212XT",
    Product_Category: "Speakers",
    Product_Discripction: "Enhance your next set with Thump212XT, the next evolution of our full-featured Thump Series powered loudspeakers. Packed with more time-saving features than ever, tons of power, and an all-new cabinet, Thump212XT is the ultimate loudspeaker for DJs, bands, and clubs that need pro sound without the insane price tag.",
    Product_Name: "Thump 212XT",
    Product_Quantity: 22,
    Product_price: 56332,

    Product_Type: "Speakers",
    VenderTex_Rate: 0.18,
    Vendor_price: 45066,
    new: "yes",
    __v: 0,
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/Thump%20212xt.png",
    image_01: "https://mackie.com/img/pic_hero_desktop/Thump212_212xt_header_image.png",


  },
  {
    product_id: 999,
    _id: "hardcoded-1000",
    Brand_Name: "Akai",
    Model_number: "MPC XL",
    Product_Category: "MPC",
    Product_Discripction: "MPC XL has everything you need for pro-level music making. It features ultra-responsive MPCe pads, a dedicated step sequencer, touch-sensitive Q-Links with OLED displays, a next-gen 8-core processor, 16 GB RAM, hands-on performance controls, advanced sequencing tools, deep I/O connectivity, and so much more. Integrated with MPC3 OS, this system supports up to 32 plugin instruments, 16 audio tracks, and 256 voices, making it a studio-grade workhorse",
    Product_Name: "MPC XL",
    Product_Quantity: 5,
    Product_price: 222956,

    Product_Type: "Amplifiers",
    VenderTex_Rate: 0.18,
    Vendor_price: 345582,
    new: "yes",
    __v: 0,
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/Akai%20MPC%20XL%201.png",
    image_01: "https://cdn.builder.io/api/v1/image/assets%2F47c5d023e7b3451a86ac03602c65dce8%2F377e222fc51e4f9c9f1ed80d56639956?format=webp&width=2000",
    image_02: "https://cdn.builder.io/api/v1/image/assets%2F47c5d023e7b3451a86ac03602c65dce8%2Fae140207c61642489f61d7b7132a916d?format=webp&width=2000",
    image_03: "https://cdn.builder.io/api/v1/image/assets%2F47c5d023e7b3451a86ac03602c65dce8%2F1e709e45a3704e64a09e2550991f7203?format=webp&width=2000",

  },
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
    Brand_Name: "Alesis",
    Model_number: "Nitro Amp Pro",
    Product_Category: "Amplifiers",
    Product_Discripction: "The Alesis Nitro Amp Pro is a compact drum speaker, featuring 80 watts of drum-amplifying power, an 8” woofer that delivers accurate low-end response, a 2.5” tweeter for brilliant high-end, and Bluetooth Audio streaming with separate volume control all within one floor-wedge design. ",
    Product_Name: "Nitro Amp Pro",
    Product_Quantity: 8,
    Product_price: 18500,
    Product_Type: "Guitars",
    VenderTex_Rate: 0.18,
    Vendor_price: 14000,
    new: "yes",
    __v: 0,
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/banners/Nitro%20pro%20amp%202.png",
    image_01: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Nitro%20Amp%20Pro/assets_47c5d023e7b3451a86ac03602c65dce8_92174729ec3c475fba8d20c71b6c4ab6%20(1).webp",
    image_02: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Nitro%20Amp%20Pro/alesis.webp",
    image_03: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Nitro%20Amp%20Pro/assets_47c5d023e7b3451a86ac03602c65dce8_7926d1e0f6ac400aa96f850920481a8d.webp",
  },
  {
    product_id: 1001,
    _id: "hardcoded-1001",
    Brand_Name: "",
    Model_number: "0145623010",
    Product_Category: "Drum",
    Product_Discripction: "Player Stratocaster delivers classic Strat tone with modern playability. Alder body, maple neck, and SSS pickup configuration for versatile Fender sound.",
    Product_Name: "Alesis Turbo Max Drum Kit",
    Product_Quantity: 8,
    Product_price: 18500,
    Product_Type: "Drum Kit",
    VenderTex_Rate: 0.18,
    Vendor_price: 14000,
    new: "yes",
    __v: 0,
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/banners/banner%202%20(1).png",
    image_01: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Turbo%20Max%20Drum%20Kit/01.jpg",
    image_02: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Turbo%20Max%20Drum%20Kit/02.jpg",
    image_03: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Turbo%20Max%20Drum%20Kit/03.jpg",
    image_04: "https://pub-219c51a1b6864520b8a85846ef9d8a5f.r2.dev/new/alesis/Alesis%20Turbo%20Max%20Drum%20Kit/04.jpg",
  }
];

const MobilePosterImage = [
  {
    ...DesktopPosterImage[0],
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/Thump%20212xt_phone.png",
  },
  {
    ...DesktopPosterImage[1],
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/Akai%20MPC%20XL_phone.png",
  },
  {
    ...DesktopPosterImage[2],
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/Player%20II%20Modified%20Stratocaster%20(2).png"
  },
  {
    ...DesktopPosterImage[3],
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/banners/amp.png"
  },
  {
    ...DesktopPosterImage[4],
    banner_image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/banners/Player%20II%20Modified%20Stratocaster.png"
  }
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
          <button onClick={goPrevious}> <GrPrevious /> </button>
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
              src={item.banner_image}
              alt={`poster-${item.id || item.product_id}`}
              loading="lazy"
              draggable={false}
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log(" Navigating with:", item);
                Nevigate("/productDetails", { state: item });
              }}
            />
          ))}
        </div>

        <div className="increment">
          <button onClick={goNext}> <GrNext /> </button>
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
