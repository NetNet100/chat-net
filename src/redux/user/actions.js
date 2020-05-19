import actionTypes from './actionType';

export const LOG_OUT = (user) => {
    return {
        type: actionTypes.LOG_OUT,
        payload: user
    }
};

export const SET_USER = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: user
    }
};

export const UPDATE_USER = (user) => {
    return {
        type: actionTypes.UPDATE_USER,
        payload: user
    }
};


export const CHANGE_NAME = (newName) => {
    return {
        type: actionTypes.CHANGE_NAME,
        payload: newName
    }
};
