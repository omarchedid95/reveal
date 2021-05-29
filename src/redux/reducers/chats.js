import * as actionTypes from '../actions/chats/actionTypes';

let initialState = {
    selectedChat: {
        chatId: '',
        lastMessage: '',
        lastMessageDate: new Date(),
        members: []
    }

}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHATS_SELECT_CHAT:
            return {
                ...state,
                chats: action.chats
            }
        default:
            return state;
    }
}
export default reducer;