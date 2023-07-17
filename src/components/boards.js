import React from 'react';
import PropTypes from 'prop-types';
import Board from './board'
import List from '@mui/material/List';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const Boards = ({ boards, onBoardSelection }) => {
    const getBoardList = (boards) => {
        if (boards) {
            return boards.map((board) => {
                return(
                    <Board key={board.id.toString()}
                        id={board.id}
                        title={board.title}
                        owner={board.owner}
                        isSelected={board.isSelected}
                        onBoardSelection={onBoardSelection}
                    />
                );
            });
        }
    }

    return(
        <section>
            <Box sx={{ p: 2, display: 'inline-flex', border: '2px solid black', 
                        boxShadow: 10, borderRadius: 2, alignItems: 'center', 
                        backgroundColor: 'azure', ml: 1, mt: 1, mr: 3, mb: 2 }}>
                <Typography variant='h5' >Boards</Typography>
            </Box>
            <List component="nav" className='boards__list'>
                {getBoardList(boards)}
            </List>
        </section>
    );   
}


Boards.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            owner: PropTypes.string.isRequired,
            isSelected: PropTypes.bool.isRequired
        })
    ).isRequired,
    onBoardSelection: PropTypes.func.isRequired
};

export default Boards;