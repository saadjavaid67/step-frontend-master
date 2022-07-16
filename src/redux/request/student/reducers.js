import * as cons from './constants';
import { requestReducerMaker, initialState } from '../helper'

/**** 20200217 ****/
export const getAllStudent = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT, state, action);
export const getStudent = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENT, state, action);
export const createStudent = (state = initialState, action) => requestReducerMaker(cons.CREATE_STUDENT, state, action);
export const updateStudent = (state = initialState, action) => requestReducerMaker(cons.UPDATE_STUDENT, state, action);
export const getStudentsForSelection = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENTS_FOR_SELECTION, state, action);
export const getStudentsForCustomerDetail = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENTS_FOR_CUSTOMER_DETAIL, state, action);
export const getAsqReminderStudents = (state = initialState, action) => requestReducerMaker(cons.GET_ASQ_REMINDER_STUDENTS, state, action);
/**** 20200217 ****/

export const getAllStudentBySpecification = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT_BY_SPECIFICATION, state, action);
// export const getAllStudent = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT, state, action);
export const getStudentById = (state = initialState, action) => requestReducerMaker(cons.GET_STUDENT_BY_ID, state, action);
export const postCreateStudent = (state = initialState, action) => requestReducerMaker(cons.POST_CREATE_STUDENT, state, action);
export const putUpdateStudent = (state = initialState, action) => requestReducerMaker(cons.PUT_UPDATE_STUDENT, state, action);
export const getAllStudentByCustomerId = (state = initialState, action) => requestReducerMaker(cons.GET_ALL_STUDENT_BY_CUSTOMER_ID, state, action);
export const checkStudent = (state = initialState, action) => requestReducerMaker(cons.CHECK_STUDENT, state, action);