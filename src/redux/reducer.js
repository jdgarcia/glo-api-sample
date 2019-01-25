const getInitialState = () => ({
  accessToken: null,
  boardData: null,
  boards: null,
  selectedBoardId: "",
  user: null
});

export default (state = getInitialState(), action) => {
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
