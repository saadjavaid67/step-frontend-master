import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllStudentRemark = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT_REMARK, api: apis.getAllStudentRemark, ...para });
export const getStudentRemark = para => requestActionMaker({ cons: cons.GET_STUDENT_REMARK, api: apis.getStudentRemark, ...para });
export const createStudentRemark = para => requestActionMaker({ cons: cons.CREATE_STUDENT_REMARK, api: apis.createStudentRemark, ...para });
export const updateStudentRemark = para => requestActionMaker({ cons: cons.UPDATE_STUDENT_REMARK, api: apis.updateStudentRemark, ...para });
export const deleteStudentRemark = para => requestActionMaker({ cons: cons.DELETE_STUDENT_REMARK, api: apis.deleteStudentRemark, ...para });
export const getAllStudentRemarkForStudentDetail = para => requestActionMaker({ cons: cons.GET_STUDENT_REMARKS_FOR_STUDENT_DETAIL, api: apis.getAllStudentRemark, ...para });
/**** 20200217 ****/

export const getAllStudentRemarkBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_STUDENT_REMARK_BY_SPECIFICATION, api: apis.getAllStudentRemarkBySpecification, ...para });
export const postCreateStudentRemark = para => requestActionMaker({ cons: cons.POST_CREATE_STUDENT_REMARK, api: apis.postCreateStudentRemark, ...para });