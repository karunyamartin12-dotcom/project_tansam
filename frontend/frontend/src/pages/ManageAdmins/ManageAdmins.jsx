import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import API from "../../services/api";
import "./ManageAdmins.css";

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await API.get("/superadmin/users");

      const adminList = res.data.filter(
        (user) =>
          user.role === "admin" ||
          user.role === "superadmin"
      );

      setAdmins(adminList);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="manageadmins-container">

      <Sidebar />

      <div className="manageadmins-content">

        <Header />

        <div className="manageadmins-header">
          <h1>Manage Admins</h1>
          <p>View all administrators.</p>
        </div>

        <table className="admins-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>

            {admins.map((admin) => (

              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.age}</td>
                <td>{admin.role}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageAdmins;