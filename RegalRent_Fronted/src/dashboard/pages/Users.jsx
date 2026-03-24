import "../pages/users.css";

import { useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../api/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  /* ================= FETCH USERS ================= */

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= ADD ================= */

  const handleAddUser = () => {
    setIsEdit(false);

    setFormData({
      id: null,
      name: "",
      email: "",
      password: "",
      role: "user",
      status: "active",
    });

    setShowModal(true);
  };

  /* ================= EDIT ================= */

  const handleEditUser = (user) => {
    setIsEdit(true);

    setFormData({
      ...user,
      password: "",
      status: user.status || "active",
    });

    setShowModal(true);
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
  try {

    if (isEdit) {

      const updateData = {
        role: formData.role,
        manual_status: formData.status.toLowerCase()
      };

      await updateUser(formData.id, updateData);

    } else {

      if (!formData.password) {
        alert("Password is required!");
        return;
      }

      await addUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        manual_status: formData.status.toLowerCase()
      });

    }

    await fetchUsers();
    setShowModal(false);

  } catch (err) {
    console.error("SAVE ERROR:", err.response?.data || err.message);
    alert("Error saving user");
  }
};

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="users-page">

      <div className="users-header">
        <h1>Users</h1>

        <button className="btn-primary " onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <div className="users-card">

        <table className="users-table">

          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {

              const role = (user.role || "user").toLowerCase();

              return (
                <tr key={user.id}>

                  <td>{index + 1}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{role}</td>

                  <td>
                    <span
                      className={`status ${(user.status || "active").toLowerCase()}`}
                    >
                      {user.status || "active"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn-link"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-link danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              );
            })}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>{isEdit ? "Edit User" : "Add User"}</h3>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {!isEdit && (
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            )}

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="admin">admin</option>
              <option value="shop-admin">shop-admin</option>
              <option value="user">user</option>
            </select>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="modal-actions">

              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-primary"
                onClick={handleSave}
              >
                {isEdit ? "Update" : "Save"}
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Users;