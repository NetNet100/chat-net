import React from "react";
import Profile from "./profile";
import ChatRooms from '../chatRoom/chatRoomsList';
import './sideBar.css';

const SideBar = () => {

    return (
        <div className="sidenav">
            <Profile />
            <ChatRooms />
        </div>
    );
};

export default SideBar;
