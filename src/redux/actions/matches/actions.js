import * as actionTypes from './actionTypes';

export const syncMatches = (matches) => {
    return {
        type: actionTypes.MATCHES_SYNC,
        matches: matches
    }
}
export const selectMatch = (match) => {
    return {
        type: actionTypes.MATCHES_SELECT_MATCH,
        match: match
    }
}