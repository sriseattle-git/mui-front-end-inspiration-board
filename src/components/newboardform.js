import { useState } from 'react';
import PropTypes from 'prop-types';

const NewBoardForm = ( {onCreateBoard} ) => {

    const [formFields, setFormFields] = useState({
        title: '',
        owner: '',
        titleClass: 'invalid-form-input',
        ownerClass: 'invalid-form-input'
    });

    const onTitleChange = (event) => {
        let titleClass = '';

        if (event.target.value.length === 0 || event.target.value.length > 40)
            titleClass = 'invalid-form-input';

        setFormFields({
            ...formFields,
            title: event.target.value,
            titleClass: titleClass
        })
    };

    const onOwnerChange = (event) => {
        let ownerClass = '';

        if (event.target.value.length === 0 || event.target.value.length > 40)
            ownerClass = 'invalid-form-input';

        setFormFields({
            ...formFields,
            owner: event.target.value,
            ownerClass: ownerClass
        })
    };

    const onCreateBoardFormSubmit = (event) => {
        console.log("Inside Create Board Form submit");
        event.preventDefault();

        const newBoard = {
            title: formFields.title,
            owner: formFields.owner
        }

        onCreateBoard(newBoard);

        setFormFields({
            title: '',
            owner: '',
            titleClass: 'invalid-form-input',
            ownerClass: 'invalid-form-input'    
        });
    };

    return (
        <form className='new-board-form__form' onSubmit={onCreateBoardFormSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                className={'new-board-form__form-input ' + formFields.titleClass}
                name="title"
                type="text"
                value={formFields.title}
                onChange={onTitleChange} />
            <label htmlFor="owner">Owner Name:</label>
            <input 
                className={'new-board-form__form-input ' + formFields.ownerClass}
                name="owner"
                type="text"
                value={formFields.owner}
                onChange={onOwnerChange}
            />
            <input
                className='new-board-form__form-submit-btn'
                type="submit"
                value="Add Board"
                disabled={((formFields.titleClass === '') && (formFields.ownerClass === '')) ? false : true}
            />
        </form>
    );
};

NewBoardForm.propTypes = {
    onCreateBoard: PropTypes.func.isRequired
};

export default NewBoardForm;