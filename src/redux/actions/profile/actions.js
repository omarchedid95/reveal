import * as actionTypes from './actionTypes';

export const initProfile = (profile) => {
    return {
        type: actionTypes.PROFILE_INIT,
        profile: profile
    }
}
export const updateReveal = (revealNumber, prompt, answer) => {
    return {
        type: actionTypes.PROFILE_UPDATE_REVEAL,
        revealNumber: revealNumber,
        prompt: prompt,
        answer: answer
    }
}

export const updatePreferences = (sexPreference, agePreference) => {
    return {
        type: actionTypes.PROFILE_UPDATE_PREFERENCES,
        sexPreference: sexPreference,
        agePreference: agePreference
    }
}