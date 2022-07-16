import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const UPDATE_APPLICATION_SESSION_STATUS = '/api/application-sessions/update-status';
const UPDATE_APPLICATION_SESSION_STATUS_BY_COURSE_SESSION_ID = '/api/application-sessions/update-status-by-course-session-id';
const RESCHEDULE_APPLICATION_SESSION = '/api/application-sessions/reschedule';
const RESCHEDULE_COURSE_SESSION = '/api/application-sessions/reschedule-course-session';
const CANCEL_APPLICATION_SESSION = '/api/application-sessions/cancel-session';
const CANCEL_COURSE_SESSION = '/api/application-sessions/cancel-course-session';
const SWAP_APPLICATION_SESSION = '/api/application-sessions/swap-session';
const UPDATE_APPLICATION_SESSION_NUMBER = '/api/application-sessions/update-session-number';

export async function updateApplicationSessionStatus(action) {
  try {
    const response = await request.put(`${UPDATE_APPLICATION_SESSION_STATUS}/${action.id}`,action.data, {
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


export async function updateApplicationSessionStatusByCourseSessionId(action) {
  try {
    const response = await request.put(`${UPDATE_APPLICATION_SESSION_STATUS_BY_COURSE_SESSION_ID}/${action.id}`,action.data, {
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

export async function rescheduleApplicationSession(action) {
  try {
    const response = await request.put(`${RESCHEDULE_APPLICATION_SESSION}/${action.id}`,action.data, {
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

export async function rescheduleCourseSession(action) {
  try {
    const response = await request.put(`${RESCHEDULE_COURSE_SESSION}/${action.id}`,action.data, {
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

export async function cancelApplicationSession(action) {
  try {
    const response = await request.put(`${CANCEL_APPLICATION_SESSION}/${action.id}`,action.data, {
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

export async function cancelCourseSession(action) {
  try {
    const response = await request.put(`${CANCEL_COURSE_SESSION}/${action.id}`,action.data, {
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

export async function swapApplicationSession(action) {
  try {
    const response = await request.put(`${SWAP_APPLICATION_SESSION}/${action.id}`,action.data, {
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

export async function updateApplicationSessionNumber(action) {
  try {
    const response = await request.put(`${UPDATE_APPLICATION_SESSION_NUMBER}/${action.id}`,action.data, {
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
