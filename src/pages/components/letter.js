import React, { useContext, useEffect } from "react";
import { AppContext } from "../wordle";


function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currentAttempt, setDisabledLetters, currentWord, green } =
    useContext(AppContext);
  const letter = board[attemptVal][letterPos];



  const correct= currentWord!=='' && correctWord[letterPos]===letter;
  const almost= currentWord!=='' && !correct && !green.includes(letter)  && letter!=="" && correctWord.includes(letter) ;
  const letterState= currentAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

  useEffect(()=>{
    if (letter!=="" && !correct && !almost) {
      setDisabledLetters((prev)=>
        [...prev, letter]
      )
    }
  },[currentAttempt.attempt, letter, correct,almost ,setDisabledLetters]);
  
  return (
    <div className="letter" id={letterState} >
      {letter}
    </div>
  );
}

export default Letter;