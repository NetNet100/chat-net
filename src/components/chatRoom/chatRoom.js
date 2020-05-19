import React from 'react';
import './chatRoom.css';
import {connect} from "react-redux";
import SendMessages from '../messages/sendMessages';
import Messages from '../messages/messages';
import GroupChatRoom from './groupChatRoom';

const ChatRoom = ({room}) => {

    return (<>
        {room.name?
        <div className="wrapper">
            <div style={{marginTop:'20px'}}><GroupChatRoom /></div>
            <div><Messages/></div>
            <div><SendMessages/></div>
        </div>:null}
    </>);
};

const mapStateToProps = (state) => {
    return {
        room: state.room
    }
};


export default connect(mapStateToProps)(ChatRoom);

