import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Categories", path: "/categories" },
    { name: "Add Food", path: "/addfood" },
    { name: "Inventory", path: "/inventory" },
    { name: "Expiry Reminder", path: "/expiry" },
    { name: "Analytics", path: "/analytics" },
    { name: "Recipes", path: "/recipes" },
    { name: "Profile", path: "/profile" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Food Tracker</h2>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;