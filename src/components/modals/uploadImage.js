import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera} from "@material-ui/icons";
import firebase from "../../firebase/firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const ImageUpload = ({isOpen, handleClose}) => {
    const [image, setImage] = useState();
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const storage = firebase.storage();

    useEffect(() => {
        if (image) {
            handleUpload();
        }
    }, [image]);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            const temp = e.target.files[0];
            setImage(temp);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            }, (error) => {
                console.log(error);
            },() => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
            }
        );
    };

    return (<>
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Uploading Image"}</DialogTitle>
            <DialogContent>
                <img style={{maxHeight: '300px'}} src={url} />
                <DialogContentText id="alert-dialog-description">
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <input style={{display: 'none' }} id="icon-button-file" type="file" onChange={handleChange} />
                        <LinearProgress variant="determinate" value={progress} />
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => handleClose(url)} color="primary">
                        Save & Close
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    </>);
};

ImageUpload.defaultProps = {
    isOpen: Boolean,
    handleClose: Function
};

export default ImageUpload;
