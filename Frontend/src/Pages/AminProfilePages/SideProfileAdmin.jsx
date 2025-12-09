import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
// import BuyProduct from "./UserOrderDeatils";
import TotalBrands from "./TotalBrandProducts";
import { setToken, setUser } from "../../Redux/Slice/AuthSlice";
import { useDispatch } from "react-redux";
import AdminNotifiaction from "./AdminNotification";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function SideBadr() {
  const Nevigate = useNavigate();
  const User = useSelector((state) => state.auth.user);
  
  // Step 1: Add state to control visible content
  const [activeContent, setActiveContent] = useState("orders");
   const dispatch = useDispatch()
 
    const logoutHandler = async () => {
       console.log("Logout button clicked");
   
       try {
         // Step 1: Call backend logout API
         const response = await fetch(`${BASE_URL}/logout`, {
           method: "POST",
           credentials: "include", // httpOnly cookie bhejne ke liye zaroori
           headers: {
             "Content-Type": "application/json",
           },
         });
   
         const data = await response.json();
         console.log("Logout API response:", data);
   
         if (data.success) {
           // Step 2: Redux state clear karo
           dispatch(setToken(null));
           dispatch(setUser(null));
   
           // Step 3: Success toast
           toast.success(data.message || "Logout successful!");
   
           // Step 4: Redirect to login
           Nevigate("/login");
         } else {
           // API success false, phir bhi state clear kar do
           dispatch(setToken(null));
           dispatch(setUser(null));
           toast.error(data.message || "Logout failed");
           Nevigate("/login");
         }
       } catch (error) {
         console.error("Logout error:", error);
   
         // Network error ya API fail hone par bhi state clear
         dispatch(setToken(null));
         dispatch(setUser(null));
         
         toast.error("Logout failed. Please try again.");
         Nevigate("/login");
       }
   
       console.log("Logout process completed");
     };

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
                 <li onClick={() => setActiveContent("Total Products")}>Total Products </li>
                {/* <li onClick={() => setActiveContent("orders")}>Orders</li> */}
                <li onClick={() => setActiveContent("notifications")}>Notifications</li>
                <li onClick={() => setActiveContent("faq")}>FAQ</li>
              </ul>
            </div>

            <div className="user-profile-buttons">
              <button onClick={logoutHandler}>Log out</button>
           
            </div>
          </nav>
        </div>

        {/* Step 3: Conditionally render content based on activeContent */}
        <div className="main-content-right-side-product-user">
          {
            activeContent === "Total Products" &&(
                <TotalBrands/>
            )
          }
          {/* {activeContent === "orders" && (
            <BuyProduct/>
          )} */}
          {activeContent === "notifications" && (
           <AdminNotifiaction/>
          )}
          {activeContent === "faq" && (
            <h1>FAQ</h1>
          )}
        </div>
      </div>
    </>
  );
}
