import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const updateApplicationSessionStatus = para => requestActionMaker({ cons: cons.UPDATE_APPLICATION_SESSION_STATUS, api: apis.updateApplicationSessionStatus, ...para });
export const updateApplicationSessionStatusByCourseSessionId = para => requestActionMaker({ cons: cons.UPDATE_APPLICATION_SESSION_STATUS_BY_COURSE_SESSION_ID, api: apis.updateApplicationSessionStatusByCourseSessionId, ...para });
export const rescheduleApplicationSession = para => requestActionMaker({ cons: cons.RESCHEDULE_APPLICATION_SESSION, api: apis.rescheduleApplicationSession, ...para });
export const rescheduleCourseSession = para => requestActionMaker({ cons: cons.RESCHEDULE_COURSE_SESSION, api: apis.rescheduleCourseSession, ...para });
export const cancelApplicationSession = para => requestActionMaker({ cons: cons.CANCEL_APPLICATION_SESSION, api: apis.cancelApplicationSession, ...para });
export const cancelCourseSession = para => requestActionMaker({ cons: cons.CANCEL_COURSE_SESSION, api: apis.cancelCourseSession, ...para });
export const swapApplicationSession = para => requestActionMaker({ cons: cons.SWAP_APPLICATION_SESSION, api: apis.swapApplicationSession, ...para });
export const updateApplicationSessionNumber = para => requestActionMaker({ cons: cons.UPDATE_APPLICATION_SESSION_NUMBER, api: apis.updateApplicationSessionNumber, ...para });
/**** 20200217 ****/
