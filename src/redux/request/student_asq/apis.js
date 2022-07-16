import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_STUDENT_ASQ = '/api/student-asqs';
const GET_STUDENT_ASQ = '/api/student-asqs';
const CREATE_STUDENT_ASQ = '/api/student-asqs';
const UPDATE_STUDENT_ASQ = '/api/student-asqs';
const DELETE_STUDENT_ASQ = '/api/student-asqs';

export async function getAllStudentAsq(action) {
  try {
    const response = await request.get(GET_ALL_STUDENT_ASQ, {
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

export async function getStudentAsq(action) {
  try {
    const response = await request.get(`${GET_STUDENT_ASQ}/${action.id}`, {
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

export async function createStudentAsq(action) {
  try {
    const response = await request.post(`${CREATE_STUDENT_ASQ}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStudentAsq(action) {
  try {
    const response = await request.put(`${UPDATE_STUDENT_ASQ}/${action.id}`,action.data, {
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

export async function deleteStudentAsq(action) {
  try {
    const response = await request.delete(`${DELETE_STUDENT_ASQ}/${action.id}`, {
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

const GET_ALL_STUDENT_ASQ_BY_SPECIFICATION = '/api/v1/student/asq/findAllBySpecification';
const GET_STUDENT_ASQ_BY_ID = '/api/v1/student/asq/findById';
const GET_ACTIVE_STUDENT_ASQ_BY_STUDENT_ID = '/api/v1/student/asq/findActiveStudentAsqByStudentId';
const GET_STUDENT_ASQ_REMINDER = '/api/v1/student/asq/reminder';
const POST_CREATE_STUDENT_ASQ = '/api/v1/student/asq';
const PUT_UPDATE_STUDENT_ASQ = '/api/v1/student/asq';

export async function getAllStudentAsqBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_STUDENT_ASQ_BY_SPECIFICATION, {
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

  export async function getStudentAsqById(action) {
    try {
      const response = await request.get(`${GET_STUDENT_ASQ_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export async function getActiveStudentAsqByStudentId(action) {
    try {
      const response = await request.get(`${GET_ACTIVE_STUDENT_ASQ_BY_STUDENT_ID}/${action.studentId}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export async function getAllStudentAsqReminder(action) {
      try {
        const response = await request.get(GET_STUDENT_ASQ_REMINDER, {
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

  export async function postCreateStudentAsq(action) {
      try {
        const response = await request.post(POST_CREATE_STUDENT_ASQ, action.data, {
          headers: {
            ...authHeader(),
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
  }

  export async function putUpdateStudentAsq(action) {
    try {
      const response = await request.put(PUT_UPDATE_STUDENT_ASQ, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
