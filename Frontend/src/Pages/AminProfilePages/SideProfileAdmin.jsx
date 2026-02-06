import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setToken, setUser } from "../../Redux/Slice/AuthSlice";
import AdminDashboardHome from "./AdminDashboardHome";
import PendingUsersView from "./PendingUsersView";
import AdminUploadFileView from "./AdminUploadFileView";
import { toast } from "react-toastify";

export default function SideBadr() {
  const Nevigate = useNavigate();
  const User = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");

  const logoutHandler = async () => {
    try {
      const response = await fetch(`https://api.musicandmore.co.in/api/v1/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        dispatch(setToken(null));
        dispatch(setUser(null));
        toast.success(data.message || "Logout successful!");
        Nevigate("/login");
      } else {
        dispatch(setToken(null));
        dispatch(setUser(null));
        toast.success("State cleared"); // Still redirect even if API error
        Nevigate("/login");
      }
    } catch (error) {
      dispatch(setToken(null));
      dispatch(setUser(null));
      Nevigate("/login");
    }
  };

  return (
    <div className="mmdc-admin-layout">
      <aside className="mmdc-admin-sidebar">
        <div className="mmdc-admin-logo">MMDC ADMIN</div>

        <nav>
          <ul className="mmdc-admin-nav">
            <li
              className={`mmdc-admin-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`mmdc-admin-nav-item ${activeTab === "pendingUsers" ? "active" : ""}`}
              onClick={() => setActiveTab("pendingUsers")}
            >
              Pending Users
            </li>
            <li
              className={`mmdc-admin-nav-item ${activeTab === "uploadFile" ? "active" : ""}`}
              onClick={() => setActiveTab("uploadFile")}
            >
              Upload File
            </li>
          </ul>
        </nav>

        <button className="mmdc-admin-footer-btn" onClick={logoutHandler}>
          Log out
        </button>
      </aside>

      <main className="mmdc-admin-main">
        {activeTab === "dashboard" && <AdminDashboardHome />}
        {activeTab === "pendingUsers" && <PendingUsersView />}
        {activeTab === "uploadFile" && <AdminUploadFileView />}
      </main>
    </div>
  );
}


