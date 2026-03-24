import React, { useEffect, useState } from "react";
import "./staff.css";
import {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "../../api/shopAdmin/staffApi.js";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    number: "",
  });
  const [editId, setEditId] = useState(null);

  //  Load data from DB
  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const res = await getStaff();
      setStaffList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  ADD + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id || !form.name || !form.number) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await updateStaff(editId, {
          staff_id: form.id,
          name: form.name,
          number: form.number,
        });
        setEditId(null);
      } else {
        await addStaff(form);
      }

      await loadStaff();
      setForm({ id: "", name: "", number: "" });
    } catch (error) {
      console.log(error);
    }
  };

  //  Edit
  const handleEdit = (item) => {
    setForm({
      id: item.staff_id,
      name: item.name,
      number: item.number,
    });
    setEditId(item.id);
  };

  //  Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteStaff(id);
      await loadStaff();
    }
  };

  return (
   <div className="staffmgmt-page">
  <div className="staffmgmt-card">
    <h2 className="staffmgmt-title">Staff Management</h2>

         <form className="staffmgmt-form" onSubmit={handleSubmit}>
      <div className="staffmgmt-group">
        <label>Staff ID</label>
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="Enter staff ID"
        />
      </div>

      <div className="staffmgmt-group">
        <label>Staff Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter staff name"
        />
      </div>

      <div className="staffmgmt-group">
        <label>Mobile Number</label>
        <input
          type="text"
          name="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Enter mobile number"
        />
      </div>

          <button type="submit" className="staffmgmt-submit">
        {editId ? "Update Staff" : "Add Staff"}
      </button>
    </form>

       <div className="staffmgmt-table-box">
          <table className="staffmgmt-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((item) => (
              <tr key={item.id}>
                <td>{item.staff_id}</td>
                <td>{item.name}</td>
                <td>{item.number}</td>
<td>
  <div className="staffmgmt-action">
    <button
      className="staffmgmt-edit"
      onClick={() => handleEdit(item)}
    >
      Edit
    </button>

    <button
      className="staffmgmt-delete"
      onClick={() => handleDelete(item.id)}
    >
      Delete
    </button>
  </div>
</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</div>
  )
}; 
 export default Staff;


   
