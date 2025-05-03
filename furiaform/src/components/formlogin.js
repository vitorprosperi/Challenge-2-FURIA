import React, { useState } from 'react';
import './formlogin.css';
import login from './loginback';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para armazenar a mensagem de feedback

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página
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
        {message && <p className="feedback-message">{message}</p>} {/* Exibe a mensagem de feedback */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail
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
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
            required
          />
        </div>
        <button type="submit">Entrar</button>
        <button type="button" onClick={() => setMessage('Redirecionar para cadastro')}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Login;