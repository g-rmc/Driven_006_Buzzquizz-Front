let pag1 = document.querySelector('.paginaQuizz');
let tituloValue=undefined;
let urlValue=undefined;
let qtdeValue=undefined;
let nivelValue=undefined;
let txtValue=undefined;
let corValue=undefined;
let corretaValue=undefined;
let corretaUrlValue=undefined;
let incorretaValue=undefined;
let incorretaUrlValue=undefined;
let contadorPerguntas=0;
let gabarito=undefined;
let respostas=[];
let questoes=[];
let niveis=[];

let txtNivelValue=undefined;
let tituloNivel=undefined;
let urlImagemNivel=undefined;
let urlImagemNivelValue=undefined;
let descricaoNivel=undefined;
let descricaoNivelValue=undefined;
let acertoPorcentagem=undefined;
let acertoPorcentagemNivelValue=undefined;

let quizzObjeto={
    title:"",
    image:"",
    questions:[],
    levels:[]
}

let levels={
    title:"",
    image:"",
    text:"",
    minValue:""
}

let questions=[{
            title:"",
            color:"",
            answers:[]
        }]

let answers=[{
        text:"",
        image:"",
        isCorrectAnswer:""
    }]

function paginaComeco(){
    pag1.innerHTML = "";
    pag1.innerHTML += `
                    <div class="enunciado"><h2>Comece pelo começo</h2></div>
                    <div class="caixaPerguntas">
                        <input id="titulo" class="formatação" placeholder="Titulo do seu quizz">
                        <input id="url" class="formatação" placeholder="URL da imagem do seu quizz">
                        <input id="qtde" class="formatação"  placeholder="Quantidade de perguntas do quizz">
                        <input id="nivel" class="formatação" placeholder="Quantidade de níveis do quizz">
                    </div>
                    <div class="rodape">
                        <button onclick="capturarInfosComeco(this)"><h1>Prosseguir para criar perguntas</h1></button>
                    </div>`
}
               
function paginaPerguntas(){
    pag1.innerHTML="";
    pag1.innerHTML += `
                    <div class="enunciado"><h2>Crie suas perguntas</h2></div>`;

    for(let i=1; i<=qtdeValue;i++){
        contadorPerguntas++;
        pag1.innerHTML += `
                <div class="caixaPerguntas">
                    <div>
                        <h2>Pergunta ${i}</h2>
                        <input id="txtPergunta${i}" class="formatação" placeholder="Texto da pergunta">
                        <input id="corPergunta${i}" class="formatação" placeholder="Cor de fundo da pergunta">
                    </div>

                    <div>
                        <h2>Resposta Correta</h2>
                        <input id="respostaPergunta${i}" class="formatação" placeholder="Resposta correta">
                        <input id="urlPergunta${i}" class="formatação" placeholder="URL da imagem">
                    </div>
                    
                    <div>
                        <h2>Respostas Incorretas</h2>
                        <input id="respostaPergunta1${i}" class="formatação" placeholder="Resposta incorreta 1">
                        <input id="urlPergunta1${i}" class="formatação" placeholder="URL da imagem 1">

                        <div class="afastamento"></div>
                    
                        <input id="respostaPergunta2${i}" class="formatação" placeholder="Resposta incorreta 2">
                        <input id="urlPergunta2${i}" class="formatação" placeholder="URL da imagem 2">

                        <div class="afastamento"></div>

                        <input id="respostaPergunta3${i}" class="formatação" placeholder="Resposta incorreta 3">
                        <input id="urlPergunta3${i}" class="formatação" placeholder="URL da imagem 3">
                    </div>
                </div>`
    }
    
    pag1.innerHTML += ` <div class="rodape">
                            <button onclick="CapturarInfosPerguntas(this)"><h1>Prosseguir para criar níveis</h1></button>
                        </div>`
}

function paginaNiveis(){
    pag1.innerHTML = "";
    
    pag1.innerHTML+=`<div class="enunciado"><h2>Agora,decida os níveis!</h2></div>`
    for(let i=1; i<=nivelValue;i++){
    pag1.innerHTML += `
                    <div class="caixaPerguntas">
                        <h2>Nível ${i}</h2>
                        <input id="tituloNivel${i}" class="formatação" placeholder="Título do nível">
                        <input id="acertoPorcentagem${i}" class="formatação" placeholder="% de acerto mínima">
                        <input id="urlImagemNivel${i}" class="formatação" placeholder="URL da imagem do nível">
                        <input id="descricaoNivel${i}"class="descricaoNivelFormatacao"  placeholder="Descrição do nível">
                    </div>
                    `
    }
    pag1.innerHTML+=` <div class="rodape">
    <button onclick="CapturarInfosNiveis(this)"><h1>Finalizar quiz</h1></button>
    </div>`
}

function paginaPronto(){
    let pag4 = document.querySelector('.paginaQuizz');
    pag4.innerHTML += `
                    <div class="enunciado"><h2>Seu quiz esta pronto!</h2></div>
                    <div class="caixaPerguntas">
                    </div>
                    <div class="rodape">
                        <button onclick="validarDados(this)"><h1>Acessar quizz</h1></button>
                    <div><h1>Voltar para home</h1></div>
                    </div>`
}

function capturarInfosComeco(){
    tituloValue="Quais sao as capitais da america do sul?"
    //tituloValue = document.getElementById("titulo").value;
    quizzObjeto.title=tituloValue;
    urlValue="https://github.com/";
    //urlValue = document.getElementById("url").value;
    quizzObjeto.image=urlValue;
    qtdeValue=3;
    //qtdeValue = document.getElementById("qtde").value;
    nivelValue=3;
    //nivelValue = document.getElementById("nivel").value;
    validarInfosComeco();
}

