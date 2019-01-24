const GLO_API_URL = 'https://gloapi.gitkraken.com/v1/glo';

export const login = (accessToken) => async (dispatch) => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  };

  const response = await fetch(GLO_API_URL + '/user?fields=username,email', options);
  const user = await response.json();

  if (response.status === 200) {
    dispatch(loginSuccess(user));
    window.localStorage.setItem('gloAccessToken', accessToken);
  }
  else {
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
