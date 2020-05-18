import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import {connect} from "react-redux";
import firebase from "../../firebase/firebase";
import {useListVals} from "react-firebase-hooks/database";
import Divider from "@material-ui/core/Divider";

const Messages = ({roomId}) => {
    const messagesRef = firebase.database().ref('messages');
    const [messagesList, loading] = useListVals(messagesRef);
    const [messagesByCurrRoom, setMessagesByCurrRoom] = useState([]);


    useEffect(() => {
        messagesList.forEach((message) => {
            if(message.roomId == roomId){
                setMessagesByCurrRoom([...messagesByCurrRoom, message]);
            }
        });

    }, [loading, messagesList, roomId]);

    return(
        <div>
            <List>
                { messagesList.map((message) => {
                    return(
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={message.user.name} secondary={message.message} />
                        <Divider variant="inset" component="li" />
                    </ListItem>
                    )}) }
            </List>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        room: state.room.id
    }
};

export default connect(mapStateToProps)(Messages);