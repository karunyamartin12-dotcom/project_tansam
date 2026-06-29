import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./Inventory.css";

function Inventory() {
  const [foods, setFoods] = useState([]);

  // GET ALL FOOD
  const fetchFoods = async () => {
    try {
      const res = await API.get("/food");
      setFoods(res.data);
    } catch (error) {
      console.log("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // DELETE FOOD
  const handleDelete = async (id) => {
    try {
      await API.delete(`/food/${id}`);
      fetchFoods(); // refresh list
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

  return (
    <div className="inventory-container">
      <h1>Inventory</h1>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Food Name</th>
            <th>Category ID</th>
            <th>Quantity</th>
            <th>Purchase Date</th>
            <th>Expiry Date</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.food_name}</td>
              <td>{item.category_name}</td>
              <td>{item.quantity}</td>
              <td>{item.purchase_date}</td>
              <td>{item.expiry_date}</td>
              <td>{item.storage_location}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;