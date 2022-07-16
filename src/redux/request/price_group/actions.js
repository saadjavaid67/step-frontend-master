import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllPriceGroup = para => requestActionMaker({ cons: cons.GET_ALL_PRICE_GROUP, api: apis.getAllPriceGroup, ...para });
export const getPriceGroup = para => requestActionMaker({ cons: cons.GET_PRICE_GROUP, api: apis.getPriceGroup, ...para });
export const createPriceGroup = para => requestActionMaker({ cons: cons.CREATE_PRICE_GROUP, api: apis.createPriceGroup, ...para });
export const updatePriceGroup = para => requestActionMaker({ cons: cons.UPDATE_PRICE_GROUP, api: apis.updatePriceGroup, ...para });
export const getPriceGroupsForSelection = para => requestActionMaker({ cons: cons.GET_PRICE_GROUPS_FOR_SELECTION, api: apis.getAllPriceGroup, ...para });
/**** 20200217 ****/

export const getAllPriceGroupBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_PRICE_GROUP_BY_SPECIFICATION, api: apis.getAllPriceGroupBySpecification, ...para });
export const getPriceGroupById = para => requestActionMaker({ cons: cons.GET_PRICE_GROUP_BY_ID, api: apis.getPriceGroupById, ...para });
export const postCreatePriceGroup = para => requestActionMaker({ cons: cons.POST_CREATE_PRICE_GROUP, api: apis.postCreatePriceGroup, ...para });
export const putUpdatePriceGroup = para => requestActionMaker({ cons: cons.PUT_UPDATE_PRICE_GROUP, api: apis.putUpdatePriceGroup, ...para });