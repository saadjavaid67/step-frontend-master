import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllStudentAsq = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT_ASQ, state, action);
export const getStudentAsq = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENT_ASQ, state, action);
export const createStudentAsq = (state = initialState, action) => requestReducerMaker(cons.CREATE_STUDENT_ASQ, state, action);
export const updateStudentAsq = (state = initialState, action) => requestReducerMaker(cons.UPDATE_STUDENT_ASQ, state, action);
export const deleteStudentAsq = (state = initialState, action) => requestReducerMaker(cons.DELETE_STUDENT_ASQ, state, action);
export const getStudentAsqsForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENT_ASQS_FOR_SELECTION, state, action);
export const getStudentAsqsForStudentDetail = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENT_ASQS_FOR_STUDENT_DETAIL, state, action);
/**** 20200217 ****/

export const getAllStudentAsqBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT_ASQ_BY_SPECIFICATION, state, action);
export const getStudentAsqById = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENT_ASQ_BY_ID, state, action);
export const getActiveStudentAsqByStudentId = (state = initialState, action) => requestReducerMaker(cons.GET_ACTIVE_STUDENT_ASQ_BY_STUDENT_ID, state, action);
export const getAllStudentAsqReminder = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT_ASQ_REMINDER, state, action);
export const postCreateStudentAsq = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_STUDENT_ASQ, state, action);
export const putUpdateStudentAsq = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_STUDENT_ASQ, state, action);
