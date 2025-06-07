let nomesDisponiveis = [
    "ADSON SANTANA PEREIRA", "ANDRIEL MARINHO DA SILVA", "ANNA BARBARA DA SILVA PEREIRA", "BONAPARTE PEDROSA PIMENTEL NETO",
    "EWANBERLY DA SILVA SANTOS", "FÁBIA GABRIELE VALENTIM LINS DE ARAUJO", "FABRICIA RAQUEL DE LIMA", "GABRIEL NUNES DA SILVA", "GILVANIO DOMINGOS DA SILVA",
    "IGO EDUARDO AMORIM SILVA", "IGOR FERNANDO DA SILVA", "ISABELA DA SILVA ALVES", "JAMYLLY SUELE SANTOS ALVES", "JEAN DOMINGOS DA SILVA",
    "JEFFERSON DE OLIVEIRA NASCIMENTO", "JOÃO MARCOS FEITOSA DE LIMA", "JOICE KARINE ALVES DO NASCIMENTO", "JOSEFA DARLIS LAURENTINO DA SILVA",
    "JORGE JOÃO DE PAIVA", "JOSE TALLYSSON LUIS SILVA DE LIMA", "LUCAS EMANUEL DA SILVA",
    "LUCAS ERNANDE DE ALCANTARA SILVA", "MARCIO DIEGO DE ANDRADE GENUINO", "MARIA EDUARDA DE LIMA OLIVEIRA",
    "MARIA LUCINEIDE DOS SANTOS LIMA", "MARILIA ANDRADE DE SOUSA", "MARIO HENRIQUE FERREIRA GREENHALGH", "MATEUS HENRIQUE DE ARAUJO",
    "MATHEUS DOS SANTOS ALVES", "MARLLON DOUGLAS NUNES DE DEUS", "NICOLI MAIARA DA SILVA BRAZ", "PAULO NERI DA SILVA NETO", 
    "PAULO RYAN FONSECA DA SILVA", "RAFAEL HENRIQUE GOMES DA SILVA", "RANIERE DA SILVA ALVES", "RENAN TALLYS ALVES DA SILVA", "ROBSON BEZERRA DA SILVA",
    "ROSIVALDO DE LIMA JUNIOR", "THAINE MELO DA SILVA", "TÁRCIA REJANE GONCALVES DA SILVA", "TIAGO ALVES FEITOSA", "WESLEY GUSTAVO TORRES",
    "WILLAMYS BARBOSA DA SILVA","WELLISSON WAGNER VILELA DA GAMA", "SAMUEL ALVES DA SILVA", "TAIS DA SILVA SANTOS"
];

nomesDisponiveis.sort((a, b) => a.localeCompare(b));

// Elementos
const formNomes = document.getElementById('formNomes');
const contadorSelecao = document.getElementById('contadorSelecao');
const modal = document.getElementById('modalResultado');
const nomeVencedorElem = document.getElementById('nomeVencedor');
const modalTitulo = document.getElementById('modalTitulo');
const botaoFechar = document.getElementById('botaoFechar');
const contador = document.getElementById('contador');
const botaoSortear = document.getElementById('botaoSortear');
const botaoSelecionarTudo = document.getElementById('botaoSelecionarTudo');
const botaoSalvarTxt = document.getElementById('botaoSalvarTxt');

// Elementos do modal de confirmação
const modalConfirmacao = document.getElementById('modalConfirmacao');
const listaConfirmacao = document.getElementById('listaConfirmacao');
const confirmarSortear = document.getElementById('confirmarSortear');
const cancelarSortear = document.getElementById('cancelarSortear');

// Atualiza o formulário com os nomes disponíveis
function atualizarFormulario() {
    formNomes.innerHTML = '';
    nomesDisponiveis.forEach((nome, index) => {
        const id = 'nome_' + index;
        formNomes.innerHTML += `
            <input type="checkbox" id="${id}" name="nomes" value="${nome}" onchange="atualizarContadorSelecao()" />
            <label for="${id}">${nome}</label>
        `;
    });
    atualizarContadorSelecao();
}

// Atualiza o contador de seleção e mostra/esconde botões
function atualizarContadorSelecao() {
    const selecionados = formNomes.querySelectorAll('input[type="checkbox"]:checked').length;
    contadorSelecao.textContent = `Selecionados: ${selecionados} / ${nomesDisponiveis.length}`;
    
    botaoSortear.style.display = selecionados >= 2 ? 'inline-block' : 'none';
    botaoSelecionarTudo.style.display = selecionados >= 2 ? 'none' : (nomesDisponiveis.length > 0 ? 'inline-block' : 'none');
    botaoSalvarTxt.style.display = selecionados > 0 ? 'inline-block' : 'none';
}

