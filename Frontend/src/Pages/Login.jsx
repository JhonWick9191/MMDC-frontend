import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../Redux/Slice/AuthSlice";
import { toast, ToastContainer } from "react-toastify"

const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function () {
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const [registerToggle, setRegisterToggle] = useState(false);
    const [loginToggle, setLoginToggle] = useState(true);
    // set form data functions and state update  

    const [LoginFormData, setLoginFromData] = useState({
        email: "",
        password: ""
    })


    // function for change handler while login 

    function chanHandler(event) {
        const { name, value } = event.target;
        setLoginFromData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // async function for login 

    async function loginUserDetials(event) {
        event.preventDefault();

        try {
            const responce = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(LoginFormData),
            })
            const data = await responce.json();
            console.log(data.token)

            console.log("You are loged in this is from login.jex ")
            console.log(data.isExistingUser)
            console.log(data.message)

            if (data.success) {
                toast.success(data.message);

                if (data.token) {
                    console.log(data)


                    // ✅ Save to Redux
                    dispatch(setToken(data.token));
                    dispatch(setUser(data.isExistingUser))
                    console.log(userData)
                    console.log("You are logged in");

                    // ✅ Full page reload + home page redirect
                    // Complete page reload karega

                }

            } else {
                toast.error(data.message);
            }

            Navigate("/")

        } catch (error) {
            console.log(error);
        }
    }

    // login form data function state ends here 

    const [signupForm, setSignupForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confrim_password: "",
        gst_number: "",


    })

    //  change hander for signup 
    function signupChangeHandler(event) {

        const { name, value } = event.target;
        setSignupForm(prev => ({
            ...prev,
            [name]: value
        }))

    }
    // sync function for signup 

    async function signupHandler(event) {
        event.preventDefault();
        try {
            const responce = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ ...signupForm, role: "Vendor" })
            })

            const data = await responce.json();
            console.log(data)


            if (data.success) {
                toast.success(data.message); // green success message
            } else {
                toast.error(data.message); // red error message
            }

            // set the signupdata into local storage 

            // localStorage.setItem("token" ,JSON.stringify(data.token))
            // localStorage.setItem("user" , JSON.stringify(data.existingUser))

            // save this data to redux 

            dispatch(setToken(data.token))
            dispatch(setUser(data.isExistingUser))

            // nevigate to the home page 
            Navigate("/")


        } catch (error) {
            console.log(error)
        }

    }
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
                                <form className="main-signup-form-form" onSubmit={signupHandler}>
                                    <div className="signup-with-two-inputs">
                                        <div className="first-name-signup">
                                            <input
                                                type="text"
                                                placeholder="First Name *"
                                                name="first_name"
                                                value={signupForm.first_name}
                                                onChange={signupChangeHandler}
                                            />
                                        </div>

                                        <div className="last-name-signup">
                                            <input
                                                type="text"
                                                placeholder="Last Name *"
                                                name="last_name"
                                                value={signupForm.last_name}
                                                onChange={signupChangeHandler}
                                            />
                                        </div>

                                    </div>

                                    <div className="confrim-password gst-number">
                                        <input type="text"
                                            placeholder="Enter Email Id *"
                                            name="email"
                                            value={signupForm.email}
                                            onChange={signupChangeHandler}

                                        />
                                    </div>

                                    <div className="signup-password-section">
                                        <div className="choose-password">
                                            <input
                                                type="text"
                                                placeholder="Choose Password *"
                                                name="password"
                                                value={signupForm.password}
                                                onChange={signupChangeHandler}
                                            />
                                        </div>

                                        <div className="confrim-password">
                                            <input
                                                type="text"
                                                placeholder="Cofrim Password *"
                                                name="confrim_password"
                                                onChange={signupChangeHandler}
                                            />
                                        </div>

                                    </div>

                                    <div className="confrim-password gst-number">
                                        <input type="text"
                                            placeholder="Enter GST NO *"
                                            name="gst_number"
                                            value={signupForm.gst_number}
                                            onChange={signupChangeHandler}
                                        />
                                    </div>

                                    <div className="confrim-password mobile-number">
                                        <input type="number"
                                            placeholder="Enter  Mobile.no"
                                            onChange={signupChangeHandler}
                                            name="phone_number"
                                            value={signupForm.phone_number}

                                        />
                                    </div>

                                    {/* <select
                                        name="role"
                                        title="Select Role"
                                        value={signupForm.role}
                                        onChange={signupChangeHandler}
                                         >

                                        <option value="">  Choose Role  </option>
                                        <option value="Vendor">Vendor</option>
                                        <option value="Admin">Admin</option>



                                    </select> */}

                                    <div className="submit-button">
                                        <button type="submit">Register</button>
                                    </div>
                                    <div className="new-user">
                                        <p>
                                            Already have a account  ? <a onClick={handleRegister}>Login</a>
                                        </p>
                                    </div>
                                </form>
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
                                <form onSubmit={loginUserDetials} className="main-signup-form-form">
                                    <div className="login-form">

                                        <input
                                            type="text"
                                            placeholder="Enter Your email"
                                            onChange={chanHandler}
                                            name="email"
                                            value={LoginFormData.email}
                                        />
                                    </div>

                                    <div className="login-form">
                                        <input type="text"
                                            placeholder="Enter Your password"
                                            name="password"
                                            onChange={chanHandler}
                                            value={LoginFormData.password}
                                        />
                                    </div>
                                    <div className="submit-button">
                                        <button type="submit">Proceed</button>
                                    </div>
                                    <div className="new-user">
                                        <p>
                                            New User ? <a onClick={handleRegister}>Create Account</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
