import { combineReducers } from 'redux';
import profile from './profile';
import chats from './chats';

const appReducer = combineReducers({
    profile: profile,
    chats: chats
});

const rootReducer = (state, action) => {   
    return appReducer(state, action);
 };
  
export default rootReducer;