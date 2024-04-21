// Import React and necessary components
import React, { useState } from "react";
import loginImage from "/loginIcon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import cookies from "react-cookies";

// Define the Login component
const Login = () => {
  // State variables for email, password, and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email: email, password: password });

    try {
      // Send login request to the server
      const res = await axios.post("http://localhost:3000/user/auth/sign-in", {
        email: email,
        password: password,
      });
      console.log(res.data);
      cookies.save("admin", res.data.email);

      // Redirect to the attendance page with email and name parameters
      window.location.href = `/Home?email=${res.data.email}&name=${res.data.name}`;
    } catch (error) {
      // Handle errors from the server
      const stat = error.response.status;
      if ([404, 401, 500].includes(stat)) {
        alert(error.response.data.message);
      } else {
        error("Error in connecting server");
        console.log(error);
      }
    }
  };

  // Render the Login component
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg flex">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email..."
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block font-semibold mb-1">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password..."
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute top-3/4 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <a href="/Signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-3/4">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
