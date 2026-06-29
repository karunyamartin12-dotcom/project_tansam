import React, { useEffect, useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./Analytics.css";

function Analytics() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const foodRes = await API.get("/food");
      const catRes = await API.get("/categories");

      setFoods(foodRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // expiry logic
  const getStatus = (date) => {
    const today = new Date();
    const expiry = new Date(date);

    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "expired";
    if (diff <= 7) return "soon";
    return "good";
  };

  const expiredCount = foods.filter(
    (f) => getStatus(f.expiryDate || f.expiry_date) === "expired"
  ).length;

  const soonCount = foods.filter(
    (f) => getStatus(f.expiryDate || f.expiry_date) === "soon"
  ).length;

  const safeCount = foods.filter(
    (f) => getStatus(f.expiryDate || f.expiry_date) === "good"
  ).length;

  return (
    <div className="analytics-container">
      <Sidebar />

      <div className="analytics-content">
        <Header />

        {/* HEADER */}
        <div className="analytics-header">
          <h1>Analytics Dashboard</h1>
          <p>Food inventory insights</p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="analytics-cards">
          <div className="analytics-card">
            <h2>{foods.length}</h2>
            <p>Total Foods</p>
          </div>

          <div className="analytics-card">
            <h2>{categories.length}</h2>
            <p>Total Categories</p>
          </div>

          <div className="analytics-card">
            <h2>{expiredCount}</h2>
            <p>Expired Items</p>
          </div>

          <div className="analytics-card">
            <h2>{soonCount}</h2>
            <p>Expiring Soon</p>
          </div>

          <div className="analytics-card">
            <h2>{safeCount}</h2>
            <p>Safe Items</p>
          </div>
        </div>

        {/* CATEGORY ANALYSIS (STATIC UI as per your CSS) */}
        <div className="category-analysis">
          <h2>Category Analysis</h2>

          <div className="progress-item">
            <span>Fruits</span>
            <div className="progress">
              <div className="progress-bar fruits"></div>
            </div>
          </div>

          <div className="progress-item">
            <span>Vegetables</span>
            <div className="progress">
              <div className="progress-bar vegetables"></div>
            </div>
          </div>

          <div className="progress-item">
            <span>Dairy</span>
            <div className="progress">
              <div className="progress-bar dairy"></div>
            </div>
          </div>

          <div className="progress-item">
            <span>Bakery</span>
            <div className="progress">
              <div className="progress-bar bakery"></div>
            </div>
          </div>

          <div className="progress-item">
            <span>Beverages</span>
            <div className="progress">
              <div className="progress-bar beverages"></div>
            </div>
          </div>
        </div>

        {/* SUMMARY BOX */}
        <div className="analytics-summary">
          <h2>Summary</h2>
          <p className="good">
            {safeCount} items are in good condition ✔
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;