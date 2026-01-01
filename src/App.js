import React, { useState } from "react";
import * as XLSX from "xlsx";

import '../src/App.css' 

function App() {
  const [formData, setFormData] = useState({
    srNo: "",
    depoName: "",
    date: "",
    vehicleNo: "",
    totalKm: "",
    engineOil: "",
    coolant: "",
    adblue: "",
    mechanicName: "",
    maintenance: ""
  });

  const [dataList, setDataList] = useState([]);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // delete row
const deleteRow = (index) => {
  const updatedList = dataList.filter((_, i) => i !== index);
  setDataList(updatedList);
};  

  // save data
  const handleSave = (e) => {
    e.preventDefault();
    setDataList([...dataList, formData]);
    setFormData({
      srNo: "",
      depoName: "",
      date: "",
      vehicleNo: "",
      totalKm: "",
      engineOil: "",
      coolant: "",
      adblue: "",
      mechanicName: "",
      maintenance: ""
    });
  };

  // export to excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Maintenance Data");
    XLSX.writeFile(workbook, "maintenance_data.xlsx");
  };

  return (
  <div className="container">
    <h2>Vehicle Maintenance Form</h2>

    <form onSubmit={handleSave}>
      <div className="form-grid">
        <input name="srNo" placeholder="Sr No" value={formData.srNo} onChange={handleChange} required />
        <input name="depoName" placeholder="Depo Name" value={formData.depoName} onChange={handleChange} />
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <input name="vehicleNo" placeholder="Vehicle No" value={formData.vehicleNo} onChange={handleChange} />
        <input name="totalKm" placeholder="Total KM" value={formData.totalKm} onChange={handleChange} />
        <input name="engineOil" placeholder="Engine Oil" value={formData.engineOil} onChange={handleChange} />
        <input name="coolant" placeholder="Coolant" value={formData.coolant} onChange={handleChange} />
        <input name="adblue" placeholder="AdBlue" value={formData.adblue} onChange={handleChange} />
        <input name="mechanicName" placeholder="Mechanic Name" value={formData.mechanicName} onChange={handleChange} />
        <input name="maintenance" placeholder="Maintenance Details" value={formData.maintenance} onChange={handleChange} />
      </div>

      <div style={{ textAlign: "center" }}>
        <button type="submit" className="save-btn">Save</button>
      </div>
    </form>

    <h3>Saved Data</h3>

    {dataList.length > 0 && (
      <div className="table-wrapper">
        <table>
          <thead>
  <tr>
    <th>Sr No</th>
    <th>Depo Name</th>
    <th>Date</th>
    <th>Vehicle No</th>
    <th>Total KM</th>
    <th>Engine Oil</th>
    <th>Coolant</th>
    <th>AdBlue</th>
    <th>Mechanic Name</th>
    <th>Maintenance</th>
    <th>Action</th>
  </tr>
</thead>

          <tbody>
  {dataList.map((item, index) => (
    <tr key={index}>
      <td>{item.srNo}</td>
      <td>{item.depoName}</td>
      <td>{item.date}</td>
      <td>{item.vehicleNo}</td>
      <td>{item.totalKm}</td>
      <td>{item.engineOil}</td>
      <td>{item.coolant}</td>
      <td>{item.adblue}</td>
      <td>{item.mechanicName}</td>
      <td>{item.maintenance}</td>
      <td>
        <button
          className="delete-btn"
          onClick={() => deleteRow(index)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>

        <div style={{ textAlign: "center" }}>
          <button onClick={exportToExcel} className="export-btn">
            Export to Excel
          </button>
        </div>
      </ div >
    )}
  </div>
);

}

export default App;
