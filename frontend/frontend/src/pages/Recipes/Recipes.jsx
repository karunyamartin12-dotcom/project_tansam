import React, { useEffect, useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./Recipes.css";

function Recipe() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  const fetchFoods = async () => {
    try {
      const res = await API.get("/food");
      setFoods(res.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // expiry check
  const getStatus = (date) => {
    const today = new Date();
    const expiry = new Date(date);

    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "expired";
    if (diff <= 7) return "soon";
    return "safe";
  };

  // only usable foods
  const usableFoods = foods.filter(
    (f) => getStatus(f.expiryDate || f.expiry_date) !== "expired"
  );

  // filter by search
  const filteredFoods = usableFoods.filter((f) =>
    (f.foodName || f.food_name)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // group by category
  const grouped = filteredFoods.reduce((acc, item) => {
    const category = item.category_name || item.category || "Others";

    if (!acc[category]) acc[category] = [];
    acc[category].push(item);

    return acc;
  }, {});

  return (
    <div className="recipes-container">
      <Sidebar />

      <div className="recipes-content">
        <Header />

        {/* HEADER */}
        <div className="recipes-header">
          <h1>Recipes 🍽️</h1>
          <p>Cook with what you already have</p>
        </div>

        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search ingredients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* GRID */}
        <div className="recipe-grid">
          {Object.keys(grouped).length === 0 ? (
            <p>No recipes found</p>
          ) : (
            Object.keys(grouped).map((category, index) => (
              <div className="recipe-card" key={index}>
                <h2>{category}</h2>

                <h4>Ingredients</h4>
                <p>
                  {grouped[category]
                    .map((f) => f.foodName || f.food_name)
                    .join(", ")}
                </p>

                <h4>Status</h4>
                <p>
                  {grouped[category].length} items available in this category
                </p>

                <button>View Recipe</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipe;