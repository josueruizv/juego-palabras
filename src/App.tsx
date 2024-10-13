import { useState } from 'react';

import { letters } from './helpers/letters';
import './App.css';

function App() {

  const [word] = useState('COMPUTADORA');
  const [hiddenWord] = useState('_ '.repeat(word.length));

  const [ attempts, setAttempts ] = useState(0);

  const pushLetter = (letter: string) => {
    console.log(letter);
  }
  
  const checkWord = ( word: string) => {
    console.log(word);
    setAttempts( Math.min( attempts + 1, 6));    
  }

  return (
    <div className="App">
      {/* Cuadro */}
      <h3>{ hiddenWord }</h3>
      <h3>{ hiddenWord }</h3>
      <h3>{ hiddenWord }</h3>
      <h3>{ hiddenWord }</h3>
      <h3>{ hiddenWord }</h3>
      <h3>{ hiddenWord }</h3>

      {/* Botón enviar */}
      <button
        onClick = { () => checkWord('hola mundo') }>
        Enviar
      </button>
      <br />

      {/* Botones de letras */}
      {
        letters.map( (letter) => (
          <button 
            onClick={ () => pushLetter(letter) }
            key={ letter }>
            { letter }
          </button>
        ))
      }
    </div>
  )
};

export default App;
