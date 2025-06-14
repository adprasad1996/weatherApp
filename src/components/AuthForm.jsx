import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spin from "./Spin";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const endpoint = isSignup
        ? "https://weatherapp-backend-neb4.onrender.com/api/auth/register"
        : "https://weatherapp-backend-neb4.onrender.com/api/auth/login";

      const payload = isSignup
        ? { name, email, password }
        : { email, password };

      await axios.post(endpoint, payload);

      localStorage.setItem("pendingEmail", email);
      setMessage(
        isSignup
          ? "Signup successful! OTP sent to your email."
          : "Signin successful! OTP sent to your email."
      );

      navigate("/verify-otp");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400">
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-l from-blue-500 p-4">🌦️ Weather App</h1>
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Signup" : "Signin"}
        </h2>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setIsSignup(true)}
            className={`flex-1 py-2 font-semibold border rounded-md ${
              isSignup ? "bg-blue-600 text-white" : "bg-white border-gray-300"
            }`}
          >
            Signup
          </button>
          <button
            onClick={() => setIsSignup(false)}
            className={`flex-1 py-2 font-semibold border rounded-md ${
              !isSignup ? "bg-blue-600 text-white" : "bg-white border-gray-300"
            }`}
          >
            Signin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password:</label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 bg-gray-200 border border-l-0 rounded-r-md text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex justify-center items-center"
          >
            {loading ? (
              <Spin/>
            ) : (
              <span>{isSignup ? "Signup" : "Signin"}</span>
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
