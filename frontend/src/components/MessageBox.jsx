import React, { useState } from "react";
import { Card, CardContent } from "../components/chatUI/Card";
import { Button } from "../components/chatUI/Button";
import { Input } from "../components/chatUI/Input";

const MessageBox = ({ selectedGroup }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage("");
        }
    };

    return (
        <Card className="flex flex-col h-96 w-96 p-4">
            {/* Group Name at Top */}
            <h2 className="text-lg font-semibold text-center p-2 bg-gray-200 rounded-lg">
                {selectedGroup}
            </h2>

            {/* Message List in the Middle */}
            <CardContent className="flex-1 overflow-y-auto p-4 border rounded-lg bg-white">
                {messages.length > 0 ? (
                    <ul className="space-y-2">
                        {messages.map((msg, index) => (
                            <li key={index} className="p-2 bg-gray-100 rounded-lg shadow">
                                {msg}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No messages yet</p>
                )}
            </CardContent>

            {/* Message Input at Bottom */}
            <div className="flex items-center gap-2 mt-4">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                />
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </Card>
    );
};

export default MessageBox;
