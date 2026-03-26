import { useEffect, useState, useMemo } from "react";
import { fetchStores } from "../../api/storeApi";
import { getPackages } from "../../api/packages";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./storeList.css";

const StoreList = () => {
  const [list, setList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* LOAD DATA */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeRes = await fetchStores();
        const pkgRes = await getPackages();
        // setList(storeRes.data);
          setList(storeRes.data.stores || []);
        setPackageList(pkgRes);
      } catch (error) {
        console.error("Error loading stores:", error);
      }
    };
    fetchData();
  }, []);

  /* SEARCH FILTER */
  const filteredList = useMemo(() => {
  if (!Array.isArray(list)) return [];

  return list.filter((u) => {
    const pkg = packageList.find(
      (p) => p.id === Number(u.package_id)
    );

    const searchText = search.toLowerCase();

    return (
      u.name?.toLowerCase().includes(searchText) ||
      u.mobile?.toLowerCase().includes(searchText) ||
      u.email?.toLowerCase().includes(searchText) ||
      u.address?.toLowerCase().includes(searchText) ||
      (pkg?.package_name || "").toLowerCase().includes(searchText) ||
      (Array.isArray(u.categories) ? u.categories.join(", ") : "")
        .toLowerCase()
        .includes(searchText)
    );
  });
}, [search, list, packageList]);

  /* EXPORT EXCEL */
  const exportExcel = () => {
    const data = filteredList.map((u, idx) => {
      const pkg = packageList.find((p) => p.id === Number(u.package_id));
      return {
        "Sr No": idx + 1,
        Name: u.name,
        Mobile: u.mobile,
        Email: u.email,
        Address: u.address,
        Package: pkg?.package_name || "-",
        Categories: (u.categories || []).join(", "),
        "Bank Name": u.bank_name || "-",
        "Account No": u.account_no || "-",
        IFSC: u.ifsc_code || "-",
        "Account Holder": u.account_holder || "-",
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stores");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "store_list.xlsx");
  };

  /* IMPORT EXCEL SIMULATION */
  const importExcel = () => {
    setLoading(true);
    // Simulate progress
    setTimeout(() => {
      setLoading(false);
      alert("Excel imported successfully!");
    }, 2000);
  };

  return (
    <div className="store-page">
      <h2 className="store-title">Store List</h2>

      {/* SEARCH */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by Name, Mobile, Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        /> 
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="store-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Package</th>
              <th>Categories</th>
              <th>Bank Name</th>
              <th>Account No</th>
              <th>IFSC</th>
              <th>Account Holder</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((u, index) => {
              const pkg = packageList.find(
                (p) => p.id === Number(u.package_id)
              );

              return (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.mobile}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td>{pkg ? pkg.package_name : "-"}</td>
                  <td>{(u.categories || []).join(", ")}</td>
                  <td>{u.bank_name || "-"}</td>
                  <td>{u.account_no || "-"}</td>
                  <td>{u.ifsc_code || "-"}</td>
                  <td>{u.account_holder || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* BUTTONS */}
      <div className="store-buttons">
        <button className="import-btn" onClick={importExcel}>
          {loading ? "Importing..." : "Import Excel"}
        </button>
        <button className="export-btn" onClick={exportExcel}>
       Download
        </button>
      </div>
    </div>
  );
};

export default StoreList;
