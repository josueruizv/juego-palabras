import { letters } from './helpers/letters';
import './App.css';

function App() {

  return (
    <div className="App">
      {/* Cuadro */}
      <h3>_ _ _ _ _ _ _</h3>
      <h3>_ _ _ _ _ _ _</h3>
      <h3>_ _ _ _ _ _ _</h3>
      <h3>_ _ _ _ _ _ _</h3>
      <h3>_ _ _ _ _ _ _</h3>
      <h3>_ _ _ _ _ _ _</h3>

      {/* Botones de letras */}
      {
        letters.map( (letter) => (
          <button key={ letter }>{ letter }</button>
        ))
      }
    </div>
  )
};

export default App;
