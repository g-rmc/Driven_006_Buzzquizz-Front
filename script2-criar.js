let pag = document.querySelector('.paginaQuizz');
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
let contRespostas=0;
let gabarito=undefined;
let respostas=[];
let questoes=[];
let niveis=[];
let idQuizzUsuario=[];

let txtNivelValue=undefined;
let tituloNivel=undefined;
let urlImagemNivel=undefined;
let urlImagemNivelValue=undefined;
let descricaoNivel=undefined;
let descricaoNivelValue=undefined;
let acertoPorcentagem=undefined;
let acertoPorcentagemNivelValue=undefined;
let checkAcertoMin=100;

let quizzObjeto={title:"",image:"", questions:[], levels:[]}
let levels={title:"", image:"", text:"", minValue:""}
let questions=[{ title:"", color:"", answers:[] }]
let answers=[{ text:"", image:"", isCorrectAnswer:""  }]

function paginaComeco(){
    pag.innerHTML = "";
    pag.innerHTML += `
                    <div class="enunciado"><h2>Comece pelo começo</h2></div>
                    <div class="caixaPerguntas">
                        <input type="text" id="titulo" class="formatação" placeholder="Titulo do seu quizz">
                        <input type="url" id="url" class="formatação" placeholder="URL da imagem do seu quizz">
                        <input type="number" id="qtde" class="formatação"  placeholder="Quantidade de perguntas do quizz">
                        <input type="number" id="nivel" class="formatação" placeholder="Quantidade de níveis do quizz">
                    </div>
                    <div class="rodape">
                        <button onclick="capturarInfosComeco(this)"><h1>Prosseguir para criar perguntas</h1></button>
                    </div>`
}
               
function paginaPerguntas(){
    pag.innerHTML="";
    pag.innerHTML += `
                    <div class="enunciado"><h2>Crie suas perguntas</h2></div>`;

    for(let i=1; i<=qtdeValue;i++){
        contadorPerguntas++;
        pag.innerHTML += `
            <div class="perguntaBloco" onclick="removerBloco(${i})">
            <h2>Pergunta ${i}</h2>
            <ion-icon class="icone-exp" name="create-outline"></ion-icon>
            </div>
                <div class="pergunta${i} escondido">
                    <div class="caixaPerguntas">
                        <div>
                            <input type="text" id="txtPergunta${i}" class="formatação" placeholder="Texto da pergunta">
                            <input type="color" id="corPergunta${i}" class="formatação" placeholder="Cor de fundo da pergunta">
                        </div>
                        <div>
                            <h2>Resposta Correta</h2>
                            <input type="text" id="respostaPergunta${i}" class="formatação" placeholder="Resposta correta">
                            <input type="url" id="urlPergunta${i}" class="formatação" placeholder="URL da imagem">
                        </div>
                        
                        <div>
                            <h2>Respostas Incorretas</h2>
                            <input type="text" id="respostaPergunta1${i}" class="formatação" placeholder="Resposta incorreta 1">
                            <input type="url" id="urlPergunta1${i}" class="formatação" placeholder="URL da imagem 1">
                            <div class="afastamento"></div>
                        
                            <input type="text" id="respostaPergunta2${i}" class="formatação" placeholder="Resposta incorreta 2">
                            <input type="url" id="urlPergunta2${i}" class="formatação" placeholder="URL da imagem 2">
                            <div class="afastamento"></div>
                            
                            <input type="text" id="respostaPergunta3${i}" class="formatação" placeholder="Resposta incorreta 3">
                            <input type="url" id="urlPergunta3${i}" class="formatação" placeholder="URL da imagem 3">
                        </div>
                    </div>
                </div>`
    }
    
    pag.innerHTML += ` <div class="rodape">
                            <button onclick="CapturarInfosPerguntas(this)"><h1>Prosseguir para criar níveis</h1></button>
                        </div>`
}

function paginaNiveis(){
    pag.innerHTML = "";
    
    pag.innerHTML+=`<div class="enunciado"><h2>Agora,decida os níveis!</h2></div>`
    for(let i=1; i<=nivelValue;i++){
    pag.innerHTML += `
                <div class="nivelBloco" onclick="removerBlocoNivel(${i})">
                    <h2> Nível ${i} </h2>
                    <ion-icon class="icone-exp" name="create-outline"></ion-icon>
                </div>
                <div class="nivel${i} escondido">
                    <div class="caixaPerguntas">
                        <input type="text" id="tituloNivel${i}" class="formatação" placeholder="Título do nível">
                        <input type="number" id="acertoPorcentagem${i}" class="formatação" placeholder="% de acerto mínima">
                        <input type="url" id="urlImagemNivel${i}" class="formatação" placeholder="URL da imagem do nível">
                        <input type="text" id="descricaoNivel${i}"class="descricaoNivelFormatacao"  placeholder="Descrição do nível">
                    </div>
                </div>`
    }

    pag.innerHTML+=` <div class="rodape">
    <button onclick="CapturarInfosNiveis(this)"><h1>Finalizar quiz</h1></button>
    </div>`
}

