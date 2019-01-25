import {
  getUser,
  getBoards,
  getBoard,
  getCards
} from '../gloAPI';

export const login = (accessToken) => async (dispatch) => {
  const user = await getUser(accessToken);
  dispatch(loginSuccess({ user, accessToken }));
};

const loginSuccess = ({ user, accessToken }) => ({
  type: 'login-success',
  user,
  accessToken
});

export const logout = (user) => (dispatch) => {
  window.localStorage.removeItem('reduxState');
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

export const fetchBoardData = (boardId) => async (dispatch, getState) => {
  dispatch(selectBoard(boardId));

  const board = await getBoard(getState().accessToken, boardId);

  board.cards = await getCards(getState().accessToken, boardId);

  dispatch(fetchBoardDataSuccess(board));
};

const selectBoard = (boardId) => ({
  type: 'select-board',
  boardId
});

const fetchBoardDataSuccess = (boardData) => ({
  type: 'fetch-board-data-success',
  boardData
});
