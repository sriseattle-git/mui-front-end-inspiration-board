import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';

const options = [
    'Info',
    'Update',
    'Delete',
];

const ITEM_HEIGHT = 48;

const Board = ( {id, title, owner, isSelected, onBoardSelection}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // Handle click event to open menu for board
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuAction = (event) => {
        switch (event.currentTarget.value) {
            case 'Info':
                console.log("Info menu option selected");
                break;
            case 'Update':
                console.log("Update board info option selected");
                break;
            case 'Delete':
                console.log("Delete board option selected");
                break;
            default:
                console.log("Unknown menu option selected");
        }
    };

    // Reset menu open state upon close of menu
    const handleClose = () => {
        setAnchorEl(null);
    }; 

    const onBoardSelectionClick = (board) => {
        const selectedBoard = {
            id: id,
            title: title,
            owner: owner,
            isSelected: true
        };

        onBoardSelection(selectedBoard);
    };
    
    const listItemHoverStr = `Owner: ${owner}`;

    // Board list item has a secondary action added that's an icon that opens up a menu for more actions
    // NOTE: In Menu components, the code sample used PaperProps to to customize the Paper component that wraps
    // the Menu component. VS Code gave an error that it's been deprecated. Bing chat actually helped and
    // suggested replacing PaperProps with PaperComponent.
    return(
        <ListItem 
            secondaryAction={
                <div>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                        'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperComponent={{
                                style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                                },
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleMenuAction}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            }
            disablePadding>
            <ListItemButton
                selected={isSelected}
                onClick={onBoardSelectionClick}>
                <Tooltip title={listItemHoverStr}>
                    <ListItemText primary={title} />
                </Tooltip>
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