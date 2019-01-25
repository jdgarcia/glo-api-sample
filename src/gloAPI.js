import config from './config';
import store from './redux/store';
import { logout } from './redux/actions';

const callGloAPI = async (endpoint, accessToken) => {
  let options;

  if (accessToken) {
    options = {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };
  }

  const response = await fetch(config.GLO_API_URL + endpoint, options);

  if (response.status === 401) {
    store.dispatch(logout());
  };

  if (response.status >= 400) {
    throw response;
  };

  return await response.json();
};

export const getUser = (accessToken) =>
  callGloAPI('/user?fields=username,email', accessToken);

export const getBoards = (accessToken) =>
  callGloAPI('/boards', accessToken);

export const getBoard = (accessToken, boardId) =>
  callGloAPI('/boards/' + boardId + '?fields=members,labels,columns', accessToken);

export const getCards = (accessToken, boardId, page = 1) =>
  callGloAPI('/boards/' + boardId + '/cards?fields=labels&per_page=100&page=' + page, accessToken);
