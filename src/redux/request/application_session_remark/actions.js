import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllApplicationSessionRemark = para => requestActionMaker({ cons: cons.GET_ALL_APPLICATION_SESSION_REMARK, api: apis.getAllApplicationSessionRemark, ...para });
export const getApplicationSessionRemarksByStudentId = para => requestActionMaker({ cons: cons.GET_APPLICATION_SESSION_REMARKS_BY_STUDENT_ID, api: apis.getAllApplicationSessionRemark, ...para });
export const createApplicationSessionRemark = para => requestActionMaker({ cons: cons.CREATE_APPLICATION_SESSION_REMARK, api: apis.createApplicationSessionRemark, ...para });
export const updateApplicationSessionRemark = para => requestActionMaker({ cons: cons.UPDATE_APPLICATION_SESSION_REMARK, api: apis.updateApplicationSessionRemark, ...para });
export const deleteApplicationSessionRemark = para => requestActionMaker({ cons: cons.DELETE_APPLICATION_SESSION_REMARK, api: apis.deleteApplicationSessionRemark, ...para });
/**** 20200217 ****/
