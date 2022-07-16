import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllCourseLevel = para => requestActionMaker({ cons: cons.GET_ALL_COURSE_LEVEL, api: apis.getAllCourseLevel, ...para });
export const getCourseLevel = para => requestActionMaker({ cons: cons.GET_COURSE_LEVEL, api: apis.getCourseLevel, ...para });
export const createCourseLevel = para => requestActionMaker({ cons: cons.CREATE_COURSE_LEVEL, api: apis.createCourseLevel, ...para });
export const updateCourseLevel = para => requestActionMaker({ cons: cons.UPDATE_COURSE_LEVEL, api: apis.updateCourseLevel, ...para });
export const getCourseLevelsForSelection = para => requestActionMaker({ cons: cons.GET_COURSE_LEVELS_FOR_SELECTION, api: apis.getAllCourseLevel, ...para });
/**** 20200217 ****/

export const getAllCourseLevelBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_COURSE_LEVEL_BY_SPECIFICATION, api: apis.getAllCourseLevelBySpecification, ...para });
export const getCourseLevelById = para => requestActionMaker({ cons: cons.GET_COURSE_LEVEL_BY_ID, api: apis.getCourseLevelById, ...para });
export const postCreateCourseLevel = para => requestActionMaker({ cons: cons.POST_CREATE_COURSE_LEVEL, api: apis.postCreateCourseLevel, ...para });
export const putUpdateCourseLevel = para => requestActionMaker({ cons: cons.PUT_UPDATE_COURSE_LEVEL, api: apis.putUpdateCourseLevel, ...para });