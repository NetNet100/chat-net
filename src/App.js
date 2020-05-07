import React from 'react';
import {connect} from 'react-redux';
import {CHANGE_NAME, LOG_OUT} from './redux/user/actions';
import LogOut from './components/auth/logout';

const App = ({user, changeName}) => {

  return (
        <div>
            <LogOut />
            <p>{user?user.name: "error" }</p>

            <button onClick={()=> {changeName("Neta")}}>
                Click me
            </button>
            <button onClick={()=> {changeName("Yovel")}}>
            hh
            </button>
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