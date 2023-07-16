import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import '../App.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SortIcon from '@mui/icons-material/Sort';
import { red, grey } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';

const CardList = ({boardName, cards, onUpdateCard, onDeleteCard}) => {
    const [sortButtonValue, setSortButtonValue] = useState("ID");
    const [sortOrder, setSortOrder] = useState("Ascending");

    // Compare function return values: 
    // if a > b return 1; if a < b return -1; if a == b return 0
    const sortCardsFn = (a, b) => {
        const greaterRetVal = (sortOrder === "Ascending") ? 1 : -1;
        const lesserRetVal = (sortOrder === "Ascending") ? -1 : 1;

        switch (sortButtonValue) {
            case "ID": {
                if (a.id > b.id)
                    return greaterRetVal;
                else if (a.id < b.id)
                    return lesserRetVal;
                return 0;
            }
            case "Message": {
                let str1 = String(a.message);
                let str2 = String(b.message);
                if (sortOrder === "Ascending")
                    return (str1.localeCompare(str2));
                else
                    return (str2.localeCompare(str1));
            }
            case "LikesCount": {
                if (a.likes > b.likes)
                    return greaterRetVal;
                else if (a.likes < b.likes)
                    return lesserRetVal;
                else
                    return 0; // Likes count equal 
            }
            default:
                return 0;
        }

    }

    const getCardListJSX = (cards) => {
        cards.sort(sortCardsFn);
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
    };

    const handleSortButtonChange = (event) => {
        setSortButtonValue(event.target.value);
        console.log(event.target.value);
        getCardListJSX(cards);
    };

    const handleSortOrderChange = (event) => {
        console.log("Inside sort order change handler");
        if (sortOrder === "Ascending")
            setSortOrder("Descending")
        else if (sortOrder === "Descending")
            setSortOrder("Ascending");
    };

/*  <div className='card-sort__control'></div> */

/* NOTE: Getting rid of the component="span" attribute for the Box component and then passing an override style
    attribute of display:'inline-flex' was the magic that I needed in order to get the entire area to be
    treated as one chunk so when I resize the window, the entire set of sort controls move down to a new row
    with no overlaps and broken borders. Previously, the sort by control, the sort icon and the direction arrow
    were all treated as independent elements and moved down separately. Also with ugly overlaps and border 
    being broken. Plus the "Sort By" text label on top was not included in the border. With these 2 changes
    everything just works. Also, the p style element sets the size of the box and the alignItems attribute on 
    the box centered that icon. By putting the Cards header text inside a Box element along with the sort 
    controls, I'm now able to use So cool! 
*/

    return(
        <section>
            <Box className='cards-container__header'>
                <h2 className='area__names'> Cards for {boardName} </h2>
                <Box sx={{ p: 1, display: 'inline-flex', border: '1px solid black', boxShadow: 10, borderRadius: 2, alignItems: 'center', mr: 1, mt: 1 }}>
                    {(sortOrder === "Ascending") ? <ArrowUpwardIcon sx={{alignItems: 'bottom'}} /> : <ArrowDownwardIcon />}                                        
                    <Tooltip title="Sort Order">
                        <IconButton sx={{transform: 'rotate(360deg)'}} onClick={handleSortOrderChange}>
                            <SortIcon sx={{ color: grey[800], mr: 3}} />
                        </IconButton>
                    </Tooltip>
                    <FormControl variant='filled' color='success'>
                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 18, fontWeight: 'bold'}}>Sort By</FormLabel>
                        <RadioGroup 
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={sortButtonValue}
                            onChange={handleSortButtonChange}
                        >
                            <FormControlLabel value="ID" control={<Radio />} label="ID" />
                            <FormControlLabel value="Message" control={<Radio />} label="Message" />
                            <FormControlLabel value="LikesCount" control={<Radio />} label="Likes Count" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
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