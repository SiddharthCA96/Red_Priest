import React, { useState } from "react";
import { Card, CardContent } from "../components/chatUI/Card";
import { Button } from "../components/chatUI/Button";
import { Input } from "../components/chatUI/Input";
import { Plus } from "lucide-react";

const ChatBar = ({ setSelectedGroup }) => {
    const [groups, setGroups] = useState(["Group 1", "Group 2", "Group 3"]);
    const [code, setCode] = useState("");

    const joinGroup = () => {
        if (code) {
            setGroups((prevGroups) => [...prevGroups, code]);
            setCode("");
        }
    };

    const createGroup = () => {
        const newGroup = `New Group ${groups.length + 1}`;
        setGroups((prevGroups) => [...prevGroups, newGroup]);
    };

    return (
        <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter group code"
                        className="flex-1"
                    />
                    <Button onClick={joinGroup}>Join</Button>
                </div>
                <Button
                    onClick={createGroup}
                    className="w-full flex items-center justify-center gap-2"
                >
                    <Plus size={16} /> Create Group
                </Button>
            </div>
            <Card className="flex-1 overflow-y-auto">
                <CardContent>
                    <ul className="space-y-2">
                        {groups.map((group, index) => (
                            <li
                                key={index}
                                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
                                onClick={() => setSelectedGroup(group)}
                            >
                                {group}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChatBar;
