import React, { useEffect} from 'react';
import firebase from "../../firebase/firebase";
import {useListVals} from 'react-firebase-hooks/database';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import {useDispatch} from "react-redux";
import {setCurrentChatRoom} from '../../redux/chatRoom/actions';

const ChatRooms = () => {
    const dispatch = useDispatch();
    const chatRoomsRef = firebase.database().ref('chatRooms');
    const [chatRoomList, loading] = useListVals(chatRoomsRef);


    useEffect(() => {
        if(!loading){

        }
    },[loading,chatRoomList]);

    const handleChatRoomClick = (currChat) => {
        dispatch(setCurrentChatRoom({
            name: currChat.name,
            id: currChat.id
        }));
    };

    return(
        <div>
            <h4>CHAT ROOMS ( {chatRoomList? chatRoomList.length: 'loading..'})</h4>
            <List>
                {chatRoomList.map((chat) => {
                    return (
                        <ListItem button onClick={(e) => {handleChatRoomClick(chat)}}>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={chat.name} secondary={chat.id} />
                    </ListItem>)
                })}
            </List>

        </div>
    );

};

export default ChatRooms;