import React, { useState } from 'react';
import { db } from '../firebaseconnection'; // Importa o Firestore
import { auth } from '../firebaseconnection'; // Importa o Firebase Authentication
import { collection, addDoc } from 'firebase/firestore'; // Funções do Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Função para criar usuário no Firebase Authentication
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './cadastro.css';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setMessage('Erro: As senhas não coincidem.');
      return;
    }

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salva os dados adicionais no Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid, // Salva o UID do usuário para referência futura
        email,
        nome,
        endereco,
        cpf,
        createdAt: new Date(),
      });

      setMessage('Usuário cadastrado com sucesso!');
      navigate('/cadastropdois'); // Redireciona para a tela de cadastropdois
    } catch (error) {
      setMessage(`Erro ao cadastrar usuário: ${error.message}`);
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        {message && <p className="feedback-message">{message}</p>}
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <button type="submit">Prosseguir</button>
      </form>
    </div>
  );
}

export default Cadastro;