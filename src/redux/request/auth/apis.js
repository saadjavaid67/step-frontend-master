import request from '../request';

const LOGIN = '/oauth/token';

export async function login(action) {
  const params = new URLSearchParams();
  params.append('client_id', process.env.REACT_APP_OAUTH_CLIENT_ID);
  params.append('client_secret', process.env.REACT_APP_OAUTH_CLIENT_SECRET);
  params.append('grant_type', 'password');
  params.append('provider', 'users');
  params.append('username', action.username);
  params.append('password', action.password);
  
  try {
    const response = await request.post(LOGIN, params);
    return response.data;
  } catch (error) {
    throw error;
  }
}