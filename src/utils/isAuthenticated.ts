import jwtDecode, { JwtPayload } from 'jwt-decode';

function isTokenExpired(exp: number | undefined) {
  if (!exp) return false;
  return Date.now() >= exp * 1000;
}

export default function isAuthenticated() {
  if (window.localStorage.getItem('token')) {
    const token = window.localStorage.getItem('token') || '';
    const decoded = jwtDecode<JwtPayload>(token);

    return !isTokenExpired(decoded.exp);
  }

  return false;
}
