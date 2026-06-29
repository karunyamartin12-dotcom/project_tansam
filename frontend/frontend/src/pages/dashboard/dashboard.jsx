import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import API from "../../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const foodRes = await API.get("/food");
      const categoryRes = await API.get("/categories");

      setFoods(foodRes.data);
      setCategories(categoryRes.data);
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const diff =
      (expiry - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) return "expired";
    if (diff <= 7) return "soon";
    return "safe";
  };

  const expired = foods.filter(
    (food) =>
      getStatus(food.expiryDate || food.expiry_date) === "expired"
  ).length;

  const expiringSoon = foods.filter(
    (food) =>
      getStatus(food.expiryDate || food.expiry_date) === "soon"
  ).length;

  return (
    <div>
      <Sidebar />
      <Header />

      <div className="dashboard-content">
        <div className="dashboard">
          <h1>Welcome, {user.name || "User"} 👋</h1>

          <p>Food Inventory Management Dashboard</p>

          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Foods</h3>
              <p>{foods.length}</p>
            </div>

            <div className="card">
              <h3>Total Categories</h3>
              <p>{categories.length}</p>
            </div>

            <div className="card">
              <h3>Expired Items</h3>
              <p>{expired}</p>
            </div>

            <div className="card">
              <h3>Expiring Soon</h3>
              <p>{expiringSoon}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;