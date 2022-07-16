import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_APPLICATION_SESSION_REMARK = '/api/application-session-remarks';
const CREATE_APPLICATION_SESSION_REMARK = '/api/application-session-remarks';
const UPDATE_APPLICATION_SESSION_REMARK = '/api/application-session-remarks';
const DELETE_APPLICATION_SESSION_REMARK = '/api/application-session-remarks';

export async function getAllApplicationSessionRemark(action) {
  try {
    const response = await request.get(GET_ALL_APPLICATION_SESSION_REMARK, {
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

export async function createApplicationSessionRemark(action) {
  try {
    const response = await request.post(`${CREATE_APPLICATION_SESSION_REMARK}`,action.data, {
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

export async function updateApplicationSessionRemark(action) {
  try {
    const response = await request.put(`${UPDATE_APPLICATION_SESSION_REMARK}/${action.id}`,action.data, {
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

export async function deleteApplicationSessionRemark(action) {
  try {
    const response = await request.delete(`${DELETE_APPLICATION_SESSION_REMARK}/${action.id}`, {
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
