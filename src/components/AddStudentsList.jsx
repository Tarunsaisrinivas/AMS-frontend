import React from "react";

function AddStudentList(props) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Student List</h2>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {props.studentList.map((student) => (
            <li key={student.regNo} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-800">{student.regNo}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddStudentList;
