import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchBoards, fetchBoardData } from '../redux/actions';

class BoardSelect extends React.Component {
  componentDidMount() {
    if (!this.props.boards) {
      this.props.loadBoards();
    }
  }

  render() {
    if (!this.props.boards) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    return (
      <>
        <Select
          displayEmpty
          onChange={this.props.selectBoard}
          value={this.props.selectedBoardId}
        >
          <MenuItem value="">[Select a Board]</MenuItem>
          {
            this.props.boards.map((board) => (
              <MenuItem key={board.id} value={board.id}>{board.name}</MenuItem>
            ))
          }
        </Select>
        {<Button onClick={() => this.props.refresh(this.props.selectedBoardId)}>refresh</Button>}
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  selectedBoardId: state.selectedBoardId
});

const mapDispatchToProps = (dispatch) => ({
  loadBoards: () => dispatch(fetchBoards()),
  refresh: async (selectedBoardId) => {
    await dispatch(fetchBoards());
    if (selectedBoardId) {
      dispatch(fetchBoardData(selectedBoardId));
    }
  },
  selectBoard: (e) => dispatch(fetchBoardData(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardSelect);
