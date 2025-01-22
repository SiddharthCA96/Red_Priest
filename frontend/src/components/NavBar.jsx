import { LOGO_URL } from "../utils/constants";
import login from "../assets/login.png"
import { Link } from "react-router-dom";
const Navbar = () =>{
  return(
    
    <div className="flex justify-between shadow-md bg-gray-800 mb-3">
      <Link to={'/'}><img className="h-12  m-5" src={LOGO_URL} alt="" /></Link>
      <p className=" m-5 text-center font-bold font-large text-xl text-white">About Us</p>
      <Link to={'/Signup'}><img className="h-12 m-5 " src={login}></img></Link>
    </div>
  );
}

export default Navbar