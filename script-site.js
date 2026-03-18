// Pega elementos
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');

// Enviar mensagem para Node.js
async function enviarMensagem() {
    const texto = input.value.trim();
    if (!texto) return;

    await fetch('http://localhost:3000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto, autor: 'Você' })
    });

    input.value = '';
}

// Atualizar chat do site
async function atualizarMensagens() {
    const res = await fetch('http://localhost:3000/receive');
    const msgs = await res.json();

    messagesDiv.innerHTML = ''; // limpa mensagens

    msgs.forEach(m => {
        const p = document.createElement('p');
        p.innerHTML = `<span class="author">[${m.origem}] ${m.autor}:</span> ${m.texto}`;
        messagesDiv.appendChild(p);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight; // descer para última mensagem
}

// Eventos
sendBtn.addEventListener('click', enviarMensagem);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensagem();
});

// Atualiza a cada 2s
setInterval(atualizarMensagens, 2000);