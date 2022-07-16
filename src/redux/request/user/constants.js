import { requestConstantsMaker } from '../helper';

/**** 20200217 ****/
export const GET_ALL_USER = requestConstantsMaker('GET_ALL_USER');
export const GET_USER = requestConstantsMaker('GET_USER');
export const CREATE_USER = requestConstantsMaker('CREATE_USER');
export const UPDATE_USER = requestConstantsMaker('UPDATE_USER');
export const GET_USERS_FOR_SELECTION = requestConstantsMaker('GET_USERS_FOR_SELECTION');
/**** 20200217 ****/

export const GET_ALL_USER_BY_SPECIFICATION = requestConstantsMaker('GET_ALL_USER_BY_SPECIFICATION');
export const GET_USER_BY_ID = requestConstantsMaker('GET_USER_BY_ID');
export const GET_LOGGED_USER_INFO = requestConstantsMaker('GET_LOGGED_USER_INFO');
export const POST_CREATE_USER = requestConstantsMaker('POST_CREATE_USER');
export const PUT_UPDATE_USER = requestConstantsMaker('PUT_UPDATE_USER');
export const PUT_UPDATE_LOGGED_USER_PASSWORD = requestConstantsMaker('PUT_UPDATE_LOGGED_USER_PASSWORD');