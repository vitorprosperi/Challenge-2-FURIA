import React, { useState } from 'react';
import { db, auth } from '../firebaseconnection'; // Importa o Firestore e o Firebase Authentication
import { collection, addDoc } from 'firebase/firestore'; // Funções do Firestore
import perguntasData from '../perguntas.json'; // Importa o JSON com as perguntas
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './cadastro.css';

function CadastroPDois() {
  const [respostas, setRespostas] = useState({}); // Armazena as respostas do usuário
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  // Função para lidar com a seleção de uma opção
  const handleSelect = (pergunta, opcao) => {
    setRespostas((prevRespostas) => ({
      ...prevRespostas,
      [pergunta]: opcao
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtém o UID do usuário autenticado
      const user = auth.currentUser;
      if (!user) {
        setMessage('Erro: Usuário não autenticado.');
        return;
      }

      // Salva as respostas no Firestore, vinculadas ao UID do usuário
      await addDoc(collection(db, 'user_respostas'), {
        uid: user.uid, // Vincula as respostas ao UID do usuário
        respostas,
        createdAt: new Date(),
      });

      setMessage('Respostas salvas com sucesso!');
      navigate('/doc'); // Redireciona para a tela doc.js
    } catch (error) {
      setMessage(`Erro ao salvar respostas: ${error.message}`);
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Cadastro - Parte 2</h2>
        {message && <p className="feedback-message">{message}</p>}
        {perguntasData.perguntas.map((pergunta, index) => (
          <div key={index} className="form-group">
            <h3>{pergunta.titulo}</h3>
            <div className="opcoes-container">
              {pergunta.opcoes.map((opcao, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`opcao-btn ${
                    respostas[pergunta.titulo] === opcao ? 'selecionado' : ''
                  }`}
                  onClick={() => handleSelect(pergunta.titulo, opcao)}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Prosseguir</button>
      </form>
    </div>
  );
}

export default CadastroPDois;