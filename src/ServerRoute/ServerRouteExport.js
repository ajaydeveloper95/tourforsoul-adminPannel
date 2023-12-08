export const AdminRoute = 'https://api.tourforsoul.in/admin/'

export const AuthHeader = {
  headers: {
    'Content-Type': 'application/json',
    authToken: window.localStorage.getItem('authToken'),
  },
}
