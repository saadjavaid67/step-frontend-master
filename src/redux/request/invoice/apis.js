import request from '../request';
import { authHeader } from '../helper';

/**** 20200217 ****/
const GET_ALL_INVOICE = '/api/invoices';
const GET_INVOICE = '/api/invoices';
const CREATE_INVOICE = '/api/invoices';
const UPDATE_INVOICE = '/api/invoices';

export async function getAllInvoice(action) {
  try {
    const response = await request.get(GET_ALL_INVOICE, {
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

export async function getInvoice(action) {
  try {
    const response = await request.get(`${GET_INVOICE}/${action.id}`, {
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

export async function createInvoice(action) {
  try {
    const response = await request.post(`${CREATE_INVOICE}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateInvoice(action) {
  try {
    const response = await request.put(`${UPDATE_INVOICE}/${action.id}`,action.data, {
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

const GET_ALL_INVOICE_BY_SPECIFICATION = '/api/v1/invoice/findAllBySpecification';
const GET_INVOICE_BY_ID = '/api/v1/invoice/findById';
const POST_CREATE_INVOICE = '/api/v1/invoice';
const PUT_UPDATE_INVOICE = '/api/v1/invoice';
const DELETE_INOVICE = '/api/v1/invoice';
const POST_SEND_INVOICE_BY_EMAIL = '/api/v1/invoice/sendInvoiceViaEmail';

export async function getAllInvoiceBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_INVOICE_BY_SPECIFICATION, {
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

export async function getInvoiceById(action) {
    try {
      const response = await request.get(`${GET_INVOICE_BY_ID}`, {
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

export async function postCreateInvoice(action) {
    try {
      const response = await request.post(POST_CREATE_INVOICE, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function putUpdateInvoice(action) {
    try {
      const response = await request.put(PUT_UPDATE_INVOICE, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function deleteInvoice(action) {
    try {
      const response = await request.put(`${DELETE_INOVICE}/${action.id}/delete`, action.data, {
        headers: {
          ...authHeader(),
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function postSendInvoiceByEmail(action) {
  try {
    const response = await request.post(`${POST_SEND_INVOICE_BY_EMAIL}/${action.id}`, action.data, {
      headers: {
        ...authHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}