import actionTypes from './actionType';

export const setCurrentChatRoom = (activeChatRoom) => {
    return {
        type: actionTypes.SET_CURR_CHAT_ROOM,
        payload: activeChatRoom
    }
};