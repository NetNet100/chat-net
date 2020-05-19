import actionTypes from "./actionType";

export const roomReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_CURR_CHAT_ROOM :
            return {...state, ...action.payload};
        default:
            return state
    }
};
