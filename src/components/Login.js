import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import config from '../config';
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
    const scope = encodeURIComponent('user:read board:read');
    const popupUrl = `${config.AUTHORIZE_URL}?response_type=code&client_id=${config.CLIENT_ID}&scope=${scope}`;

    window.addEventListener('message', message => {
      if (message && message.data && message.data.access_token) {
        dispatch(login(message.data.access_token));
      }
    });

    window.open(popupUrl, '_blank', 'width=1200,height=800');
  }
})

export default connect(null, mapDispatchToProps)(Login);
