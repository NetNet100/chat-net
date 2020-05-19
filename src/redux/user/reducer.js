import actionTypes from "./actionType";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.LOG_OUT :
            return {...action.payload};

        case actionTypes.SET_USER :
            return {...action.payload};

        case actionTypes.CHANGE_NAME :
            return {...state, ...state.user, name: action.payload };

        default:
            return state
    }
};