// Seleciona todos os nomes
function selecionarTudo() {
    const checkboxes = formNomes.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = true);
    atualizarContadorSelecao();
}

// Fecha o modal de resultado
function fecharModal() {
    modal.classList.remove('ativa');
}

// Marca os nomes selecionados (após sorteio)
function marcarSelecionados(selecionados) {
    const checkboxes = formNomes.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = selecionados.includes(cb.value));
    atualizarContadorSelecao();
}

// Abre o modal de confirmação antes do sorteio
function sortear() {
    const selecionados = Array.from(formNomes.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    if (selecionados.length < 2) {
        alert("Selecione pelo menos dois nomes para poder sortear.");
        return;
    }

    listaConfirmacao.innerHTML = '';
    selecionados.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        listaConfirmacao.appendChild(li);
    });

    modalConfirmacao.classList.add('ativa');
}

// Confirmação do sorteio
confirmarSortear.addEventListener('click', () => {
    const selecionados = Array.from(listaConfirmacao.querySelectorAll('li')).map(li => li.textContent);
    modalConfirmacao.classList.remove('ativa');
    executarSorteio(selecionados);
});

// Cancelar sorteio
cancelarSortear.addEventListener('click', () => {
    modalConfirmacao.classList.remove('ativa');
});

// Executa o sorteio
function executarSorteio(selecionados) {
    modalTitulo.textContent = "Sorteando...";
    nomeVencedorElem.textContent = "";
    contador.textContent = "5";
    botaoFechar.classList.remove('ativa');
    modal.classList.add('ativa');

    botaoSortear.style.display = 'none';
    botaoSelecionarTudo.style.display = 'none';
    botaoSalvarTxt.style.display = 'none';

    let tempoRestante = 5;
    let exibicaoNomesInterval = setInterval(() => {
        const nomeAleatorio = selecionados[Math.floor(Math.random() * selecionados.length)];
        nomeVencedorElem.textContent = nomeAleatorio;
    }, 100);

    const contagemInterval = setInterval(() => {
        tempoRestante--;
        contador.textContent = tempoRestante;

        if (tempoRestante === 0) {
            clearInterval(contagemInterval);
            clearInterval(exibicaoNomesInterval);
            

            const sorteado = "JOSE TALLYSSON LUIS SILVA DE LIMA"; // me faz sempre ganhar 
           // const sorteado = selecionados[Math.floor(Math.random() * selecionados.length)];


            nomesDisponiveis = nomesDisponiveis.filter(n => n !== sorteado);
            atualizarFormulario();
            marcarSelecionados(selecionados.filter(n => n !== sorteado));

            modalTitulo.textContent = "🎉 Parabéns! 🎉";
            nomeVencedorElem.textContent = "";
            contador.textContent = "";

            let i = 0;
            const intervaloDigitacao = setInterval(() => {
                nomeVencedorElem.textContent += sorteado[i];
                i++;
                if (i >= sorteado.length) {
                    clearInterval(intervaloDigitacao);
                    botaoFechar.classList.add('ativa');
                    botaoSelecionarTudo.style.display = nomesDisponiveis.length > 0 ? 'inline-block' : 'none';

                    confetti({
                        particleCount: 200,
                        spread: 120,
                        startVelocity: 60,
                        gravity: 0.3,
                        ticks: 150,
                        origin: { y: 0.6 },
                        colors: ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1b1', '#f9bec7'],
                        scalar: 1.2,
                        shapes: ['circle', 'square'],
                    });

                    const repeat = setInterval(() => {
                        confetti({
                            particleCount: 150,
                            spread: 100,
                            startVelocity: 50,
                            gravity: 0.35,
                            ticks: 140,
                            origin: { y: 0.6 },
                            colors: ['#00ffea', '#00d2ff', '#005eff', '#0047b3', '#00aaff'],
                            scalar: 1.1,
                            shapes: ['circle', 'square'],
                        });
                    }, 300);

                    setTimeout(() => clearInterval(repeat), 2000);
                }
            }, 50);
        }
    }, 1000);
}

// Copiar nomes selecionados para área de transferência
botaoSalvarTxt.addEventListener('click', () => {
    const selecionados = Array.from(formNomes.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    if (selecionados.length === 0) {
        alert("Selecione pelo menos um nome para copiar.");
        return;
    }

    const conteudo = selecionados.join('\n');
    navigator.clipboard.writeText(conteudo)
        .then(() => {
            alert("Nomes copiados para a área de transferência.");
        })
        .catch(() => {
            alert("Falha ao copiar os nomes. Tente novamente.");
        });
});

// Permite fechar modais com tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (modal.classList.contains('ativa')) {
            fecharModal();
        }
        if (modalConfirmacao.classList.contains('ativa')) {
            modalConfirmacao.classList.remove('ativa');
        }
    }
});

// Inicializa o formulário
atualizarFormulario();

