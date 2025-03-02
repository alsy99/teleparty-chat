// src/components/RoomControls/RoomControls.tsx
import React, { useState } from "react";
import UserIconUpload from "./UserIconUpload";

interface RoomControlsProps {
    onCreateRoom: (nickname: string, userIcon?: string) => void;
    onJoinRoom: (nickname: string, roomId: string, userIcon?: string) => void;
}

const RoomControls: React.FC<RoomControlsProps> = ({
    onCreateRoom,
    onJoinRoom,
}) => {
    const [createNickname, setCreateNickname] = useState("");
    const [joinNickname, setJoinNickname] = useState("");
    const [roomId, setRoomId] = useState("");
    const [userIcon, setUserIcon] = useState<string | null>(null);

    return (
        <div>
            <h2>Create Room</h2>
            <input
                type="text"
                placeholder="Enter your nickname"
                value={createNickname}
                onChange={(e) => setCreateNickname(e.target.value)}
            />
            <UserIconUpload onUpload={setUserIcon} />
            <button
                onClick={() =>
                    onCreateRoom(createNickname, userIcon || undefined)
                }
            >
                Create Room
            </button>

            <h2>Join Room</h2>
            <input
                type="text"
                placeholder="Enter your nickname"
                value={joinNickname}
                onChange={(e) => setJoinNickname(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <button
                onClick={() =>
                    onJoinRoom(joinNickname, roomId, userIcon || undefined)
                }
            >
                Join Room
            </button>
        </div>
    );
};

export default RoomControls;
