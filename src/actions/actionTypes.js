
export const ATTEMPT_LOGIN_SUCCESS = 'ATTEMPT_LOGIN_SUCCESS';
export const ATTEMPT_REGISTER_SUCCESS = 'ATTEMPT_REGISTER_SUCCESS';
export const ATTEMPT_LOGOUT_SUCCESS = 'ATTEMPT_LOGOUT_SUCCESS';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';


//join room
export const JOIN_ROOM_PLAY_SUCCEED = 'JOIN_ROOM_PLAY_SUCCEED';
export const JOIN_ROOM_TABLES_SUCCEED = 'JOIN_ROOM_TABLES_SUCCEED';

//create game
export const CREATE_GAME_SUCCEED = 'CREATE_GAME_SUCCEED';
export const BROADCAST_CREATE_GAME_SUCCEED = 'BROADCAST_CREATE_GAME_SUCCEED';


//play and watch

export const JOIN_GAME_SUCCEED = 'JOIN_GAME_SUCCEED';

export const BROADCAST_PARTICIPANTS_CHANGED_to_tables_SUCCEED = 'BROADCAST_PARTICIPANTS_CHANGED_to_tables_SUCCEED';
export const BROADCAST_PARTICIPANTS_CHANGED_to_table_SUCCEED = 'BROADCAST_PARTICIPANTS_CHANGED_to_table_SUCCEED';
export const BROADCAST_GAME_STARTED_SUCCEED = 'BROADCAST_GAME_STARTED_SUCCEED';

//remove all gameInfo and current game
export const REMOVE_ALL_GAMES_SUCCEED = 'REMOVE_ALL_GAMES_SUCCEED';


//user moves
export const USER_PICK_SUCCEED = 'USER_PICK_SUCCEED';
export const USER_MOVE_SUCCEED = 'USER_MOVE_SUCCEED';

//chat
export const RECEIVE_CHAT_MESSAGE = 'RECEIVE_CHAT_MESSAGE';


//WS

export const SEND = 'redux/message/SEND';
export const SEND_SUCCESS = 'redux/message/SEND_SUCCESS';
export const SEND_FAIL = 'redux/message/SEND_FAIL';

//zzzz
export const EXIT_GAME_SUCCEED = "EXIT_GAME_SUCCEED";
export const BROADCAST_TABLE_REMOVED_SUCCEED = "BROADCAST_TABLE_REMOVED_SUCCEED";

export const BROADCAST_GAME_FINISHED_SUCCEED = "BROADCAST_GAME_FINISHED_SUCCEED";

export const SURRENDER_SUCCEED = "SURRENDER_SUCCEED";


export const CONFIRM_PLAYING_SUCCEED = "CONFIRM_PLAYING_SUCCEED";

export const SUGGEST_DRAW_SUCCEED = "SUGGEST_DRAW_SUCCEED";
export const RESPOND_DRAW_OFFER_SUCCEED = "RESPOND_DRAW_OFFER_SUCCEED";
export const CANCEL_DRAW_OFFER_SUCCEED = "CANCEL_DRAW_OFFER_SUCCEED";