import * as actionTypes from './actionTypes';

export const initProfile = (profile) => {
    return {
        type: actionTypes.PROFILE_INIT,
        profile: profile
    }
}