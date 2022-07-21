import React, {useContext} from 'react';
import {AppContext} from "./wordle";

function Scores() {
  const {scores}= useContext(AppContext);
  return (
      <table className='center'>
      
       <tr>
          
            <th>Player</th>
            <th>Score</th>
            <th>Attempts</th>
          
        </tr>
       
        {scores.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
      </table>
    
  )
}

export default Scores;