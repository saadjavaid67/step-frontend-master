import { requestConstantsMaker } from '../helper';

/**** 20200217 ****/
export const GET_ALL_INVOICE = requestConstantsMaker('GET_ALL_INVOICE');
export const GET_INVOICE = requestConstantsMaker('GET_INVOICE');
export const CREATE_INVOICE = requestConstantsMaker('CREATE_INVOICE');
export const UPDATE_INVOICE = requestConstantsMaker('UPDATE_INVOICE');
export const GET_INVOICES_FOR_SELECTION = requestConstantsMaker('GET_INVOICES_FOR_SELECTION');
/**** 20200217 ****/

export const GET_ALL_INVOICE_BY_SPECIFICATION = requestConstantsMaker('GET_ALL_INVOICE_BY_SPECIFICATION');
export const GET_INVOICE_BY_ID = requestConstantsMaker('GET_INVOICE_BY_ID');
export const POST_CREATE_INVOICE = requestConstantsMaker('POST_CREATE_INVOICE');
export const PUT_UPDATE_INVOICE = requestConstantsMaker('PUT_UPDATE_INVOICE');
export const DELETE_INOVICE = requestConstantsMaker('DELETE_INOVICE');
export const POST_SEND_INVOICE_BY_EMAIL = requestConstantsMaker('POST_SEND_INVOICE_BY_EMAIL');