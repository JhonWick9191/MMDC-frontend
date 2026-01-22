import { TextHoverEffect } from "../Components/ui/text-hover-effect"
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { MdCopyright } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
export default function Footer() {
    const Navigate = useNavigate()
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

    function ClickHandler(items) {
        console.log("Button is clicked ")
        console.log(items)
        // nevigate to Product Categoryes like Accessoires , Guitars , etc 
        Navigate(`/products?type=${items}`);
    }

    return (
        <>
            <section>


                <footer>
                    <div className="wrapper-footer">

                        <div className="logo-main-footer">

                            <img src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1757939573/00-music_morelogo-white_w5mjoi.png"></img>

                        </div>



                        <div className="main-footer-class">


                            <div className="footer-mid">

                                <div>

                                    <h1 className="footer-heading">OUR PRODUCTS </h1>

                                    {categoeryesProducts.map((items) => (
                                        <div className="" key={items.id} onClick={() => ClickHandler(items.name)}>


                                            <div className="catogries-nam">
                                                <p>{items.name.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    ))
                                    }


                                </div>

                                <div>

                                    <h1 className="footer-heading">PAGES </h1>

                                    <ul className="footer-pages-links">

                                        <li>Home</li>
                                        <li>About us </li>
                                        <li>Term's And Condition's </li>
                                        <li>My Account </li>
                                    </ul>
                                </div>
                                <div className="">
                                    <h1 className="footer-heading">Need Help</h1>
                                    <ul className="con-footer">
                                        <li>Contact us </li>
                                        <li>FAQs </li>
                                    </ul>
                                </div>
                            </div>



                            <div className="footer-right">


                                <div className="right-content">
                                    <div className="para-content-para">                                    
                                    <p>Get updates on our latest products and sales</p>
                                    </div>

                                    <div className="sign-up-button">

                                    <button className="signUp">
                                        Signup Now
                                    </button>

                                </div>

                                   
                                </div>

                                

                                <div className="para-content">

                                    <p>We are a leading music products distribution company in India, offering high-quality products from renowned international brands all in one place. Our mission is to bring the best musical instruments and accessories to artists and music lovers across the country.</p>

                                </div>


                                <div className="social-media-links">

                                    <p>JOIN OUR COMMUNITY </p>
                                    <ul>
                                        <li><a href="https://www.facebook.com/Musicandmoreindia"><CiFacebook /></a>  </li>
                                        <li><a href="https://www.instagram.com/musicandmoreindia/"> <CiInstagram /> </a></li>
                                        <li><a href="https://x.com/"><CiTwitter />  </a></li>
                                        <li><CiLinkedin /></li>
                                    </ul>

                                </div>

                                <div>

                                </div>





                            </div>

                        </div>

                        <div className="main-copy-right-class copy-right">
                            <h1 className="text-black  text-center flex items-center gap-1 "><b><MdCopyright /></b>2025 MUSIC AND MORE . ALL RIGHT RESEREVED</h1>
                        </div>




                    </div>
                </footer>
            </section>


        </>
    )

}