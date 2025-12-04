import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function AdminNotifiaction() {
    const [users, setUsers] = useState([]);

    useEffect(() => { 
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const res = await fetch(`${BASE_URL}/pendingUsers`);
            const data = await res.json();

            if (data.success) {
                setUsers(data.users);
            }

        } catch (error) {
            console.log("Error fetching pending users:", error);
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
                setUsers(users.filter(u => u._id !== id));
            }

        } catch (error) {
            console.log("Approve error:", error);
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
                setUsers(users.filter(u => u._id !== id));
            }

        } catch (error) {
            console.log("Deny error:", error);
        }
    };

    // -------------------------
    // CONFIRM FUNCTIONS (ADDED)
    // -------------------------
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
        <div>
            <h2>Pending Users</h2>
            <hr></hr>
            <div className="main-pending-class-page">
            {users.length === 0 ? (
                <p>No pending users</p>
            ) : (
                users.map(user => (
                    <div className="pending-users" key={user._id}>
                        <h4>{user.first_name} {user.last_name}</h4>
                        <hr></hr>
                        <p>Email: {user.email}</p>
                        <hr></hr>
                        <p>Phone: {user.phone_number}</p>
                        <hr></hr>
                        <p>GST: {user.gst_number}</p>

                        <div className="buttons-main-approve">
                            
                            <button 
                                className="button-approve red-back"
                                onClick={() => confirmDeny(user._id)}
                            >
                                Deny
                            </button>

                            <button 
                                className="button-approve back-green"
                                onClick={() => confirmApprove(user._id)}
                            >
                                Approve
                            </button>

                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
    );
}
