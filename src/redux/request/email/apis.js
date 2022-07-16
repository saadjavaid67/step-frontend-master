import request from '../request';
import { authHeader } from '../helper';

const GET_ALL_EMAIL_RECORD_BY_SPECIFICATION = '/api/v1/email/findAllBySpecification'

export async function getAllEmailRecordBySpecification(action) {
    try {
      const response = await request.get(GET_ALL_EMAIL_RECORD_BY_SPECIFICATION, {
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