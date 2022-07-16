import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllInvoice = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_INVOICE, state, action);
export const getInvoice = (state = initialState, action) => requestReducerMaker(cons.GET_INVOICE, state, action);
export const createInvoice = (state = initialState, action) => requestReducerMaker(cons.CREATE_INVOICE, state, action);
export const updateInvoice = (state = initialState, action) => requestReducerMaker(cons.UPDATE_INVOICE, state, action);
export const getInvoicesForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_INVOICES_FOR_SELECTION, state, action);
/**** 20200217 ****/

export const getAllInvoiceBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_INVOICE_BY_SPECIFICATION, state, action);
export const getInvoiceById = (state = initialState, action) => requestReducerMaker(cons.GET_INVOICE_BY_ID, state, action);
export const postCreateInvoice = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_INVOICE, state, action);
export const putUpdateInvoice = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_INVOICE, state, action);
export const deleteInvoice = (state = initialState, action) => requestReducerMaker(cons.DELETE_INOVICE, state, action);
export const postSendInvoiceByEmail = (state = initialState, action) => requestReducerMaker(cons.POST_SEND_INVOICE_BY_EMAIL, state, action);