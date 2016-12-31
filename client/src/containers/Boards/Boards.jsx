import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Board } from '../../components/index';

import './Boards.css';

const propTypes = {
  starredBoards: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired,
}

class Boards extends Component {  
  render() {
    return (
      <div className="Boards">
        { this.getStarredBoards() }
        { this.getPersonalBoards() }
        { this.getOrganizationBoards() }

        <div className="Boards-Create">
          <span>Create a new team...</span>
        </div>
      </div>
    );
  }

  getStarredBoards() {
    const { starredBoards, organizationId } = this.props;

    let starredBoard = null;

    if (this.canBoardsBeRendered() && starredBoards && starredBoards.length > 0) {
      starredBoard = (
        <Board 
          displayBoardOptions={false}
          boardsToDisplay={starredBoards}
          isStarredBoard
          boardTitle="Starred Board" 
        />
      )
    }

    return starredBoard;
  }

  canBoardsBeRendered() {
    return (!this.props.isFetching && this.props.isFetchingSuccessful);
  }

  getPersonalBoards() {
    const { boards } = this.props;

    let personalBoard = null;

    if (this.canBoardsBeRendered() && boards && boards.length > 0) {
      personalBoard = (
        <Board 
          displayBoardOptions={false}
          boardsToDisplay={boards}
          boardTitle="Personal Board"
        />
      )
    }

    return personalBoard;
  }

  getOrganizationBoards() {
    const { organizations } = this.props;

    let organizationItem = organizations.map((organization) => {

      if (this.canBoardsBeRendered() && organization.boards) {
        return (
          <Board 
            displayBoardOptions
            boardsToDisplay={organization.boards} 
            organizationId={organization._id}
            boardTitle={organization.displayName} 
            key={organization._id} 
          />
        );
      }
    });

    return organizationItem;
  }
}

function mapStateToProps(state) {
  const { starredBoards } = state.starredBoard;
  const { organizations } = state.organization;
  const { boards } = state.board;

  const { isFetching } = state.authentication;
  const { isFetchingSuccessful } = state.authentication;

  return {
    starredBoards,
    organizations,
    boards,

    isFetching,
    isFetchingSuccessful
  };
}

Boards.propTypes = propTypes;

export default connect(mapStateToProps)(Boards);