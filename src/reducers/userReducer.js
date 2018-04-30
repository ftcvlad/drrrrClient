import initialState from './initialState';
import {ATTEMPT_LOGIN_SUCCESS, ATTEMPT_LOGOUT_SUCCESS, GET_CURRENT_USER_SUCCESS, ATTEMPT_REGISTER_SUCCESS} from '../actions/actionTypes';
import {USER_UPDATE_SUCCESS} from "../actions/http/actionTypes";

export default function userReducer(state = initialState.user, action) {
	//state is array? o_o -- user is a namespace, but the state for this reducer is {}!
  switch (action.type) {

      case ATTEMPT_LOGIN_SUCCESS:
      case ATTEMPT_REGISTER_SUCCESS:
      case GET_CURRENT_USER_SUCCESS:
      case USER_UPDATE_SUCCESS:
        return Object.assign({}, state,  action.user );
      case ATTEMPT_LOGOUT_SUCCESS:
        return {};





    default:
      return state;
  }
}