import React, {useEffect, useState} from 'react';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NewChatModal from "../modals/newChatRoomModal";

const ChatRooms = () => {
    const dispatch = useDispatch();
    const chatRoomsRef = firebase.database().ref('chatRooms');
    const [chatRoomList, loading] = useListVals(chatRoomsRef);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };

    const openDialogFunc = () => {
        setOpenDialog(true);
    };

    useEffect(() => {
        if(!loading){

        }
    },[loading,chatRoomList]);

    const handleChatRoomClick = (currChat) => {
        dispatch(setCurrentChatRoom(currChat));
    };

    return(
        <div>
            <div style={{width:'100%', display:'flex'}}>
                <h3 style={{width:'60%'}}>CHAT ROOMS ( {chatRoomList? chatRoomList.length: 'loading..'})</h3>
                <AddCircleIcon
                    variant="contained"
                    size="small"
                    color="black"
                    onClick={openDialogFunc}
                    style={{width:'12%', height:'20%', marginTop: '15px', marginLeft:'63px'}}
                >
                    +
                </AddCircleIcon>
                <NewChatModal isOpen={openDialog} handleClose={handleClose}/>
            </div>
            <div style={{height:'100%', overflow:'auto'}}>
            <List>
                {chatRoomList.map((chat) => {
                    return (
                        <ListItem
                            key={chat.id}
                            button onClick={(e) => {handleChatRoomClick(chat)}}
                        >
                        <ListItemAvatar>
                            <Avatar
                                style={{width: '70px', height: '70px'}}
                                src={chat.photoURL}/>
                        </ListItemAvatar>
                        <ListItemText
                            style={{marginLeft:'15px'}}
                            primary={chat.name}
                            secondary={"friends - " + chat.members.length} />
                    </ListItem>)
                })}
            </List>
            </div>

        </div>
    );

};

export default ChatRooms;
