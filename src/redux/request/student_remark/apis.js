import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_STUDENT_REMARK = '/api/student-remarks';
const GET_STUDENT_REMARK = '/api/student-remarks';
const CREATE_STUDENT_REMARK = '/api/student-remarks';
const UPDATE_STUDENT_REMARK = '/api/student-remarks';
const DELETE_STUDENT_REMARK = '/api/student-remarks';

export async function getAllStudentRemark(action) {
  try {
    const response = await request.get(GET_ALL_STUDENT_REMARK, {
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

export async function getStudentRemark(action) {
  try {
    const response = await request.get(`${GET_STUDENT_REMARK}/${action.id}`, {
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

export async function createStudentRemark(action) {
  try {
    const response = await request.post(`${CREATE_STUDENT_REMARK}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStudentRemark(action) {
  try {
    const response = await request.put(`${UPDATE_STUDENT_REMARK}/${action.id}`,action.data, {
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

export async function deleteStudentRemark(action) {
  try {
    const response = await request.delete(`${DELETE_STUDENT_REMARK}/${action.id}`, {
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

const GET_ALL_STUDENT_REMARK_BY_SPECIFICATION = '/api/v1/student/remark/findAllBySpecification';
const POST_CREATE_STUDENT_REMARK = '/api/v1/student/remark';

export async function getAllStudentRemarkBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_STUDENT_REMARK_BY_SPECIFICATION, {
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

export async function postCreateStudentRemark(action) {
    try {
      const response = await request.post(POST_CREATE_STUDENT_REMARK, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}
