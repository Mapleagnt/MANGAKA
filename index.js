// index.js (Node + Express)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let mensagens = []; // armazena mensagens do chat

// Endpoint para receber mensagens do site
app.post('/send', (req, res) => {
    const { texto, autor } = req.body;
    mensagens.push({ texto, autor, origem: 'Site' });
    res.sendStatus(200);
});

// Endpoint para enviar mensagens para o site
app.get('/receive', (req, res) => {
    res.json(mensagens);
});

// Iniciar servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));