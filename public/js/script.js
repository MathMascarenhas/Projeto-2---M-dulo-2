const closemensagem = document.querySelector('#close');
const mensagem = document.querySelector('#mensagem');

closemensagem.addEventListener("click",() => {
    mensagem.style.display = "none";
});

setTimeout(() => {
    mensagem.style.display = "none";
}, 8000);