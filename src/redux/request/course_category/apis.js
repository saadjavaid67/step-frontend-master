import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_COURSE_CATEGORY = '/api/course-categories';
const GET_COURSE_CATEGORY = '/api/course-categories';
const CREATE_COURSE_CATEGORY = '/api/course-categories';
const UPDATE_COURSE_CATEGORY = '/api/course-categories';

export async function getAllCourseCategory(action) {
  try {
    const response = await request.get(GET_ALL_COURSE_CATEGORY, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCourseCategory(action) {
  try {
    const response = await request.get(`${GET_COURSE_CATEGORY}/${action.id}`, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCourseCategory(action) {
  try {
    const response = await request.post(`${CREATE_COURSE_CATEGORY}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCourseCategory(action) {
  try {
    const response = await request.put(`${UPDATE_COURSE_CATEGORY}/${action.id}`,action.data, {
      headers: {
        ...authHeader(),
      },
      params: action.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/**** 20200217 ****/

const GET_ALL_COURSE_CATEGORY_BY_SPECIFICATION = '/api/v1/course/category/findAllBySpecification';
const GET_COURSE_CATEGORY_BY_ID = '/api/v1/course/category/findById';
const POST_CREATE_COURSE_CATEGORY = '/api/v1/course/category';
const PUT_UPDATE_COURSE_CATEGORY = '/api/v1/course/category';

export async function getAllCourseCategoryBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_COURSE_CATEGORY_BY_SPECIFICATION, {
        headers: {
          ...authHeader(),
        },
        params: action.params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function getCourseCategoryById(action) {
    try {
      const response = await request.get(`${GET_COURSE_CATEGORY_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postCreateCourseCategory(action) {
    try {
      const response = await request.post(POST_CREATE_COURSE_CATEGORY, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateCourseCategory(action) {
    try {
      const response = await request.put(PUT_UPDATE_COURSE_CATEGORY, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}