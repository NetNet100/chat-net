export const actionTypes = {
    LOG_IN: "LOG_IN",
    LOG_OUT: "LOG_OUT",
    SET_USER: "SET_USER",
    CHANGE_NAME: "CHANGE_NAME"
};

export const LOG_OUT = (user) => {
    return {
        type: actionTypes.LOG_IN,
        payload: user
    }
};

export const SET_USER = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: user
    }
};


export const CHANGE_NAME = (newName) => {
    return {
        type: actionTypes.CHANGE_NAME,
        payload: newName
    }
};