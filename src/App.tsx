import { useEffect, useState } from 'react';

import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';

import './App.css';

function App() {

  const [ word, setWord ] = useState(getRandomWord());
  
  const [ hiddenWords, setHiddenWords ] = useState(
    Array(6).fill('_ '.repeat(word.length))
  );
  const [ row, setRow] = useState(0);
  const [ pos, setPos ] = useState(0);
  const [ letterColors, setLetterColors ] = useState(
    Array(6).fill(Array(word.length).fill('black'))
  );
  const [ lose, setLose ] = useState(false);
  const [ won, setWon ] = useState(false);

  useEffect(() => {
    if(row >= 6){
      setLose(true);
    }
  }, [row])

  const pushLetter = (letter: string) => {
    if ( won ) {

      return;
    }
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
    if(row < 6){
      const userWord = hiddenWords[row].split(' ').join('');
      const newColors = letterColors.map(letterColor => [...letterColor]);

      const countLetters: { [key: string]: number }  = {};
      for(const le of word){
        countLetters[le] = (countLetters[le] || 0) + 1;
      }
      

      for(let i=0; i<word.length; i++){
        if(userWord[i] === word[i]){
          newColors[row][i] = 'green';
          countLetters[userWord[i]]--;
        }
      }
      for(let i=0; i<word.length; i++){ 
        if(word.includes(userWord[i]) && countLetters[userWord[i]] > 0){
          newColors[row][i] = 'orange';
          countLetters[userWord[i]]--;
        }
      }

      if(userWord === word){

        setWon(true);
      }

      setLetterColors(newColors);
      setRow(row + 1);
      setPos(0);
    }
  }

  const newGame = () => {
    const newWord = getRandomWord();

    setWord( newWord );
    setHiddenWords( Array(6).fill('_ '.repeat(newWord.length)) );
    setRow(0);
    setPos(0);
    setLetterColors( Array(6).fill(Array(newWord.length).fill('black')) );
    setLose(false);
    setWon(false);
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

      {/* Mensaje si perdió */}
      {
        ( lose ) ? <h2>Has perdido</h2> : ''
      }

      {/* Mensaje si ganó */}
      {
        ( won ) ? <h2>Felicidades! Has ganado</h2> : ''
      }
      <br />

      {/* Botones de letras */}
      {
        letters.map( (letter) => (
          <button 
            onClick={ () => pushLetter(letter) }
            key={ letter }
            disabled={lose || won}>
            { letter }
          </button>
        ))
      }
      <button
        onClick={ () => deleteLetter() }
        disabled={pos === 0}>
          ←
      </button>

      <hr /><br />

      <button onClick={ newGame }>Nuevo Juego</button>
    </div>
  )
};

export default App;
