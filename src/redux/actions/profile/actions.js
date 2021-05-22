import * as actionTypes from './actionTypes';

export const updateReveal = (revealNumber, prompt, answer) => {
    return {
        type: actionTypes.PROFILE_UPDATE_REVEAL,
        revealNumber: revealNumber,
        prompt: prompt,
        answer: answer
    }
}