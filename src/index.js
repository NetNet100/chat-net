import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from './firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Register from './components/auth/register';
import Login from './components/auth/login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
} from "react-router-dom";
import {createStore} from "redux";
import rootReducer from './redux/rootReducer'
import {Provider, useDispatch} from "react-redux";
import {SET_USER} from './redux/user/actions';
import { composeWithDevTools } from 'redux-devtools-extension';

// TODO: REDUX THUNK
const store = createStore(rootReducer, { user: [] } ,composeWithDevTools());

const Root = ({history}) => {
    const dispatch = useDispatch();
    const [user, loading] = useAuthState(firebase.auth());

    useEffect(() => {
        if(!loading){
            if(user){
                dispatch(SET_USER({
                    id: user.uid,
                    name: user.displayName,
                    avatar: user.photoURL,
                }));
                history.push('/');
            } else {
                history.push('/login');
            }
        }

    }, [user, loading]);

    return (
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Switch>
    );

};

//TODO: withRouter
const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router><RootWithAuth /></Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
