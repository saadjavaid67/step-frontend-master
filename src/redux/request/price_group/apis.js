import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_PRICE_GROUP = '/api/price-groups';
const GET_PRICE_GROUP = '/api/price-groups';
const CREATE_PRICE_GROUP = '/api/price-groups';
const UPDATE_PRICE_GROUP = '/api/price-groups';

export async function getAllPriceGroup(action) {
  try {
    const response = await request.get(GET_ALL_PRICE_GROUP, {
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

export async function getPriceGroup(action) {
  try {
    const response = await request.get(`${GET_PRICE_GROUP}/${action.id}`, {
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

export async function createPriceGroup(action) {
  try {
    const response = await request.post(`${CREATE_PRICE_GROUP}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePriceGroup(action) {
  try {
    const response = await request.put(`${UPDATE_PRICE_GROUP}/${action.id}`,action.data, {
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

const GET_ALL_PRICE_GROUP_BY_SPECIFICATION = '/api/v1/course/priceGroup/findAllBySpecification';
const GET_PRICE_GROUP_BY_ID = '/api/v1/course/priceGroup/findById';
const POST_CREATE_PRICE_GROUP = '/api/v1/course/priceGroup';
const PUT_UPDATE_PRICE_GROUP = '/api/v1/course/priceGroup';

export async function getAllPriceGroupBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_PRICE_GROUP_BY_SPECIFICATION, {
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

export async function getPriceGroupById(action) {
    try {
      const response = await request.get(`${GET_PRICE_GROUP_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postCreatePriceGroup(action) {
    try {
      const response = await request.post(POST_CREATE_PRICE_GROUP, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdatePriceGroup(action) {
    try {
      const response = await request.put(PUT_UPDATE_PRICE_GROUP, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}