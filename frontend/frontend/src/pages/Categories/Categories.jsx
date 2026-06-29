import React, { useEffect, useState } from "react";
import "./Categories.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // 🔹 GET ALL CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 OPEN ADD MODAL
  const openAddModal = () => {
    setForm({ name: "", description: "" });
    setIsEdit(false);
    setEditId(null);
    setShowModal(true);
  };

  // 🔹 OPEN EDIT MODAL
  const openEditModal = (cat) => {
    setForm({
      name: cat.name || "",
      description: cat.description || "",
    });
    setIsEdit(true);
    setEditId(cat.id);
    setShowModal(true);
  };

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔹 SAVE (CREATE / UPDATE)
  const handleSave = async () => {
  try {
    if (!form.name.trim()) {
      alert("Category name is required");
      return;
    }

    const payload = {
      name: form.name,
      description: form.description,
    };

    console.log("Sending:", payload);

    if (isEdit) {
      await API.put(`/categories/${editId}`, payload);
    } else {
      await API.post(`/categories`, payload);
    }

    setShowModal(false);
    fetchCategories();
  } catch (error) {
    console.log("Save error:", error.response?.data || error.message);
  }
};
  // 🔹 DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

  return (
    <div className="categories-container">
      <Sidebar />

      <div className="categories-content">
        <Header />

        <div className="categories-header">
          <div>
            <h1>Food Categories</h1>
            <p>Manage all food categories efficiently.</p>
          </div>

          <button className="add-btn" onClick={openAddModal}>
            + Add Category
          </button>
        </div>

        {/* TABLE */}
        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(category)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>{isEdit ? "Edit Category" : "Add Category"}</h2>

              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;