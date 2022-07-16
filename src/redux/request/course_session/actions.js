import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getOverCapacitySessions = para => requestActionMaker({ cons: cons.GET_OVER_CAPACITY_SESSIONS, api: apis.getOverCapacitySessions, ...para });
export const getCourseSessionsForCourseSchedule = para => requestActionMaker({ cons: cons.GET_COURSE_SESSIONS_FOR_COURSE_SCHEDULE, api: apis.getCourseSessionsForCourseSchedule, ...para });
export const getCourseSessionsForReschedule = para => requestActionMaker({ cons: cons.GET_COURSE_SESSIONS_FOR_RESCHEDULE, api: apis.getCourseSessionsForReschedule, ...para });
export const updateCourseSession = para => requestActionMaker({ cons: cons.UPDATE_COURSE_SESSION, api: apis.updateCourseSession, ...para });
/**** 20200217 ****/

export const getAllCourseSessionBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_COURSE_SESSION_BY_SPECIFICATION, api: apis.getAllCourseSessionBySpecification, ...para });