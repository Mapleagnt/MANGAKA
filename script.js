// ================= BOTÃO RANKING E SIDEBAR =================
const rankingBtn = document.getElementById('ranking-btn');
const sidebar = document.getElementById('ranking-sidebar');
const closeBtn = document.querySelector('.close-ranking');

// Abrir sidebar ao clicar no botão
rankingBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});

// Fechar sidebar
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// ================= TOGGLE LISTAS DE RANKING =================
function toggleList(id) {
    const list = document.getElementById(id);
    if (list.style.display === "block") {
        list.style.display = "none";
    } else {
        list.style.display = "block";
    }
}

// ================= LOGIN DISCORD =================
const token = localStorage.getItem("discord_token");

if (token) {
    fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: "Bearer " + token }
    })
    .then(res => res.json())
    .then(user => {
        // Cria um parágrafo com o nome do usuário
        const nome = document.createElement("p");
        nome.innerText = "Logado como: " + user.username;
        nome.style.color = "#4da6ff";
        nome.style.textAlign = "center";
        nome.style.margin = "10px 0";
        document.body.insertBefore(nome, document.body.firstChild);
    })
    .catch(err => console.error("Erro ao buscar usuário Discord:", err));
}

// ================= ANIMAÇÃO AO ROLAR =================
const scrollElements = document.querySelectorAll(".scroll");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = (element) => {
    element.classList.add("show");
};

const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener("scroll", handleScrollAnimation);