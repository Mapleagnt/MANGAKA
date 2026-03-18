const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
require('dotenv').config();

const TOKEN = process.env.TOKEN;        // Token do bot
const CHANNEL_ID = 'ID_DO_CANAL_DO_DISCORD'; // ID do canal do Discord

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const app = express();
app.use(express.json());
const PORT = 3000;

// Histórico de mensagens
let messages = [];

// Bot Discord
client.on('ready', () => {
    console.log(`Bot logado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.channel.id === CHANNEL_ID) {
        messages.push({
            autor: message.author.username,
            texto: message.content,
            origem: 'discord',
            hora: new Date().toLocaleTimeString()
        });
        console.log(`[Discord] ${message.author.username}: ${message.content}`);
    }
});

client.login(TOKEN);

// API para receber mensagens do site
app.post('/send', async (req, res) => {
    const { texto, autor } = req.body;
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) return res.status(404).send('Canal não encontrado');

    await channel.send(`${autor}: ${texto}`);

    messages.push({
        autor,
        texto,
        origem: 'site',
        hora: new Date().toLocaleTimeString()
    });

    res.send('Mensagem enviada para Discord');
});

// API para enviar histórico para o site
app.get('/receive', (req, res) => {
    res.json(messages);
});

// Rodar servidor HTTP
app.listen(PORT, () => {
    console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
});