import "./dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token if stored
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <h2>Welcome to the Dashboard!</h2>
        <p>
          You have successfully logged in.
        </p>

        <div className="dashboard-card">
          <h3>User Information</h3>
          <p>Name: User</p>
          <p>Email: user@example.com</p>
          <p>Role: Admin</p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;