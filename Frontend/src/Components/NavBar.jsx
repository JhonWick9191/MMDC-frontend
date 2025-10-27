import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearch } from "../Context/SearchContaxt";

export default function NavBar() {
  const Cart = useSelector((state) => state.Cart);
  const Wishlist = useSelector((state) => state.Wishlist);
  const token = useSelector((state) => state.auth.token);
  const User = useSelector((state) => state.auth.user);

  const Navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false);
  const [moreButton, setMoreButton] = useState(true);

  // ✅ Search Context
  const { searchQuery, setSearchQuery, handleSearch } = useSearch();

  // ✅ Auto Typing Placeholder State
  const [placeholder, setPlaceholder] = useState("What are you looking for?");
  const words = ["Guitar", "Drums", "Keyboard", "Piano", "Mixers", "Microphone"];

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = words[wordIndex];

    const typeEffect = () => {
      if (!isDeleting) {
        // Typing forward
        charIndex++;
        setPlaceholder(`What are you looking for? ${currentWord.substring(0, charIndex)}`);
        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1000); // pause before deleting
          return;
        }
      } else {
        // Deleting backward
        charIndex--;
        setPlaceholder(`What are you looking for? ${currentWord.substring(0, charIndex)}`);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          currentWord = words[wordIndex];
        }
      }
      setTimeout(typeEffect, isDeleting ? 70 : 120);
    };

    const timeout = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = hamburger ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hamburger]);

  const handleHamburger = () => setHamburger(true);
  const handleCross = () => setHamburger(false);
  const handleMore = () => setMoreButton(!moreButton);

  // ✅ Enter press search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  // ✅ Click search icon
  const handleSearchClick = () => {
    handleSearch();
    Navigate("/searchProducts");
  };

  return (
    <nav className="relative mb-10">
      <div className="wrapper-class-main-nav-bar">
        {/* Logo */}
        <div className="main-logo">
          <img
            onClick={() => Navigate("/")}
            className="main-logo-img"
            src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1757570443/00-music_morelogo-1_g8wl3f.png"
            loading="lazy"
            alt="logo"
          />
        </div>

        {/* ✅ Search Bar with Auto Typing */}
        <div className="search-bar">
          <input
            type="search"
            className="search-bar-main"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* <div className="search-icon" onClick={handleSearchClick}>
            <VscSearch />
          </div> */}
        </div>

        {/* Right Section */}
        <div className="top-right-side-section">
          <ul className="main-profile-section">
            <li onClick={() => Navigate("/wishlistProduct")}>
              {Wishlist.length > 0 && <p>{Wishlist.length}</p>}
              <IoMdHeartEmpty />
            </li>

            <li onClick={() => Navigate("/cartDeatils")}>
              {Cart.length > 0 && <p>{Cart.length}</p>}
              <IoCartOutline />
            </li>

            <li className="profile-logo-in-list">
              {User ? (
                <img
                  onClick={() => Navigate("/profile")}
                  src={User.image || "https://via.placeholder.com/40"}
                  alt="user"
                />
              ) : (
                <span onClick={() => Navigate("/login")}>
                  <CgProfile />
                </span>
              )}
            </li>

            <li onClick={handleHamburger} className="hamburger-icon">
              <RxHamburgerMenu />
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {hamburger && (
        <div className="main-class-nav-bar">
          <div className="mobile-navbar">
            <div className="hamburger-top-section">
              <div className="cross-icon">
                <button onClick={handleCross}>
                  <RxCross2 />
                </button>
              </div>

              <div className="hamburger-logo">
                <img
                  src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1757570443/00-music_morelogo-1_g8wl3f.png"
                  alt="logo"
                />
              </div>

              <div className="signup-login-buttons">
                <div className="sign-up-button-hamburger">
                  <button
                    className="sign-up hamburger-btn"
                    onClick={() => {
                      handleCross();
                      Navigate("/login");
                    }}
                  >
                    {token && User ? (
                      <img
                        className="profile-image-user-mob"
                        src={User.image || "https://via.placeholder.com/40"}
                        alt="profile"
                      />
                    ) : (
                      <CgProfile />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="listng-items-for-products">
              <div className="main-listing-items-categories">
                <h1>
                  Our Products <span><RiArrowDropDownLine /></span>
                </h1>
                <ul>
                  <li>Guitar</li>
                  <li>Drums</li>
                  <li>Keyboards</li>
                </ul>
              </div>

              <div className="more-buttons">
                <h1>
                  More <span onClick={handleMore}><RiArrowDropDownLine /></span>
                </h1>

                {moreButton && (
                  <div className="page-lists">
                    <ul>
                      <li onClick={() => { handleCross(); Navigate("/"); }}>Home</li>
                      <li>About Us</li>
                      <li>Contact Us</li>
                      <li>Track Your Order</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
