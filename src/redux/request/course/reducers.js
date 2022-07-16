import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllCourse = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE, state, action);
export const getCourse = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE, state, action);
export const createCourse = (state = initialState, action) => requestReducerMaker(cons.CREATE_COURSE, state, action);
export const updateCourse = (state = initialState, action) => requestReducerMaker(cons.UPDATE_COURSE, state, action);
export const getCoursesForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_COURSES_FOR_SELECTION, state, action);
export const getSummerCoursesForSchedule = (state = initialState, action) => requestReducerMaker(cons.GET_SUMMER_COURSES_FOR_SCHEDULE, state, action);
/**** 20200217 ****/
