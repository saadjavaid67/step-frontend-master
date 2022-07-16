import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllPaymentMethod = para => requestActionMaker({ cons: cons.GET_ALL_PAYMENT_METHOD, api: apis.getAllPaymentMethod, ...para });
export const getPaymentMethod = para => requestActionMaker({ cons: cons.GET_PAYMENT_METHOD, api: apis.getPaymentMethod, ...para });
export const createPaymentMethod = para => requestActionMaker({ cons: cons.CREATE_PAYMENT_METHOD, api: apis.createPaymentMethod, ...para });
export const updatePaymentMethod = para => requestActionMaker({ cons: cons.UPDATE_PAYMENT_METHOD, api: apis.updatePaymentMethod, ...para });
export const getPaymentMethodsForSelection = para => requestActionMaker({ cons: cons.GET_PAYMENT_METHODS_FOR_SELECTION, api: apis.getAllPaymentMethod, ...para });
/**** 20200217 ****/

export const getAllPaymentMethodBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_PAYMENT_METHOD_BY_SPECIFICATION, api: apis.getAllPaymentMethodBySpecification, ...para });
export const getPaymentMethodById = para => requestActionMaker({ cons: cons.GET_PAYMENT_METHOD_BY_ID, api: apis.getPaymentMethodById, ...para });
export const postCreatePaymentMethod = para => requestActionMaker({ cons: cons.POST_CREATE_PAYMENT_METHOD, api: apis.postCreatePaymentMethod, ...para });
export const putUpdatePaymentMethod = para => requestActionMaker({ cons: cons.PUT_UPDATE_PAYMENT_METHOD, api: apis.putUpdatePaymentMethod, ...para });