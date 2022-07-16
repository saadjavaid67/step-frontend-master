import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllPayment = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_PAYMENT, state, action);
export const getPayment = (state = initialState, action) => requestReducerMaker(cons.GET_PAYMENT, state, action);
export const createPayment = (state = initialState, action) => requestReducerMaker(cons.CREATE_PAYMENT, state, action);
export const updatePayment = (state = initialState, action) => requestReducerMaker(cons.UPDATE_PAYMENT, state, action);
export const getPaymentsForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_PAYMENTS_FOR_SELECTION, state, action);
export const createPaymentAndPayInvoice = (state = initialState, action) => requestReducerMaker(cons.CREATE_PAYMENT_AND_PAY_INVOICE, state, action);
/**** 20200217 ****/

export const getAllPaymentBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_PAYMENT_BY_SPECIFICATION, state, action);
export const getAllReceiptBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_RECEIPT_BY_SPECIFICATION, state, action);
export const getPaymentById = (state = initialState, action) => requestReducerMaker(cons.GET_PAYMENT_BY_ID, state, action);
export const postCreatePayment = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_PAYMENT, state, action);
export const putUpdatePayment = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_PAYMENT, state, action);
export const postPayInvoice = (state = initialState, action) => requestReducerMaker(cons.POST_PAY_INVOICE, state, action);
export const getReceiptById = (state = initialState, action) => requestReducerMaker(cons.GET_RECEIPT_BY_ID, state, action);