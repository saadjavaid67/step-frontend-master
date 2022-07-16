import * as cons from './constants';
import * as apis from './apis';
import { requestActionMaker } from '../helper';

/**** 20200217 ****/
export const getAllCourseCategory = para => requestActionMaker({ cons: cons.GET_ALL_COURSE_CATEGORY, api: apis.getAllCourseCategory, ...para });
export const getCourseCategory = para => requestActionMaker({ cons: cons.GET_COURSE_CATEGORY, api: apis.getCourseCategory, ...para });
export const createCourseCategory = para => requestActionMaker({ cons: cons.CREATE_COURSE_CATEGORY, api: apis.createCourseCategory, ...para });
export const updateCourseCategory = para => requestActionMaker({ cons: cons.UPDATE_COURSE_CATEGORY, api: apis.updateCourseCategory, ...para });
export const getCourseCategoriesForSelection = para => requestActionMaker({ cons: cons.GET_COURSE_CATEGORIES_FOR_SELECTION, api: apis.getAllCourseCategory, ...para });
export const getCourseCategoriesForNewApplication = para => requestActionMaker({ cons: cons.GET_COURSE_CATEGORIES_FOR_NEW_APPLICATION, api: apis.getAllCourseCategory, ...para });
/**** 20200217 ****/

export const getAllCourseCategoryBySpecification = para => requestActionMaker({ cons: cons.GET_ALL_COURSE_CATEGORY_BY_SPECIFICATION, api: apis.getAllCourseCategoryBySpecification, ...para });
export const getCourseCategoryById = para => requestActionMaker({ cons: cons.GET_COURSE_CATEGORY_BY_ID, api: apis.getCourseCategoryById, ...para });
export const postCreateCourseCategory = para => requestActionMaker({ cons: cons.POST_CREATE_COURSE_CATEGORY, api: apis.postCreateCourseCategory, ...para });
export const putUpdateCourseCategory = para => requestActionMaker({ cons: cons.PUT_UPDATE_COURSE_CATEGORY, api: apis.putUpdateCourseCategory, ...para });
// export const getCourseCategoriesForNewApplication = para => requestActionMaker({ cons: cons.GET_COURSE_CATEGORIES_FOR_NEW_APPLICATION, api: apis.getAllCourseCategoryBySpecification, ...para });
