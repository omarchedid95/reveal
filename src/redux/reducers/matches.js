import * as actionTypes from '../actions/matches/actionTypes';

let initialState = {
    selectedMatch: undefined,
    matches: []

}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MATCHES_SELECT_MATCH:
            return {
                ...state,
                selectedMatch: action.match
            }
        case actionTypes.MATCHES_LOAD_ALL:
            return {
                ...state,
                matches: action.matches
            }
        default:
            return state;
    }
}
export default reducer;