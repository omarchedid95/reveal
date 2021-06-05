import * as actionTypes from '../actions/matches/actionTypes';

let initialState = {
    selectedMatch: undefined,
    matches: []

}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MATCHES_SYNC:
            return {
                ...state,
                matches: action.matches
            }
        case actionTypes.MATCHES_SELECT_MATCH:
            return {
                ...state,
                selectedMatch: action.match
            }
        case actionTypes.MATCHES_ADD_MATCH:
            return {
                ...state,
                matches: [action.match, ...state.matches]
            }
        case actionTypes.MATCHES_DELETE_MATCH:
            return {
                ...state,
                matches: state.matches.filter((match) => match.matchId !== action.matchId)
            }
        case actionTypes.MATCHES_UPDATE_MATCH:
            // Update the match and move it to the top of the match array
            return {
                ...state,
                matches: [
                    {
                        ...state.matches.filter((match) => match.matchId === action.matchId)[0],
                        lastMessage: action.lastMessage
                    },
                    ...state.matches.filter((match) => match.matchId !== action.matchId)
                ]
            }
        default:
            return state;
    }
}
export default reducer;