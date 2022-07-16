import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllCourseLevel = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE_LEVEL, state, action);
export const getCourseLevel = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_LEVEL, state, action);
export const createCourseLevel = (state = initialState, action) => requestReducerMaker(cons.CREATE_COURSE_LEVEL, state, action);
export const updateCourseLevel = (state = initialState, action) => requestReducerMaker(cons.UPDATE_COURSE_LEVEL, state, action);
export const getCourseLevelsForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_LEVELS_FOR_SELECTION, state, action);
/**** 20200217 ****/

export const getAllCourseLevelBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE_LEVEL_BY_SPECIFICATION, state, action);
export const getCourseLevelById = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_LEVEL_BY_ID, state, action);
export const postCreateCourseLevel = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_COURSE_LEVEL, state, action);
export const putUpdateCourseLevel = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_COURSE_LEVEL, state, action);