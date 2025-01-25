import React, { createContext, useState, useContext } from "react";


const AttendanceContext = createContext();


export const AttendanceProvider = ({ children }) => {
  const [items, setItems] = useState([]); // Store subjects
  const [inputValue, setInputValue] = useState(""); // Input field for subject name
  const [selectedSubject, setSelectedSubject] = useState(null); // Track selected subject
  const [attendanceData, setAttendanceData] = useState({}); // Store attendance data per subject

  const handleAddSubject = (subjectName) => {
    if (subjectName.trim() === "") return;
    setItems([...items, subjectName]);
  };

  // Handle date click to mark attendance
  const handleDateClick = (date) => {
    if (!selectedSubject) return;

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
    } else if (subjectData[date.toDateString()] === "A") {
      return "bg-red-500 text-white rounded-lg";
    }
    return "";
  };

  return (
    <AttendanceContext.Provider
      value={{
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
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

// Create a custom hook to use the AttendanceContext
export const useAttendance = () => useContext(AttendanceContext);
