let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * 10) + 1;
}

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  if (campo) campo.innerHTML = texto;
  // Corrigido: nome correto da biblioteca
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.3 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'O jogo do número secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

function verificarChute() {
  let input = document.querySelector('input');
  if (!input) return;

  let chuteStr = input.value.trim();
  if (chuteStr === '') {
    exibirTextoNaTela('p', 'Por favor, digite um número.');
    return;
  }

  let chute = parseInt(chuteStr, 10);
  if (isNaN(chute)) {
    exibirTextoNaTela('p', 'Insira um número válido.');
    return;
  }

  if (chute === numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);

    // habilita o botão reiniciar
    const btn = document.getElementById('reiniciar');
    if (btn) btn.disabled = false;
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
    }
    tentativas++;
    limparCampo();
  }
}

function limparCampo() {
  let input = document.querySelector('input');
  if (input) {
    input.value = '';
    input.focus();
  }
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  const btn = document.getElementById('reiniciar');
  if (btn) btn.disabled = true; // propriedade correta
}
