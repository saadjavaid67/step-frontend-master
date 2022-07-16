import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllCustomer = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_CUSTOMER, state, action);
export const getCustomer = (state = initialState, action) => requestReducerMaker(cons.GET_CUSTOMER, state, action);
export const createCustomer = (state = initialState, action) => requestReducerMaker(cons.CREATE_CUSTOMER, state, action);
export const updateCustomer = (state = initialState, action) => requestReducerMaker(cons.UPDATE_CUSTOMER, state, action);
export const getCustomersForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_CUSTOMERS_FOR_SELECTION, state, action);
/**** 20200217 ****/

export const getAllCustomerBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_CUSTOMER_BY_SPECIFICATION, state, action);
// export const getAllCustomer = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_CUSTOMER, state, action);
export const getCustomerById = (state = initialState, action) => requestReducerMaker(cons.GET_CUSTOMER_BY_ID, state, action);
export const postCreateCusotmer = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_CUSTOMER, state, action);
export const putUpdateCustomer = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_CUSTOMER, state, action);