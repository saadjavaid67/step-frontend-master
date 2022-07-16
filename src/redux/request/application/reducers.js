import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllApplication = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_APPLICATION, state, action);
export const getApplication = (state = initialState, action) => requestReducerMaker(cons.GET_APPLICATION, state, action);
export const getApplicationForAcceptApplication = (state = initialState, action) => requestReducerMaker(cons.GET_APPLICATION_FOR_ACCEPT_APPLICATION, state, action);
export const createApplication = (state = initialState, action) => requestReducerMaker(cons.CREATE_APPLICATION, state, action);
export const updateApplication = (state = initialState, action) => requestReducerMaker(cons.UPDATE_APPLICATION, state, action);
export const getApplicationsForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_APPLICATIONS_FOR_SELECTION, state, action);
export const getNewApplications = (state = initialState, action) => requestReducerMaker(cons.GET_NEW_APPLICATIONS, state, action);
export const getWaitingApplications = (state = initialState, action) => requestReducerMaker(cons.GET_WAITING_APPLICATIONS, state, action);
export const getApplicationsForStudentDetail = (state = initialState, action) => requestReducerMaker(cons.GET_APPLICATIONS_FOR_STUDENT_DETAIL, state, action);
export const reserveApplication = (state = initialState, action) => requestReducerMaker(cons.RESERVE_APPLICATION, state, action);
export const restoreApplication = (state = initialState, action) => requestReducerMaker(cons.RESTORE_APPLICATION, state, action);
export const getCourseSchedule = (state = initialState, action) => requestReducerMaker(cons.GET_COURSE_SCHEDULE, state, action);
export const getSummerCourseSchedule = (state = initialState, action) => requestReducerMaker(cons.GET_SUMMER_COURSE_SCHEDULE, state, action);
export const getAllSummerCourseSchedule = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_SUMMER_COURSE_SCHEDULE, state, action);
export const checkSessionCapacity = (state = initialState, action) => requestReducerMaker(cons.GET_CHECK_SESSION_CAPACITY, state, action);
/**** 20200217 ****/

export const getAllApplicationBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_APPLICATION_BY_SPECIFICATION, state, action);
export const getAllApplicationForCreateInvoice = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_APPLICATION_FOR_CREATE_INVOICE, state, action);
export const getAllApplicationSessionBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_APPLICATION_SESSION_BY_SPECIFICATION, state, action);
export const getApplicationById = (state = initialState, action) => requestReducerMaker(cons.GET_APPLICATION_BY_ID, state, action);
export const getAllWaitingApplicationByClassId = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_WAITING_APPLICATION_BY_CLASS_ID, state, action);
export const postCreateApplication = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_APPLICATION, state, action);
export const postCheckSessionCapacity = (state = initialState, action) => requestReducerMaker(cons.POST_CHECK_SESSION_CAPACITY, state, action);
export const putUpdateApplication = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_APPLICATION, state, action);
export const deleteApplication = (state = initialState, action) => requestReducerMaker(cons.DELETE_APPLICATION, state, action);
// export const getApplicationsForStudentDetail = (state = initialState, action) => requestReducerMaker(cons.GET_APPLICATIONS_FOR_STUDENT_DETAIL, state, action);
