import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_OVER_CAPACITY_SESSIONS = '/api/course-sessions/over-capacity-sessions';
const GET_COURSE_SESSIONS_FOR_COURSE_SCHEDULE = '/api/course-sessions/course-session-for-course-schedule';
const GET_COURSE_SESSIONS_FOR_RESCHEDULE = '/api/course-sessions/sessions-for-reschedule';
const UPDATE_COURSE_SESSION = '/api/course-sessions';

export async function getOverCapacitySessions(action) {
  try {
    const response = await request.get(GET_OVER_CAPACITY_SESSIONS, {
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

export async function getCourseSessionsForCourseSchedule(action) {
  try {
    const response = await request.get(GET_COURSE_SESSIONS_FOR_COURSE_SCHEDULE, {
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

export async function getCourseSessionsForReschedule(action) {
  try {
    const response = await request.get(GET_COURSE_SESSIONS_FOR_RESCHEDULE, {
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

export async function updateCourseSession(action) {
  try {
    const response = await request.put(`${UPDATE_COURSE_SESSION}/${action.id}`,action.data, {
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

const GET_ALL_COURSE_SESSION_BY_SPECIFICATION = '/api/v1/course/session/findAllBySpecification';

export async function getAllCourseSessionBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_COURSE_SESSION_BY_SPECIFICATION, {
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