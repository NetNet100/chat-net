import React from 'react';
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
        <>
            <button
                variant="contained"
                color="inherit"
                onClick={logoutFunc} >
                LogOut
            </button>
        </>
    );

};

export default LogOut;
