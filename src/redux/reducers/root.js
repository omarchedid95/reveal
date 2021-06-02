import { combineReducers } from 'redux';
import profile from './profile';
import matches from './matches';

const appReducer = combineReducers({
    profile: profile,
    matches: matches
});

const rootReducer = (state, action) => {   
    return appReducer(state, action);
 };
  
export default rootReducer;