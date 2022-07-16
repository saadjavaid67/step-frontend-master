import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllCourseClass = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE_CLASS, state, action);
export const getCourseClass = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CLASS, state, action);
export const createCourseClass = (state = initialState, action) => requestReducerMaker(cons.CREATE_COURSE_CLASS, state, action);
export const updateCourseClass = (state = initialState, action) => requestReducerMaker(cons.UPDATE_COURSE_CLASS, state, action);
export const deleteCourseClass = (state = initialState, action) => requestReducerMaker(cons.DELETE_COURSE_CLASS, state, action);
export const getCourseClassesForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CLASSES_FOR_SELECTION, state, action);
export const getCourseClassForDefaultNewApplication = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CLASS_FOR_DEFAULT_NEW_APPLICATION, state, action);
export const getCourseClassesForCourseSchedule = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CLASSES_FOR_COURSE_SCHEDULE, state, action);
export const getCourseClassForCourseSchedule = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CLASS_FOR_COURSE_SCHEDULE, state, action);
/**** 20200217 ****/

export const getAllCourseClassBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE_CLASS_BY_SPECIFICATION, state, action);
export const getAllCourseClassForReschedule = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE_CLASS_FOR_RESCHEDULE, state, action);
export const getCourseClassById = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CLASS_BY_ID, state, action);
export const getCourseClassScheduleBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CLASS_SCHEDULE_BY_SPECIFICATION, state, action);
export const postCreateCourseClass = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_COURSE_CLASS, state, action);
export const putUpdateCourseClass = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_COURSE_CLASS, state, action);
export const getCourseClassForNewApplication = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_CLASS_FOR_NEW_APPLICATION, state, action);