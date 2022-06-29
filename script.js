let pag1 = document.querySelector('.paginaQuizz');
var tituloValue=undefined;
var urlValue=undefined;
var qtdeValue=undefined;
var nivelValue=undefined;

function paginaComeco(){
pag1.innerHTML += `<div class="topo"><h1>BuzzQuizz</h1></div>
                    <div class="enunciado"><h2>Comece pelo começo</h2></div>
                    <div class="caixaPerguntas">
                    <input id="titulo" placeholder="Titulo do seu quizz">
                    <input id="url" placeholder="URL da imagem do seu quizz">
                    <input id="qtde" placeholder="Quantidade de perguntas do quizz">
                    <input id="nivel" placeholder="Quantidade de níveis do quizz">
                    </div>
                    <div class="rodape">
                    <button onclick="capturarInfosComeco(this)"><h1>Prosseguir para criar perguntas</h1></button>
                    </div>`
}
               
function paginaPerguntas(){
    pag1.innerHTML="";
    pag1.innerHTML += `<div class="topo"><h1>BuzzQuizz</h1></div>
                        <div class="enunciado"><h2>Crie suas perguntas</h2></div>
                        <div class="caixaPerguntas">`;

    for(let i=1; i<=qtdeValue;i++){
        pag1.innerHTML += `
                        <h2>Pergunta ${i}</h2>
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
                        </div>`
            }
                  pag1.innerHTML +=     `<div class="rodape">
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

function capturarInfosComeco(){
    console.log("oi");
    tituloValue = document.getElementById("titulo").value;
    urlValue = document.getElementById("url").value;
    qtdeValue = document.getElementById("qtde").value;
    nivelValue = document.getElementById("nivel").value;
  
    if(tituloValue.length<20 || tituloValue>65){
        alert("Titulo deve ter entre 20 e 65 caracteres");
        paginaComeco();
    }

    else if(qtdeValue<3){
        alert("Quantidade mínima de perguntas é 3");
        paginaComeco();
    }

    else if(nivelValue<2){
        alert("Quantidade mínima de níveis é 2");
        paginaComeco();
    }

    else if(validarURL(urlValue)===false){
        alert("Insira uma URL valida");
        paginaComeco();
    }
    else{
        console.log("oi");
    paginaPerguntas();
}}

function validarURL(urlValue){
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    if (urlregex.test(urlValue)) {
        return (true);
    }
    return (false);
}

paginaComeco();
//paginaNiveis();
//paginaPronto();
