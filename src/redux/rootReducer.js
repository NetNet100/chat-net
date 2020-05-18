import { combineReducers } from 'redux';
import {blaReudcer} from './bla/blaReducer';
import {userReducer} from './user/reducer';
import {roomReducer} from './chatRoom/reducer';

const rootReducer = combineReducers({
    bla: blaReudcer,
    user: userReducer,
    room: roomReducer,
});

export default rootReducer;
