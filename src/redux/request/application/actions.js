import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllApplication = para => requestActionMaker({ cons: cons.GET_ALL_APPLICATION, api: apis.getAllApplication, ...para });
export const getApplication = para => requestActionMaker({ cons: cons.GET_APPLICATION, api: apis.getApplication, ...para });
export const getApplicationForAcceptApplication = para => requestActionMaker({ cons: cons.GET_APPLICATION_FOR_ACCEPT_APPLICATION, api: apis.getApplication, ...para });
export const createApplication = para => requestActionMaker({ cons: cons.CREATE_APPLICATION, api: apis.createApplication, ...para });
export const updateApplication = para => requestActionMaker({ cons: cons.UPDATE_APPLICATION, api: apis.updateApplication, ...para });
export const getApplicationsForSelection = para => requestActionMaker({ cons: cons.GET_APPLICATIONS_FOR_SELECTION, api: apis.getAllApplication, ...para });
export const getNewApplications = para => requestActionMaker({ cons: cons.GET_NEW_APPLICATIONS, api: apis.getNewApplications, ...para });
export const getWaitingApplications = para => requestActionMaker({ cons: cons.GET_WAITING_APPLICATIONS, api: apis.getWaitingApplications, ...para });
export const getApplicationsForStudentDetail = para => requestActionMaker({ cons: cons.GET_APPLICATIONS_FOR_STUDENT_DETAIL, api: apis.getAllApplication, ...para });
export const reserveApplication = para => requestActionMaker({ cons: cons.RESERVE_APPLICATION, api: apis.reserveApplication, ...para });
export const restoreApplication = para => requestActionMaker({ cons: cons.RESTORE_APPLICATION, api: apis.restoreApplication, ...para });
export const getCourseSchedule = para => requestActionMaker({ cons: cons.GET_COURSE_SCHEDULE, api: apis.getCourseSchedule, ...para });
export const getSummerCourseSchedule = para => requestActionMaker({ cons: cons.GET_SUMMER_COURSE_SCHEDULE, api: apis.getSummerCourseSchedule, ...para });
export const getAllSummerCourseSchedule = para => requestActionMaker({ cons: cons.GET_ALL_SUMMER_COURSE_SCHEDULE, api: apis.getAllSummerCourseSchedule, ...para });
export const checkSessionCapacity = para => requestActionMaker({ cons: cons.GET_CHECK_SESSION_CAPACITY, api: apis.checkSessionCapacity, ...para });
/**** 20200217 ****/

export const getAllApplicationBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_APPLICATION_BY_SPECIFICATION, api: apis.getAllApplicationBySpecification, ...para });
export const getAllApplicationForCreateInvoice = para => requestActionMaker({ cons: cons.GET_ALL_APPLICATION_FOR_CREATE_INVOICE, api: apis.getAllApplicationForCreateInvoice, ...para });
export const getAllApplicationSessionBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_APPLICATION_SESSION_BY_SPECIFICATION, api: apis.getAllApplicationSessionBySpecification, ...para });
export const getApplicationById = para => requestActionMaker({ cons: cons.GET_APPLICATION_BY_ID, api: apis.getApplicationById, ...para });
export const getAllWaitingApplicationByClassId = para => requestActionMaker({ cons: cons.GET_ALL_WAITING_APPLICATION_BY_CLASS_ID, api: apis.getAllWaitingApplicationByClassId, ...para });
export const postCreateApplication = para => requestActionMaker({ cons: cons.POST_CREATE_APPLICATION, api: apis.postCreateApplication, ...para });
export const postCheckSessionCapacity = para => requestActionMaker({ cons: cons.POST_CHECK_SESSION_CAPACITY, api: apis.postCheckSessionCapacity, ...para });
export const putUpdateApplication = para => requestActionMaker({ cons: cons.PUT_UPDATE_APPLICATION, api: apis.putUpdateApplication, ...para });
export const deleteApplication = para => requestActionMaker({ cons: cons.DELETE_APPLICATION, api: apis.deleteApplication, ...para });
// export const getApplicationsForStudentDetail = para => requestActionMaker({ cons: cons.GET_APPLICATIONS_FOR_STUDENT_DETAIL, api: apis.getAllApplicationBySpecification, ...para });