function paginaPronto(obj){
    pag.innerHTML = "";
    pag = document.querySelector('.paginaQuizz');
    pag.innerHTML += `
                        <div class="enunciado"><h2>Seu quiz esta pronto!</h2></div>
                        <div class="caixaImagem" style="background-image: url('${urlValue}'">
                            <p>${tituloValue}</p>
                        </div>
                        <div class="rodape">
                            <button onclick="carregarQuizz(${obj.data.id})"><h1>Acessar quizz</h1></button>
                        <div><h1 onclick="atualizarPagina()">Voltar para home</h1></div>
                    </div>`
}

function capturarInfosComeco(){

    tituloValue = document.getElementById("titulo").value;
    quizzObjeto.title=tituloValue;

    urlValue = document.getElementById("url").value;
    quizzObjeto.image=urlValue;

    qtdeValue = document.getElementById("qtde").value;
    nivelValue = document.getElementById("nivel").value;

    validarInfosComeco();
}

function validarInfosComeco(){
    if(tituloValue.length<20 || tituloValue>65){
        alert("Titulo deve ter entre 20 e 65 caracteres");
        document.getElementById("titulo").value = '';
    }

    else if(validarURL(urlValue)===false){
        alert("Insira uma URL valida");
        document.getElementById("url").value = '';
    }

    else if(qtdeValue<3){
        alert("Quantidade mínima de perguntas é 3");
        document.getElementById("qtde").value = '';
    }

    else if(nivelValue<2){
        alert("Quantidade mínima de níveis é 2");
        document.getElementById("nivel").value ='';
    }

    else{
    paginaPerguntas();
    }
}

function validarURL(urlValue){
    let urlregex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (urlregex.test(urlValue)) {
        return (true);
    }
    return (false);
}

function CapturarInfosPerguntas(){
 
    for(let i=1;i<=contadorPerguntas;i++){
        contRespostas=0;

        txtValue= document.getElementById(`txtPergunta${i}`).value;
        corValue= document.getElementById(`corPergunta${i}`).value;
        
        if(validarTextoCorPergunta(txtValue,corValue,i)=== false){
            i=contadorPerguntas;
            document.getElementById(`txtPergunta${i}`).value = '';
            return;
        } 
        
        corretaValue = document.getElementById(`respostaPergunta${i}`).value;
        corretaUrlValue= document.getElementById(`urlPergunta${i}`).value;
        gabarito=true;
        if(checkCorreta(i) === false){
            document.getElementById(`respostaPergunta${i}`).value = '';
            document.getElementById(`urlPergunta${i}`).value = '';
            return;
        };
                
        incorretaValue = document.getElementById(`respostaPergunta1${i}`).value; 
        incorretaUrlValue= document.getElementById(`urlPergunta1${i}`).value;
        gabarito=false;
        if(checkIncorreta(incorretaValue,incorretaUrlValue,gabarito,1)===false){
            document.getElementById(`respostaPergunta1${i}`).value = ''; 
            document.getElementById(`urlPergunta1${i}`).value = '';
            return;
        }

        incorretaValue = document.getElementById(`respostaPergunta2${i}`).value;
        incorretaUrlValue= document.getElementById(`urlPergunta2${i}`).value;
        gabarito=false;
        if (incorretaValue !== "" || incorretaUrlValue !== "") {
            if(checkIncorreta(incorretaValue,incorretaUrlValue,gabarito,2)===false){
                document.getElementById(`respostaPergunta2${i}`).value = ''; 
                document.getElementById(`urlPergunta2${i}`).value = '';
                return;
            }  
        }


        incorretaValue = document.getElementById(`respostaPergunta3${i}`).value;  
        incorretaUrlValue= document.getElementById(`urlPergunta3${i}`).value;
        gabarito=false;
        if (incorretaValue !== "" || incorretaUrlValue !== "") {
            if(checkIncorreta(incorretaValue,incorretaUrlValue,gabarito,2)===false){
                document.getElementById(`respostaPergunta3${i}`).value = ''; 
                document.getElementById(`urlPergunta3${i}`).value = '';
                return;
            }  
        }
        

        if(validarNumeroRespostas(contRespostas) === false){
            i=contadorPerguntas;
            return;
        }

        let perguntaObjeto={ title:txtValue, color:corValue, answers:respostas  }
        respostas=[];
        questoes[i-1] = perguntaObjeto;

}
paginaNiveis();
}

