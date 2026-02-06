import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function PendingUsersView() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://api.musicandmore.co.in/api/v1/pendingUsers`);
            const data = await res.json();

            if (data.success) {
                setPendingUsers(data.users || []);
            } else {
                toast.error(data.message || "Failed to fetch pending users");
            }
        } catch (error) {
            console.error("Error fetching pending users:", error);
            toast.error("An error occurred while fetching pending users");
        } finally {
            setLoading(false);
        }
    };

    // APPROVE USER
    const handleApprove = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/approveUser/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "approve" })
            });

            const data = await res.json();

            if (data.success) {
                setPendingUsers(pendingUsers.filter(u => u._id !== id));
                toast.success(data.message || "User approved successfully");
            } else {
                toast.error(data.message || "Approval failed");
            }

        } catch (error) {
            console.log("Approve error:", error);
            toast.error("An error occurred during approval");
        }
    };

    // DENY USER
    const handleDeny = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/approveUser/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "deny" })
            });

            const data = await res.json();

            if (data.success) {
                setPendingUsers(pendingUsers.filter(u => u._id !== id));
                toast.success(data.message || "User denied successfully");
            } else {
                toast.error(data.message || "Deny failed");
            }

        } catch (error) {
            console.log("Deny error:", error);
            toast.error("An error occurred during denial");
        }
    };

    const confirmApprove = (id) => {
        const ok = window.confirm("Are you sure you want to approve this user?");
        if (!ok) return;
        handleApprove(id);
    };

    const confirmDeny = (id) => {
        const ok = window.confirm("Are you sure you want to deny this user?");
        if (!ok) return;
        handleDeny(id);
    };

    return (
        <div className="mmdc-admin-pending-users">
            <div className="mmdc-admin-header">
                <h1>Pending Users</h1>
                <p className="mmdc-admin-subtitle">Review and manage recent user registrations</p>
            </div>

            <div className="mmdc-table-container">
                {loading ? (
                    <p>Loading pending users...</p>
                ) : pendingUsers.length === 0 ? (
                    <p>No pending users found.</p>
                ) : (
                    <table className="mmdc-admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>GST Number</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gst_number || "N/A"}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <div className="mmdc-admin-action-btns">
                                            <button
                                                className="mmdc-btn-deny"
                                                onClick={() => confirmDeny(user._id)}
                                            >
                                                Deny
                                            </button>
                                            <button
                                                className="mmdc-btn-allow"
                                                onClick={() => confirmApprove(user._id)}
                                            >
                                                Allow
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
