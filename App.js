import React, { useRef } from 'react';
import axios from 'axios';
import CanvasDraw from './CanvasDraw';

const App = () => {
  const canvasRef = useRef();

  const saveDrawing = (data) => {
    axios.post('http://localhost:3001/saveDrawing', { data })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <CanvasDraw/>
      <button onClick={() => saveDrawing(canvasRef.current.getSaveData())}>Save Drawing</button>
    </div>
  );
};

export default App;
