import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, grey } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Card = ( {id, message, likes, onUpdateCard, onDeleteCard} ) => {

    const [fireDelAlert, setDelAlertState] = useState(false);

    const onLikesButtonClick = () => {
        const updatedCard = {
            id: id,
            message: message,
            likes: likes + 1
        };

        onUpdateCard(updatedCard);
    };

    const onDeleteButtonClick = () => {
        setDelAlertState(true);
    };

    const handleDeleteConfirmation = () => {
        const cardToDelete = {
            id: id,
            message: message,
            likes: likes
        };

        onDeleteCard(cardToDelete);
    };

    const handleDeleteRejection = () => {
        setDelAlertState(false);
        console.log("On delete alert rejection");
    };

    const handleDelAlertClose = () => {
        setDelAlertState(false);
        console.log("On closure of alert dialog");
    };

/*
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
*/

    return(
        <div className='card-item'>
            <CardContent>
                <Typography variant="h6" className='card-item__message'>{message}</Typography>
            </CardContent>
            <CardActions>
                <Typography color = "action" variant="h6">{likes.toString()}</Typography>
                <Tooltip title="Like">
                    <IconButton onClick={onLikesButtonClick}>
                        <FavoriteIcon sx={{ color: red[500] }}/>
                    </IconButton>
                </Tooltip>
            </CardActions>
            <CardActions>
                <Tooltip title="Delete">
                    <IconButton onClick={onDeleteButtonClick}>
                        <DeleteIcon sx={{ color: grey[800] }}/>
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={fireDelAlert}
                    onClose={handleDelAlertClose}
                >
                    <DialogTitle>
                        {"Delete this card?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteConfirmation}>Yes</Button>
                        <Button onClick={handleDeleteRejection}>No</Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
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