import React, { useEffect, useState, useCallback } from "react";
import { getStaff } from "../../api/shopAdmin/staffApi.js";
import "./stafflist.css";

const StaffList = () => {

  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ useCallback prevents cascading render warning
  const fetchStaff = useCallback(async () => {

    try {

      setLoading(true);

      const res = await getStaff();

      // safe state update
      setStaff(res.data || []);

    } catch (error) {

      console.error("Staff fetch error:", error);

    } finally {

      setLoading(false);

    }

  }, []);

  // ✅ proper effect
  useEffect(() => {

    fetchStaff();

  }, [fetchStaff]);



  // ✅ Search Filter
  const filteredStaff = staff.filter((item) =>
    item.staff_id?.toLowerCase().includes(search.toLowerCase()) ||
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.number?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="stafflist-page">

      <div className="stafflist-card">

        {/* Header */}
        <div className="stafflist-header">

          <h2 className="stafflist-title">Staff List</h2>

          <input
            type="text"
            className="stafflist-search"
            placeholder="Search by ID, name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* Table */}
        <div className="stafflist-table-box">

          <table className="stafflist-table">

            <thead>
              <tr>
                <th>SR No.</th>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Mobile Number</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="4" className="loading-text">
                    Loading staff...
                  </td>
                </tr>

              ) : filteredStaff.length === 0 ? (

                <tr>
                  <td colSpan="4" className="no-data">
                    No staff found
                  </td>
                </tr>

              ) : (

                filteredStaff.map((item, index) => (

                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>{item.staff_id}</td>

                    <td className="staff-name">{item.name}</td>

                    <td className="staff-number">{item.number}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );

};

export default StaffList;
