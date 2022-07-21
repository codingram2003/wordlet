import {React, useContext} from 'react';
import {AppContext} from '../wordle';

function GameOver() {
  const {gameOver , correctWord, currentAttempt}=useContext(AppContext);
  return (
    <div className='gameOver'>
      <h3>{gameOver.guessedWord ? "You've guessed the word!!!": "Looser!!!"}</h3>
      <h1>Correct word: {correctWord}</h1>
      {gameOver.guessedWord && (<h3>You have guessed the word in {currentAttempt.attempt} attemps </h3>)}
    </div>
  )
}

export default GameOver;