import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Card = ( {id, message, likes, onUpdateCard, onDeleteCard} ) => {
    const onLikesButtonClick = () => {
        const updatedCard = {
            id: id,
            message: message,
            likes: likes + 1
        };

        onUpdateCard(updatedCard);
    }

    const onDeleteButtonClick = () => {
        const cardToDelete = {
            id: id,
            message: message,
            likes: likes
        };

        onDeleteCard(cardToDelete);
    }

    return(
        <div className='card-item'>
            <p className='card-item__message'>{message}</p>
            <ul className='card-item__controls'>
                <li>
                    <p>{likes.toString()} 💕</p>
                </li>
                <li>
                    <p onClick={onLikesButtonClick}>+1</p>
                </li>
                <li>
                    <p className='card-item__delete' onClick={onDeleteButtonClick}>Delete</p>
                </li>
            </ul>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    onUpdateCard: PropTypes.func.isRequired,
    onDeleteCard: PropTypes.func.isRequired
};

export default Card;