import React from 'react';
import PropTypes from 'prop-types';
import Board from './board'

const Boards = ({ boards, onBoardSelection }) => {
    const getBoardList = (boards) => {
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

    return(
        <section>
            <h2>Boards</h2>
            <ol className='boards__list'>
                {getBoardList(boards)}
            </ol>
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