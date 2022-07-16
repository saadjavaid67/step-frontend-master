import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllPayment = para => requestActionMaker({ cons: cons.GET_ALL_PAYMENT, api: apis.getAllPayment, ...para });
export const getPayment = para => requestActionMaker({ cons: cons.GET_PAYMENT, api: apis.getPayment, ...para });
export const createPayment = para => requestActionMaker({ cons: cons.CREATE_PAYMENT, api: apis.createPayment, ...para });
export const updatePayment = para => requestActionMaker({ cons: cons.UPDATE_PAYMENT, api: apis.updatePayment, ...para });
export const getPaymentsForSelection = para => requestActionMaker({ cons: cons.GET_PAYMENTS_FOR_SELECTION, api: apis.getAllPayment, ...para });
export const createPaymentAndPayInvoice = para => requestActionMaker({ cons: cons.CREATE_PAYMENT_AND_PAY_INVOICE, api: apis.createPaymentAndPayInvoice, ...para });
/**** 20200217 ****/

export const getAllPaymentBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_PAYMENT_BY_SPECIFICATION, api: apis.getAllPaymentBySpecification, ...para });
export const getAllReceiptBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_RECEIPT_BY_SPECIFICATION, api: apis.getAllReceiptBySpecification, ...para });
export const getPaymentById = para => requestActionMaker({ cons: cons.GET_PAYMENT_BY_ID, api: apis.getPaymentById, ...para });
export const postCreatePayment = para => requestActionMaker({ cons: cons.POST_CREATE_PAYMENT, api: apis.postCreatePayment, ...para });
export const putUpdatePayment = para => requestActionMaker({ cons: cons.PUT_UPDATE_PAYMENT, api: apis.putUpdatePayment, ...para });
export const postPayInvoice = para => requestActionMaker({ cons: cons.POST_PAY_INVOICE, api: apis.postPayInvoice, ...para });
export const getReceiptById = para => requestActionMaker({ cons: cons.GET_RECEIPT_BY_ID, api: apis.getReceiptById, ...para });