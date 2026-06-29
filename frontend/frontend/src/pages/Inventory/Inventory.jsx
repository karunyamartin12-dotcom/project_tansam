import React, { useState } from "react";
import "./Inventory.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Inventory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const foodItems = [
    {
      id: 1,
      name: "Milk",
      category: "Dairy",
      quantity: 2,
      expiry: "30-Jun-2026",
      status: "Fresh",
    },
    {
      id: 2,
      name: "Bread",
      category: "Bakery",
      quantity: 1,
      expiry: "28-Jun-2026",
      status: "Expired",
    },
    {
      id: 3,
      name: "Apple",
      category: "Fruits",
      quantity: 10,
      expiry: "02-Jul-2026",
      status: "Fresh",
    },
    {
      id: 4,
      name: "Tomato",
      category: "Vegetables",
      quantity: 6,
      expiry: "29-Jun-2026",
      status: "Expiring Soon",
    },
  ];

  const filteredItems = foodItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (status === "All" || item.status === status)
    );
  });

  return (
    <div className="inventory-container">
      <Sidebar />

      <div className="inventory-content">
        <Header />

        <div className="inventory-header">
          <h1>Food Inventory</h1>
          <p>Manage all your food items efficiently.</p>
        </div>

        <div className="inventory-filters">
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Dairy</option>
            <option>Bakery</option>
            <option>Beverages</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Fresh</option>
            <option>Expiring Soon</option>
            <option>Expired</option>
          </select>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.expiry}</td>
                <td>{item.status}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Inventory;