import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_COURSE_CLASS = '/api/course-classes';
const GET_COURSE_CLASS = '/api/course-classes';
const CREATE_COURSE_CLASS = '/api/course-classes';
const UPDATE_COURSE_CLASS = '/api/course-classes';
const DELETE_COURSE_CLASS = '/api/course-classes';
const GET_COURSE_CLASSES_FOR_COURSE_SCHEDULE = '/api/course-classes/course-classes-for-course-schedule';

export async function getAllCourseClass(action) {
  try {
    const response = await request.get(GET_ALL_COURSE_CLASS, {
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

export async function getCourseClass(action) {
  try {
    const response = await request.get(`${GET_COURSE_CLASS}/${action.id}`, {
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

export async function createCourseClass(action) {
  try {
    const response = await request.post(`${CREATE_COURSE_CLASS}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCourseClass(action) {
  try {
    const response = await request.put(`${UPDATE_COURSE_CLASS}/${action.id}`,action.data, {
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

export async function deleteCourseClass(action) {
  try {
    const response = await request.delete(`${DELETE_COURSE_CLASS}/${action.id}`, {
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

export async function getCourseClassesForCourseSchedule(action) {
  try {
    const response = await request.get(GET_COURSE_CLASSES_FOR_COURSE_SCHEDULE, {
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

const GET_ALL_COURSE_CLASS_BY_SPECIFICATION = '/api/v1/course/class/findAllBySpecification';
const GET_ALL_COURSE_CLASS_FOR_RESCHEDULE = '/api/v1/course/class/findAllBySpecification';
const GET_COURSE_CLASS_BY_ID = '/api/v1/course/class/findById';
const GET_COURSE_CLASS_SCHEDULE_BY_SPECIFICATION = '/api/v1/course/class/getScheduleBySpecification';
const POST_CREATE_COURSE_CLASS = '/api/v1/course/class';
const PUT_UPDATE_COURSE_CLASS = '/api/v1/course/class';

export async function getAllCourseClassBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_COURSE_CLASS_BY_SPECIFICATION, {
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

export async function getAllCourseClassForReschedule(action) {
  try {
    const response = await request.get(GET_ALL_COURSE_CLASS_FOR_RESCHEDULE, {
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

export async function getCourseClassById(action) {
    try {
      const response = await request.get(`${GET_COURSE_CLASS_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function getCourseClassScheduleBySpecification(action) {
  try {
    const response = await request.get(GET_COURSE_CLASS_SCHEDULE_BY_SPECIFICATION, {
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

export async function postCreateCourseClass(action) {
    try {
      const response = await request.post(POST_CREATE_COURSE_CLASS, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateCourseClass(action) {
    try {
      const response = await request.put(PUT_UPDATE_COURSE_CLASS, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}
