import React from 'react';
import Button from "@material-ui/core/Button";
import firebase from '../../firebase/firebase';

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
        <div>
            <Button
                variant="contained"
                color="inherit"
                onClick={logoutFunc} >
                LogOut
            </Button>
        </div>
    );

};

export default LogOut;