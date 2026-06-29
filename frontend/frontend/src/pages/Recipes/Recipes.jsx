import React, { useState } from "react";
import "./Recipes.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Recipes() {
  const [search, setSearch] = useState("");

  const recipes = [
    {
      id: 1,
      name: "Fruit Salad",
      ingredients: "Apple, Banana, Orange",
      preparation: "Mix all fruits together and serve chilled.",
    },
    {
      id: 2,
      name: "Veg Sandwich",
      ingredients: "Bread, Tomato, Cheese",
      preparation: "Layer the ingredients between bread slices.",
    },
    {
      id: 3,
      name: "Banana Milkshake",
      ingredients: "Milk, Banana, Sugar",
      preparation: "Blend all ingredients and serve cold.",
    },
    {
      id: 4,
      name: "Vegetable Soup",
      ingredients: "Carrot, Tomato, Onion",
      preparation: "Boil vegetables, blend them, and season to taste.",
    },
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="recipes-container">
      <Sidebar />

      <div className="recipes-content">
        <Header />

        <div className="recipes-header">
          <h1>Recipe Suggestions</h1>
          <p>Prepare delicious meals using the food available in your inventory.</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search recipe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <h2>{recipe.name}</h2>

              <h4>Ingredients</h4>
              <p>{recipe.ingredients}</p>

              <h4>Preparation</h4>
              <p>{recipe.preparation}</p>

              <button>View Recipe</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipes;