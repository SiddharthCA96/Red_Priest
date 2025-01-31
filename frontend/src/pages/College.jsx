import React from 'react'
import DashbordNavbar from '../components/DashbordNavbar'
import Sidebar from '../components/Sidebar'
import CollegeCard from '../components/cards/CollegeCard'
import core from "../assets/Core.png"
import attendance from "../assets/attendance.png"
import database from "../assets/database.png"
import todo from "../assets/todo.png"
import { CORE_DESC,ATTENDANCE_DESC,DATABASE_DESC,TODO_DESC} from '../utils/constants'
import { Link } from 'react-router-dom'

function College() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <DashbordNavbar label={"COLLEGE "} />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow ml-[180px] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 ">
            <Link to={"/dashboard/college/core"}><CollegeCard  image={core} label={"CORE"} description={CORE_DESC} ></CollegeCard></Link>
            <Link to={"/dashboard/college/attendance"}><CollegeCard image={attendance} label={"ATTENDANCE"} description={ATTENDANCE_DESC} ></CollegeCard></Link>
            <Link to={"/dashboard/college/database"}><CollegeCard image={database} label={"DATA BASE"} description={DATABASE_DESC}></CollegeCard></Link>
            <Link to={"/dashboard/college/todo"}><CollegeCard  image={todo} label={"TO-DO"} description={TODO_DESC}></CollegeCard></Link>
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default College;
