import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllUser = para => requestActionMaker({ cons: cons.GET_ALL_USER, api: apis.getAllUser, ...para });
export const getUser = para => requestActionMaker({ cons: cons.GET_USER, api: apis.getUser, ...para });
export const createUser = para => requestActionMaker({ cons: cons.CREATE_USER, api: apis.createUser, ...para });
export const updateUser = para => requestActionMaker({ cons: cons.UPDATE_USER, api: apis.updateUser, ...para });
export const getUsersForSelection = para => requestActionMaker({ cons: cons.GET_USERS_FOR_SELECTION, api: apis.getAllUser, ...para });
/**** 20200217 ****/

export const getAllUserBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_USER_BY_SPECIFICATION, api: apis.getAllUserBySpecification, ...para });
export const getUserById = para => requestActionMaker({ cons: cons.GET_USER_BY_ID, api: apis.getUserById, ...para });
export const getLoggedUserInfo = para => requestActionMaker({ cons: cons.GET_LOGGED_USER_INFO, api: apis.getLoggedUserInfo, ...para });
export const postCreateUser = para => requestActionMaker({ cons: cons.POST_CREATE_USER, api: apis.postCreateUser, ...para });
export const putUpdateUser = para => requestActionMaker({ cons: cons.PUT_UPDATE_USER, api: apis.putUpdateUser, ...para });
export const putUpdateLoggedUserPassword = para => requestActionMaker({ cons: cons.PUT_UPDATE_LOGGED_USER_PASSWORD, api: apis.putUpdateLoggedUserPassword, ...para });