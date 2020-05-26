import React, {useEffect, useState, useRef} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {connect} from "react-redux";
import firebase from "../../firebase/firebase";
import {useListVals} from "react-firebase-hooks/database";
import Divider from "@material-ui/core/Divider";

const Messages = ({room}) => {
    const messagesRef = firebase.database().ref('messages').child(room.id);
    const usersRef = firebase.database().ref('users');
    const roomRef = firebase.database().ref('chatRooms');
    const [messagesList, loading] = useListVals(messagesRef);
    const [members, setMembers] = useState({});
    const messageRef = useRef(null);

    useEffect(() => {
        getMemberDatas();
    }, [room]);

    useEffect(() => {
        console.log(messageRef);
        messageRef.current.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messagesList]);

    const getMemberDatas = () => {
        roomRef
            .child(room.id)
            .child('members')
            .once("value")
            .then((snapshot) => {
                snapshot.val().forEach((snap) => {
                    usersRef
                        .child(snap.id)
                        .once("value")
                        .then((user) => {
                            const userSnap = user.val();
                            const tempMember = members;
                            tempMember[user.key] = userSnap;
                            setMembers(tempMember);
                        });
                });
            });
    };

    return (
        <>
            <List style={{overflow: 'auto', maxHeight:'350px'}}>
                {messagesList.map((message, index) => {
                    return (
                        <div style={{display: 'flex'}}>
                            <h5 style={{marginRight: '15px'}}>{message.timeToShow}</h5>
                            <div style={{borderLeft: '6px solid lightgreen', height: '47px', marginTop: '12px'}}/>
                            <ListItem key={index} id={message.id}>
                                <ListItemAvatar>
                                    <Avatar src={members[message.userId] && members[message.userId].photoURL}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={members[message.userId] && `${members[message.userId].firstName} ${members[message.userId].lastName}`}
                                    secondary={message.message}/>
                                <Divider key={message.id} variant="inset" component="li"/>
                            </ListItem>
                        </div>
                    )
                })}
                <div ref={messageRef}/>
            </List>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        room: state.room
    }
};

export default connect(mapStateToProps)(Messages);
