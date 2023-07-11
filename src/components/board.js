import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Board = ( {id, title, owner, isSelected, onBoardSelection}) => {
    const onBoardSelectionClick = (board) => {
        const selectedBoard = {
            id: id,
            title: title,
            owner: owner,
            isSelected: true
        };

        onBoardSelection(selectedBoard);
    }

    const itemFormat = isSelected ? 'board__selected' : '';
    return(
        <li>
            <div className={itemFormat} onClick={onBoardSelectionClick}>{title}</div>
        </li>
    );
}

Board.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onBoardSelection: PropTypes.func.isRequired
};

export default Board;