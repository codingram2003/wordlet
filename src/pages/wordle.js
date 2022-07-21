import "./wordle.css";
import Board from "./components/Board";
import Keyboard from "./components/KeyBoard";
import { boardDefault, generateWordSet } from "./words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import Axios from "axios";
import Scores from "./scores";
import { Link } from 'react-router-dom';
import * as GoIcons from "react-icons/go";

export const AppContext = createContext();

function Wordle({user, pscore, attempt}) {
  const [scores, setScores]= useState([]);
  const [sidebar, setSidebar]= useState(false);
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt]= useState({attempt:0, letterPos:0});
  const [wordSet, setWordSet]= useState(new Set());
  const [disabledLetters, setDisabledLetters]= useState('');
  const [gameOver, setGameOver]= useState({gameOver:false, guessedWord:false});
  const [correctWord, setCorrectWord]= useState('');
  const [currentWord, setCurrentWord]=useState('');
  const [green, setGreen]= useState([])

  const sqlcommit= () => {
    Axios.post('https://wordle-123.herokuapp.com/api/commit', {A_1: parseInt(pscore) + 70-10*(currentAttempt.attempt+1), userName:user, A_2: 1+ parseInt(attempt) }).then(()=>{
      alert('success')
    })
  };

  const sqlcommit0= () => {
    Axios.post('https://wordle-123.herokuapp.com/api/commit0', {A_1: parseInt(pscore) , userName:user, A_2: 1+ parseInt(attempt) }).then(()=>{
      alert('success')
    })
  };

useEffect(()=>{
  generateWordSet().then((words)=>{
    setWordSet(words.wordSet);
    setCorrectWord(words.todaysWord.toUpperCase());
    console.log(words)
});
  },[]);

  const onSelectLetter =(keyVal)=>{
    if (currentAttempt.letterPos > 4) return ;
    const newBoard={...board};
    newBoard[currentAttempt.attempt][currentAttempt.letterPos]= keyVal;
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos +1});

  };
  const onDelete =()=>{
    if (currentAttempt.letterPos ===0) return;
    const newBoard={...board}
    newBoard[currentAttempt.attempt][currentAttempt.letterPos -1]= "";
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos -1});
  };
  const onEnter =()=>{
    setGreen([])
    console.log(pscore)
    if (currentAttempt.letterPos !==5) return;
    let currentWord1="";
    for (let i=0;i<5;i++){
      currentWord1+= board[currentAttempt.attempt][i];
    }
    if (wordSet.has(currentWord1.toLowerCase())){
      setCurrentAttempt({attempt: currentAttempt.attempt + 1, letterPos:0 });
      setCurrentWord(currentWord1)
      console.log(correctWord)
      for(let i=0;i<5;i++){
        if (currentWord1[i]===correctWord[i]){
          setGreen(green => [...green, correctWord[i].toUpperCase()]);
        }
      }
      console.log(green)
    } else {
      alert("Word not found");
    }
    
    if (currentWord1===correctWord){
      setGameOver({gameOver: true, guessedWord:true});
      if (attempt+1 <6){
        sqlcommit();
      } else {
        alert("You've used your chances")
      }
      return;
    }
    if (currentAttempt.attempt===5){
      setGameOver({gameOver:true, guessedWord: false })
      if (attempt+1 <6){
        sqlcommit0();
      } else {
        alert("You've used your chances")
      }
    }
  };
  const showS =()=> {
    Axios.get('https://wordle-123.herokuapp.com/api/scores')
            .then(response => setScores(response.data)
            )
    if (scores.length!==0){
      setSidebar(true)
    }
    console.log(scores);
    

  }

  return (
    <div className="Wordle">
      <nav>
        <h1>Wordle</h1>
        <h3>Welcome {user}</h3>
        
        
        
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,currentAttempt,
           setCurrentAttempt, onSelectLetter, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters,gameOver, setGameOver, currentWord, green, scores}}
           
      >
      <div >
      <Link to="#" className='menubars'>
      <GoIcons.GoGraph onClick={showS} />
      </Link>

    </div>
        <div >
          {sidebar ? <Scores />:<div className="game"> <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}</div>}
          
          
        </div>
      </AppContext.Provider>
      
    </div>
  );
}

export default Wordle;