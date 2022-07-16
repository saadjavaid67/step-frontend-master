import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_CUSTOMER = '/api/customers';
const GET_CUSTOMER = '/api/customers';
const CREATE_CUSTOMER = '/api/customers';
const UPDATE_CUSTOMER = '/api/customers';

export async function getAllCustomer(action) {
  try {
    const response = await request.get(GET_ALL_CUSTOMER, {
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

export async function getCustomer(action) {
  try {
    const response = await request.get(`${GET_CUSTOMER}/${action.id}`, {
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

export async function createCustomer(action) {
  try {
    const response = await request.post(`${CREATE_CUSTOMER}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCustomer(action) {
  try {
    const response = await request.put(`${UPDATE_CUSTOMER}/${action.id}`,action.data, {
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

export async function getCustomersForSelection(action) {
  try {
    const response = await request.get(GET_ALL_CUSTOMER, {
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

const GET_ALL_CUSTOMER_BY_SPECIFICATION = '/api/v1/customer/findAllBySpecification';
// const GET_ALL_CUSTOMER = '/api/v1/customer/findAllBySpecification';
const GET_CUSTOMER_BY_ID = '/api/v1/customer/findById';
const POST_CREATE_CUSTOMER = '/api/v1/customer';
const PUT_UPDATE_CUSTOMER = '/api/v1/customer';

export async function getAllCustomerBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_CUSTOMER_BY_SPECIFICATION, {
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

// export async function getAllCustomer(action) {
//   try {
//     const response = await request.get(GET_ALL_CUSTOMER, {
//       headers: {
//         ...authHeader(),
//       },
//       params: action.params,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getCustomerById(action) {
  try {
    const response = await request.get(`${GET_CUSTOMER_BY_ID}/${action.id}`, {
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

export async function postCreateCusotmer(action) {
    try {
      const response = await request.post(POST_CREATE_CUSTOMER, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateCustomer(action) {
    try {
      const response = await request.put(PUT_UPDATE_CUSTOMER, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}