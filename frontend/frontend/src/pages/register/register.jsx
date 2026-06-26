import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../services/api";

function Register() {

 const navigate = useNavigate();

 const [form,setForm] = useState({

   name:"",
   email:"",
   password:"",
   age:"",
   role:"admin"

 });

 const handleChange = (e)=>{

   setForm({
     ...form,
     [e.target.name]:e.target.value
   });

 };

 const handleSubmit = async(e)=>{

   e.preventDefault();

   const response =
   await fetch(
    `${BASE_URL}/register`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    }
   );

   const data =
   await response.json();

   alert(data.message);

   navigate("/");

 };

 return(

  <div class="register-container">

   <h2>Register</h2>

   <form
    onSubmit={handleSubmit}
   >

    <input
     name="name"
     placeholder="Name"
     onChange={handleChange}
    />

    <input
     name="email"
     placeholder="Email"
     onChange={handleChange}
    />

    <input
     name="password"
     placeholder="Password"
     onChange={handleChange}
    />

    <input
     name="age"
     placeholder="Age"
     onChange={handleChange}
    />

    <button>
      Register
    </button>
    <p>
 Already have an account?
 <a href="/login">
  Login
 </a>
</p>

   </form>

  </div>

 );

}

export default Register;