function validarInfosComeco(){
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
    paginaPerguntas();
    }
}

function validarURL(urlValue){
    let urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    if (urlregex.test(urlValue)) {
        return (true);
    }
    return (false);
}

function CapturarInfosPerguntas(){
 
    for(let i=1;i<=contadorPerguntas;i++){
        let contRespostas=0;
        txtValue="Qual a capital do Brasil?"
        corValue="#bababa";
         //txtValue= document.getElementById(`txtPergunta${i}`).value;
        //corValue= document.getElementById(`corPergunta${i}`).value;
        if(validarTextoCorPergunta(txtValue,corValue)=== false){
            i=contadorPerguntas;
             paginaPerguntas();
        } 
        
        corretaValue="Brasilia";
        corretaUrlValue="https://on.fiap.com.br/local/nanocourses/index.php";
        //corretaValue = document.getElementById(`respostaPergunta${i}`).value;
        //corretaUrlValue= document.getElementById(`urlPergunta${i}`).value;
        gabarito=true;
        checkCorreta();
                
        incorretaValue="maringa"
        incorretaUrlValue="https://github.com/"
        //incorretaValue = document.getElementById(`respostaPergunta1${i}`).value; 
        //incorretaUrlValue= document.getElementById(`urlPergunta1${i}`).value;
        gabarito="false";
        if(checkIncorreta()===true)
           contRespostas++;

        incorretaValue="sao paulo"
        incorretaUrlValue="https://github.com/"
        //incorretaValue = document.getElementById(`respostaPergunta2${i}`).value;
        //incorretaUrlValue= document.getElementById(`urlPergunta2${i}`).value;
        gabarito="false";
        if(checkIncorreta()===true)
        contRespostas++;

        incorretaValue="ponta grossa"
        incorretaUrlValue="https://github.com/"
        //incorretaValue = document.getElementById(`respostaPergunta3${i}`).value;  
        //incorretaUrlValue= document.getElementById(`urlPergunta3${i}`).value;
        gabarito="false"; 
         if(checkIncorreta()===true)
           contRespostas++;

       if(validarNumeroRespostas(contRespostas)=== false){
        i=contadorPerguntas; paginaPerguntas();
       }

        let perguntaObjeto={
            title:txtValue,
            color:corValue,
            answers:respostas
        }
        respostas=[];
        questoes.push(perguntaObjeto);

}

paginaNiveis();
}

function CapturarInfosNiveis(){
    for(let i=1;i<=nivelValue;i++){

        txtNivelValue="Nivel facil";
        //txtNivelValue=document.getElementById(`tituloNivel${i}`).value;
        acertoPorcentagemNivelValue="80%";
        //acertoPorcentagemNivelValue=document.getElementById(`acertoPorcentagem${i}`).value;
       urlImagemNivelValue="https://www.w3schools.com/"
       // urlImagemNivelValue=document.getElementById(`urlImagemNivel${i}`).value;
        descricaoNivelValue="pppppppppppppppppppppppppppppppppppppp"
        //descricaoNivelValue=document.getElementById(`descricaoNivel${i}`).value;

        let niveisObjeto={
            title:txtNivelValue,
            image:urlImagemNivelValue,
            text:descricaoNivelValue,
            minValue:acertoPorcentagemNivelValue
        }
        niveis.push(niveisObjeto);

    }

        let quizzObjeto={
            title:tituloValue,
            image:urlValue,
            questions:questoes,
            levels: niveis
        }
        
    console.log(quizzObjeto);
}

function incorretaObjeto(incorretaValue,incorretaUrlValue,gabarito){

    let objetoIncorreto={
            text:incorretaValue,
            image:incorretaUrlValue,
            isCorrectAnswer:gabarito
    }
    respostas.push(objetoIncorreto)
    incorretaValue="";
    incorretaUrlValue="";
}

function objetoCorreto(corretaValue,corretaUrlValue,gabarito){
    let objetoCorreto={
        text:corretaValue,
        image:corretaUrlValue,
        isCorrectAnswer:gabarito
    }
    respostas.push(objetoCorreto)
    corretaValue="";
    corretaUrlValue="";
}

function validarNumeroRespostas(contRespostas){
    if(contRespostas<2){
        alert("Numero de respostas deve ser entre 2 e 4")
        respostas=questoes=quizzObjeto=[];
        return false;
    }
}

function validarTextoCorPergunta(txtValue,corValue){
console.log(txtValue);
    if(txtValue.length<20){
        alert("Texto da pergunta deve ter no mínimo 20 caracteres");
        return false;
    }

    const regex= /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
    if(regex.test(corValue)===false){
        alert("Cor de fundo: deve ser uma cor em hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)");
        return false;
    }
}

function checkCorreta(){
objetoCorreto(corretaValue,corretaUrlValue,gabarito);
        if(validarURL(corretaUrlValue)===false){
            alert("Insira uma URL valida");
        }
}

function checkIncorreta(){
 
    if(incorretaValue!=="" && incorretaUrlValue!==""){
        incorretaObjeto(incorretaValue,incorretaUrlValue,gabarito);
    }
        else{
            alert("Não pode ter resposta vazia");
            return false;
        }

    if(validarURL(incorretaUrlValue)===false){        
            alert("Insira uma URL valida");
            return false;
    }
    return true;
    }