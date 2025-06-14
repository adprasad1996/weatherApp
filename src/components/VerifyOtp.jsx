import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spin from "./Spin";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("pendingEmail");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://weatherapp-backend-neb4.onrender.com/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      if (response.data.token) {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        localStorage.removeItem("pendingEmail");
        navigate("/weather");
      } else {
        setLoading(false);
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Enter OTP</h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spin /> : "Verify"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
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

export default VerifyOtp;
