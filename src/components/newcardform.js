import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const NewCardForm = ( {onCreateCard} ) => {

    const [formFields, setFormFields] = useState({
        message: '',
        msgClass: 'invalid-form-input'
    });

    const onMsgChange = (event) => {
        let msgClass = '';

        if (event.target.value.length === 0 || event.target.value.length > 40)
            msgClass = 'invalid-form-input';

        setFormFields({
            ...formFields,
            message: event.target.value,
            msgClass:msgClass
        })
    };

    const onAddCardFormSubmit = (event) => {
        console.log("Inside Add Card form submit");
        event.preventDefault();

        onCreateCard(formFields.message);

        setFormFields({
            message: '',
            msgClass: 'invalid-form-input'
        });
    };

    return (
        <form className='new-card-form__form' onSubmit={onAddCardFormSubmit} >
            <TextField 
                label="Message" 
                variant="outlined" 
                type="text"
                required
                value={formFields.message} 
                onChange={onMsgChange}
                error={formFields.msgClass === 'invalid-form-input'}
                sx={{ mb: 2}}
            />
            <Button 
                variant="outlined" 
                color="info" 
                type="submit" 
                size='medium'
                disabled={(formFields.msgClass === '') ? false : true}>
                Add Card
            </Button>
        </form>
    );
};

NewCardForm.propTypes = {
    onCreateCard: PropTypes.func.isRequired
}

export default NewCardForm;

/* Form using HTML controls
            <label htmlFor="cardMsg">Message:</label>
            <input
                className={'new-card-form__form-input ' + formFields.msgClass}
                id="cardMsg"
                name="cardMsg"
                type="text"
                value={formFields.message}
                onChange={onMsgChange}
            />
            <input
                className='new-board-form__form-submit-btn'
                type="submit"
                value="Add Card" 
                disabled={(formFields.msgClass === '') ? false : true}
            />
*/