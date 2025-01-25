import { Link } from "react-router-dom";

function DashbordNavbar({ label }) {

  return (
    <div className="flex justify-between  bg-gray-800 fixed top-0 left-0 w-full z-10">
      <Link className="p-6 text-4xl font-bold" to="/">
        <span className="font-extrabold text-red-600">RED </span>
        <span>PRIEST</span>
      </Link>
      <p className="m-5 text-center font-bold text-3xl text-white">{label}</p>
    </div>
  );
}

export default DashbordNavbar;
