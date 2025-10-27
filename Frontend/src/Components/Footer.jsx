import { TextHoverEffect } from "../Components/ui/text-hover-effect"
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { MdCopyright } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
export default function Footer() {

    return (
        <>
        <section>


                <footer>
                    <div className="wrapper-footer">
                        
                         {/* <TextHoverEffect text="MMDC" /> */}
                        
                        <div className="main-footer-class">
                            <div className="footer-left">

                                <div className="logo">

                                    <img src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1757939573/00-music_morelogo-white_w5mjoi.png"></img>

                                </div>

                                <div className="para-content">

                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, error!</p>

                                </div>

                                <div className="social-media-links">
                                    <ul>
                                        <li> <CiFacebook/> </li>
                                         <li> <CiInstagram/> </li>
                                          <li><CiTwitter/></li>
                                           <li><CiLinkedin/></li>
                                    </ul>

                                </div>

                            </div>

                            <div className="footer-mid">

                                     <div>     

                                    <h1 className="footer-heading">Need Help</h1>                  

                                 <ul>

                                    <li>Contact Us</li>
                                     <li>Track Order</li>
                                      <li>FAQs</li>
                                       <li>My Account</li>
                                </ul>
                                  </div>
                                <div className="">                                
                                 <h1 className="footer-heading">Need Help</h1>
                                <ul>
                                    <li>About Us </li>
                                     <li>Carrers</li>
                                      
                                </ul>

                                </div>

                           

                            </div>

                            <div className="footer-right">

                                <div className="right-content">
                                    <p>Stay in the loop with our weekly newsletter</p>
                                </div>

                                <div>
                                <div className="sign-up-button">

                                    <button className="signUp">
                                        Signup Now 
                                    </button>
                                   
                                </div>
                                </div>

                          

                             

                            </div>
                            
                        </div>

                         

                         <h1 className="text-black copy-right text-center flex items-center gap-1 "><b><MdCopyright /></b>COPYRIGHT 2025 - 2026</h1>

                    </div>
                </footer>
            </section>
           
            
        </>
    )

}