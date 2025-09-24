import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

export default function () {
    const [registerToggle, setRegisterToggle] = useState(false);

    const [loginToggle, setLoginToggle] = useState(true); 

    function handleRegister() {
        setRegisterToggle(true);
        setLoginToggle(false); 
    }

    function handleLogin() {
        setRegisterToggle(false);
        setLoginToggle(true); 
    }

    return (
    <>
            <div className="user-login">
                <div className="login-register-user-child">
                    <div className="buttons">
                        <button className={`btns login${loginToggle ? " color" : ""}`} onClick={handleLogin}>
                            LOGIN
                        </button>
                        <button className={`btns regs${registerToggle ? " active" : ""}`} onClick={handleRegister}>
                            REGISTER
                        </button>
                    </div>

                    {registerToggle ? (
                        <div className="main-login-section">
                            <div className="google-or-faceBookOptions">
                                <div className="google">
                                    <button>
                                        <span><FcGoogle /></span> Google
                                    </button>
                                </div>
                                <div className="facebook">
                                    <button>
                                        <span><ImFacebook2 /></span> Facebook
                                    </button>
                                </div>
                            </div>
                            <div className="or-class">
                                <p>-OR-</p>
                            </div>
                            <div className="wrapper-login">

                                <div className="signup-with-two-inputs">

                                    <div className="first-name-signup">
                                        <input type="text" placeholder="First Name *" />
                                    </div>

                                    <div className="last-name-signup">
                                        <input type="text" placeholder="Last Name *" />
                                    </div>

                                </div>

                                <div className="signup-password-section">
                                    <div className="choose-password">
                                        <input type="text" placeholder="Choose Your Password *" />
                                    </div>

                                    <div className="confrim-password">
                                        <input type="text" placeholder="Cofrim Password * " />
                                    </div>

                                    </div>

                                    <div className="confrim-password gst-number">
                                        <input type="text"
                                            placeholder="Enter Your GST NO. *"
                                        />
                                    </div>

                                    <div className="confrim-password mobile-number">
                                        <input type="number"
                                            placeholder="Enter Your Mobile.no"
                                        />
                                    </div>




                                    <div className="submit-button">
                                        <button>Register</button>
                                    </div>
                                    <div className="new-user">
                                        <p>
                                            Already have a account  ? <a onClick={handleRegister}>Login</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            ) : loginToggle ? (
                            // Default login form
                            <div className="main-login-section">
                                <div className="google-or-faceBookOptions">
                                    <div className="google">
                                        <button>
                                            <span><FcGoogle /></span> Google
                                        </button>
                                    </div>
                                    <div className="facebook">
                                        <button>
                                            <span><ImFacebook2 /></span> Facebook
                                        </button>
                                    </div>
                                </div>
                                <div className="or-class">
                                    <p>-OR-</p>
                                </div>
                                <div className="wrapper-login">
                                    <div className="login-form">
                                        <input type="text" placeholder="Enter Your Phone number" />
                                    </div>
                                    <div className="submit-button">
                                        <button>Proceed</button>
                                    </div>
                                    <div className="new-user">
                                        <p>
                                            New User ? <a onClick={handleRegister}>Create Account</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
          ) : null}
                        </div>
      </div>
            </>
            );
}
