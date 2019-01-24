import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { logout } from '../redux/actions';

const ConnectedUser = ({ user, disconnectFromGlo }) => (
  <div>
    <div><b>{user.username}</b> (<i>{user.email}</i>)</div>
    <Button
      color="secondary"
      onClick={disconnectFromGlo}
      variant="contained"
    >
      Disconnect
    </Button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  disconnectFromGlo: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(ConnectedUser);
