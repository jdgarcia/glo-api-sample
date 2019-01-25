import { getUser, getBoards } from '../gloAPI';

export const login = (accessToken) => async (dispatch) => {
  try {
    const user = await getUser(accessToken);
    dispatch(loginSuccess({ user, accessToken }));
    window.localStorage.setItem('gloAccessToken', accessToken);
  }
  catch (e) {
    window.localStorage.removeItem('gloAccessToken');
  }
};

const loginSuccess = ({ user, accessToken }) => ({
  type: 'login-success',
  user,
  accessToken
});

export const logout = (user) => (dispatch) => {
  window.localStorage.removeItem('gloAccessToken');
  dispatch(logoutSuccess());
};

const logoutSuccess = () => ({
  type: 'logout-success'
});

export const fetchBoards = () => async (dispatch, getState) => {
  try {
    const boards = await getBoards(getState().accessToken);
    dispatch(fetchBoardsSuccess(boards));
  }
  catch (e) {
    dispatch(fetchBoardsError(e));
  }
};

const fetchBoardsSuccess = (boards) => ({
  type: 'fetch-boards-success',
  boards
});

const fetchBoardsError = (error) => ({
  type: 'fetch-boards-error',
  error
});

export const loadBoardData = (boardId) => async (dispatch, getState) => {
  dispatch(selectBoard(boardId));
};

const selectBoard = (boardId) => ({
  type: 'select-board',
  boardId
});
