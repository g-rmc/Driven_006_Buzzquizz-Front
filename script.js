function paginaComeco(){

let pag1 = document.querySelector('.paginaQuizz');
pag1.innerHTML += `<div class="topo"><h1>BuzzQuizz</h1></div>
                    <div class="enunciado"><h2>Comece pelo começo</h2></div>
                    <div class="caixaPerguntas">
                    <input id="campo1" class="c-titulo" placeholder="Titulo do seu quizz">
                    <input id="campo1" placeholder="URL da imagem do seu quizz">
                    <input id="campo3" placeholder="Quantidade de perguntas do quizz">
                    <input id="campo4" placeholder="Quantidade de níveis do quizz">
                    </div>
                    <div class="rodape">
                    <button onclick="validarDados(this)"><h1>Prosseguir para criar perguntas</h1></button>
                    </div>`
}

function paginaPerguntas(){
    let pag2 = document.querySelector('.paginaQuizz');
    pag2.innerHTML += `<div class="topo"><h1>BuzzQuizz</h1></div>
                        <div class="enunciado"><h2>Crie suas perguntas</h2></div>
                        <div class="caixaPerguntas">
                        <h2>Pergunta 1</h2>
                        <input id="campo1" placeholder="Texto da pergunta">
                        <input id="campo2" placeholder="Cor de fundo da pergunta">
                        <h2>Resposta Correta</h2>
                        <input id="campo1" placeholder="Resposta correta">
                        <input id="campo2" placeholder="URL da imagem">
                       
                        <h2>Resposta Incorreta</h2>
                        <input id="campo1" placeholder="Resposta incorreta 1">
                        <input id="campo2" placeholder="URL da imagem 1">

                        <input id="campo1" placeholder="Resposta incorreta 2">
                        <input id="campo2" placeholder="URL da imagem 2">

                        <input id="campo1" placeholder="Resposta incorreta 3">
                        <input id="campo2" placeholder="URL da imagem 3">
                        </div>
                        <div class="rodape">
                    <button onclick="validarDados(this)"><h1>Prosseguir para criar níveis</h1></button>
                    </div>`
}

function paginaNiveis(){
    let pag3 = document.querySelector('.paginaQuizz');
    pag3.innerHTML += `<div class="topo"><h1>BuzzQuizz</h1></div>
                        <div class="enunciado"><h2>Agora,decida os níveis!</h2></div>
                        <div class="caixaPerguntas">
                        <h2>Nível 1</h2>
                        <input id="campo1" placeholder="Título do nível">
                        <input id="campo1" placeholder="% de acerto mínima">
                        <input id="campo1" placeholder="URL da imagem do nível">
                        <input id="campo5" placeholder="Descrição do nível">
                        </div>
                        <div class="rodape">
                    <button onclick="validarDados(this)"><h1>Finalizar quiz</h1></button>
                    </div>`
}

function paginaPronto(){
    let pag4 = document.querySelector('.paginaQuizz');
    pag4.innerHTML += `<div class="topo"><h1>BuzzQuizz</h1></div>
                        <div class="enunciado"><h2>Seu quiz esta pronto!</h2></div>
                        <div class="caixaPerguntas">
                    </div>
                        <div class="rodape">
                    <button onclick="validarDados(this)"><h1>Acessar quizz</h1></button>
                   <div><h1>Voltar para home</h1></div>
                    </div>`
}


//paginaComeco();
paginaPerguntas();
//paginaNiveis();
//paginaPronto();
