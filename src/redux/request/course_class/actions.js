import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllCourseClass = para => requestActionMaker({ cons: cons.GET_ALL_COURSE_CLASS, api: apis.getAllCourseClass, ...para });
export const getCourseClass = para => requestActionMaker({ cons: cons.GET_COURSE_CLASS, api: apis.getCourseClass, ...para });
export const createCourseClass = para => requestActionMaker({ cons: cons.CREATE_COURSE_CLASS, api: apis.createCourseClass, ...para });
export const updateCourseClass = para => requestActionMaker({ cons: cons.UPDATE_COURSE_CLASS, api: apis.updateCourseClass, ...para });
export const deleteCourseClass = para => requestActionMaker({ cons: cons.DELETE_COURSE_CLASS, api: apis.deleteCourseClass, ...para });
export const getCourseClassesForSelection = para => requestActionMaker({ cons: cons.GET_COURSE_CLASSES_FOR_SELECTION, api: apis.getAllCourseClass, ...para });
export const getCourseClassForDefaultNewApplication = para => requestActionMaker({ cons: cons.GET_COURSE_CLASS_FOR_DEFAULT_NEW_APPLICATION, api: apis.getCourseClass, ...para });
export const getCourseClassesForCourseSchedule = para => requestActionMaker({ cons: cons.GET_COURSE_CLASSES_FOR_COURSE_SCHEDULE, api: apis.getCourseClassesForCourseSchedule, ...para });
export const getCourseClassForCourseSchedule = para => requestActionMaker({ cons: cons.GET_COURSE_CLASS_FOR_COURSE_SCHEDULE, api: apis.getCourseClass, ...para });
/**** 20200217 ****/

export const getAllCourseClassBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_COURSE_CLASS_BY_SPECIFICATION, api: apis.getAllCourseClassBySpecification, ...para });
export const getAllCourseClassForReschedule = para => requestActionMaker({ cons: cons.GET_ALL_COURSE_CLASS_FOR_RESCHEDULE, api: apis.getAllCourseClassForReschedule, ...para });
export const getCourseClassById = para => requestActionMaker({ cons: cons.GET_COURSE_CLASS_BY_ID, api: apis.getCourseClassById, ...para });
export const getCourseClassScheduleBySpecification = para => requestActionMaker({ cons: cons.GET_COURSE_CLASS_SCHEDULE_BY_SPECIFICATION, api: apis.getCourseClassScheduleBySpecification, ...para });
export const postCreateCourseClass = para => requestActionMaker({ cons: cons.POST_CREATE_COURSE_CLASS, api: apis.postCreateCourseClass, ...para });
export const putUpdateCourseClass = para => requestActionMaker({ cons: cons.PUT_UPDATE_COURSE_CLASS, api: apis.putUpdateCourseClass, ...para });
export const getCourseClassForNewApplication = para => requestActionMaker({ cons: cons.GET_COURSE_CLASS_FOR_NEW_APPLICATION, api: apis.getCourseClassById, ...para });