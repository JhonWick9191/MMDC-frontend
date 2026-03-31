import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function UserQuery() {

  const token = useSelector((state) => state.auth.token);
  const [userQueryData, setUserQueryData] = useState([]);

  async function gettingallUserData() {
    try {

      console.log("Token:", token);

      const response = await fetch(`https://api.musicandmore.co.in/api/v1/user-query`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",   
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("API Response:", data);

      // 🔥 SAFE SET
      setUserQueryData(Array.isArray(data?.data) ? data.data : []);

    } catch (error) {
      console.error(error);
      console.log("Error while fetching user query data");
    }
  }

  useEffect(() => {
    if (token) {   // 🔥 important
      gettingallUserData();
    }
  }, [token]);

  return (
    <>
      <div className="mmdc-admin-header">
        <h1>User Query</h1>
      </div>

      <div className="main-card-for-user-query">

        {
          userQueryData.length < 0 ? (
            userQueryData.map((item, index) => (
              <div key={index} className="user-query-card">

                <p>Name : {item.firstName}</p>
                <p>Email : {item.email}</p>
                <p>Mobile No : {item.phone}</p>
                <p>Reason : {item.reason}</p>
                <p>Message : {item.message}</p>

              </div>
            ))
          ) : (
            <p>No user queries found</p>
          )
        }

      </div>
    </>
  );
}