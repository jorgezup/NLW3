// JSX - Javascript XML
// TSX - TYpescript XML

// Componente React - Função que retorna conteúdo HTML (JSX)
import React from 'react';

import './styles/global.css'
import 'leaflet/dist/leaflet.css'
import 'react-phone-number-input/style.css'


import Routes from './routes';

function App() {
  return (
    <Routes/>
  );
}

export default App;
