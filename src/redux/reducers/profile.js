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
    preferences: {
        sexPreference: 'anyone',
        agePreference: [18, 30]
    }
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PROFILE_UPDATE_REVEAL:
            return {
                ...state,
                reveals: state.reveals.map((reveal) => {
                    if (reveal.number === action.revealNumber) {
                        return {
                            ...reveal,
                            prompt: action.prompt,
                            answer: action.answer
                        }
                    }
                    return reveal;
                })
            }
        case actionTypes.PROFILE_UPDATE_PREFERENCES:
            return {
                ...state,
                preferences: {
                    sexPreference: action.sexPreference,
                    agePreference: action.agePreference
                }
            }
        default:
            return state;
    }
}
export default reducer;