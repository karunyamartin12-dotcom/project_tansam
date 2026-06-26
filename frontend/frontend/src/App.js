 import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
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