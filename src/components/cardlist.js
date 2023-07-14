import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import '../App.css';

const CardList = ({boardName, cards, onUpdateCard, onDeleteCard}) => {
    const getCardListJSX = (cards) => {
        return cards.map((card) => {
            return(
                <Card key={card.id.toString()}
                    id={card.id}
                    message={card.message}
                    likes={card.likes}
                    onUpdateCard={onUpdateCard}
                    onDeleteCard={onDeleteCard}
                />
            );
        });
    }

    return(
        <section>
            <h2 className='area__names'> Cards for {boardName}</h2>
            <div className='card-items__container'>
                {getCardListJSX(cards)}
            </div>
        </section>
    )
}

CardList.propTypes = {
    boardName: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes: PropTypes.number.isRequired
        })
    ).isRequired,
    onUpdateCard: PropTypes.func.isRequired,
    onDeleteCard: PropTypes.func.isRequired
}

export default CardList;