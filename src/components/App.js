import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/App.css';

import Login from './Login';
import ConnectedUser from './ConnectedUser';
import BoardSelect from './BoardSelect';

class App extends Component {
  render() {
    return (
      <div className="App">
        {!this.props.user
          ? <Login />
          : (
            <>
              <ConnectedUser user={this.props.user} />
              <BoardSelect />
            </>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
