import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-logo">
        <h2>🍎 Smart Food Expiry Tracker</h2>
      </div>

      <nav className="header-nav">
        {user?.role === "superadmin" ? (
          <Link to="/superadmin">Super Dashboard</Link>
        ) : (
          <Link to="/dashboard">Dashboard</Link>
        )}

        <Link to="/categories">Categories</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <div className="header-user">
        <span>
          Welcome, <strong>{user?.name || "User"}</strong>
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;