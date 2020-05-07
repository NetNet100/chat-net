import React from 'react';
import Button from "@material-ui/core/Button";
import firebase from '../../firebase/firebase';
import swal from "sweetalert";

const LogOut = () => {

    const logoutFunc = () => {
        try {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });

        } catch (e) {

        }
    };

    return(
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={logoutFunc} >
                LogOut
            </Button>
        </>
    );

};

export default LogOut;