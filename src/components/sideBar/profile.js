import React, {useState} from "react";
import {connect} from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import ImageUpload from '../modals/uploadImage';
import {SET_USER} from '../../redux/user/actions';
import firebase from "../../firebase/firebase";
import LogOut from '../auth/logout';


const Profile = ({user, setUser}) => {
    const userRef = firebase.database().ref('users');
    const [open, setOpen] = useState(false);

    const openDialog = () =>{
        setOpen(true);
    };
    const handleClose = (url) => {
        setOpen(false);
        if(url) {
            user.photoURL = url;
            userRef.child(user.id).child('photoURL').set(url).then((r) =>{
                setUser(user);
        })}
    };
    return(
        <div style={{textAlign:'center'}}>
            <Avatar
                onClick={openDialog}
                style={{width: '125px', height: '125px', marginLeft: '29%', marginTop:'18px'}}
                src={user.photoURL}>
            </Avatar>
            <ImageUpload isOpen={open} handleClose={handleClose} />
            <h3 >{`Hello ${user.firstName}  ${user.lastName}`}</h3>
            <LogOut />
        </div>
    );

};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(SET_USER(user))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
