import React, { useState } from "react";
import DashbordNavbar from "../components/DashbordNavbar";
import Sidebar from "../components/Sidebar";
import Calendar from "react-calendar"; // Import react-calendar
import { useAttendance } from "../utils/AttendanceContext"; // Import the custom hook
import "../Custom css/Calendar.css";

function Attendance() {
  const [totalDays, setTotalDays] = useState(0);
  const [totalPresentDays, setTotalPresentDays] = useState(0);
  const {
    items,
    inputValue,
    selectedSubject,
    attendanceData,
    handleAddSubject,
    handleDateClick,
    getSummary,
    tileClassName,
    setInputValue,
    setSelectedSubject,
  } = useAttendance();

  // Function to calculate total present and total days for all subjects combined
const getTotalPresentAndDays = () => {
  let totalPresent = 0;
  let totalDays = 0;

  // Iterate through all subjects and their attendance data
  Object.keys(attendanceData).forEach((subject) => {
    const subjectData = attendanceData[subject];
    totalDays += Object.keys(subjectData).length;
    totalPresent += Object.values(subjectData).filter((status) => status === "P").length;
  });

  return { totalPresent, totalDays };
};

const { totalPresent, totalDayss } = getTotalPresentAndDays();


  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSubject(inputValue);
    setInputValue(""); 
  };

  const handleCardClick = (item) => {
    setSelectedSubject(item);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <DashbordNavbar label={"ATTENDANCE"} />

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 m-20 p-10">
          <div className="w-3/4 bg-gray-900 p-6 rounded-lg text-white shadow-lg mt-4 ml-20 border-4 border-gray-700">
            <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Subject name"
                className="flex-1 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                value={inputValue}
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
        {selectedSubject && (
          <div className="p-2 bg-gray-900 border-2 border-gray-700 rounded-lg fixed right-14 mt-[135px]">
            <div className="text-white text-center mb-4">
              <h2 className="text-xl font-bold uppercase">{selectedSubject}</h2>
            </div>
            <div className="calendar-wrapper">
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
