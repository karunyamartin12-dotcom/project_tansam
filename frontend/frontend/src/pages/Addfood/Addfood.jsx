import React, { useState } from "react";
import "./Addfood.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";

function AddFood() {
  const [food, setFood] = useState({
    foodName: "",
    category: "",
    quantity: "",
    purchaseDate: "",
    expiryDate: "",
    location: "",
  });

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 SAVE TO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        food_name: food.foodName,
        category_id: food.category,
        quantity: food.quantity,
        purchase_date: food.purchaseDate,
        expiry_date: food.expiryDate,
        storage_location: food.location,
      };

      console.log("Sending to backend:", payload);

      await API.post("/foods", payload);

      alert("Food added successfully!");

      // reset form
      setFood({
        foodName: "",
        category: "",
        quantity: "",
        purchaseDate: "",
        expiryDate: "",
        location: "",
      });

    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      alert("Failed to add food");
    }
  };

  const handleReset = () => {
    setFood({
      foodName: "",
      category: "",
      quantity: "",
      purchaseDate: "",
      expiryDate: "",
      location: "",
    });
  };

  return (
    <div className="addfood-container">
      <Sidebar />

      <div className="addfood-content">
        <Header />

        <div className="addfood-header">
          <h1>Add Food Item</h1>
          <p>Add new food items to your inventory.</p>
        </div>

        <form className="food-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="foodName"
            value={food.foodName}
            onChange={handleChange}
            placeholder="Food name"
            required
          />

          <select
            name="category"
            value={food.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="1">Fruits</option>
            <option value="2">Vegetables</option>
            <option value="3">Dairy</option>
            <option value="4">Bakery</option>
            <option value="5">Beverages</option>
          </select>

          <input
            type="number"
            name="quantity"
            value={food.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
          />

          <input
            type="date"
            name="purchaseDate"
            value={food.purchaseDate}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="expiryDate"
            value={food.expiryDate}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            value={food.location}
            onChange={handleChange}
            placeholder="Storage location"
          />

          <div className="button-group">
            <button type="submit" className="save-btn">
              Save Food
            </button>

            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddFood;