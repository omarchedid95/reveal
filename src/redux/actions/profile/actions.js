import * as actionTypes from './actionTypes';

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