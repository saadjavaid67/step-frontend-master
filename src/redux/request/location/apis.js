import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_LOCATION = '/api/locations';
const GET_LOCATION = '/api/locations';
const CREATE_LOCATION = '/api/locations';
const UPDATE_LOCATION = '/api/locations';

export async function getAllLocation(action) {
  try {
    const response = await request.get(GET_ALL_LOCATION, {
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

export async function getLocation(action) {
  try {
    const response = await request.get(`${GET_LOCATION}/${action.id}`, {
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

export async function createLocation(action) {
  try {
    const response = await request.post(`${CREATE_LOCATION}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateLocation(action) {
  try {
    const response = await request.put(`${UPDATE_LOCATION}/${action.id}`,action.data, {
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

const GET_ALL_LOCATION_BY_SPECIFICATION = '/api/v1/location/findAllBySpecification';
const GET_LOCATION_BY_ID = '/api/v1/location/findById';
const POST_CREATE_LOCATION = '/api/v1/location';
const PUT_UPDATE_LOCATION = '/api/v1/location';

export async function getAllLocationBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_LOCATION_BY_SPECIFICATION, {
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

export async function getLocationById(action) {
    try {
      const response = await request.get(`${GET_LOCATION_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postCreateLocation(action) {
    try {
      const response = await request.post(POST_CREATE_LOCATION, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateLocation(action) {
    try {
      const response = await request.put(PUT_UPDATE_LOCATION, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}
