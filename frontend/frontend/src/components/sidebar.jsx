import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // Super Admin Menu
  const superAdminMenu = [
    { name: "Super Dashboard", path: "/superadmin" },
    { name: "Manage Users", path: "/manage-users" },
    { name: "Manage Admins", path: "/manage-admins" },
    { name: "Categories", path: "/categories" },
    { name: "Add Food", path: "/addfood" },
    { name: "Inventory", path: "/inventory" },
    { name: "Expiry Reminder", path: "/expiry" },
    { name: "Analytics", path: "/analytics" },
    { name: "Recipes", path: "/recipes" },
    { name: "Profile", path: "/profile" },
  ];

  // Admin/User Menu
  const normalMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Categories", path: "/categories" },
    { name: "Add Food", path: "/addfood" },
    { name: "Inventory", path: "/inventory" },
    { name: "Expiry Reminder", path: "/expiry" },
    { name: "Analytics", path: "/analytics" },
    { name: "Recipes", path: "/recipes" },
    { name: "Profile", path: "/profile" },
  ];

  const menuItems =
    role === "superadmin" ? superAdminMenu : normalMenu;

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