const axios = require('axios').default;
const dotenv = require('dotenv');
dotenv.config({ path: ".env.local" });

const baseURL = 'https://api.aimlapi.com';
const apiKey = process.env.AIML_API_KEY;

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

const main = async () => {
  try {
    const fileUrl = 'https://utfs.io/f/21e280ae-cffb-44f9-a6df-35b65200132d-2487m.mp3';
    console.log('Enviando el archivo a AIML para transcripción...');
    
    const response = await api.post('/stt', {
      model: '#g1_whisper-large',
      url: fileUrl,  // Enviando la URL del archivo directamente
    });

    console.log('Transcripción:', response.data.results.channels[0].alternatives[0].transcript);
  } catch (error) {
    if (error.response) {
      console.error('Error en la API:', error.response.data);
    } else {
      console.error('Error de conexión:', error.message);
    }
  }
};

main();
