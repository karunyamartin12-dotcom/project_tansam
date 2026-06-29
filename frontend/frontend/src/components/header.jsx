import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <h2>🍎 Smart Food Expiry Tracker</h2>
      </div>

      <nav className="header-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <div className="header-user">
        <span>Welcome, Admin</span>
        <button className="logout-btn">Logout</button>
      </div>
    </header>
  );
}

export default Header;