import { useState } from 'react';

import { letters } from './helpers/letters';
import './App.css';

function App() {

  const [pos, setPos ] = useState(0);

  const [ word ] = useState('COMPUTADORA');
  const [ hiddenWord, setHiddenWord ] = useState('_ '.repeat(word.length));

  const [ attempts, setAttempts ] = useState(0);

  const pushLetter = (letter: string, pos: number) => {
    const hiddenWordArray = hiddenWord.split(' ');
    hiddenWordArray[pos] = letter;
    setPos( Math.min( pos + 1, word.length-1));

    setHiddenWord( hiddenWordArray.join(' ') );
    
  }
  
  const checkWord = ( word: string) => {
    if( word !== hiddenWord) {
      setAttempts( Math.min( attempts + 1, 6));
      return;
    }
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
            onClick={ () => pushLetter(letter, pos) }
            key={ letter }>
            { letter }
          </button>
        ))
      }
    </div>
  )
};

export default App;
