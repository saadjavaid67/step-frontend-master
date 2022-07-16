import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllPaymentMethod = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_PAYMENT_METHOD, state, action);
export const getPaymentMethod = (state = initialState, action) => requestReducerMaker(cons.GET_PAYMENT_METHOD, state, action);
export const createPaymentMethod = (state = initialState, action) => requestReducerMaker(cons.CREATE_PAYMENT_METHOD, state, action);
export const updatePaymentMethod = (state = initialState, action) => requestReducerMaker(cons.UPDATE_PAYMENT_METHOD, state, action);
export const getPaymentMethodsForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_PAYMENT_METHODS_FOR_SELECTION, state, action);
/**** 20200217 ****/

export const getAllPaymentMethodBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_PAYMENT_METHOD_BY_SPECIFICATION, state, action);
export const getPaymentMethodById = (state = initialState, action) => requestReducerMaker(cons.GET_PAYMENT_METHOD_BY_ID, state, action);
export const postCreatePaymentMethod = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_PAYMENT_METHOD, state, action);
export const putUpdatePaymentMethod = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_PAYMENT_METHOD, state, action);