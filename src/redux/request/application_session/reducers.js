import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const updateApplicationSessionStatus = (state = initialState, action) => requestReducerMaker(cons.UPDATE_APPLICATION_SESSION_STATUS, state, action);
export const updateApplicationSessionStatusByCourseSessionId = (state = initialState, action) => requestReducerMaker(cons.UPDATE_APPLICATION_SESSION_STATUS_BY_COURSE_SESSION_ID, state, action);
export const rescheduleApplicationSession = (state = initialState, action) => requestReducerMaker(cons.RESCHEDULE_APPLICATION_SESSION, state, action);
export const rescheduleCourseSession = (state = initialState, action) => requestReducerMaker(cons.RESCHEDULE_COURSE_SESSION, state, action);
export const cancelApplicationSession = (state = initialState, action) => requestReducerMaker(cons.CANCEL_APPLICATION_SESSION, state, action);
export const cancelCourseSession = (state = initialState, action) => requestReducerMaker(cons.CANCEL_COURSE_SESSION, state, action);
export const swapApplicationSession = (state = initialState, action) => requestReducerMaker(cons.SWAP_APPLICATION_SESSION, state, action);
export const updateApplicationSessionNumber = (state = initialState, action) => requestReducerMaker(cons.UPDATE_APPLICATION_SESSION_NUMBER, state, action);
/**** 20200217 ****/
