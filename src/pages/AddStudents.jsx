import React, { useRef, useState } from "react";
import AddStudentsForm from "../forms/AddStudentForm";
import constants from "../global/constants";
import axios from "axios";

function AddStudents() {
  const [studentList, setStudentList] = useState([]);
  const childRef = useRef();

  const handleAdd = () => {
    childRef.current
      .formAdd()
      .then((res) => {
        if (studentList.some((item) => item.regNo === res.regNo)) {
          alert("Student with this registration number already added.");
          return;
        }
        setStudentList([...studentList, res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitStudents = async () => {
    if (studentList.length === 0) {
      alert("Add at least one student to submit.");
      return;
    }
    try {
      const response = await axios.post(
        `${constants.serverUrl}/students/add-students`,
        {
          students: studentList,
        }
      );
      const result = response.data;
      console.log(result);
      setStudentList([]);
    } catch (err) {
      switch (err.response.status) {
        case 406:
          alert(err.response.data.msg);
          break;
        case 500:
          alert(err.response.data.msg);
          break;
        default:
          console.log(err);
          alert("Network error.");
          break;
      }
    } finally {
      setStudentList([]);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Student List</h2>
        <div className="grid grid-cols-1 gap-4">
          {studentList.map((student) => (
            <div
              key={student.regNo}
              className="bg-white shadow-md rounded-md p-4 flex items-center justify-between"
            >
              <span>{student.regNo}</span>
            </div>
          ))}
        </div>
      </div>
      <AddStudentsForm ref={childRef} />
      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleAdd}
        >
          Add Student
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={submitStudents}
        >
          Submit
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default AddStudents;
