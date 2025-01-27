import React, { useState } from 'react';
import DashbordNavbar from '../components/DashbordNavbar';
import Sidebar from '../components/Sidebar';
import ChatBar from '../components/ChatBar';
import MessageBox from '../components/MessageBox';

function Chat() {
    const [selectedGroup, setSelectedGroup] = useState("Group 3"); // Maintain selected group state

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <DashbordNavbar label={"COLLEGE "} />
            <div className="flex flex-grow">
                <Sidebar />

                <div className="flex-grow ml-[180px] p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
                        {/* Pass setSelectedGroup correctly */}
                        <ChatBar setSelectedGroup={setSelectedGroup} />  
                        {/* Correct syntax for MessageBox */}
                        <MessageBox selectedGroup={selectedGroup} />  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
