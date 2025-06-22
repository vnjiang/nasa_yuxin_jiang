import { useState } from 'react';
import './index.css';
import Home from './components/home';
import Apod from './components/apod';


function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered ? (
        <Home onEnter={() => setEntered(true)} />
      ) : (
        <Apod />  
      )}
    </>
  );
}


export default App;