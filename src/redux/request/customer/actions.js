import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllCustomer = para => requestActionMaker({ cons: cons.GET_ALL_CUSTOMER, api: apis.getAllCustomer, ...para });
export const getCustomer = para => requestActionMaker({ cons: cons.GET_CUSTOMER, api: apis.getCustomer, ...para });
export const createCustomer = para => requestActionMaker({ cons: cons.CREATE_CUSTOMER, api: apis.createCustomer, ...para });
export const updateCustomer = para => requestActionMaker({ cons: cons.UPDATE_CUSTOMER, api: apis.updateCustomer, ...para });
export const getCustomersForSelection = para => requestActionMaker({ cons: cons.GET_CUSTOMERS_FOR_SELECTION, api: apis.getAllCustomer, ...para });
/**** 20200217 ****/

export const getAllCustomerBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_CUSTOMER_BY_SPECIFICATION, api: apis.getAllCustomerBySpecification, ...para });
// export const getAllCustomer = para => requestActionMaker({ cons: cons.GET_ALL_CUSTOMER, api: apis.getAllCustomer, ...para });
export const getCustomerById = para => requestActionMaker({ cons: cons.GET_CUSTOMER_BY_ID, api: apis.getCustomerById, ...para });
export const postCreateCusotmer = para => requestActionMaker({ cons: cons.POST_CREATE_CUSTOMER, api: apis.postCreateCusotmer, ...para });
export const putUpdateCustomer = para => requestActionMaker({ cons: cons.PUT_UPDATE_CUSTOMER, api: apis.putUpdateCustomer, ...para });
