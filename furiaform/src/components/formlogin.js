import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './formlogin.css';
import login from './loginback';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(email, password);
      if (success) {
        setMessage(`Login realizado com sucesso! Bem-vindo, ${email}`);
      } else {
        setMessage('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      setMessage(`Erro inesperado durante o login: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {message && <p className="feedback-message">{message}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
        <button type="button" onClick={() => navigate('/cadastro')}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Login;