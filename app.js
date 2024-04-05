let listaDeNumerosSorteados = [];
let limite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguse Female", {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela(`h1`, `Jogo do número secreto`);
    exibirTextoNaTela(`p`, `Escolha um número entre 1 e ${limite}`);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector(`input`).value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1? `tentativas` : `tentativa`
        exibirTextoNaTela(`h1`, `Acertou!`);
        let mensagem = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela(`p`, mensagem);
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    }else if(chute > numeroSecreto){
        exibirTextoNaTela(`p`, `O número secreto é menor do que ${chute}`);
    }else{
        exibirTextoNaTela(`p`, `O número secreto é maior do que ${chute}`);
    }
    tentativas++;
    limparCampo();
}

function gerarNumAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == limite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector(`input`);
    chute.value = ``;
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById(`reiniciar`).setAttribute(`disabled`, true);
}