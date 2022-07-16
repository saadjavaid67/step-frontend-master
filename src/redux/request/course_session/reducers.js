import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

export const getOverCapacitySessions = (state = initialState, action) => requestReducerMaker(cons.GET_OVER_CAPACITY_SESSIONS, state, action);
export const getCourseSessionsForCourseSchedule = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_SESSIONS_FOR_COURSE_SCHEDULE, state, action);
export const getCourseSessionsForReschedule = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_SESSIONS_FOR_RESCHEDULE, state, action);
export const updateCourseSession = (state = initialState, action) => requestReducerMaker(cons.UPDATE_COURSE_SESSION, state, action);

export const getAllCourseSessionBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_COURSE_SESSION_BY_SPECIFICATION, state, action);