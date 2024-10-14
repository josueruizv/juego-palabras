import { useState } from 'react';

import { letters } from './helpers/letters';
import './App.css';

function App() {

  const [row, setRow] = useState(0);
  const [pos, setPos ] = useState(0);

  const [ word ] = useState('ALA');
  const [ hiddenWords, setHiddenWords ] = useState(
    Array(6).fill('_ '.repeat(word.length))
  );
  const [letterColors, setLetterColors ] = useState(
    Array(6).fill(Array(word.length).fill('black'))
  );

  const pushLetter = (letter: string) => {
    const currentRow = hiddenWords[row].split(' ');
    
    if(pos < word.length){
      currentRow[pos] = letter
      setPos(Math.min(pos + 1, word.length))
    }
    
    const updatedWords = [...hiddenWords];
    updatedWords[row] = currentRow.join(' ');
    setHiddenWords(updatedWords);
    
  }

  const deleteLetter = () => {
    if(pos > 0){      
      const currentRow = hiddenWords[row].split(' ');
      currentRow[pos-1] = '_';
      setPos(Math.max(pos-1, 0));

      const updatedWords = [...hiddenWords];
      updatedWords[row] = currentRow.join(' ');
      setHiddenWords(updatedWords);
    }
  }
  
  const checkWord = ( ) => {
    const userWord = hiddenWords[row].split(' ').join('');
    const newColors = letterColors.map(letterColor => [...letterColor]);
   
    for(let i=0; i<word.length; i++){
      if(userWord[i] === word[i]){
        newColors[row][i] = 'green'
      }else if(word.includes(userWord[i])){
        newColors[row][i] = 'orange';
      }
    }

    if(row < 6){
      setLetterColors(newColors);
      setRow(row + 1);
      setPos(0);
    }    
  }

  return (
    <div className="App">
      {/* Cuadro */}
      {
        hiddenWords.map((hiddenWord, index) => (
          <h2
            key={ index }>
            {
              hiddenWord.split(' ').map((letter: string, letterIndex: number) => (
                <span 
                  key={ letterIndex}
                  style={{ color: letterColors[index][letterIndex] }}>
                    { letter }{' '}
               </span>
              ))
            }
          </h2>
        ))
      }

      {/* Botón enviar */}
      <button
        onClick = { () => checkWord() }
        disabled={pos !== word.length}>
        Enviar
      </button>
      <br />

      {/* Botones de letras */}
      {
        letters.map( (letter) => (
          <button 
            onClick={ () => pushLetter(letter) }
            key={ letter }
            disabled={row === 6}>
            { letter }
          </button>
        ))
      }
      <button
        onClick={ () => deleteLetter() }
        disabled={pos === 0}>
          ←
      </button>
    </div>
  )
};

export default App;
