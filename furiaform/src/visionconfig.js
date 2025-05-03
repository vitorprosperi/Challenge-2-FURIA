async function analisarImagem(base64Image) {
  try {
    const response = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCySQSI2hkshhFsb9XhHmsG01Y-5uaBr_w',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image, // base64 SEM "data:image/...," no início
              },
              features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (
      data.responses &&
      data.responses[0] &&
      data.responses[0].fullTextAnnotation
    ) {
      const textoDetectado = data.responses[0].fullTextAnnotation.text;
      console.log('Texto detectado:', textoDetectado);
      return textoDetectado; // Retorna o texto detectado
    } else {
      console.warn('Nenhum texto detectado na imagem.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao analisar a imagem:', error);
    throw error; // Repassa o erro para ser tratado em outro lugar, se necessário
  }
}

export default analisarImagem;
