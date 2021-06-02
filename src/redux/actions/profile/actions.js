import * as actionTypes from './actionTypes';

export const syncProfile = (profile) => {
    return {
        type: actionTypes.PROFILE_SYNC,
        profile: profile
    }
}