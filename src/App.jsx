import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddStudents from "./pages/AddStudents";
import TakeAttendence from "./pages/TakeAttendence";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Name from "./components/Name";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/name" element={<Name />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/add-students" element={<AddStudents />} />
        <Route path="/take-attendence" element={<TakeAttendence />} />
      </Routes>
    </Router>
  );
}

export default App;
