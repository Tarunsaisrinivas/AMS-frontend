import React, { useEffect, useState } from "react";
import axios from "axios";
import constants from "../global/constants";
import cookies from "react-cookies";
import Name from "../components/Name";

function Home() {
  const [takenList, setTakenList] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [pendingPresent, setPendingPresent] = useState([]);
  const [pendingAbsent, setPendingAbsent] = useState([]);
  const [takenPresent, setTakenPresent] = useState([]);
  const [takenAbsent, setTakenAbsent] = useState([]);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [year, setYear] = useState(0);
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");

  const goToLogin = () => {
    //window.location.href = "/login";
    //update the path;
  };

  const getUserData = async () => {
    try {
      let res = await axios.get(
        `${constants.serverUrl}/user/auth/validate-user${cookies.load("admin")}`
      );
      const result = res.data;
      if (result.stat) {
        //result name akkada kavalanto akkada pettuko
        //{ stat: true, name: res.name }
      } else {
        //{ stat: false } login page ke vellepo
        //goToLogin()
      }
    } catch {
      console.log("error");
      alert("error in connectiong to server");
    }
  };

  const validateSession = () => {
    if (cookies.load("auth")) {
      getUserData();
    } else {
      goToLogin();
    }
  };

  const getInfo = (filter) => {
    axios
      .get(`${constants.serverUrl}/attendence/get`, {
        params: { ...filter, admin: cookies.load("admin") },
      })
      .then((res) => {
        if (res.data.attendenceData) {
          console.log(res.data);
          const present = res.data.attendenceData.present;
          const absent = res.data.attendenceData.absent;
          setTakenPresent([...present]);
          setTakenAbsent([...absent]);
          const allStudents = res.data.allStudents;
          const notTaken = allStudents.filter(
            (student) => !present.includes(student) && !absent.includes(student)
          );
          console.log(present);
          console.log(notTaken);
          setPendingList(notTaken.sort((a, b) => a - b));
          setTakenList([...present, ...absent].sort((a, b) => a - b));
        } else {
          setPendingList([...res.data.allStudents].sort((a, b) => a - b));
          setTakenList([]); // Reset the taken list
          setTakenPresent([]); // Reset the taken present list
          setTakenAbsent([]); // Reset the taken absent list
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.data.msg) alert(err.data.msg);
        else alert("Error occurred in fetching data");
      });
  };

  useEffect(() => {
    console.log(takenPresent);
    console.log(takenAbsent);
  }, [takenAbsent, takenPresent]);

  const handlePresent = (event) => {
    setPendingAbsent(pendingAbsent.filter((st) => st !== event.target.name));
    if (!pendingPresent.includes(event.target.name)) {
      setPendingPresent([...pendingPresent, event.target.name]);
    }
  };

  const handleAbsent = (event) => {
    setPendingPresent(pendingPresent.filter((st) => st !== event.target.name));
    if (!pendingAbsent.includes(event.target.name)) {
      setPendingAbsent([...pendingAbsent, event.target.name]);
    }
  };

  const submitAttendance = (event, present, absent) => {
    event.preventDefault();
    axios
      .put(`${constants.serverUrl}/attendence/post`, {
        date: date,
        present: present,
        absent: absent,
        admin: cookies.load("admin"),
      })
      .then((res) => {
        console.log("Response from server:", res.data); // Log the response here
        alert("Attendance submitted successfully.");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error submitting attendance:", err); // Log any errors
        alert(
          "Error submitting attendance. Please check the console for details."
        );
      });
  };

  useEffect(() => {
    getInfo({ date: date });
  }, [date]);

  const handleTakenPresent = (event) => {
    const studentId = event.target.name;
    if (!takenPresent.includes(studentId)) {
      setTakenPresent([...takenPresent, studentId]);
      // Remove from takenAbsent if present
      setTakenAbsent(takenAbsent.filter((id) => id !== studentId));
    }
  };

  const handleTakenAbsent = (event) => {
    const studentId = event.target.name;
    if (!takenAbsent.includes(studentId)) {
      setTakenAbsent([...takenAbsent, studentId]);
      // Remove from takenPresent if present
      setTakenPresent(takenPresent.filter((id) => id !== studentId));
    }
  };

  const applyFilters = () => {
    const filters = { date: date };
    if (year !== 0) filters.year = year;
    if (branch !== "") filters.branch = branch;
    if (section !== "") filters.section = section;
    console.log(filters);
    getInfo(filters);
  };

  return (
    <>
      <Name />
      <div className="container p-8 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <input
            type="date"
            onChange={(event) => {
              setDate(new Date(event.target.value).toISOString().split("T")[0]);
            }}
            value={date}
            className="p-2 mr-2 border border-gray-400 rounded"
          />
          <select
            onChange={(event) => setYear(event.target.value)}
            className="p-2 mr-2 border border-gray-400 rounded"
          >
            <option value={0}>Select Year</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          <select
            onChange={(event) => setBranch(event.target.value)}
            className="p-2 mr-2 border border-gray-400 rounded"
          >
            <option value="">Select Branch</option>
            <option value="cse">CSE</option>
            <option value="aids">AIDS</option>
            <option value="it">IT</option>
          </select>
          <select
            onChange={(event) => setSection(event.target.value)}
            className="p-2 mr-2 border border-gray-400 rounded"
          >
            <option value="">Select Section</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>

          <button
            onClick={applyFilters}
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
        <div className="flex">
          <div className="flex flex-col w-[50%]">
            <h2 className="mb-2 text-lg font-bold">Attendance Taken</h2>
            {takenList.length === 0 ? (
              <p>Attendance not taken</p>
            ) : (
              <form
                onSubmit={(event) =>
                  submitAttendance(event, takenPresent, takenAbsent)
                }
              >
                {takenList.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                  >
                    <span>{student}</span>
                    <div className="flex">
                      <label className="mr-2">
                        <input
                          type="radio"
                          value="present"
                          name={student}
                          onChange={handleTakenPresent}
                          checked={takenPresent.includes(student)}
                          required
                        />
                        Present
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="absent"
                          name={student}
                          checked={takenAbsent.includes(student)}
                          onChange={handleTakenAbsent}
                          required
                        />
                        Absent
                      </label>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Update Attendance
                </button>
              </form>
            )}
          </div>
          <div className="flex flex-col w-[50%] ml-4">
            <h2 className="mb-2 text-lg font-bold">Attendance Pending</h2>
            {pendingList.length === 0 ? (
              <p>No Pending students</p>
            ) : (
              <form
                onSubmit={(event) =>
                  submitAttendance(event, pendingPresent, pendingAbsent)
                }
              >
                {pendingList.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                  >
                    <span>{student}</span>
                    <div className="flex">
                      <label className="mr-2">
                        <input
                          type="radio"
                          value="present"
                          name={student}
                          onChange={handlePresent}
                          required
                        />
                        Present
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="absent"
                          name={student}
                          onChange={handleAbsent}
                          required
                        />
                        Absent
                      </label>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
        <button
          onClick={() => (window.location.href = "/add-students")}
          className="p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </div>
    </>
  );
}

export default Home;
