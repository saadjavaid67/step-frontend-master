import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_PAYMENT_METHOD = '/api/payment-methods';
const GET_PAYMENT_METHOD = '/api/payment-methods';
const CREATE_PAYMENT_METHOD = '/api/payment-methods';
const UPDATE_PAYMENT_METHOD = '/api/payment-methods';

export async function getAllPaymentMethod(action) {
  try {
    const response = await request.get(GET_ALL_PAYMENT_METHOD, {
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

export async function getPaymentMethod(action) {
  try {
    const response = await request.get(`${GET_PAYMENT_METHOD}/${action.id}`, {
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

export async function createPaymentMethod(action) {
  try {
    const response = await request.post(`${CREATE_PAYMENT_METHOD}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePaymentMethod(action) {
  try {
    const response = await request.put(`${UPDATE_PAYMENT_METHOD}/${action.id}`,action.data, {
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

const GET_ALL_PAYMENT_METHOD_BY_SPECIFICATION = '/api/v1/payment/method/findAllBySpecification';
const GET_PAYMENT_METHOD_BY_ID = '/api/v1/payment/method/findById';
const POST_CREATE_PAYMENT_METHOD = '/api/v1/payment/method';
const PUT_UPDATE_PAYMENT_METHOD = '/api/v1/payment/method';

export async function getAllPaymentMethodBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_PAYMENT_METHOD_BY_SPECIFICATION, {
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
  
  export async function getPaymentMethodById(action) {
    try {
      const response = await request.get(`${GET_PAYMENT_METHOD_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function postCreatePaymentMethod(action) {
    try {
      const response = await request.post(POST_CREATE_PAYMENT_METHOD, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function putUpdatePaymentMethod(action) {
    try {
      const response = await request.put(PUT_UPDATE_PAYMENT_METHOD, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }