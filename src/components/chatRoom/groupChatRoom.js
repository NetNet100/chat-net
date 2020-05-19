import React, {useEffect, useState} from "react";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import {connect} from "react-redux";
import firebase from '../../firebase/firebase';

const GroupChatRoom = ({room}) => {
    const usersRef = firebase.database().ref('users');
    const [members, setMembers] = useState([]);

    useEffect(()=>{
        setMembers([]);
        if(room && room.members) {
            editMembers();
        }
    }, [room]);

    const editMembers = () => {
        room.members.forEach((member) => {
            usersRef.child(member.id).once("value", (snapshot) => {
                setMembers((members) => [...members, snapshot.val()]);
            });
        })
    };

    return(
        <div className='group'>
            <div>
                <Avatar src={room.photoURL} style={{width: '120px', height: '120px', marginRight:'45px'}}/>
            </div>
            <div>
                <h3>{room.name}</h3>
                <AvatarGroup max={4}>
                    {members && members.map((member)=> {
                        return <Avatar alt={member.firstName[0] + member.lastName[0] } src={member.photoURL}/>
                    })}
                </AvatarGroup>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        room: state.room
    }
};


export default connect(mapStateToProps)(GroupChatRoom);
