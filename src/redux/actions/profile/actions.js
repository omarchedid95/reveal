import * as actionTypes from './actionTypes';

export const setEditedReveal = (revealNumber) => {
    return {
        type: actionTypes.PROFILE_SET_EDITED_REVEAL,
        revealNumber: revealNumber
    }
}