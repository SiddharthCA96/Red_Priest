import { LOGO_URL } from "../utils/constants";
import profile from "../assets/profilePic.png"
import { Link } from "react-router-dom";


function DashbordNavbar() {
  return (
    
    <div className="flex justify-between shadow-md bg-gray-800 ">
      <Link to={'/'}><img className="h-12  m-3 pl-10 pt-1" src={LOGO_URL} alt="" /></Link>
      <p className=" m-5 text-center font-bold font-large text-3xl text-white">DASHBOARD</p>
      <div className="flex flex-col justify-center items-center mr-5">
        <img className="h-12 mt-5 rounded-3xl" src={profile} alt="profile" />
      <p className="text-white text-center">Jay Prakash</p>
    </div>
    </div>
  )
}

export default DashbordNavbar