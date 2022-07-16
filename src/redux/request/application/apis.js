import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_APPLICATION = '/api/applications';
const GET_APPLICATION = '/api/applications';
const CREATE_APPLICATION = '/api/applications';
const UPDATE_APPLICATION = '/api/applications';
const GET_NEW_APPLICATIONS = '/api/applications/new-applications';
const GET_WAITING_APPLICATIONS = '/api/applications/waiting-applications';
const RESERVE_APPLICATION = '/api/applications/reserve';
const RESTORE_APPLICATION = '/api/applications/restore';
const GET_COURSE_SCHEDULE = '/api/applications/course-schedule';
const GET_SUMMER_COURSE_SCHEDULE = '/api/applications/summer-course-schedule';
const GET_ALL_SUMMER_COURSE_SCHEDULE = '/api/applications/summer-course-schedules';
const GET_CHECK_SESSION_CAPACITY = '/api/applications/check-capacity';

export async function getAllApplication(action) {
  try {
    const response = await request.get(GET_ALL_APPLICATION, {
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

export async function getApplication(action) {
  try {
    const response = await request.get(`${GET_APPLICATION}/${action.id}`, {
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

export async function createApplication(action) {
  try {
    const response = await request.post(`${CREATE_APPLICATION}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateApplication(action) {
  try {
    const response = await request.put(`${UPDATE_APPLICATION}/${action.id}`,action.data, {
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

export async function getNewApplications(action) {
  try {
    const response = await request.get(GET_NEW_APPLICATIONS, {
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

export async function getWaitingApplications(action) {
  try {
    const response = await request.get(GET_WAITING_APPLICATIONS, {
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

export async function reserveApplication(action) {
  try {
    const response = await request.put(`${RESERVE_APPLICATION}/${action.id}`,action.data, {
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

export async function restoreApplication(action) {
  try {
    const response = await request.put(`${RESTORE_APPLICATION}/${action.id}`,action.data, {
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

export async function getCourseSchedule(action) {
  try {
    const response = await request.get(GET_COURSE_SCHEDULE, {
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

export async function getSummerCourseSchedule(action) {
  try {
    const response = await request.get(GET_SUMMER_COURSE_SCHEDULE, {
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

export async function getAllSummerCourseSchedule(action) {
  try {
    const response = await request.get(GET_ALL_SUMMER_COURSE_SCHEDULE, {
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

export async function checkSessionCapacity(action) {
  try {
    const response = await request.get(`${GET_CHECK_SESSION_CAPACITY}/${action.id}`, {
      headers: {
        ...authHeader(),
      },
      params: action.data
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
/**** 20200217 ****/

const GET_ALL_APPLICATION_BY_SPECIFICATION = '/api/v1/application/findAllBySpecification';
const GET_ALL_APPLICATION_FOR_CREATE_INVOICE = '/api/v1/application/findAllApplicationForCreateInvoice';
const GET_ALL_APPLICATION_SESSION_BY_SPECIFICATION = '/api/v1/application/session/findAllBySpecification';
const GET_APPLICATION_BY_ID = '/api/v1/application/findById';
const GET_ALL_WAITING_APPLICATION_BY_CLASS_ID = '/api/v1/application/findAllWaitingListApplicationByClassId';
const POST_CREATE_APPLICATION = '/api/v1/application';
const POST_CHECK_SESSION_CAPACITY = '/api/v1/application/checkSessionCapacity';
const PUT_UPDATE_APPLICATION = '/api/v1/application';
const DELETE_APPLICATION = '/api/v1/application';

export async function getAllApplicationBySpecification(action) {
  try {
    const response = await request.get(GET_ALL_APPLICATION_BY_SPECIFICATION, {
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

export async function getAllApplicationForCreateInvoice(action) {
try {
  const response = await request.get(GET_ALL_APPLICATION_FOR_CREATE_INVOICE, {
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

export async function getAllApplicationSessionBySpecification(action) {
try {
  const response = await request.get(GET_ALL_APPLICATION_SESSION_BY_SPECIFICATION, {
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

export async function getApplicationById(action) {
  try {
    const response = await request.get(`${GET_APPLICATION_BY_ID}/${action.id}`, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllWaitingApplicationByClassId(action) {
try {
  const response = await request.get(`${GET_ALL_WAITING_APPLICATION_BY_CLASS_ID}`, {
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

export async function postCreateApplication(action) {
  try {
    const response = await request.post(POST_CREATE_APPLICATION, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postCheckSessionCapacity(action) {
try {
  const response = await request.post(POST_CHECK_SESSION_CAPACITY, action.data, {
    headers: {
      ...authHeader(),
    },
  });
  return response.data;
} catch (error) {
  throw error;
}
}

export async function putUpdateApplication(action) {
  try {
    const response = await request.put(PUT_UPDATE_APPLICATION, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteApplication(action) {
  try {
    const response = await request.delete(`${DELETE_APPLICATION}/${action.id}`, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
