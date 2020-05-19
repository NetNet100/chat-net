import React from 'react';
import './App.css';
import ChatRoom from "./components/chatRoom/chatRoom";
import SideBar from "./components/sideBar/sideBar";

const App = () => {

  return (
        <div>
            <SideBar />
            <ChatRoom/>
        </div>
  );
};

export default App;
