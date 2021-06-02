import * as actionTypes from '../actions/profile/actionTypes';

let initialState = {
    firstName: '',
    lastName: '',
    dob: new Date(),
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
        case actionTypes.PROFILE_INIT:
            return {
                ...state,
                firstName: action.profile.firstName,
                lastName: action.profile.lastName,
                dob: action.profile.dob,
                reveals: action.profile.reveals,
                preferences: action.profile.preferences
            }
        default:
            return state;
    }
}
export default reducer;