import "./login.css";

import { useState } from "react";

import {
 useNavigate
} from "react-router-dom";

import BASE_URL from "../../services/api";

function Login() {

 const navigate =
 useNavigate();

 const [form,setForm] =
 useState({

   email:"",
   password:""

 });

 const handleChange=(e)=>{

   setForm({
    ...form,
    [e.target.name]:
    e.target.value
   });

 };

const handleSubmit = async (e) => {

  e.preventDefault();

  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem(
    "token",
    data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  if (data.user.role === "superadmin") {

    navigate("/dashboard");

  } else if (data.user.role === "admin") {

    navigate("/admin-dashboard");

  } else {

    navigate("/dashboard");

  }

};

 return(

  <div className="login-container"> 

   <h2>Login</h2>

   <form
    onSubmit={
      handleSubmit
    }
   >

    <input
      name="email"
      placeholder="Email"
      onChange={
        handleChange
      }
    />

    <input
      name="password"
      placeholder="Password"
      onChange={
        handleChange
      }
    />

    <button>
      Login
    </button>

    

   </form>

  </div>

 );

}

export default Login;