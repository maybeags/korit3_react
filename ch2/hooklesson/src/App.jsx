import { useRef } from 'react';
import Counter from './components/Counter';
import './App.css';

function App() {
  const inputRef = useRef(null);

  return (
    <>
      <Counter />

      <input ref={inputRef} /><br /><br />
      <button onClick={() => inputRef.current.focus()}>
        Focus input
      </button>
    </>
  );
}

export default App
