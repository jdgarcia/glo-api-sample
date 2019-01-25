import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/App.css';

import Login from './Login';
import ConnectedUser from './ConnectedUser';
import BoardSelect from './BoardSelect';
import BoardData from './BoardData';

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
              {this.props.selectedBoardId &&
                <BoardData />
              }
            </>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedBoardId: state.selectedBoardId,
  user: state.user
});

export default connect(mapStateToProps)(App);
