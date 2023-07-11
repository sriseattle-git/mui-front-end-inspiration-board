import React, { useState, useEffect } from 'react';
import './App.css';
import Boards from './components/boards'
import CardList from './components/cardlist'
import NewBoardForm from './components/newboardform'
import NewCardForm from './components/newcardform'
import axios from 'axios'

function App() {

  const sampleBoardData = [
    {
      id: 1,
      title: 'First Board',
      owner: 'Sri R',
      isSelected: false
    },
    {
      id: 2,
      title: 'Second Board',
      owner: 'Sri R',
      isSelected: false
    }
  ];

  const firstBoardCardData = [
    {
      id: 1,
      message: 'B1 says hello',
      likes: 3
    },
    {
      id: 2,
      message: 'B1 says hello hello',
      likes: 0
    },    
    {
      id: 3,
      message: 'B1 says hello hello hello',
      likes: 1
    },    
    {
      id: 4,
      message: 'B1 says hiya',
      likes: 0
    },    
    {
      id: 5,
      message: 'B1 says hiya hiya',
      likes: 2
    },    
    {
      id: 6,
      message: 'B1 says hiya hiya hiya',
      likes: 0
    },
    {
      id: 7,
      message: 'B1 says good day',
      likes: 3
    }
  ];

  const secondBoardCardData = [
    {
      id: 1,
      message: 'B2 says hello',
      likes: 5
    },
    {
      id: 2,
      message: 'B2 says good day',
      likes: 1
    }
  ];

  const [boardData, setBoardData] = useState(sampleBoardData);

  const [selectedBoardTitle, setSelectedBoardTitle] = useState("");

  const [cardData, setCardData] = useState([]);

/*  const fetchBoardsList = () => {
    setBoardData(sampleBoardData);
  };
*/


/*  if (selectedBoardTitle === "")
    fetchBoardsList();
    const selectedBoard = findSelectedBoard();
    if (selectedBoard)
      setSelectedBoardTitle(selectedBoard.title);
    fetchCards(selectedBoard); */

  const findSelectedBoard = () => {
    const board = boardData.filter((board) => (board.isSelected === true));

    if (board === undefined || board.length === 0) {
      return undefined;
    }
    else {
      return (board[0]);
    };
  };

  const updateBoardSelection = (boardSelected) => {
    const boards = boardData.map((board) => {
      if (board.id === boardSelected.id) {
        return boardSelected;
      }
      else {
        // Reset selection status for all other boards
        board.isSelected = false;
        return board;
      }
    });

    setBoardData(boards);
    setSelectedBoardTitle(boardSelected.title);    
    fetchCards(boardSelected);
  };

  const addNewBoard = (newBoard) => {
    const newBoardData = [...boardData];

    const nextId = Math.max(...newBoardData.map(board => board.id)) + 1;

    newBoardData.push({
      id: nextId,
      title: newBoard.title,
      owner: newBoard.owner,
      isSelected: false
    });

    setBoardData(newBoardData);    
  };

  const fetchCards = (selectedBoard) => {
    if (selectedBoard) {
      if (selectedBoard.id === 1)
        setCardData(firstBoardCardData);
      else
        setCardData(secondBoardCardData);
    }
  };

  const updateCard = (updatedCard) => {
    const cards = cardData.map((card) => {
      if (card.id === updatedCard.id) {
        return updatedCard;
      } else {
        return card;
      }
    });

    setCardData(cards);
  };

  const deleteCard = (cardtodelete) => {
    const cards = cardData.filter((card) => (card.id !== cardtodelete.id));
    
    setCardData(cards);
  };

  const addNewCard = (newCardMsg) => {
    const newCardData = [...cardData];

    const nextId = Math.max(...newCardData.map(card => card.id)) + 1;

    newCardData.push({
      id: nextId,
      message: newCardMsg,
      likes: 0
    });

    setCardData(newCardData);
  };

  return(
    <div className='page__container'>
      <div className='content__container'>
        <h1>Inspiration Board</h1>
        <section className='boards__container'>
          <Boards 
            boards={boardData}
            onBoardSelection={updateBoardSelection} />
          <section className='new-board-form__container'>
            <h2>Create a New Board</h2>
            <NewBoardForm onCreateBoard={addNewBoard} />
          </section>
        </section>
        <section className='cards__container'>
          <CardList 
            boardName={selectedBoardTitle}
            cards={cardData}
            onUpdateCard={updateCard}
            onDeleteCard={deleteCard}
          />
          <section className='new-card-form__container'>
            <h2>New Card</h2>
            <NewCardForm onCreateCard={addNewCard}/>
          </section>
        </section>
      </div>
    </div>
  )
}

/* DEFAULT React App() function & import
import logo from './logo.svg';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
