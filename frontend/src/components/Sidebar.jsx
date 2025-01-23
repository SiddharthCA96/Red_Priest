import React from 'react'
import chatLogo from '../assets/chatLogo.png'
import { Link } from 'react-router-dom'
import dsaLogo from '../assets/dsa.png'
import collegeLogo from "../assets/college.webp"
import devLogo from '../assets/webdev-1.svg'
import updateProfile from '../assets/updateProfile.png'
function Sidebar() {
  return (
    <div class=" flex flex-col h-screen w-[180px] bg-gray-800 text-white  items-center justify-center fixed ">
     <Link  to={'/dashboard/updateprofile'}><img className='h-13 w-12' src={updateProfile}></img></Link>
    <p className='font-bold m-2 pb-4'>UPDATE PROFILE</p>
     <Link  to={'/dashboard/chat'}><img className='h-10' src={chatLogo}></img></Link>
     <p className='font-bold m-2 pb-4'>CHAT</p>
     <Link className='pt-3' to={'#'}><img className='h-10' src={dsaLogo}></img></Link>
     <p className='font-bold m-2 pb-4'>DSA</p>
     <Link className='pt-3 pb-4' to={'#'}><img className='h-10' src={devLogo}></img></Link>
     <p className='font-bold m-2 pb-4'>DEV</p>
     <Link className='pt-3' to={'#'}><img className='h-10' src={collegeLogo}></img></Link>
     <p className='font-bold m-2 pb-4'>COLLEGE</p>
      
    </div>
  )
}

export default Sidebar