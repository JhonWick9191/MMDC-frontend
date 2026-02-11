import React, { useState, useEffect } from "react";

import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearch } from "../Context/SearchContaxt";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavBar() {
  const categoeryesProducts = [
    {
      id: 1,
      name: "Effects"
    },
    {
      id: 2,
      name: "Guitars",

    },
    {
      id: 3,
      name: "Accessories",
    },
    {
      id: 4,
      name: "Ukuleles",

    },
    {
      id: 5,
      name: "Amplifiers",
    },
    {
      id: 6,
      name: "PRO AUDIO AND STUDIO"
    },
    {
      id: 7,
      name: "PIANOS AND KEYBOARDS",
    },
    {
      id: 8,
      name: "DRUMS AND DRUM ACCESSORIES",
    },

    {
      id: 9,
      name: "PROFESSIONAL AUDIOS",
    },
    {
      id: 10,
      name: "Harmonica",
    }


  ]

  const Cart = useSelector((state) => state.Cart);
  const Wishlist = useSelector((state) => state.Wishlist);
  // const token = useSelector((state) => state.auth.token);
  const User = useSelector((state) => state.auth.user);
  useEffect(() => {
    // console.log("Redux user changed:", User);
  }, [User]);

  const Navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false);
  const [moreButton, setMoreButton] = useState(true);

  // ✅ Search Context
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    fetchSuggestions,
    suggestions,
    loadingSuggestions,
    noResultsFound,
    setNoResultsFound
  } = useSearch();

  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("mmdc_search_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);



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
      setTimeout(typeEffect, isDeleting ? 80 : 200);
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

  const handleHamburger = () => { console.log("The hamburger is clicked "), setHamburger(true) };
  const handleCross = () => setHamburger(false);
  const handleMore = () => setMoreButton(!moreButton);

  //  Enter press search
  const handleKeyDown = (e) => {
    const totalItems = searchQuery.trim() ? suggestions.length : searchHistory.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        const selectedValue = searchQuery.trim()
          ? suggestions[selectedIndex]
          : searchHistory[selectedIndex];

        setSearchQuery(selectedValue.trim());
        setSelectedIndex(-1);
        setTimeout(() => handleSearchClick(selectedValue.trim()), 0);
      } else {
        handleSearchClick();
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  //  Searching Products Function
  const handleSearchClick = (queryOverride) => {
    const q = (typeof queryOverride === "string" ? queryOverride : searchQuery)?.trim();

    if (!q) {
      toast.warn("Please enter something to search!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    setSearchHistory(prev => {
      const withoutDup = prev.filter(item => item !== q);
      const newHistory = [q, ...withoutDup].slice(0, 10);
      localStorage.setItem("mmdc_search_history", JSON.stringify(newHistory));
      return newHistory;
    });

    handleSearch();
    Navigate(`/searchProducts?q=${encodeURIComponent(q)}`);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  // Debounce Suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSuggestions(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);



  // code for go to the products with there categoryes 



  function ClickHandler(items) {
    console.log("Button is clicked ")
    console.log(items)
    // nevigate to Product Categoryes like Accessoires , Guitars , etc 
    Navigate(`/products?type=${encodeURIComponent(items)}`);
    handleCross()
  }

  return (
    <nav className="relative">
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(-1);
              setNoResultsFound(false);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => {
              setTimeout(() => setShowDropdown(false), 200);
            }}
          />

          <button className="search-icon" onClick={handleSearchClick}>
            <img src="https://pub-b88455fc17c04e63a0f32324fc1620df.r2.dev/animations/mmdcSearch-icon.gif" />
          </button>

          {/* Suggestions & History Dropdown */}
          {showDropdown && (
            <div className="mmdc-search-dropdown-container">
              {searchQuery.trim() ? (
                // Suggestions List
                <div className="mmdc-suggestions-list">
                  {loadingSuggestions ? (
                    <div className="mmdc-loading-text">Finding...</div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((item, idx) => (
                      <div
                        key={idx}
                        className={`mmdc-dropdown-item ${selectedIndex === idx ? "active" : ""}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSearchClick(item)}
                      >
                        <div className="mmdc-suggestion-info">
                          <p className="mmdc-item-brand">{item}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mmdc-no-results">No product found</div>
                  )}
                </div>
              ) : (
                // History List
                searchHistory.length > 0 && (
                  <div className="mmdc-search-history-container">
                    <p className="mmdc-history-title">Recent Searches</p>
                    {searchHistory.map((item, idx) => (
                      <div
                        key={idx}
                        className={`mmdc-dropdown-item ${selectedIndex === idx ? "active" : ""}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSearchClick(item)}
                      >
                        <VscSearch className="mmdc-history-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}

          {/* Global Error Banner for "Not Found" */}
          {noResultsFound && (
            <div className="mmdc-global-error-banner">
              The product you're looking for might not be available right now.
              <button onClick={() => setNoResultsFound(false)}>✕</button>
            </div>
          )}
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
      <div className="mobile-menu-container">
        {/* for if navbar is true then show main-class-nav-bar perfrom .show  css will do else " " */}
        {/* MODIFIED: Added onClick to close menu when clicking outside (overlay) */}
        <div className={`main-class-nav-bar ${hamburger ? "show" : ""}`} onClick={handleCross}>
          {/* in this line mobile-navbar hamburger is ture then mobile-navbar add with open css  */}
          {/* MODIFIED: Stop propagation so clicking inside menu doesn't close it */}
          <div className={`mobile-navbar ${hamburger ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
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
                  {User ? (
                    <img
                      onClick={() => Navigate("/profile")}
                      src={User.image}
                      alt="user"
                    />
                  ) : (
                    <span onClick={() => Navigate("/login")}>
                      <CgProfile />
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="listng-items-for-products">
              <div className="main-listing-items-categories">
                <h1>
                  Our Products <span><RiArrowDropDownLine /></span>
                </h1>

                {categoeryesProducts.map((items) => (
                  <div key={items.id} onClick={() => ClickHandler(items.name)}>
                    <div className="catogries-nam">
                      <p>{items.name.toUpperCase()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="more-buttons">
                <h1>
                  More <span onClick={handleMore}><RiArrowDropDownLine /></span>
                </h1>

                {moreButton && (
                  <div className="catogries-nam">

                    <p onClick={() => { handleCross(); Navigate("/"); }}>Home</p>
                    <p>About Us</p>
                    <p onClick={() => { handleCross(); Navigate("/ContactUs"); }}>Contact Us</p>


                  </div>
                )}
              </div>

              <div className="login_and_social_media">
                <div className="login-button">



                  {User ? (

                    <img className="user-profile"
                      onClick={() => { handleCross(); Navigate("/profile") }}
                      src={User.image || "https://via.placeholder.com/40"}
                      alt="user"
                    />

                  ) : (

                    <button className="login-button-side-nav" onClick={() => { handleCross(); Navigate("/login"); }}>
                      <CgProfile /> Login
                    </button>
                  )}

                </div>


                <div className="social-media-links on-side-nev">


                  <ul>
                    <li><a href="https://www.facebook.com/Musicandmoreindia"><CiFacebook /></a>  </li>
                    <li><a href="https://www.instagram.com/musicandmoreindia/"> <CiInstagram /> </a></li>
                    <li><a href="https://x.com/"><CiTwitter />  </a></li>
                    <li><CiLinkedin /></li>
                  </ul>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </nav>
  );
}
