import { getUser } from '../gloAPI';

export const login = (accessToken) => async (dispatch) => {
  try {
    const user = await getUser(accessToken);
    dispatch(loginSuccess(user));
    window.localStorage.setItem('gloAccessToken', accessToken);
  }
  catch (e) {
    window.localStorage.removeItem('gloAccessToken');
  }
};

const loginSuccess = (user) => ({
  type: 'login-success',
  user
});

export const logout = (user) => (dispatch) => {
  window.localStorage.removeItem('gloAccessToken');
  dispatch(logoutSuccess());
};

const logoutSuccess = () => ({
  type: 'logout-success'
});
