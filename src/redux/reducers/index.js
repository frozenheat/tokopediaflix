import {combineReducers} from 'redux';
import movieReducer from './movieReducer';
import cookieReducer from './cookieReducer';

export default combineReducers({
	movies : movieReducer,
	cookie : cookieReducer
});