const getInitialState = () => ({
  stateVersion: 1,
  accessToken: null,
  boardData: null,
  boards: null,
  selectedBoardId: "",
  user: null
});

const getSavedState = () => {
  const savedStateString = window.localStorage.getItem('reduxState');
  if (!savedStateString) {
    return {};
  }

  const savedState = JSON.parse(savedStateString);

  return {
    ...getInitialState(),
    ...savedState
  };
};

export default (state = getSavedState(), action) => {
  switch (action.type) {
    case 'login-success':
      return {
        ...state,
        accessToken: action.accessToken,
        user: action.user
      };

    case 'logout-success':
      return getInitialState();

    case 'fetch-boards-success':
      return {
        ...state,
        boards: action.boards
      };

    case 'fetch-board-data-success':
      return {
        ...state,
        boardData: action.boardData
      };

    case 'select-board':
      return {
        ...state,
        selectedBoardId: action.boardId
      };

    default:
      return state;
  }
};
