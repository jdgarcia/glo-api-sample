const getInitialState = () => ({
  user: null
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'login-success':
      return {
        ...state,
        user: action.user
      };

    case 'logout-success':
      return getInitialState();

    default:
      return state;
  }
};
