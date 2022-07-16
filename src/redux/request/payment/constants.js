import { requestConstantsMaker } from '../helper';

/**** 20200217 ****/
export const GET_ALL_PAYMENT = requestConstantsMaker('GET_ALL_PAYMENT');
export const GET_PAYMENT = requestConstantsMaker('GET_PAYMENT');
export const CREATE_PAYMENT = requestConstantsMaker('CREATE_PAYMENT');
export const UPDATE_PAYMENT = requestConstantsMaker('UPDATE_PAYMENT');
export const GET_PAYMENTS_FOR_SELECTION = requestConstantsMaker('GET_PAYMENTS_FOR_SELECTION');
export const CREATE_PAYMENT_AND_PAY_INVOICE = requestConstantsMaker('CREATE_PAYMENT_AND_PAY_INVOICE');
/**** 20200217 ****/

export const GET_ALL_PAYMENT_BY_SPECIFICATION = requestConstantsMaker('GET_ALL_PAYMENT_BY_SPECIFICATION');
export const GET_ALL_RECEIPT_BY_SPECIFICATION = requestConstantsMaker('GET_ALL_RECEIPT_BY_SPECIFICATION');
export const GET_PAYMENT_BY_ID = requestConstantsMaker('GET_PAYMENT_BY_ID');
export const POST_CREATE_PAYMENT = requestConstantsMaker('POST_CREATE_PAYMENT');
export const PUT_UPDATE_PAYMENT = requestConstantsMaker('PUT_UPDATE_PAYMENT');
export const POST_PAY_INVOICE = requestConstantsMaker('POST_PAY_INVOICE');
export const GET_RECEIPT_BY_ID = requestConstantsMaker('GET_RECEIPT_BY_ID');