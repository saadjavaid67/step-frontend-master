import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllLocation = para => requestActionMaker({ cons: cons.GET_ALL_LOCATION, api: apis.getAllLocation, ...para });
export const getLocation = para => requestActionMaker({ cons: cons.GET_LOCATION, api: apis.getLocation, ...para });
export const createLocation = para => requestActionMaker({ cons: cons.CREATE_LOCATION, api: apis.createLocation, ...para });
export const updateLocation = para => requestActionMaker({ cons: cons.UPDATE_LOCATION, api: apis.updateLocation, ...para });
export const getLocationsForSelection = para => requestActionMaker({ cons: cons.GET_LOCATIONS_FOR_SELECTION, api: apis.getAllLocation, ...para });
/**** 20200217 ****/

export const getAllLocationBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_LOCATION_BY_SPECIFICATION, api: apis.getAllLocationBySpecification, ...para });
export const getLocationById = para => requestActionMaker({ cons: cons.GET_LOCATION_BY_ID, api: apis.getLocationById, ...para });
export const postCreateLocation = para => requestActionMaker({ cons: cons.POST_CREATE_LOCATION, api: apis.postCreateLocation, ...para });
export const putUpdateLocation = para => requestActionMaker({ cons: cons.PUT_UPDATE_LOCATION, api: apis.putUpdateLocation, ...para });
