import { FormEvent, useState } from 'react';

import { PinInput } from './components/PinInput/index';

import './app.css';

const digitQuantity = 6;

export function App() {
  const [code, setCode] = useState('');
  const [isSubmitted, setIsSubmitted]= useState(false);

  function handleGetCode(values: Array<string>) {
    const parsedStringCode = values.join('');

    setIsSubmitted(false);
    setCode(parsedStringCode);
  }


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();


    if (code.length < digitQuantity) {
      alert('Código vazio ou incompleto');
      // return;
    }

    setIsSubmitted(true);
  }


  return (
    <div className="container">
      <h1>Pin Code Input</h1>
      <form className="App" onSubmit={handleSubmit}>
        <PinInput digitQuantity={digitQuantity} onGetCode={handleGetCode}/>
        <p>Código: {isSubmitted && code}</p>
        <button type="submit">Enviar o código</button>
      </form>
    </div>

  );
}
