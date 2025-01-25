import React, { useState } from "react";
import DashbordNavbar from "../components/DashbordNavbar";
import Sidebar from "../components/Sidebar";
import Calendar from "react-calendar"; // Import react-calendar
import '../components/Calendar.css'


function Attendance() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null); // Track selected subject
  const [attendanceData, setAttendanceData] = useState({}); // Store attendance data per subject

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setItems([...items, inputValue]);
    setInputValue("");
  };

  const handleCardClick = (item) => {
    setSelectedSubject(item);
  };

  const handleDateClick = (date) => {
    if (!selectedSubject) return;

    // Show options (Present, Absent, Clear)
    const action = window.prompt(
      `Mark attendance for ${selectedSubject} on ${date.toDateString()}:\nType "P" for Present, "A" for Absent, "C" to Clear.`
    );

    if (!["P", "A", "C"].includes(action?.toUpperCase())) return;

    setAttendanceData((prevData) => {
      const subjectData = prevData[selectedSubject] || {};
      const newStatus =
        action.toUpperCase() === "C" ? undefined : action.toUpperCase();
      if (newStatus) {
        subjectData[date.toDateString()] = newStatus;
      } else {
        delete subjectData[date.toDateString()];
      }
      return { ...prevData, [selectedSubject]: { ...subjectData } };
    });
  };

  const getSummary = (subject) => {
    const subjectData = attendanceData[subject] || {};
    const totalDays = Object.keys(subjectData).length;
    const presentDays = Object.values(subjectData).filter((status) => status === "P").length;
    const absentDays = totalDays - presentDays;

    return { totalDays, presentDays, absentDays };
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month" || !selectedSubject) return "";

    const subjectData = attendanceData[selectedSubject] || {};
    if (subjectData[date.toDateString()] === "P") {
      return "bg-green-500 text-white rounded-lg";
    }
    return "";
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
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg"
              >
                Create
              </button>
            </form>
            <div className="flex flex-wrap justify-center gap-5 mt-4">
              {items.map((item, index) => {
                const { totalDays, presentDays, absentDays } = getSummary(item);

                return (
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
                      <p className="text-orange-500 font-bold">Total: {totalDays}</p>
                      <p className="text-green-600 font-bold">Present: {presentDays}</p>
                      <p className="text-yellow-500 font-bold">Absent: {absentDays}</p>
                    </div>

                    <p className="text-blue-500 font-bold mt-2">
                      Percentage: {totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conditional Rendering of Calendar */}
        {selectedSubject && (
          <div className="  p-2 bg-gray-900 border-2 border-gray-700 rounded-lg absolute right-14 top-40  ">
            <div className="text-white text-center mb-4">
              <h2 className="text-xl font-bold uppercase">{selectedSubject}</h2>
            </div>
            <div className="calendar-wrapper flex justify-center rounded-md">
              <Calendar 
                
                tileClassName={tileClassName}
                onClickDay={handleDateClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
