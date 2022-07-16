import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllInvoice = para => requestActionMaker({ cons: cons.GET_ALL_INVOICE, api: apis.getAllInvoice, ...para });
export const getInvoice = para => requestActionMaker({ cons: cons.GET_INVOICE, api: apis.getInvoice, ...para });
export const createInvoice = para => requestActionMaker({ cons: cons.CREATE_INVOICE, api: apis.createInvoice, ...para });
export const updateInvoice = para => requestActionMaker({ cons: cons.UPDATE_INVOICE, api: apis.updateInvoice, ...para });
export const getInvoicesForSelection = para => requestActionMaker({ cons: cons.GET_INVOICES_FOR_SELECTION, api: apis.getAllInvoice, ...para });
/**** 20200217 ****/

export const getAllInvoiceBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_INVOICE_BY_SPECIFICATION, api: apis.getAllInvoiceBySpecification, ...para });
export const getInvoiceById = para => requestActionMaker({ cons: cons.GET_INVOICE_BY_ID, api: apis.getInvoiceById, ...para });
export const postCreateInvoice = para => requestActionMaker({ cons: cons.POST_CREATE_INVOICE, api: apis.postCreateInvoice, ...para });
export const putUpdateInvoice = para => requestActionMaker({ cons: cons.PUT_UPDATE_INVOICE, api: apis.putUpdateInvoice, ...para });
export const deleteInvoice = para => requestActionMaker({ cons: cons.DELETE_INOVICE, api: apis.deleteInvoice, ...para });
export const postSendInvoiceByEmail = para => requestActionMaker({ cons: cons.POST_SEND_INVOICE_BY_EMAIL, api: apis.postSendInvoiceByEmail, ...para });