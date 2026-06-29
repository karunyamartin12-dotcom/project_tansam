import "./Dashboard.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  const dashboardData = {
    totalUsers: 120,
    totalFoodItems: 85,
    expiredItems: 12,
    expiringSoon: 18,
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

      <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Manage your food inventory and monitor expiry dates efficiently.</p>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>{dashboardData.totalUsers}</p>
          </div>

          <div className="card">
            <h3>Total Food Items</h3>
            <p>{dashboardData.totalFoodItems}</p>
          </div>

          <div className="card">
            <h3>Expired Items</h3>
            <p>{dashboardData.expiredItems}</p>
          </div>

          <div className="card">
            <h3>Expiring Soon</h3>
            <p>{dashboardData.expiringSoon}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;