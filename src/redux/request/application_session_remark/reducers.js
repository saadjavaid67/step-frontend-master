import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllApplicationSessionRemark = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_APPLICATION_SESSION_REMARK, state, action);
export const getApplicationSessionRemarksByStudentId = (state = initialState, action) => requestReducerMaker(cons.GET_APPLICATION_SESSION_REMARKS_BY_STUDENT_ID, state, action);
export const createApplicationSessionRemark = (state = initialState, action) => requestReducerMaker(cons.CREATE_APPLICATION_SESSION_REMARK, state, action);
export const updateApplicationSessionRemark = (state = initialState, action) => requestReducerMaker(cons.UPDATE_APPLICATION_SESSION_REMARK, state, action);
export const deleteApplicationSessionRemark = (state = initialState, action) => requestReducerMaker(cons.DELETE_APPLICATION_SESSION_REMARK, state, action);
/**** 20200217 ****/
