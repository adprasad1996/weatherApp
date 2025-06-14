import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherContextProvider } from "./components/context/WeatherContextProvider";
// import WeatherHeader from "./components/WeatherHeader";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded components
const AuthForm = lazy(() => import("./components/AuthForm"));
const VerifyOtp = lazy(() => import("./components/VerifyOtp"));
const WeatherApp = lazy(() => import("./components/WeatherApp"));

function App() {
  return (
    <WeatherContextProvider>
      <Router>
        <Suspense
          fallback={<Loader/>}
        >
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route
              path="/weather"
              element={
                <ProtectedRoute>
                  <WeatherApp />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </WeatherContextProvider>
  );
}

export default App;
