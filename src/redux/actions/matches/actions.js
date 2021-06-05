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
export const addMatch = (match) => {
    return {
        type: actionTypes.MATCHES_ADD_MATCH,
        match: match
    }
}
export const deleteMatch = (matchId) => {
    return {
        type: actionTypes.MATCHES_DELETE_MATCH,
        matchId: matchId
    }
}
export const updateMatch = (matchId, lastMessage) => {
    return {
        type: actionTypes.MATCHES_UPDATE_MATCH,
        matchId: matchId,
        lastMessage: lastMessage
    }
}