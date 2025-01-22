import React from 'react'
import chatLogo from '../assets/chatLogo.png'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div class=" flex flex-col h-screen w-[180px] bg-gray-800 text-white  items-center justify-center fixed ">
     <Link to={'/dashboard/chat'}><img className='h-10' src={chatLogo}></img></Link>
      
    </div>
  )
}

export default Sidebar