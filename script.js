// Enviar mensagem para o Discord via API
async function enviarMensagem() {
    const input = document.getElementById('mensagem');
    const texto = input.value;
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
    const chat = document.getElementById('chat');
    chat.innerHTML = ''; // limpa e reexibe tudo

    msgs.forEach(m => {
        const p = document.createElement('p');
        p.textContent = `[${m.hora}] ${m.autor}: ${m.texto}`;
        chat.appendChild(p);
    });

    chat.scrollTop = chat.scrollHeight; // descer sempre para a última mensagem
}

// Atualiza a cada 2 segundos
setInterval(atualizarMensagens, 2000);