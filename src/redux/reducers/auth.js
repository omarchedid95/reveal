import * as actionTypes from '../actions/auth/actionTypes';

let initialState = {
    user: null
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER_AUTH:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.REMOVE_USER_AUTH:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}
export default reducer;