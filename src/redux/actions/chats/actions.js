import * as actionTypes from './actionTypes';

export const selectChat = (chat) => {
    return {
        type: actionTypes.CHATS_SELECT_CHAT,
        chat: chat
    }
}