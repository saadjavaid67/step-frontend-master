import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllPriceGroup = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_PRICE_GROUP, state, action);
export const getPriceGroup = (state = initialState, action) => requestReducerMaker(cons.GET_PRICE_GROUP, state, action);
export const createPriceGroup = (state = initialState, action) => requestReducerMaker(cons.CREATE_PRICE_GROUP, state, action);
export const updatePriceGroup = (state = initialState, action) => requestReducerMaker(cons.UPDATE_PRICE_GROUP, state, action);
export const getPriceGroupsForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_PRICE_GROUPS_FOR_SELECTION, state, action);
/**** 20200217 ****/

export const getAllPriceGroupBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_PRICE_GROUP_BY_SPECIFICATION, state, action);
export const getPriceGroupById = (state = initialState, action) => requestReducerMaker(cons.GET_PRICE_GROUP_BY_ID, state, action);
export const postCreatePriceGroup = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_PRICE_GROUP, state, action);
export const putUpdatePriceGroup = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_PRICE_GROUP, state, action);