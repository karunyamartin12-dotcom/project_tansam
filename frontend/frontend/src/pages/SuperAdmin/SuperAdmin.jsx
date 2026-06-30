import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";
import "./SuperAdmin.css";

function SuperAdmin() {
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    foods: 0,
    categories: 0,
  });

  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      setUser(loggedUser);
    }

    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const statsRes = await API.get("/superadmin/stats");
      const foodsRes = await API.get("/food");
      const categoriesRes = await API.get("/categories");

      setStats({
        users: statsRes.data.totalUsers,
        admins: statsRes.data.totalAdmins,
        foods: foodsRes.data.length,
        categories: categoriesRes.data.length,
      });
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  return (
    <div className="superadmin-container">
      <Sidebar />

      <div className="superadmin-content">
        <Header />

        <div className="superadmin-header">
          <h1>Welcome, {user.name}</h1>
          <p>Super Admin Control Panel</p>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Total Users</h3>
            <h2>{stats.users}</h2>
          </div>

          <div className="card">
            <h3>Total Admins</h3>
            <h2>{stats.admins}</h2>
          </div>

          <div className="card">
            <h3>Total Food Items</h3>
            <h2>{stats.foods}</h2>
          </div>

          <div className="card">
            <h3>Total Categories</h3>
            <h2>{stats.categories}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdmin;