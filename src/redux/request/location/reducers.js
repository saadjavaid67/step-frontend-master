import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllLocation = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_LOCATION, state, action);
export const getLocation = (state = initialState, action) => requestReducerMaker(cons.GET_LOCATION, state, action);
export const createLocation = (state = initialState, action) => requestReducerMaker(cons.CREATE_LOCATION, state, action);
export const updateLocation = (state = initialState, action) => requestReducerMaker(cons.UPDATE_LOCATION, state, action);
export const getLocationsForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_LOCATIONS_FOR_SELECTION, state, action);
/**** 20200217 ****/


export const getAllLocationBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_LOCATION_BY_SPECIFICATION, state, action);
export const getLocationById = (state = initialState, action) => requestReducerMaker(cons.GET_LOCATION_BY_ID, state, action);
export const postCreateLocation = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_LOCATION, state, action);
export const putUpdateLocation = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_LOCATION, state, action);
