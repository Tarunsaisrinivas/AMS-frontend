import React, { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const AddStudentsForm = forwardRef((props, ref) => {
  const [regNo, setRegNo] = useState("");
  const [year, setYear] = useState(0);
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");

  const formAdd = () => {
    return new Promise(async (resolve, reject) => {
      if (regNo === "" || year === 0 || branch === "" || section === "") {
        reject({ msg: "Error empty field found" });
      }
      resolve({ regNo, year, branch, section });
    });
  };

  useImperativeHandle(ref, () => ({
    formAdd,
  }));

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Reg.No:</label>
        <input
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          value={regNo}
          onChange={(event) => setRegNo(event.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Year:</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          onChange={(event) => setYear(event.target.value)}
        >
          <option value={0}>Select Year</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Branch:</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          onChange={(event) => setBranch(event.target.value)}
        >
          <option value="">Select Branch</option>
          <option value="cse">CSE</option>
          <option value="aids">AIDS</option>
          <option value="it">IT</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Section:</label>
        <select
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          onChange={(event) => setSection(event.target.value)}
        >
          <option value="">Select Section</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
        </select>
      </div>
    </div>
  );
});

export default AddStudentsForm;
