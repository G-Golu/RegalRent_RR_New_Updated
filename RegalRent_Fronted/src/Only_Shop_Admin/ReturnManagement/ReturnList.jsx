

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ReturnManagement/returnList.css";

const ReturnListPage = () => {
  const [returns, setReturns] = useState([]);
  const [filteredReturns, setFilteredReturns] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ==========================
     FETCH RETURN LIST
  ========================== */
  const fetchReturnData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/return/list"
      );

      setReturns(res.data.data || []);
      setFilteredReturns(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load return data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturnData();
  }, []);

  /* ==========================
     SEARCH FILTER
  ========================== */
  useEffect(() => {
    if (!searchId) {
      setFilteredReturns(returns);
    } else {
      const filtered = returns.filter((item) =>
        item.order_id.toString().includes(searchId)
      );
      setFilteredReturns(filtered);
    }
  }, [searchId, returns]);

  /* ==========================
     DATE FORMAT
  ========================== */
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const parts = dateStr.substring(0, 10).split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  /* ==========================
     COMPLETE RETURN
  ========================== */
  const handleCompleteReturn = async (id) => {
    try {
      await axios.put(
        "http://localhost:5000/api/return/complete-return",
        { id }
      );

      // Refresh list after update
      fetchReturnData();
    } catch (err) {
      console.error("Complete Return Error:", err);
    }
  };

  // all good comment for modify release date actual date












  return (
    <div className="return-list-page">
      <div className="return-list-container">

        {/* HEADER */}
        <div className="return-header">
          <h2>Return List</h2>

          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
        </div>

        {loading && <p>Loading return data...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Product Name</th>
                <th>Return Date</th>
                <th>Refund Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReturns.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No return data found
                  </td>
                </tr>
              ) : (
                filteredReturns.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.order_id}</td>
                    <td>{item.customer_name || "-"}</td>
                    <td>{item.product_name || "-"}</td>
                    <td>{formatDate(item.return_date)}</td>
                    <td>
                      Rs.{" "}
                      {Number(item.total_refund_amount || 0).toFixed(2)}
                    </td>

                    {/* STATUS COLUMN */}
                    <td>
                      {item.status === "returned" ? (
                        <span className="status-badge status-green">
                          Completed
                        </span>
                      ) : (
                        <span className="status-badge status-yellow">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* ACTION COLUMN */}
                     <td>
                      {item.status === "pending" ? (
                        <button
                          className="complete-btn"
                          onClick={() =>
                            handleCompleteReturn(item.id)
                          }
                        >
                          Complete
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>  
                    {/* all good ,comment for modify or actual date  */}

                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReturnListPage;