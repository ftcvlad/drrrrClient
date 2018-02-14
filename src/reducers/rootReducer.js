import {combineReducers} from 'redux';
import userReducer from './userReducer';
import { reducer as formReducer } from 'redux-form';
import {reducer as fetchReducer} from 'react-redux-fetch';

const rootReducer = combineReducers({
    repository: fetchReducer,
    form: formReducer
});

export default rootReducer;



