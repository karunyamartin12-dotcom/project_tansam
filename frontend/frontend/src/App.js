 import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/Categories/Categories";
import Addfood from "./pages/Addfood/Addfood";
import Inventory from "./pages/Inventory/Inventory";
import Expiry from "./pages/Expiry/Expiry";
import Analytics from "./pages/Analytics/Analytics";
import Recipes from "./pages/Recipes/Recipes";
import Profile from "./pages/Profile/Profile";

// Super Admin Pages
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import ManageUsers from "./pages/ManageUsers/ManageUsers";

// (We'll create this next)
import ManageAdmins from "./pages/ManageAdmins/ManageAdmins";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}
        <Route
          path="/"
          element={<Register />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Admin/User Pages */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/addfood"
          element={<Addfood />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/expiry"
          element={<Expiry />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/recipes"
          element={<Recipes />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Super Admin */}

        <Route
          path="/superadmin"
          element={<SuperAdmin />}
        />

        <Route
          path="/manage-users"
          element={<ManageUsers />}
        />

         <Route
          path="/manage-admins"
          element={<ManageAdmins />}
        />
        

      </Routes>

    </BrowserRouter>
  );
}

export default App;
    