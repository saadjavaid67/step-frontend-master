import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllCourse = para => requestActionMaker({ cons: cons.GET_ALL_COURSE, api: apis.getAllCourse, ...para });
export const getCourse = para => requestActionMaker({ cons: cons.GET_COURSE, api: apis.getCourse, ...para });
export const createCourse = para => requestActionMaker({ cons: cons.CREATE_COURSE, api: apis.createCourse, ...para });
export const updateCourse = para => requestActionMaker({ cons: cons.UPDATE_COURSE, api: apis.updateCourse, ...para });
export const getCoursesForSelection = para => requestActionMaker({ cons: cons.GET_COURSES_FOR_SELECTION, api: apis.getAllCourse, ...para });
export const getSummerCoursesForSchedule = para => requestActionMaker({ cons: cons.GET_SUMMER_COURSES_FOR_SCHEDULE, api: apis.getSummerCoursesForSchedule, ...para });
/**** 20200217 ****/