let quizzObj;
let idQuizz;
let numQuizzes = 0;
let respostasDadas = 0;
let respostasCorretas = 0;

const paginaBase = document.querySelector(".paginaQuizz");

function atualizarPagina(){
    document.location.reload();
}

function carregarPaginaInicial(){

    paginaBase.innerHTML = "";

    paginaBase.innerHTML = `    <div>
                                    <div class="meusQuizzes">
                                        <h3>Você não criou nenhum</br>quizz ainda :(</h3> 
                                        <button onclick="paginaComeco()">Criar Quizz</button>
                                    </div>
                                </div>
                                <div class="todosQuizzes">
                                    <h1>Todos os Quizzes</h1>
                                    <div class="quizzes"></div>
                                </div>`

    carregarQuizzes();
}

function carregarQuizzes(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
    promise.then(renderizarQuizzes);
    promise.catch(alertaErro);
}

function renderizarQuizzes(obj){
    let array = obj.data;
    numQuizzes = array.length;

    let divMeusQuizzes = document.querySelector(".meusQuizzes");
    let divPaiMeusQuizzes = divMeusQuizzes.parentElement;
    let divTodosQuizzes = document.querySelector(".todosQuizzes div");

    for (let i = 0; i < numQuizzes; i++){
        
        let quizz = array[i];

        if (validarIdUsuario(quizz.id)){

            if (document.querySelector(".meusQuizzes") !== null){

                divPaiMeusQuizzes.innerHTML = ` <div class="todosQuizzes">
                                                    <span>
                                                        <h1>Seus Quizzes</h1>
                                                        <ion-icon name="add-circle"
                                                        onclick="paginaComeco()"
                                                        class="botaoAdicionar"></ion-icon>
                                                    </span>
                                                    <div class="quizzes"></div>
                                                </div>`

                divMeusQuizzes = divPaiMeusQuizzes.querySelector(".quizzes");
            }

            let html =  `   <div class="quizz"
                            style="background-image: url('${quizz.image}');"
                            onclick="carregarQuizz(${quizz.id})">
                                <div>${quizz.title}</div>
                            </div>`;

            divMeusQuizzes.innerHTML += html;

        } else {

            let html =  `   <div class="quizz"
                            style="background-image: url('${quizz.image}');"
                            onclick="carregarQuizz(${quizz.id})">
                                <div>${quizz.title}</div>
                            </div>`;

            divTodosQuizzes.innerHTML += html;
        
        }
    }
}

function validarIdUsuario(id){
    
    let idQuizzUsuario = JSON.parse(localStorage.getItem('idQuizzes'));

    let boolean = false;

    if(idQuizzUsuario!==null){
    for (let i = 0; i < idQuizzUsuario.length; i++){
        if (id === idQuizzUsuario[i].id){
            boolean = true;
        }
    }}

    return boolean;
}

function alertaErro(obj){
    let id = obj.status
    console.log(`Erro ${id}`);
    alert(`Erro ${id}`);
}

function carregarQuizz(id){
    idQuizz = id;
    let promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`);
    promise.then(renderizarQuizz);
    promise.catch(alertaErro);
}

function renderizarQuizz(obj){

    window.scrollTo(0, 0);
    respostasDadas = 0;
    respostasCorretas = 0;

    quizzObj = obj;

    paginaBase.innerHTML = "";

    paginaBase.innerHTML = `    <div class="banner" style="background-image: url('${quizzObj.data.image}');"> 
                                    <div>
                                        <h1>${quizzObj.data.title}</h1>
                                    </div>
                                </div>`;

    let perguntas = quizzObj.data.questions;
    
    for (let i = 0; i < perguntas.length; i++){

        let pergunta = perguntas[i]

        paginaBase.innerHTML += `   <div class="pergunta">
                                        <div class="titulo-pergunta" style="background-color: ${pergunta.color};">${pergunta.title}</div>
                                        <div class="resposta-pergunta" data-id="${i}"></div>
                                    </div>`;
      
        let divRespostas = document.querySelector(`[data-id="${i}"]`);
        let respostas = pergunta.answers;

        respostas.sort(comparador);

        for (let i = 0; i < respostas.length; i++){

            let resposta = respostas[i];

            divRespostas.innerHTML += ` <div class="resposta-${resposta.isCorrectAnswer}"
                                        onclick = "selecionarResposta(this)">
                                            <img src="${resposta.image}">
                                            <h2>${resposta.text}</h2>
                                        </div>`
        }


    }

}

function selecionarResposta(divSelecionada) {
    let listaRespostas = divSelecionada.parentElement.querySelectorAll("div");

    if (divSelecionada.classList[0] === "resposta-true") {
        respostasCorretas += 1;
    }
    respostasDadas += 1;


    for (let i = 0; i < listaRespostas.length; i++){
        let divAnalisada = listaRespostas[i]
        divAnalisada.removeAttribute("onclick");

        let resposta = divAnalisada.classList;

        if (resposta[0] === "resposta-true") {
            divAnalisada.classList.remove("resposta-true");
            divAnalisada.classList.add("cor-true");
            
        } else {
            divAnalisada.classList.remove("resposta-false");
            divAnalisada.classList.add("cor-false");
        }

        if (divAnalisada !== divSelecionada){
            divAnalisada.classList.add("filtroBranco")
        }
    }

    setTimeout(proximaPergunta, 2000, divSelecionada);
}

function proximaPergunta(divAtual){

    let pergunta = divAtual.parentElement.parentElement

    if(pergunta.nextElementSibling !== null){
        pergunta.nextElementSibling.scrollIntoView({ behavior: 'smooth', block: "center"})
    } else {
        calcularResultado();
        document.querySelector(".resultado").scrollIntoView({ behavior: 'smooth', block: "center"});
    }
}

function calcularResultado() {

    let levels = quizzObj.data.levels;
    let pontuacao = ((respostasCorretas/respostasDadas)*100).toFixed(0);
    let idLevelAlcancado = 0

    levels.sort(organizarLevel);

    for (let i = 0; i < levels.length; i++) {
        if (pontuacao > levels[i].minValue){
            idLevelAlcancado = i
        }
    }

    let objLevelAlcancado = levels[idLevelAlcancado];

    renderizarResultado(objLevelAlcancado);
}

function renderizarResultado(obj){

    let divResultado = `    <div class="resultado">
                                <div class="titulo-resultado" style="background-color: #EC362D;">${obj.title}</div>
                                <span>
                                    <img src="${obj.image}" class="imagem-resultado">
                                    <h2>${obj.text}</h2>
                                </span>
                            </div>`;

    paginaBase.innerHTML += divResultado;

    let botoes = `  <div class="botoes">
                        <button class="reiniciarQuizz" onclick="carregarQuizz(${idQuizz})">Reiniciar o Quizz</button>
                        <button class="reiniciarPagina" onclick="atualizarPagina()">Voltar pra home</button>
                    </div>`

    paginaBase.innerHTML += botoes;
}

function organizarLevel(a, b) {
    if (a.minValue < b.minValue){
        return -1;
    } else {
        return 1;
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

carregarPaginaInicial();

//FUNÇÃO PARA CARREGAR UM OBJETO DE QUIZZ SEMPPRE

function AUX (id) {
    let promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${id}`);
    promise.then(obj => console.log(obj.data))
}

AUX (1);