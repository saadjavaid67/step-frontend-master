import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllStudentAsq = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT_ASQ, api: apis.getAllStudentAsq, ...para });
export const getStudentAsq = para => requestActionMaker({ cons: cons.GET_STUDENT_ASQ, api: apis.getStudentAsq, ...para });
export const createStudentAsq = para => requestActionMaker({ cons: cons.CREATE_STUDENT_ASQ, api: apis.createStudentAsq, ...para });
export const updateStudentAsq = para => requestActionMaker({ cons: cons.UPDATE_STUDENT_ASQ, api: apis.updateStudentAsq, ...para });
export const deleteStudentAsq = para => requestActionMaker({ cons: cons.DELETE_STUDENT_ASQ, api: apis.deleteStudentAsq, ...para });
export const getStudentAsqsForSelection = para => requestActionMaker({ cons: cons.GET_STUDENT_ASQS_FOR_SELECTION, api: apis.getAllStudentAsq, ...para });
export const getStudentAsqsForStudentDetail = para => requestActionMaker({ cons: cons.GET_STUDENT_ASQS_FOR_STUDENT_DETAIL, api: apis.getAllStudentAsq, ...para });
/**** 20200217 ****/

export const getAllStudentAsqBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT_ASQ_BY_SPECIFICATION, api: apis.getAllStudentAsqBySpecification, ...para });
export const getStudentAsqById = para => requestActionMaker({ cons: cons.GET_STUDENT_ASQ_BY_ID, api: apis.getStudentAsqById, ...para });
export const getActiveStudentAsqByStudentId = para => requestActionMaker({ cons: cons.GET_ACTIVE_STUDENT_ASQ_BY_STUDENT_ID, api: apis.getActiveStudentAsqByStudentId, ...para });
export const getAllStudentAsqReminder = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT_ASQ_REMINDER, api: apis.getAllStudentAsqReminder, ...para });
export const postCreateStudentAsq = para => requestActionMaker({ cons: cons.POST_CREATE_STUDENT_ASQ, api: apis.postCreateStudentAsq, ...para });
export const putUpdateStudentAsq = para => requestActionMaker({ cons: cons.PUT_UPDATE_STUDENT_ASQ, api: apis.putUpdateStudentAsq, ...para });
