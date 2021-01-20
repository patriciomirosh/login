
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './firebase'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { UsuarioProvider } from './context/userContext';

ReactDOM.render(
  <React.StrictMode>
    <UsuarioProvider>
    <App />
    </UsuarioProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

