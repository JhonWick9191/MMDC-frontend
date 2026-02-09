import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import BuyProduct from "./BuyProducts";
import { setToken, setUser } from "../../Redux/Slice/AuthSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Toast notification ke liye

const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function SideBadr() {
  const Nevigate = useNavigate();
  const User = useSelector((state) => state.auth.user);
  const [activeContent, setActiveContent] = useState("orders");
  const dispatch = useDispatch();

  // ✅ Updated logout handler with API call
  const logoutHandler = async () => {
    console.log("Logout button clicked");

    try {
      // Step 1: Call backend logout API
      const response = await fetch(`https://api.musicandmore.co.in/api/v1/logout`, {
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

  return (
    <div className="mmdc-admin-layout">
      <aside className="mmdc-admin-sidebar">
        <div className="mmdc-admin-logo">MMDC USER</div>

        {/* User Details Section - Styled to fit sidebar */}
        <div style={{ padding: "0 1rem", marginBottom: "1rem" }}>
          <p style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#333", margin: 0 }}>
            {User?.first_name || "User"} {User?.last_name || ""}
          </p>
          <p style={{ fontSize: "0.75rem", color: "#666", margin: 0, wordBreak: "break-all" }}>
            {User?.email || "user@example.com"}
          </p>
        </div>

        <nav>
          <ul className="mmdc-admin-nav">
            <li
              className={`mmdc-admin-nav-item ${activeContent === "orders" ? "active" : ""}`}
              onClick={() => setActiveContent("orders")}
            >
              Orders
            </li>
            <li
              className={`mmdc-admin-nav-item ${activeContent === "notifications" ? "active" : ""}`}
              onClick={() => setActiveContent("notifications")}
            >
              Notifications
            </li>
            <li
              className={`mmdc-admin-nav-item ${activeContent === "faq" ? "active" : ""}`}
              onClick={() => setActiveContent("faq")}
            >
              FAQ
            </li>
          </ul>
        </nav>

        <button className="mmdc-admin-footer-btn" onClick={logoutHandler}>
          Log out
        </button>
      </aside>

      <main className="mmdc-admin-main">
        {activeContent === "orders" && <BuyProduct />}
        {activeContent === "notifications" && <h1>Notifications</h1>}
        {activeContent === "faq" && <h1>FAQ</h1>}
      </main>
    </div>
  );
}