function CapturarInfosNiveis(){

    for(let i=1;i<=nivelValue;i++){

        txtNivelValue=document.getElementById(`tituloNivel${i}`).value;
        acertoPorcentagemNivelValue=document.getElementById(`acertoPorcentagem${i}`).value;
        urlImagemNivelValue=document.getElementById(`urlImagemNivel${i}`).value;
        descricaoNivelValue=document.getElementById(`descricaoNivel${i}`).value;

        if(acertoPorcentagemNivelValue !== "" && acertoPorcentagemNivelValue < checkAcertoMin) {
            checkAcertoMin = Number(acertoPorcentagemNivelValue);
        }

        if(checkInfosNiveis()=== false){
            return;
        } else {

            let niveisObjeto={  title:txtNivelValue, image:urlImagemNivelValue,
                                text:descricaoNivelValue,
                                minValue:Number(acertoPorcentagemNivelValue)
                            }
            niveis[i-1] = niveisObjeto;
        }
    }

    if (checkAcertoMin !== 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%")
    } else {
        let quizzObjeto={ title: tituloValue, image: urlValue, questions: questoes, levels: niveis    }
        enviarObjeto(quizzObjeto);
    }
}

function incorretaObjeto(incorretaValue,incorretaUrlValue,gabarito){

    let objetoIncorreto={text:incorretaValue,image:incorretaUrlValue, isCorrectAnswer:gabarito
    }
    respostas.push(objetoIncorreto)
    incorretaValue="";
    incorretaUrlValue="";
}

function objetoCorreto(corretaValue,corretaUrlValue,gabarito){
    let objetoCorreto={
        text:corretaValue, image:corretaUrlValue, isCorrectAnswer:gabarito
    }
    respostas.push(objetoCorreto)
    corretaValue=""; corretaUrlValue="";
}

function validarNumeroRespostas(contRespostas){
    if(contRespostas<2){
        alert("Numero de respostas deve ser entre 2 e 4")
        respostas=questoes=quizzObjeto=[];
        return false;
    }
}

function validarTextoCorPergunta(txtValue,corValue,i){
    if(txtValue.length<20){
        alert(`Texto da ${i}a pergunta deve ter no mínimo 20 caracteres`);
        return false;
    }

    const regex= /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
    if(regex.test(corValue)===false){
        alert("Cor de fundo: deve ser uma cor em hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)");
        return false;
    }
}

function checkCorreta(i){

        if(document.getElementById(`respostaPergunta${i}`).value === ""){
            alert("Insira um texto na resposta correta");
            return false;
        }

        if(validarURL(corretaUrlValue)===false){
            alert("Insira uma URL valida na resposta correta");
            return false;
        }

        let objetoCorreto={
            text:corretaValue, image:corretaUrlValue, isCorrectAnswer:gabarito
        }
        respostas.push(objetoCorreto)
        contRespostas++;
        corretaValue=""; corretaUrlValue="";gabarito="";
        return true;
}

function checkIncorreta(incorretaValue,incorretaUrlValue,gabarito,i){
 
    if(incorretaValue==="" && incorretaUrlValue==="" && gabarito===""){
        alert("Não pode ter resposta vazia");
        return false;
    } else{

        if(validarURL(incorretaUrlValue)===false){        
            alert(`Insira uma URL valida na ${i}a resposta incorreta`);
            return false;
        } else {
            let objetoIncorreto={text:incorretaValue,image:incorretaUrlValue, isCorrectAnswer:gabarito
            }
            respostas.push(objetoIncorreto)
        }
    }

    contRespostas++;
    incorretaValue=""; incorretaUrlValue=""; gabarito="";
    return true;
}


function checkInfosNiveis(){

    if(txtNivelValue.length<10){
        alert("Título do nível: mínimo de 10 caracteres");
        return false;
    }

    else if(acertoPorcentagemNivelValue<0|| acertoPorcentagemNivelValue>100){
        alert("% de acerto mínima: um número entre 0 e 100");
        return false;
    }

    else if(validarURL(urlImagemNivelValue)=== false){
        alert("URL da imagem do nível: deve ter formato de URL");
        return false;
    }

    else if(descricaoNivelValue.length<30){
        alert("Descrição do nível: mínimo de 30 caracteres");
        return false;
    }

    else {
        return true;  
    } 
}

function enviarObjeto(quizzObjeto){

    console.log(quizzObjeto);

    const promise = axios.post("https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes", quizzObjeto);
    promise.then(paginaPronto);
    promise.then(armazenarCodigoQuizz);
}

function removerBloco(pergunta){
    const remover = document.querySelector(`.pergunta${pergunta}`);
    remover.classList.toggle("escondido");
}

function removerBlocoNivel(nivel){
    const remover = document.querySelector(`.nivel${nivel}`);
    remover.classList.toggle("escondido");
}

//INICIO PROGRAMAÇÃO DE ARMAZENAGEM DO QUIZZ

function armazenarCodigoQuizz (obj) {

    if (localStorage.getItem('idQuizzes') !== null) {
        idQuizzUsuario = JSON.parse(localStorage.getItem('idQuizzes'));
    }

    let objId = {
                id: obj.data.id,
                key: obj.data.key
                }
    
    idQuizzUsuario.push(objId);

    localStorage.setItem('idQuizzes', JSON.stringify(idQuizzUsuario));
}
