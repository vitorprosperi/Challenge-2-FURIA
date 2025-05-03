import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/formlogin'; // Tela de login
import Cadastro from './components/cadastro'; // Tela de cadastro inicial
import CadastroPDois from './components/cadastropdois'; // Tela de cadastro parte 2
import Doc from './components/doc'; // Tela doc.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Tela inicial: Login */}
        <Route path="/cadastro" element={<Cadastro />} /> {/* Tela de cadastro */}
        <Route path="/cadastropdois" element={<CadastroPDois />} /> {/* Tela de cadastro parte 2 */}
        <Route path="/doc" element={<Doc />} /> {/* Tela doc */}
      </Routes>
    </Router>
  );
}

export default App;
