import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllCourseCategory = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE_CATEGORY, state, action);
export const getCourseCategory = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CATEGORY, state, action);
export const createCourseCategory = (state = initialState, action) => requestReducerMaker(cons.CREATE_COURSE_CATEGORY, state, action);
export const updateCourseCategory = (state = initialState, action) => requestReducerMaker(cons.UPDATE_COURSE_CATEGORY, state, action);
export const getCourseCategoriesForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CATEGORIES_FOR_SELECTION, state, action);
export const getCourseCategoriesForNewApplication = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CATEGORIES_FOR_NEW_APPLICATION, state, action);
/**** 20200217 ****/

export const getAllCourseCategoryBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE_CATEGORY_BY_SPECIFICATION, state, action);
export const getCourseCategoryById = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CATEGORY_BY_ID, state, action);
export const postCreateCourseCategory = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_COURSE_CATEGORY, state, action);
export const putUpdateCourseCategory = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_COURSE_CATEGORY, state, action);
// export const getCourseCategoriesForNewApplication = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CATEGORIES_FOR_NEW_APPLICATION, state, action);