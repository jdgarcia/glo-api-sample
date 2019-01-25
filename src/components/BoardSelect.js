import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { fetchBoards, fetchBoardData } from '../redux/actions';

class BoardSelect extends React.Component {
  componentDidMount() {
    if (!this.props.boards) {
      this.props.loadBoards();
    }
  }

  render() {
    if (!this.props.boards) {
      return <div>Loading boards...</div>;
    }

    return (
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
    );
  }
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  selectedBoardId: state.selectedBoardId
});

const mapDispatchToProps = (dispatch) => ({
  loadBoards: () => dispatch(fetchBoards()),
  selectBoard: (e) => dispatch(fetchBoardData(e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardSelect);
