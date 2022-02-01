import { useState } from 'react';
import axios from 'axios';

function App() {

  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);
  const [resultado, setResultado] = useState(null);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const peso_altura = `${peso},${altura}`;
    const response = await axios.post(
      'http://localhost:8000/api/imc/',
      { "peso_altura": peso_altura }
    )
    setResultado(Math.round(response.data.resultado, 2))
  }


  return (
    <div className="App">
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="peso"
          onChange={e => setPeso(e.target.value)}
        />
        <input
          type="text"
          placeholder="altura"
          onChange={e => setAltura(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      <h2>Peso: {peso}</h2>
      <h2>Altura: {altura}</h2>

      <h2>Resultado: {resultado}</h2>


    </div>
  );
}

export default App;
