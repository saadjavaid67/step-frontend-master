import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllUser = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_USER, state, action);
export const getUser = (state = initialState, action) => requestReducerMaker(cons.GET_USER, state, action);
export const createUser = (state = initialState, action) => requestReducerMaker(cons.CREATE_USER, state, action);
export const updateUser = (state = initialState, action) => requestReducerMaker(cons.UPDATE_USER, state, action);
export const getUsersForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_USERS_FOR_SELECTION, state, action);
/**** 20200217 ****/

export const getAllUserBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_USER_BY_SPECIFICATION, state, action);
export const getUserById = (state = initialState, action) => requestReducerMaker(cons.GET_USER_BY_ID, state, action);
export const getLoggedUserInfo = (state = initialState, action) => requestReducerMaker(cons.GET_LOGGED_USER_INFO, state, action);
export const postCreateUser = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_USER, state, action);
export const putUpdateUser = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_USER, state, action);
export const putUpdateLoggedUserPassword = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_LOGGED_USER_PASSWORD, state, action);