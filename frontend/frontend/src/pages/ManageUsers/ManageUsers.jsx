import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";
import "./ManageUsers.css";

function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/superadmin/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  const deleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/superadmin/users/${id}`);

    alert("User deleted.");

    fetchUsers();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="manageusers-container">

      <Sidebar />

      <div className="manageusers-content">

        <Header />

        <div className="manageusers-header">
          <h1>Manage Users</h1>
          <p>View all registered users.</p>
        </div>

        <input
          className="search-box"
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="users-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>

<td>
  <button
    className="delete-btn"
    onClick={() => deleteUser(user.id)}
  >
    Delete
  </button>
</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageUsers;