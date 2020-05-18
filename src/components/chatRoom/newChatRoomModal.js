import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import firebase from "../../firebase/firebase";
import swal from "sweetalert";
import {useListVals} from 'react-firebase-hooks/database';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from "react-redux";
import {setCurrentChatRoom} from "../../redux/chatRoom/actions";

const NewChatModal = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [chatRoomName, setChatRoomName] = useState("");
    const chatRoomsRef = firebase.database().ref('chatRooms');
    const usersRef = firebase.database().ref('users');
    const [userList, loading] = useListVals(usersRef);
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        const key = chatRoomsRef.push().key;
        const newChatRoom = {
            id: key,
            name: chatRoomName,
        };

        try{
            chatRoomsRef.child(key).update(newChatRoom).then(()=> {
                dispatch(setCurrentChatRoom({
                    id: key,
                    name: chatRoomName,
                }));
            });
        }catch (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            swal(errorMessage, errorCode, "error");
        }

        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color=""
                onClick={handleClickOpen}>
                Create New Chat Room
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle id="create-new-chat-room">{"Create New Chat Room"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Chat Room Name"
                        value={chatRoomName}
                        onChange={(e)=> {setChatRoomName(e.target.value)}}
                    />
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options= {top100Films}
                        loading={loading}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField {...params}  placeholder="Add Friends..." />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button
                        color="primary" autoFocus
                        onClick={handleCreate}

                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewChatModal;