export function getAuthInfo() {
  const authInfo = localStorage.getItem('authInfo');
  if (authInfo) {
    return JSON.parse(authInfo);
  }
  return undefined;
}

export function setAuthInfo(authInfo) {
  localStorage.setItem('authInfo', JSON.stringify(authInfo));
}

export function clearAuthInfo() {
  localStorage.removeItem('authInfo');
}

export function isLoggedIn() {
  const authInfo = getAuthInfo();
  return authInfo && authInfo.access_token !== undefined;
}

export function getAccessToken() {
  const authInfo = getAuthInfo();
  return authInfo ? authInfo.access_token : undefined;
}

export function getRefreshToken() {
  const authInfo = getAuthInfo();
  return authInfo ? authInfo.refresh_token : undefined;
}
