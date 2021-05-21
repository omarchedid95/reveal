import { combineReducers } from 'redux';
import profile from './profile';

const appReducer = combineReducers({
    profile: profile
});

const rootReducer = (state, action) => {   
    return appReducer(state, action);
 };
  
export default rootReducer;