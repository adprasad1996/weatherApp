// // WeatherHeader.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const WeatherHeader = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full bg-blue text-white shadow-md z-50">
//       <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
//         <h1
//           className="text-2xl font-bold cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           🌤️ Weather App
//         </h1>

//         {token && (
//           <button
//             onClick={handleLogout}
//             className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default WeatherHeader;
