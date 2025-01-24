import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import chatLogo from "../assets/chatLogo.png";
import dsaLogo from "../assets/dsa.png";
import collegeLogo from "../assets/college.webp";
import devLogo from "../assets/webdev-1.svg";
import updateProfile from "../assets/updateProfile.png";

function Sidebar() {
  const location = useLocation(); 
  const navigate = useNavigate(); 

  // Function to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen w-[180px] bg-gray-800 text-white items-center justify-center fixed">
      {/* Update Profile */}
      <div
        className={`flex flex-col items-center cursor-pointer ${
          isActive("/dashboard/updateprofile") ? "scale-110" : ""
        }`}
        onClick={() => navigate("/dashboard/updateprofile")}
      >
        <img className={`h-13 w-12 ${isActive("/dashboard/updateprofile") ? "h-16 w-14" : ""}`} src={updateProfile} alt="Update Profile" />
        <p className={`font-bold m-2 pb-4 ${isActive("/dashboard/updateprofile") ? "text-red-500" : ""}`}>UPDATE PROFILE</p>
      </div>

      {/* Chat */}
      <div
        className={`flex flex-col items-center cursor-pointer ${
          isActive("/dashboard/chat") ? "scale-110" : ""
        }`}
        onClick={() => navigate("/dashboard/chat")}
      >
        <img className={`h-10 ${isActive("/dashboard/chat") ? "h-12" : ""}`} src={chatLogo} alt="Chat" />
        <p className={`font-bold m-2 pb-4 ${isActive("/dashboard/chat") ? "text-red-500" : ""}`}>CHAT</p>
      </div>

      {/* DSA */}
      <div
        className={`flex flex-col items-center cursor-pointer ${
          isActive("#") ? "scale-110" : ""
        }`}
        onClick={() => navigate("#")}
      >
        <img className={`h-10 ${isActive("#") ? "h-12" : ""}`} src={dsaLogo} alt="DSA" />
        <p className={`font-bold m-2 pb-4 ${isActive("#") ? "text-red-500" : ""}`}>DSA</p>
      </div>

      {/* Development */}
      <div
        className={`flex flex-col items-center cursor-pointer ${
          isActive("#") ? "scale-110" : ""
        }`}
        onClick={() => navigate("#")}
      >
        <img className={`h-10 ${isActive("#") ? "h-12" : ""}`} src={devLogo} alt="Dev" />
        <p className={`font-bold m-2 pb-4 ${isActive("#") ? "text-red-500" : ""}`}>DEV</p>
      </div>

      {/* College */}
      <div
        className={`flex flex-col items-center cursor-pointer ${
          isActive("/dashboard/college") ? "scale-110" : ""
        }`}
        onClick={() => navigate("/dashboard/college")}
      >
        <img className={`h-10 ${isActive("/dashboard/college") ? "h-12" : ""}`} src={collegeLogo} alt="College" />
        <p className={`font-bold m-2 pb-4 ${isActive("/dashboard/college") ? "text-red-500" : ""}`}>COLLEGE</p>
      </div>
    </div>
  );
}

export default Sidebar;
