import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import BuyProduct from "./BuyProducts";
import { setToken, setUser } from "../../Redux/Slice/AuthSlice";
import { useDispatch } from "react-redux";
export default function SideBadr() {
  const Nevigate = useNavigate();
  const User = useSelector((state) => state.auth.user);
  
  // Step 1: Add state to control visible content
  const [activeContent, setActiveContent] = useState("orders");
   const dispatch = useDispatch()
  function logoutHandler() {
    console.log("This is logout handler ");
    // Your existing logout code
      dispatch(setToken(null));
      dispatch(setUser(null));
      
      Nevigate("/login")
      console.log("Button is Clicked")
  }

  // Step 2: Update onClick handlers to set this state instead of (or along with) navigation
  return (
    <>
      <div className="main-wrapper-for-user-profile">
        <div className="side-bar-buttons">
          <nav>
            <div className="main-profile-page-user-profile">
              <ul>
                <li>{User.first_name} {User.last_name}</li>
                <li>{User.email}</li>
              </ul>
            </div>

            <div>
              <ul>
                <li onClick={() => setActiveContent("orders")}>Orders</li>
                <li onClick={() => setActiveContent("notifications")}>Notifications</li>
                <li onClick={() => setActiveContent("faq")}>FAQ</li>
              </ul>
            </div>

            <div className="user-profile-buttons">
              <button onClick={logoutHandler}>Log out</button>
              <button>Delete my Account</button>
            </div>
          </nav>
        </div>

        {/* Step 3: Conditionally render content based on activeContent */}
        <div className="main-content-right-side-product-user">
          {activeContent === "orders" && (
            <BuyProduct/>
          )}
          {activeContent === "notifications" && (
            <h1>Notifications</h1> // Replace or expand as needed
          )}
          {activeContent === "faq" && (
            <h1>FAQ</h1>
          )}
        </div>
      </div>
    </>
  );
}
