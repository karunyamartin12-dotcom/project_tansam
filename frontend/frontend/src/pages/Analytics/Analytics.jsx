import React from "react";
import "./Analytics.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Analytics() {
  return (
    <div className="analytics-container">
      <Sidebar />

      <div className="analytics-content">
        <Header />

        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>Track your food inventory statistics and performance.</p>
        </div>

        <div className="analytics-cards">

          <div className="analytics-card">
            <h2>85</h2>
            <p>Total Food Items</p>
          </div>

          <div className="analytics-card">
            <h2>12</h2>
            <p>Expired Items</p>
          </div>

          <div className="analytics-card">
            <h2>73</h2>
            <p>Fresh Items</p>
          </div>

          <div className="analytics-card">
            <h2>8</h2>
            <p>Expiring Soon</p>
          </div>

        </div>

        <div className="category-analysis">

          <h2>Food Categories</h2>

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

        <div className="analytics-summary">

          <h2>Inventory Summary</h2>

          <p>Total Categories : <strong>5</strong></p>

          <p>Expiring Within 7 Days : <strong>8</strong></p>

          <p>Inventory Health : <strong className="good">Good ✅</strong></p>

        </div>

      </div>
    </div>
  );
}

export default Analytics;