import * as actionTypes from './actionTypes';

export const loadMatches = (matches) => {
    return {
        type: actionTypes.MATCHES_LOAD_ALL,
        matches: matches
    }
}
export const selectMatch = (match) => {
    return {
        type: actionTypes.MATCHES_SELECT_MATCH,
        match: match
    }
}