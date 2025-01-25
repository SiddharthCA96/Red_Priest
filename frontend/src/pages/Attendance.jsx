import React, { useState } from "react";
import DashbordNavbar from "../components/DashbordNavbar";
import Sidebar from "../components/Sidebar";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import styles for react-calendar

function Attendance() {
  const [items, setItems] = useState([]);
  const [inputValue, setIntputValue] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null); // State to track the selected subject

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setItems([...items, inputValue]);
    setIntputValue("");
  };

  const handleCardClick = (item) => {
    setSelectedSubject(item); // Set the selected subject when a card is clicked
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <DashbordNavbar label={"ATTENDANCE"} />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 m-20 p-10">
          {/* Content Box */}
          <div className="w-1/2 bg-gray-900 p-6 rounded-lg text-white shadow-lg mt-4 ml-20 border-4 border-gray-700">
            <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Subject name"
                className="flex-1 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setIntputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg"
              >
                Create
              </button>
            </form>
            <div className="flex flex-wrap justify-center gap-5 mt-4 ">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-black border-4 border-gray-700 p-4 rounded-lg flex flex-col items-center justify-between shadow-lg hover:shadow-lg hover:shadow-orange-500 transition-all duration-300"
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                  onClick={() => handleCardClick(item)} // Handle click on the card
                >
                  <p className="text-red-500 uppercase text-2xl font-bold">{item}</p>

                  <div className="text-sm text-white">
                    <p className="text-orange-500 font-bold">Total: 20</p>
                    <p className="text-green-600 font-bold">Present: 10</p>
                    <p className="text-yellow-500 font-bold">Absent: 10</p>
                  </div>

                  <p className="text-blue-500 font-bold mt-2">Percentage : 20%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conditional Rendering of Calendar */}
        {selectedSubject && (
          <div className="w-full sm:w-1/3 p-4 bg-gray-900 border-2 border-gray-700  rounded-lg fixed right-10 mt-[140px] max-w-[400px] mx-auto">
            <div className="text-white text-center mb-4">
              <h2 className="text-xl font-bold uppercase">{selectedSubject}</h2>
            </div>
            <div className="flex justify-center items-center">
              <Calendar className="bg-black  text-black  rounded-lg p-5" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
