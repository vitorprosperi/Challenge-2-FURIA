import React, { useState } from 'react';
import './doc.css';
import analisarImagem from '../visionconfig'; // Importa a função para análise da imagem

function Doc() {
  const [documentType, setDocumentType] = useState(''); // Tipo de documento escolhido
  const [message, setMessage] = useState(''); // Mensagem de status
  const [files, setFiles] = useState({}); // Armazena os arquivos selecionados

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result.split(',')[1]; // Remove o prefixo "data:image/..."
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: base64Image, // Salva a imagem em Base64
      }));
    };

    reader.readAsDataURL(selectedFiles[0]);
  };

  const validarDocumento = (textoExtraido, tipoDocumento, lado) => {
    // Converte o texto extraído para letras minúsculas
    const textoNormalizado = textoExtraido.toLowerCase();

    if (tipoDocumento === 'CNH') {
      if (lado === 'frente') {
        // Validações específicas para a frente da CNH
        if (!textoNormalizado.includes('carteira nacional de habilitação')) {
          return 'Erro: Frente da CNH inválida. Não foi encontrada a frase "Carteira Nacional de Habilitação".';
        }
        if (!textoNormalizado.match(/\d{11}/)) {
          return 'Erro: Frente da CNH inválida. Não foi encontrado um número de registro válido (11 dígitos).';
        }
        return 'CNH válida (frente)';
      } else if (lado === 'verso') {
        // Validações específicas para o verso da CNH
        if (!textoNormalizado.includes('assinatura') && !textoNormalizado.includes('código de barras')) {
          return 'Erro: Verso da CNH inválido. Não foram encontrados "Assinatura" ou "Código de barras".';
        }
        return 'CNH válida (verso)';
      }
    } else if (tipoDocumento === 'RG') {
      if (lado === 'frente') {
        // Validações específicas para a frente do RG
        if (!textoNormalizado.includes('registro geral') && !textoNormalizado.includes('rg')) {
          return 'Erro: Frente do RG inválida. Não foram encontrados "Registro Geral" ou "RG".';
        }
        if (!textoNormalizado.match(/\d{9}/)) {
          return 'Erro: Frente do RG inválida. Não foi encontrado um número de RG válido (9 dígitos).';
        }
        return 'RG válida (frente)';
      } else if (lado === 'verso') {
        // Validações específicas para o verso do RG
        if (!textoNormalizado.includes('órgão emissor') && !textoNormalizado.includes('assinatura')) {
          return 'Erro: Verso do RG inválido. Não foram encontrados "Órgão Emissor" ou "Assinatura".';
        }
        return 'RG válida (verso)';
      }
    }
    return 'Erro: Tipo de documento desconhecido ou lado não identificado.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('Enviando documentos para análise...');
      const resultados = [];

      // Analisa cada arquivo selecionado
      for (const [key, base64Image] of Object.entries(files)) {
        try {
          const textoExtraido = await analisarImagem(base64Image);

          // Exibe o texto extraído no console do navegador
          console.log(`Texto extraído (${key}):\n${textoExtraido}`);

          const lado = key.includes('Frente') ? 'frente' : 'verso';
          const resultadoValidacao = validarDocumento(textoExtraido, documentType, lado);

          // Exibe o resultado da validação no console do navegador
          console.log(`Resultado da validação (${key}): ${resultadoValidacao}`);

          resultados.push(`${key}: ${resultadoValidacao}`);
        } catch (error) {
          console.error(`${key}: Erro ao analisar o documento (${error.message})`);
        }
      }

      setMessage('Análise concluída com sucesso!');
    } catch (error) {
      console.error('Erro geral ao analisar documentos:', error);
      setMessage(`Erro geral ao analisar documentos: ${error.message}`);
    }
  };

  return (
    <div className="doc-container">
      <form className="doc-form" onSubmit={handleSubmit}>
        <h2>Envio de Documentos</h2>
        {message && <p className="feedback-message">{message}</p>}

        <div className="form-group">
          <label htmlFor="documentType">Escolha o tipo de documento:</label>
          <select
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="CNH">CNH</option>
            <option value="RG">RG</option>
          </select>
        </div>

        {documentType === 'CNH' && (
          <>
            <div className="form-group">
              <label htmlFor="cnhFrente">CNH (Frente):</label>
              <input
                type="file"
                id="cnhFrente"
                name="cnhFrente"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnhVerso">CNH (Verso):</label>
              <input
                type="file"
                id="cnhVerso"
                name="cnhVerso"
                onChange={handleFileChange}
              />
            </div>
          </>
        )}

        {documentType === 'RG' && (
          <>
            <div className="form-group">
              <label htmlFor="rgFrente">RG (Frente):</label>
              <input
                type="file"
                id="rgFrente"
                name="rgFrente"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rgVerso">RG (Verso):</label>
              <input
                type="file"
                id="rgVerso"
                name="rgVerso"
                onChange={handleFileChange}
              />
            </div>
          </>
        )}

        <button type="submit">Enviar Documentos</button>
      </form>
    </div>
  );
}

export default Doc;