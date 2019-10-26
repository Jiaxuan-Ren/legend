import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import ProjectReducer from './ProjectReducer';
import ProjectCreateReducer from './ProjectCreateReducer';


export default combineReducers({
    auth : AuthReducer,
    projects : ProjectReducer,
    projectCreate : ProjectCreateReducer
})