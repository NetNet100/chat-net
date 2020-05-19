import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import firebase from "../../firebase/firebase";
import {useListVals} from 'react-firebase-hooks/database';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {setCurrentChatRoom} from "../../redux/chatRoom/actions";
import Avatar from "@material-ui/core/Avatar";
import ImageUpload from "./uploadImage";
import swal from "sweetalert";

const NewChatModal = ({isOpen, handleClose, setCurrentChatRoom,userId}) => {
    const [chatRoomName, setChatRoomName] = useState("");
    const chatRoomsRef = firebase.database().ref('chatRooms');
    const usersRef = firebase.database().ref('users');
    const [userList, loading] = useListVals(usersRef, {keyField: 'id'});
    const [members, setMembers] = useState([]);
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("https://www.logopik.com/wp-content/uploads/edd/2018/06/Chat-Rooms.png");

    const handleCreate = () => {
        const key = chatRoomsRef.push().key;

        const membersBla = [...members, {id: userId}];
        setMembers(membersBla);
        debugger;
        const newChatRoom = {
            id: key,
            name: chatRoomName,
            members: membersBla,
            photoURL: url,
        };

        if(newChatRoom.name.length < 3 ){
            swal("Opppssss...", "Chat room name must contain least of 3 words", "warning");
        } else {
            try {
                chatRoomsRef.child(key).update(newChatRoom).then(() => {
                    setCurrentChatRoom(newChatRoom);
                });
            } catch (error) {
                //DOTO: handle err
            }

            handleClose();
        }
    };

    const handleUsers = (event, values) => {
        //TODO: i remember
        let a = [];
        values.forEach((value) => {
            a.push({id: value.id});
        });

        setMembers(a);
    };

    const openDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = (url) => {
        setOpen(false);
        if (url) {
            setUrl(url);
        }
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle
                    style={{textAlign: 'center'}}
                    id="create-new-chat-room">
                    {"Create New Chat Room"}
                    <Avatar
                        onClick={openDialog}
                        style={{
                            width: '150px',
                            height: '150px',
                            border: '1px solid black',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        src={url}>
                    </Avatar>
                    <ImageUpload isOpen={open} handleClose={handleCloseDialog}/>
                </DialogTitle>

                <DialogContent>

                    <TextField
                        label="Chat Room Name"
                        fullWidth={true}
                        value={chatRoomName}
                        onChange={(e) => {
                            setChatRoomName(e.target.value)
                        }}
                    />
                    {userList && <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={userList}
                        loading={loading}
                        onChange={handleUsers}
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Add Friends..."/>
                        )}
                    />}
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary" autoFocus
                        onClick={handleCreate}

                    >
                        Create
                    </Button>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

NewChatModal.defaultProps = {
    isOpen: Boolean,
    handleClose: Function
};


const mapStateToProps = (state) => {
    return {
        room: state.room,
        userId: state.user.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentChatRoom: (newRoom) => dispatch(setCurrentChatRoom(newRoom)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewChatModal);

