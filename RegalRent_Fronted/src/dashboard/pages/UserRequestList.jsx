
import "./UserRequestList.css";
import { useEffect, useState } from "react";
import { getUserRequests } from "../../api/userRequestListApi.js";

const UserRequestList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all"); // default value
  const [filterPlan, setFilterPlan] = useState("");
  const [filterAddress, setFilterAddress] = useState("");

  // ===== FETCH =====
  const fetchContacts = async () => {
    try {
      const res = await getUserRequests();
      setContacts(res.data || []);
    } catch (err) {
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ===== FILTER LOGIC =====
  useEffect(() => {
    let data = [...contacts];

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

   if (filterDate === "today") {
  data = data.filter(
    (c) =>
      new Date(c.created_at).toDateString() ===
      today.toDateString()
  );
} else if (filterDate === "yesterday") {
  data = data.filter(
    (c) =>
      new Date(c.created_at).toDateString() ===
      yesterday.toDateString()
  );
} else if (filterDate === "all") {
  // ✅ DO NOTHING (show all data)
}

    if (filterPlan) {
      data = data.filter((c) =>
        c.selected_plan?.toLowerCase().includes(filterPlan.toLowerCase())
      );
    }

    if (filterAddress) {
      data = data.filter((c) =>
        c.address?.toLowerCase().includes(filterAddress.toLowerCase())
      );
    }

    if (searchTerm) {
      data = data.filter(
        (c) =>
          c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.mobile_number?.includes(searchTerm)
      );
    }

    setFilteredContacts(data);
  }, [contacts, searchTerm, filterDate, filterPlan, filterAddress]);

  // ===== HIGHLIGHT =====
  const highlightText = (text) => {
    if (!searchTerm || !text) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} className="urlist-highlight-text">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="urlist-page">
      <div className="urlist-header">
        <h1>User Requests List</h1>
      </div>

      <div className="urlist-card">

        {/* ===== SMALL CONTROL BAR ===== */}
        <div className="urlist-topbar">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search..."
            className="urlist-search-small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* DATE FILTER */}
          <select
            className="urlist-dropdown"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
             <option value="all">All</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
          </select>

          {/* PLAN */}
          <input
            type="text"
            placeholder="Plan"
            className="urlist-mini-input"
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
          />

          {/* ADDRESS */}
          <input
            type="text"
            placeholder="Address"
            className="urlist-mini-input"
            value={filterAddress}
            onChange={(e) => setFilterAddress(e.target.value)}
          />

        </div>

        {/* ===== TABLE ===== */}
        <div className="urlist-table-wrapper">
          <table className="urlist-table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>WhatsApp</th>
                <th>Address</th>
                <th>Selected Plan</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
                  <tr
                    key={contact.id}
                    className={`urlist-row ${
                      searchTerm ? "urlist-row-highlight" : ""
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td>{highlightText(contact.full_name)}</td>
                    <td>{highlightText(contact.email)}</td>
                    <td>{highlightText(contact.mobile_number)}</td>

                    <td>
                      {contact.whatsapp_number ? (
                        <span className="urlist-badge urlist-badge-whatsapp">
                          {contact.whatsapp_number}
                        </span>
                      ) : "-"}
                    </td>

                    <td>{contact.address || "-"}</td>

                    <td>
                      {contact.selected_plan ? (
                        <span className="urlist-badge urlist-badge-plan">
                          {contact.selected_plan}
                        </span>
                      ) : "-"}
                    </td>

                    <td>
                      {contact.created_at
                        ? new Date(contact.created_at).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="urlist-no-data">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default UserRequestList;
   // ok