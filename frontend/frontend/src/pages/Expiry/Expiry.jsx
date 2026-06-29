import React from "react";
import "./Expiry.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Expiry() {

  const expiryItems = [
    {
      id: 1,
      name: "Milk",
      category: "Dairy",
      expiryDate: "28-Jun-2026",
      status: "Expired",
    },
    {
      id: 2,
      name: "Bread",
      category: "Bakery",
      expiryDate: "29-Jun-2026",
      status: "Today",
    },
    {
      id: 3,
      name: "Apple",
      category: "Fruits",
      expiryDate: "03-Jul-2026",
      status: "5 Days Left",
    },
    {
      id: 4,
      name: "Tomato",
      category: "Vegetables",
      expiryDate: "04-Jul-2026",
      status: "6 Days Left",
    },
  ];

  return (
    <div className="expiry-container">
      <Sidebar />

      <div className="expiry-content">
        <Header />

        <div className="expiry-header">
          <h1>Expiry Reminder</h1>
          <p>Monitor food items nearing their expiry dates.</p>
        </div>

        <div className="summary-cards">

          <div className="summary-card expired">
            <h2>5</h2>
            <p>Expired Items</p>
          </div>

          <div className="summary-card today">
            <h2>2</h2>
            <p>Expiring Today</p>
          </div>

          <div className="summary-card upcoming">
            <h2>8</h2>
            <p>Next 7 Days</p>
          </div>

        </div>

        <table className="expiry-table">

          <thead>
            <tr>
              <th>Food Name</th>
              <th>Category</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {expiryItems.map((item) => (

              <tr key={item.id}>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.expiryDate}</td>

                <td>
                  <span
                    className={
                      item.status === "Expired"
                        ? "status-expired"
                        : item.status === "Today"
                        ? "status-today"
                        : "status-upcoming"
                    }
                  >
                    {item.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Expiry;