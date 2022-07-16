import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_COURSE = '/api/courses';
const GET_COURSE = '/api/courses';
const CREATE_COURSE = '/api/courses';
const UPDATE_COURSE = '/api/courses';
const GET_SUMMER_COURSES_FOR_SCHEDULE = '/api/courses/summer-course/schedule';

export async function getAllCourse(action) {
  try {
    const response = await request.get(GET_ALL_COURSE, {
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

export async function getCourse(action) {
  try {
    const response = await request.get(`${GET_COURSE}/${action.id}`, {
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

export async function createCourse(action) {
  try {
    const response = await request.post(`${CREATE_COURSE}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCourse(action) {
  try {
    const response = await request.put(`${UPDATE_COURSE}/${action.id}`,action.data, {
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

export async function getSummerCoursesForSchedule(action) {
  try {
    const response = await request.get(`${GET_SUMMER_COURSES_FOR_SCHEDULE}`, {
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

const GET_ALL_COURSE_BY_SPECIFICATION = '/api/v1/course/findAllBySpecification';
const GET_COURSE_BY_ID = '/api/v1/course/findById';
const POST_CREATE_COURSE = '/api/v1/course';
const PUT_UPDATE_COURSE = '/api/v1/course';

export async function getAllCourseBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_COURSE_BY_SPECIFICATION, {
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

export async function getCourseById(action) {
    try {
      const response = await request.get(`${GET_COURSE_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postCreateCourse(action) {
    try {
      const response = await request.post(POST_CREATE_COURSE, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateCourse(action) {
    try {
      const response = await request.put(PUT_UPDATE_COURSE, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}
