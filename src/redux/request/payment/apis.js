import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_PAYMENT = '/api/payments';
const GET_PAYMENT = '/api/payments';
const CREATE_PAYMENT = '/api/payments';
const UPDATE_PAYMENT = '/api/payments';
const CREATE_PAYMENT_AND_PAY_INVOICE = '/api/payments/create-and-pay';
export async function getAllPayment(action) {
  try {
    const response = await request.get(GET_ALL_PAYMENT, {
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

export async function getPayment(action) {
  try {
    const response = await request.get(`${GET_PAYMENT}/${action.id}`, {
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

export async function createPayment(action) {
  try {
    const response = await request.post(`${CREATE_PAYMENT}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePayment(action) {
  try {
    const response = await request.put(`${UPDATE_PAYMENT}/${action.id}`,action.data, {
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

export async function createPaymentAndPayInvoice(action) {
  try {
    const response = await request.post(`${CREATE_PAYMENT_AND_PAY_INVOICE}`,action.data, {
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

const GET_ALL_PAYMENT_BY_SPECIFICATION = '/api/v1/payment/findAllBySpecification';
const GET_ALL_RECEIPT_BY_SPECIFICATION = '/api/v1/payment/findAllReceiptBySpecification';
const GET_PAYMENT_BY_ID = '/api/v1/payment/findById';
const POST_CREATE_PAYMENT = '/api/v1/payment';
const PUT_UPDATE_PAYMENT = '/api/v1/payment';
const POST_PAY_INVOICE = '/api/v1/payment/payByInvoiceIdAndAmount';
const GET_RECEIPT_BY_ID = '/api/v1/payment/receipt/findById'

export async function getAllPaymentBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_PAYMENT_BY_SPECIFICATION, {
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

export async function getAllReceiptBySpecification(action) {
  try {
    const response = await request.get(GET_ALL_RECEIPT_BY_SPECIFICATION, {
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

export async function getPaymentById(action) {
    try {
      const response = await request.get(`${GET_PAYMENT_BY_ID}/${action.id}`, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postCreatePayment(action) {
    try {
      const response = await request.post(POST_CREATE_PAYMENT, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdatePayment(action) {
    try {
      const response = await request.put(PUT_UPDATE_PAYMENT, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postPayInvoice(action) {
  try {
    const response = await request.post(POST_PAY_INVOICE, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getReceiptById(action) {
  try {
    const response = await request.get(`${GET_RECEIPT_BY_ID}/${action.id}`, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}