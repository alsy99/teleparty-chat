// src/components/RoomControls/UserIconUpload.tsx
import React from "react";

interface UserIconUploadProps {
    onUpload: (icon: string) => void;
}

const UserIconUpload: React.FC<UserIconUploadProps> = ({ onUpload }) => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => onUpload(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    return <input type="file" accept="image/*" onChange={handleFileUpload} />;
};

export default UserIconUpload;
