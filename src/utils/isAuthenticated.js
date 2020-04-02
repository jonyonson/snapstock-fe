export default function isAuthenticated() {
  return Boolean(window.localStorage.getItem('token'));
}
