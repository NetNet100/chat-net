import React from 'react';
import {connect} from 'react-redux';
import {CHANGE_NAME} from './redux/user/actions';
import LogOut from './components/auth/logout';
import './App.css';
import ChatRoomsSideBar from './components/chatRoom/chatRoomsList';
import NewChatModal from './components/chatRoom/newChatRoomModal'
import ChatRoom from "./components/chatRoom/chatRoom";
import Avatar from "@material-ui/core/Avatar";

const App = ({user, changeName}) => {

  return (
        <div>
            <div className="sidenav">
                <h2>Welcome To Chat-Net</h2>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{marginLeft: "80px", padding: "15px"}} />
                <NewChatModal/>
                <ChatRoomsSideBar />
                <LogOut />
            </div>
            <div className="App">
                <ChatRoom/>
            </div>
        </div>
  );
};

const mapStateToProps = (state) => {
    return {
        user: state.user || {}
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeName: (name) => dispatch(CHANGE_NAME(name))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);