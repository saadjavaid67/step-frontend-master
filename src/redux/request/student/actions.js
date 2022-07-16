import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllStudent = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT, api: apis.getAllStudent, ...para });
export const getStudent = para => requestActionMaker({ cons: cons.GET_STUDENT, api: apis.getStudent, ...para });
export const createStudent = para => requestActionMaker({ cons: cons.CREATE_STUDENT, api: apis.createStudent, ...para });
export const updateStudent = para => requestActionMaker({ cons: cons.UPDATE_STUDENT, api: apis.updateStudent, ...para });
export const getStudentsForSelection = para => requestActionMaker({ cons: cons.GET_STUDENTS_FOR_SELECTION, api: apis.getAllStudent, ...para });
export const getStudentsForCustomerDetail = para => requestActionMaker({ cons: cons.GET_STUDENTS_FOR_CUSTOMER_DETAIL, api: apis.getAllStudent, ...para });
export const getAsqReminderStudents = para => requestActionMaker({ cons: cons.GET_ASQ_REMINDER_STUDENTS, api: apis.getAsqReminderStudents, ...para });
/**** 20200217 ****/

export const getAllStudentBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT_BY_SPECIFICATION, api: apis.getAllStudentBySpecification, ...para });
// export const getAllStudent = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT, api: apis.getAllStudent, ...para });
export const getStudentById = para => requestActionMaker({ cons: cons.GET_STUDENT_BY_ID, api: apis.getStudentById, ...para });
export const postCreateStudent = para => requestActionMaker({ cons: cons.POST_CREATE_STUDENT, api: apis.postCreateStudent, ...para });
export const putUpdateStudent = para => requestActionMaker({ cons: cons.PUT_UPDATE_STUDENT, api: apis.putUpdateStudent, ...para });
export const getAllStudentByCustomerId = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT_BY_CUSTOMER_ID, api: apis.getAllStudentByCustomerId, ...para });
export const checkStudent = para => requestActionMaker({ cons: cons.CHECK_STUDENT, api: apis.checkStudent, ...para });