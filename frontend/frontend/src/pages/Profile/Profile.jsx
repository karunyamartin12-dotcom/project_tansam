import React, { useState } from "react";
import "./Profile.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@example.com",
    phone: "9876543210",
    location: "Chennai",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-container">
      <Sidebar />

      <div className="profile-content">
        <Header />

        <div className="profile-header">
          <h1>My Profile</h1>
          <p>View and update your profile information.</p>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </div>

          <button className="update-btn">
            Update Profile
          </button>

        </form>

      </div>
    </div>
  );
}

export default Profile;