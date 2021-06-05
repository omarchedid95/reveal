import * as actionTypes from '../actions/profile/actionTypes';

let initialState = {
    firstName: '',
    lastName: '',
    dob: new Date(),
    reveal0: {
        number: 0,
        time: 1,
        prompt: '',
        answer: ''
    },
    reveal1: {
        number: 1,
        time: 3,
        prompt: '',
        answer: ''
    },
    reveal2: {
        number: 2,
        time: 7,
        prompt: '',
        answer: ''
    },
    reveal3: {
        number: 3,
        time: 10,
        prompt: '',
        answer: ''
    },
    sexPreference: 'anyone',
    agePreference: [18, 30]
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PROFILE_SYNC:
            return {
                ...state,
                firstName: action.profile.firstName,
                lastName: action.profile.lastName,
                dob: action.profile.dob,
                reveal0: action.profile.reveal0,
                reveal1: action.profile.reveal1,
                reveal2: action.profile.reveal2,
                reveal3: action.profile.reveal3,
                sexPreference: action.profile.sexPreference,
                agePreference: action.profile.agePreference
            }
        default:
            return state;
    }
}
export default reducer;