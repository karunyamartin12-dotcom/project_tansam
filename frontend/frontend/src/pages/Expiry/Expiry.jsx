import React, { useEffect, useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./Expiry.css";

function Expiry() {
  const [foods, setFoods] = useState([]);

 const fetchFoods = async () => {
  try {
    const res = await API.get("/food");

    const normalized = res.data.map((item) => ({
      id: item.id,
      foodName: item.foodName || item.food_name,
      expiryDate: item.expiryDate || item.expiry_date,
      category: item.category_name || item.category,
      quantity: item.quantity,
    }));

    setFoods(normalized);
  } catch (error) {
    console.log("Error fetching foods:", error.message);
  }
};

  useEffect(() => {
    fetchFoods();
  }, []);

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "expired";
    if (diffDays === 0) return "today";
    if (diffDays <= 7) return "upcoming";
    return "upcoming";
  };

  // Summary counts
  const expiredCount = foods.filter(
    (f) => getStatus(f.expiryDate) === "expired"
  ).length;

  const todayCount = foods.filter(
    (f) => getStatus(f.expiryDate) === "today"
  ).length;

  const upcomingCount = foods.filter(
    (f) => getStatus(f.expiryDate) === "upcoming"
  ).length;

  return (
    <div className="expiry-container">
      <Sidebar />

      <div className="expiry-content">
        <Header />

        {/* Header */}
        <div className="expiry-header">
          <h1>Expiry Tracker</h1>
          <p>Monitor expired and upcoming food items</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card expired">
            <h2>{expiredCount}</h2>
            <p>Expired</p>
          </div>

          <div className="summary-card today">
            <h2>{todayCount}</h2>
            <p>Expires Today</p>
          </div>

          <div className="summary-card upcoming">
            <h2>{upcomingCount}</h2>
            <p>Expiring Soon</p>
          </div>
        </div>

        {/* Table */}
        <table className="expiry-table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food) => {
              const status = getStatus(food.expiryDate);

              return (
                <tr key={food.id}>
                  <td>{food.foodName}</td>
                  <td>{food.category_name || food.category}</td>
                  <td>{food.quantity}</td>
                  <td>{food.expiryDate}</td>
                  <td>
                    <span className={`status-${status}`}>
                      {status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expiry;