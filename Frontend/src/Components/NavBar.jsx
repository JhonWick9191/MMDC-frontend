import React, { useState  ,useEffect} from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Tuple } from "@reduxjs/toolkit";

// Categories with submenu, "Other" has [null]


export default function NavBar() {
    const Cart = useSelector((state) => state.Cart)
    const Wishlist = useSelector((state) => state.Wishlist)


    const CartLength = Cart.length
    const Navigate = useNavigate();

    // importing use navegiate 
    

    // handle hamburger button

    const [hamburger, setHamburger] = useState(true)
    const [moreButton, setMoreButton] = useState(true)


    function handleHamburger() {
        console.log("This is hamburger button")
        setHamburger(true)
    }

    function handleMore() {
        console.log("More button is clicked")
        setMoreButton(true)
    }

    function handleCross() {
        console.log("Handle cross button ")
        setHamburger(false)
    }

    // when my mobile nav is open then it will not srcoll down 

      useEffect(() => {

    if (hamburger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
   
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hamburger]);

    return (
        <>
            <nav className="relative">
                <div className="wrapper-class-main-nav-bar">
                    <div className="main-logo">
                        <img
                            onClick={() => Navigate("/")}
                            className="main-logo-img"
                            src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1757570443/00-music_morelogo-1_g8wl3f.png"
                            loading="lazy"
                            alt="logo image"
                        />


                    </div>
                    <div className="search-bar">
                        <input
                            type="search"
                            className="search-bar-main"
                            placeholder="What Are You looking For ?"
                        />
                        <div className="secrch-icon">
                            <i>
                                <VscSearch />
                            </i>
                        </div>
                    </div>
                    <div className="top-right-side-section">
                        <ul className="main-profile-section">
                            <li onClick={() => Navigate("/login")}>
                                <CgProfile />
                            </li>
                            <li onClick={() => Navigate("/wishlistProduct")}>
                                {
                                    Wishlist.length > 0 ? (
                                        <p>{Wishlist.length}</p>
                                    ) : null
                                }

                                <IoMdHeartEmpty />

                            </li>
                            <li onClick={() => Navigate("/cartDeatils")}>

                                {
                                    CartLength > 0 ? (
                                        <p>{CartLength}</p>
                                    ) : null
                                }

                                <IoCartOutline />

                            </li>
                            <li onClick={handleHamburger} className="hamburger-icon">
                                <RxHamburgerMenu />
                            </li>
                        </ul>
                    </div>
                </div>

                {
                    hamburger ? (
                        <div className="main-class-nav-bar">
                            <div className="mobile-navbar">

                                <div className="hamburger-top-section">

                                    <div className="cross-icon">

                                        <button onClick={handleCross}><RxCross2 /></button>
                                    </div>
                                    <div className="hamburger-logo">

                                        <img src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1757570443/00-music_morelogo-1_g8wl3f.png" />
                                    </div>

                                    <div className="signup-login-buttons">
                                        <div className="sign-up-button-hamburger">
                                            <button className="sign-up hamburger-btn" onClick={()=> { handleCross() ,Navigate("/login")}}>
                                                Login / Register
                                            </button>
                                        </div>


                                    </div>


                                </div>

                                <div className="listng-items-for-products">

                                    <div className="main-listing-items-categories">
                                        <h1>Our Products <span><RiArrowDropDownLine /></span> </h1>
                                        <ul>

                                            <li>Guiter</li>
                                            <li>Guiter</li>
                                            <li>Guiter</li>
                                            <li>Guiter</li>
                                            <li>Guiter</li>
                                            <li>Guiter</li>
                                            <li>Guiter</li>
                                            <li>Guiter</li>

                                        </ul>
                                    </div>

                                    <div className="more-buttons">
                                        <h1>More <span onClick={handleMore}><RiArrowDropDownLine /></span> </h1>

                                        {
                                            moreButton ? (
                                                  <div className="page-lists">
                                                    <ul>
                                                        <li onClick={()=>{handleHamburger , Navegate("/")}}>Home </li>
                                                        <li>About Us </li>
                                                        <li>Contact Us </li>
                                                        <li>Track Your Order </li>
                                                    </ul>
                                                </div>
                                            ) : null
                                              
            
                                        }
                                    </div>



                                </div>
                            </div>
                        </div>

                    ) : null
                }




            </nav>
        </>
    );
}
