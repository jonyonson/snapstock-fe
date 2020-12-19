import jwtDecode from 'jwt-decode';

function isTokenExpired(exp) {
  if (!exp) return false;
  return Date.now() >= exp * 1000;
}

export default function isAuthenticated() {
  if (window.localStorage.getItem('token')) {
    const token = window.localStorage.getItem('token') || '';
    const decoded = jwtDecode(token);

    return !isTokenExpired(decoded.exp);
  }

  return false;
}
