import { combineReducers } from 'redux';
import {blaReudcer} from './bla/blaReducer';
import {userReducer} from './user/reducer';

const rootReducer = combineReducers({
    bla: blaReudcer,
    user: userReducer
});

export default rootReducer;
