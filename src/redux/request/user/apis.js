import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_USER = '/api/users';
const GET_USER = '/api/users';
const CREATE_USER = '/api/users';
const UPDATE_USER = '/api/users';

export async function getAllUser(action) {
  try {
    const response = await request.get(GET_ALL_USER, {
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

export async function getUser(action) {
  try {
    const response = await request.get(`${GET_USER}/${action.id}`, {
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

export async function createUser(action) {
  try {
    const response = await request.post(`${CREATE_USER}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(action) {
  try {
    const response = await request.put(`${UPDATE_USER}/${action.id}`,action.data, {
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

const GET_ALL_USER_BY_SPECIFICATION = '/api/v1/user/findAllBySpecification';
const GET_USER_BY_ID = '/api/v1/user/findById';
const GET_LOGGED_USER_INFO = '/api/v1/user/findByLoggedUser';
const POST_CREATE_USER = '/api/v1/user';
const PUT_UPDATE_USER = '/api/v1/user';
const PUT_UPDATE_LOGGED_USER_PASSWORD = '/api/v1/user/changePasswordByLoggedUser';

export async function getAllUserBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_USER_BY_SPECIFICATION, {
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

export async function getUserById(action) {
  try {
    const response = await request.get(`${GET_USER_BY_ID}/${action.id}`, {
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

export async function getLoggedUserInfo(action) {
    try {
      const response = await request.get(GET_LOGGED_USER_INFO, {
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

export async function postCreateUser(action) {
    try {
      const response = await request.post(POST_CREATE_USER, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateUser(action) {
    try {
      const response = await request.put(PUT_UPDATE_USER, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateLoggedUserPassword(action) {
    try {
      const response = await request.put(PUT_UPDATE_LOGGED_USER_PASSWORD, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}