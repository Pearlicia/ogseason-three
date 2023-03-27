import './App.css';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState('');

  const operations = (event) => {
    setResult(result.concat(event.target.name));
  }

  const clearField = () => {
    setResult("");
  }

  const delOperation = () => {
    setResult(result.slice(0, -1));
  }

  const showResult = () => {
    try {
      setResult(eval(result).toString());
    } catch {
      setResult("Error")
    }
  }

  return (
    <div className="App">
      <h1>Calculator</h1>

      <div className='container'>
        <form>
          <input type="text" value={result} />
        </form>

        <div className='keys'>
          <button onClick={clearField} id='del' className='delete'>C</button>
          <button onClick={delOperation} className='delete'>DEL</button>
          <button name='/' onClick={operations} className='operand'>/</button>
          <button name="1" onClick={operations} className="number">1</button>
          <button name="2" onClick={operations} className="number">2</button>
          <button name="3" onClick={operations} className="number">3</button>
          <button name="+" onClick={operations} className='operand'>+</button>
          <button name="4" onClick={operations} className="number">4</button>
          <button name="5" onClick={operations} className="number">5</button>
          <button name="6" onClick={operations} className="number">6</button>
          <button name="-" onClick={operations} className='operand'>-</button>
          <button name="7" onClick={operations} className="number">7</button>
          <button name="8" onClick={operations} className="number">8</button>
          <button name="9" onClick={operations} className="number">9</button>
          <button name="*" onClick={operations} className='operand'>*</button>
          <button name="0" onClick={operations} className="number">0</button>
          <button name="." onClick={operations} className="number">.</button>
          <button onClick={showResult} id='equal' className='equl'>=</button>
        </div>

      </div>

    </div>
  );
}

export default App;
