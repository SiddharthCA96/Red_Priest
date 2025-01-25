import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../utils/DataContext";

function DashbordNavbar({label}) {
  const { data } = useContext(DataContext);
  const gfgData = data.gfg; 

  return (
    <div className="flex justify-between  bg-gray-800 fixed top-0 left-0 w-full z-10">
      <Link  className="p-6 text-4xl font-bold" to="/dashboard">
        <span className="font-extrabold text-red-600">RED </span>
        <span>PRIEST</span>
      </Link>
      <p className="m-5 text-center font-bold text-3xl text-white">{label}</p>
      <div className="flex flex-col justify-center items-center mr-5">
        <img
          className="h-12 mt-5 rounded-3xl"
          src={gfgData.imageId} // Generate image URL using imageId
          alt="Profile"
        />
        <p className="text-white text-center">{gfgData.name}</p> {/* Display name */}
      </div>
    </div>
  );
}

export default DashbordNavbar;
