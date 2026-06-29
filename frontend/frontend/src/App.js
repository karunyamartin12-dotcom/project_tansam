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
//import Users from "./pages/users/users";
//import Admins from "./pages/admins/admins";
//import Roles from "./pages/roles/roles";
//import AdminDashboard from "./pages/admin/admindashboard/admindashboard";
function App() {

 return (

  <BrowserRouter>

   <Routes>

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
/><Route
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
/><Route
  path="/profile"
  element={<Profile />}
/>
    {/*<Route
 path="/users"
 element={<Users />}
/>
    <Route
 path="/admins"
 element={<Admins />}
/>
    <Route
 path="/roles"
 element={<Roles />}
/>
    <Route
      path="/admin-dashboard"
      element={<AdminDashboard />}
    /> */}

   </Routes>

  </BrowserRouter>

 );

}

export default App;