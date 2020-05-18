import React from 'react';
import './chatRoom.css';
import {connect} from "react-redux";
import SendMessages from '../messages/sendMessages';
import Messages from '../messages/messages';

const ChatRoom = ({room}) => {

    return (<>
        {room.name?
        <div className="wrapper">
            <div><p>{room.name}</p></div>
            <div><Messages/></div>
            <div><SendMessages/></div>
        </div>: null}
    </>);
};

const mapStateToProps = (state) => {
    return {
        room: state.room
    }
};


export default connect(mapStateToProps)(ChatRoom);

