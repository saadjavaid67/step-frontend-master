import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllStudentRemark = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT_REMARK, state, action);
export const getStudentRemark = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENT_REMARK, state, action);
export const createStudentRemark = (state = initialState, action) => requestReducerMaker(cons.CREATE_STUDENT_REMARK, state, action);
export const updateStudentRemark = (state = initialState, action) => requestReducerMaker(cons.UPDATE_STUDENT_REMARK, state, action);
export const deleteStudentRemark = (state = initialState, action) => requestReducerMaker(cons.DELETE_STUDENT_REMARK, state, action);
export const getAllStudentRemarkForStudentDetail = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENT_REMARKS_FOR_STUDENT_DETAIL, state, action);
/**** 20200217 ****/

export const getAllStudentRemarkBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT_REMARK_BY_SPECIFICATION, state, action);
export const postCreateStudentRemark = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_STUDENT_REMARK, state, action);