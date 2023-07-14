import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

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
        <ListItem disablePadding>
            <ListItemButton
                selected={isSelected}
                onClick={onBoardSelectionClick}>
                <ListItemText primary={title} />
            </ListItemButton>
        </ListItem>
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