import * as actionTypes from '../actions/profile/actionTypes';

let initialState = {
    reveals: [
        {
            number: 0,
            time: 1,
            prompt: '',
            answer: ''
        },
        {
            number: 1,
            time: 3,
            prompt: '',
            answer: ''
        },
        {
            number: 2,
            time: 7,
            prompt: '',
            answer: ''
        },
        {
            number: 3,
            time: 10,
            prompt: '',
            answer: ''
        }
    ],
    editedReveal: undefined
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PROFILE_SET_EDITED_REVEAL:
            if (action.revealNumber < 0) {
                return {
                    ...state,
                    editedReveal: undefined
                }
            }
            return {
                ...state,
                editedReveal: action.revealNumber
            }
        default:
            return state;
    }
}
export default reducer;