import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="profile-container">
      <Sidebar />

      <div className="profile-content">
        <Header />

        <div className="profile-card">
          <h1>Profile 👤</h1>

          <div className="profile-info">
            <p>
              <strong>Name:</strong>{" "}
              {user?.name || "Not available"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user?.email || "Not available"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user?.role || "User"}
            </p>

            <p>
              <strong>User ID:</strong>{" "}
              {user?.id || "Not available"}
            </p>

            <p>
              <strong>Age:</strong>{" "}
              {user?.age || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;