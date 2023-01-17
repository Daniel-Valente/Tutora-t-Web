import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Principal from './pages/principal';
import Perfil from './pages/perfil';

import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import Configuracion from './pages/configuracion';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App/>}/>
          <Route exact path="/principal" element={<Principal/>}/>
          <Route exact path="/perfil" element={<Perfil/>}/>
          <Route exact path="/configuracion" element={<Configuracion/>}/>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
