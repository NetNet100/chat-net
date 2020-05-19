import React, {useState} from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera} from "@material-ui/icons";
import firebase from "../../firebase/firebase";
import swal from "sweetalert";

const SendMessages = ({roomId, user}) => {
    const [message, setMessage] = useState("");
    const mesaggesRef = firebase.database().ref('messages');

    const handleMessage = () => {
        if(message && message.length > 1 ) {
            const id = mesaggesRef.push().key;
            const newMessage = {
                id,
                roomId,
                message,
                userId: user.id,
                time: new Date(),
                timeToShow: new Date().getHours() + ":" +new Date().getMinutes(),
            };

            try {
                mesaggesRef.child(roomId).child(id).update(newMessage).then(() => {
                    setMessage("");
                });
            } catch (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                swal(errorMessage, errorCode, "error");
            }
        }
    };

    return (<>
        <TextField
        id="outlined-full-width"
        label="Write your message"
        style={{ margin: 8}}
        placeholder="..."
        fullWidth
        onChange={(e) => {setMessage(e.target.value)}}
        margin="normal"
        InputLabelProps={{
            shrink: true,
        }}
        variant="outlined"
    />
        <Button
            variant="contained"
            color="primary"
            onClick={handleMessage}
        >
            Send
        </Button>

        <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
        </label>
    </>);
};


const mapStateToProps = (state) => {
    return {
        roomId: state.room.id,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SendMessages);
