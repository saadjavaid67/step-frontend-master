import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_COURSE_LEVEL = '/api/course-levels';
const GET_COURSE_LEVEL = '/api/course-levels';
const CREATE_COURSE_LEVEL = '/api/course-levels';
const UPDATE_COURSE_LEVEL = '/api/course-levels';

export async function getAllCourseLevel(action) {
  try {
    const response = await request.get(GET_ALL_COURSE_LEVEL, {
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

export async function getCourseLevel(action) {
  try {
    const response = await request.get(`${GET_COURSE_LEVEL}/${action.id}`, {
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

export async function createCourseLevel(action) {
  try {
    const response = await request.post(`${CREATE_COURSE_LEVEL}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCourseLevel(action) {
  try {
    const response = await request.put(`${UPDATE_COURSE_LEVEL}/${action.id}`,action.data, {
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

const GET_ALL_COURSE_LEVEL_BY_SPECIFICATION = '/api/v1/course/level/findAllBySpecification';
const GET_COURSE_LEVEL_BY_ID = '/api/v1/course/level/findById';
const POST_CREATE_COURSE_LEVEL = '/api/v1/course/level';
const PUT_UPDATE_COURSE_LEVEL = '/api/v1/course/level';

export async function getAllCourseLevelBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_COURSE_LEVEL_BY_SPECIFICATION, {
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

export async function getCourseLevelById(action) {
    try {
      const response = await request.get(`${GET_COURSE_LEVEL_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postCreateCourseLevel(action) {
    try {
      const response = await request.post(POST_CREATE_COURSE_LEVEL, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateCourseLevel(action) {
    try {
      const response = await request.put(PUT_UPDATE_COURSE_LEVEL, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}