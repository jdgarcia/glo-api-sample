import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { login } from '../redux/actions';

const Login = ({ loginToGlo }) => (
  <Button
    color="primary"
    onClick={loginToGlo}
    variant="contained"
  >
    Login to Glo
  </Button>
);

const mapDispatchToProps = (dispatch) => ({
  loginToGlo: () => {
    const clientId = '';
    const scope = encodeURIComponent('user:read board:read');
    const popupUrl = `https://app.gitkraken.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=${scope}`;

    window.addEventListener('message', message => {
      if (message && message.data && message.data.access_token) {
        dispatch(login(message.data.access_token));
      }
    });

    window.open(popupUrl, '_blank', 'width=1200,height=800');
  }
})

export default connect(null, mapDispatchToProps)(Login);
