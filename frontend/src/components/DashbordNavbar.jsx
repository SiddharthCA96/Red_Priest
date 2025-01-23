import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DashbordNavbar() {
  const userData = useSelector((state) => state.user); // Access user state directly

  return (
    <div className="flex justify-between shadow-md bg-gray-800">
      <Link to="/">
        <img className="h-12 m-3 pl-10 pt-1" src={LOGO_URL} alt="Logo" />
      </Link>
      <p className="m-5 text-center font-bold text-3xl text-white">DASHBOARD</p>
      <div className="flex flex-col justify-center items-center mr-5">
        <img
          className="h-12 mt-5 rounded-3xl"
          src={userData.profilePhoto} // Correctly mapped to state
          alt="Profile"
        />
        <p className="text-white text-center">{userData.userName}</p>
      </div>
    </div>
  );
}

export default DashbordNavbar;
