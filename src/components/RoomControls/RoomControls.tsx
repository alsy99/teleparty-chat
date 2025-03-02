// src/components/RoomControls/RoomControls.tsx
import React, { useState } from "react";
import UserIconUpload from "./UserIconUpload";
import "./RoomControls.css"; // Add a CSS file for styling

interface RoomControlsProps {
    onCreateRoom: (
        nickname: string,
        userIcon?: string
    ) => Promise<string | null>;
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
    const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);

    const handleCreateRoom = async () => {
        const roomId = await onCreateRoom(
            createNickname,
            userIcon || undefined
        );
        if (roomId) {
            setCreatedRoomId(roomId);
        }
    };

    return (
        <div className="room-controls">
            <div className="create-room">
                <h2>Create Room</h2>
                <input
                    type="text"
                    placeholder="Enter your nickname"
                    value={createNickname}
                    onChange={(e) => setCreateNickname(e.target.value)}
                />
                <UserIconUpload onUpload={setUserIcon} />
                <button onClick={handleCreateRoom}>Create Room</button>
                {createdRoomId && (
                    <div className="room-id-display">
                        <strong>Room ID:</strong> {createdRoomId}
                        <p>Share this ID with your friends to join the room!</p>
                    </div>
                )}
            </div>

            <div className="join-room">
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
        </div>
    );
};

export default RoomControls;
