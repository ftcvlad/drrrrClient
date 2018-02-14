import initialState from './initialState';
import {ATTEMPT_LOGIN_SUCCESS, ATTEMPT_LOGOUT_SUCCESS, GET_CURRENT_USER_SUCCESS} from '../actions/actionTypes';

export default function userReducer(state = initialState.user, action) {
	//state is array? o_o -- user is a namespace, but the state for this reducer is {}!
  switch (action.type) {

      case ATTEMPT_LOGIN_SUCCESS:
        return Object.assign({}, state,  action.user );
      case ATTEMPT_LOGOUT_SUCCESS:
        return {};
      case GET_CURRENT_USER_SUCCESS:
        return Object.assign({}, state,  action.user );

    default:
      return state;
  }
}