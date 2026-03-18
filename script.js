document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav a");

    // cria a barra ativa
    const activeBar = document.createElement("div");
    activeBar.classList.add("active-bar");
    document.querySelector("nav").appendChild(activeBar);

    function moveBar(link) {
        const rect = link.getBoundingClientRect();
        const navRect = link.parentElement.getBoundingClientRect();
        activeBar.style.width = rect.width + "px";
        activeBar.style.left = (rect.left - navRect.left) + "px";
    }

    // inicia a barra no link que tem class="active"
    const activeLink = document.querySelector("nav a.active") || navLinks[0];
    moveBar(activeLink);

    // movimenta a barra ao clicar
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            // remove active de todos
            navLinks.forEach(l => l.classList.remove("active"));
            // adiciona active ao clicado
            this.classList.add("active");
            // move a barra
            moveBar(this);
            // NÃO colocamos preventDefault, o link vai navegar
        });
    });

    // opcional: move a barra ao redimensionar a janela
    window.addEventListener("resize", () => {
        const current = document.querySelector("nav a.active");
        if(current) moveBar(current);
    });
});
/* ================= RESPONSIVO ================= */
@media (max-width: 768px) {
    /* HEADER */
    header {
        flex-direction: column;
        text-align: center;
    }

    /* Menu */
    nav {
        gap: 15px;
        flex-wrap: wrap;
    }

    nav a {
        margin: 10px 5px 0 5px;
    }

    /* Títulos das seções */
    h3 {
        font-size: 24px;
    }

    /* Cards de personagens menores */
    .personagem-card {
        min-height: 140px;
        padding: 15px;
    }

    .personagem-card img {
        width: 150px;
        height: 150px;
    }
}

/* ================= REDES SOCIAIS ================= */
.social {
    text-align: center;
    margin: 50px 0;
}

.social h3 {
    color: #4da6ff;
    margin-bottom: 20px;
    font-size: 26px;
}

/* Container dos ícones */
.social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;  /* espaço entre os ícones */
    flex-wrap: nowrap; /* não quebra linha */
}

.social-icons a {
    display: inline-block;
    margin: 0 15px;
    transition: transform 0.3s, filter 0.3s, opacity 0.3s;
}

.social-icons img {
    width: 40px;   /* ícones menores */
    height: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    opacity: 0.7;
}

.social-icons a:hover img {
    transform: scale(1.2) translateY(-3px);
    box-shadow: 0 0 20px #4da6ff, 0 0 35px #1a8cff;
    filter: brightness(1.5);
    opacity: 1;
}

/* ================= ANIMAÇÕES GLOBAIS ================= */
/* Flutuação suave para ícones e habilidades */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
}

/* Balanço + leve flutuação */
@keyframes floatSwing {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    20% { transform: translateY(-4px) rotate(-3deg); }
    40% { transform: translateY(-2px) rotate(2deg); }
    60% { transform: translateY(-4px) rotate(-2deg); }
    80% { transform: translateY(-2px) rotate(1deg); }
}

/* ================= MENU - BARRA ATIVA ================= */
nav {
    position: relative; /* necessário para posicionamento da active-bar */
}

/* Barra ativa atrás do link */
nav .active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;          /* altura da barra */
    width: 0;             /* ajustado via JS */
    background: #4da6ff;  /* azul neon */
    border-radius: 2px;
    transition: left 0.4s ease, width 0.4s ease;
    z-index: -1;
}

/* ================= LINKS DO MENU ================= */
nav a {
    position: relative;
    color: #ccc;
    text-decoration: none;
    font-weight: bold;
    padding: 5px 10px;
    transition: color 0.3s, opacity 0.3s, transform 0.3s;
    opacity: 0; /* animação de entrada */
    transform: translateY(8px);
    animation: menuEntranceSmooth 1.2s ease-out forwards;
}

nav a:nth-child(1) { animation-delay: 0.15s; }
nav a:nth-child(2) { animation-delay: 0.3s; }
nav a:nth-child(3) { animation-delay: 0.45s; }
nav a:nth-child(4) { animation-delay: 0.6s; }

@keyframes menuEntranceSmooth {
    0% {
        opacity: 0;
        transform: translateY(8px);
        text-shadow: 0 0 0 #4da6ff;
    }
    100% {
        opacity: 1;
        transform: translateY(0);
        text-shadow: 0 0 6px #4da6ff, 0 0 12px #1a8cff;
    }
}

/* Hover neon clássico */
nav a:hover {
    color: #4da6ff;
    text-shadow: 0 0 5px #4da6ff, 0 0 10px #1a8cff;
}

nav a::after {
    content: "";
    display: block;
    width: 0;
    height: 3px;
    background: #4da6ff;
    margin-top: 5px;
    border-radius: 2px;
    transition: width 0.3s;
}

nav a:hover::after {
    width: 100%;
}

/* ================= BOTÃO VOLTAR ================= */
.btn-voltar {
    margin-top: 80px; /* distância do card */
    display: inline-block;
}

/* ================= GERAL ================= */
/* Links nos cards de personagem */
.personagem-card a {
    text-decoration: none;
    color: inherit;
}

/* ================= TOOLTIP ================= */
.habilidades li .tooltip {
    visibility: hidden;
    opacity: 0;
    width: 200px; /* largura do tooltip */
    background-color: rgba(20, 25, 40, 0.95);
    color: #fff;
    text-align: center;
    padding: 12px;
    border-radius: 10px;
    border: 2px solid #4da6ff;
    box-shadow: 0 0 15px rgba(77, 166, 255, 0.7), 0 0 25px rgba(26, 140, 255, 0.5);
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    z-index: 10;
    font-size: 14px;
    line-height: 1.4;
}

.habilidades li:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
}
<!-- Ranking HTML já existente -->
<div id="ranking-btn">
  <span></span>
  <span></span>
  <span></span>
</div>

<div id="ranking-sidebar">
  <!-- Conteúdo do ranking -->
</div>

<!-- Script que faz tudo funcionar -->
<script>
const rankingBtn = document.getElementById('ranking-btn');
const rankingSidebar = document.getElementById('ranking-sidebar');

// Abre ou fecha a sidebar
function toggleRanking() {
    if (rankingSidebar.style.left === '0px') {
        rankingSidebar.style.left = '-300px';
    } else {
        rankingSidebar.style.left = '0px';
    }
}

// Toggle para cada lista de ranking
function toggleList(id) {
    const list = document.getElementById(id);
    if (list.style.maxHeight && list.style.maxHeight !== '0px') {
        list.style.maxHeight = '0px';
        list.style.padding = '0 15px';
    } else {
        list.style.maxHeight = list.scrollHeight + 'px';
        list.style.padding = '5px 15px';
    }
}

// Evento do botão três pontinhos
rankingBtn.addEventListener('click', toggleRanking);
</script>
const rankingBtn = document.getElementById('ranking-btn');
const rankingSidebar = document.getElementById('ranking-sidebar');

// Abre ou fecha a sidebar
function toggleRanking() {
    if (rankingSidebar.style.left === '0px') {
        rankingSidebar.style.left = '-320px';
    } else {
        rankingSidebar.style.left = '0px';
    }
}

// Toggle para cada lista de ranking
function toggleList(id) {
    const list = document.getElementById(id);
    if (list.style.maxHeight && list.style.maxHeight !== '0px') {
        list.style.maxHeight = '0px';
        list.style.padding = '0 15px';
    } else {
        list.style.maxHeight = list.scrollHeight + 'px';
        list.style.padding = '5px 15px';
    }
}

// Evento do botão três pontinhos
rankingBtn.addEventListener('click', toggleRanking);
