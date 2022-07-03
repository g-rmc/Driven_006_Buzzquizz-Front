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
let checkAcertoMin=0;

let quizzObjeto={title:"",image:"", questions:[], levels:[]}
let levels={title:"", image:"", text:"", minValue:""}
let questions=[{ title:"", color:"", answers:[] }]
let answers=[{ text:"", image:"", isCorrectAnswer:""  }]

function paginaComeco(){
    pag.innerHTML = "";
    pag.innerHTML += `
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
                        <input id="tituloNivel${i}" class="formatação" placeholder="Título do nível">
                        <input id="acertoPorcentagem${i}" class="formatação" placeholder="% de acerto mínima">
                        <input id="urlImagemNivel${i}" class="formatação" placeholder="URL da imagem do nível">
                        <input id="descricaoNivel${i}"class="descricaoNivelFormatacao"  placeholder="Descrição do nível">
                    </div>
                    </div>
                
                    `
    }
    pag.innerHTML+=` <div class="rodape">
    <button onclick="CapturarInfosNiveis(this)"><h1>Finalizar quiz</h1></button>
    </div>`
}

function paginaPronto(){
    pag.innerHTML = "";
    pag = document.querySelector('.paginaQuizz');
    pag.innerHTML += `
                    <div class="enunciado"><h2>Seu quiz esta pronto!</h2></div>
                    <div class="caixaImagem" style="background-image: url('${urlValue}'">
                    <p>${tituloValue}</p>
                    </div>
                    <div class="rodape">
                        <button onclick="carregarQuizz()"><h1>Acessar quizz</h1></button>
                    <div><h1 onclick="atualizarPagina()">Voltar para home</h1></div>
                    </div>`
}

function capturarInfosComeco(){
    tituloValue="Testando não ta funcionando 100%"
    //tituloValue = document.getElementById("titulo").value;
    quizzObjeto.title=tituloValue;
    urlValue="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/South_America_%28orthographic_projection%29.svg/250px-South_America_%28orthographic_projection%29.svg.png";
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
    let urlregex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (urlregex.test(urlValue)) {
        return (true);
    }
    return (false);
}

function CapturarInfosPerguntas(){
 
    for(let i=1;i<=contadorPerguntas;i++){
        contRespostas=0;
        txtValue="Qual a capital do Brasil?"
        corValue="#bababa";
         //txtValue= document.getElementById(`txtPergunta${i}`).value;
        //corValue= document.getElementById(`corPergunta${i}`).value;
        if(validarTextoCorPergunta(txtValue,corValue)=== false){
            i=contadorPerguntas;
             paginaPerguntas();
        } 
        
        corretaValue="Brasilia";
        corretaUrlValue="https://www.vinhedo.sp.gov.br/fotos/baca8cdabf5bd1e8b4df102ae7873545.jpg";
        //corretaValue = document.getElementById(`respostaPergunta${i}`).value;
        //corretaUrlValue= document.getElementById(`urlPergunta${i}`).value;
        gabarito=true;
        checkCorreta();
                
        incorretaValue="maringa"
        incorretaUrlValue="https://www.vinhedo.sp.gov.br/fotos/baca8cdabf5bd1e8b4df102ae7873545.jpg"
        //incorretaValue = document.getElementById(`respostaPergunta1${i}`).value; 
        //incorretaUrlValue= document.getElementById(`urlPergunta1${i}`).value;
        gabarito=false;
        checkIncorreta(incorretaValue,incorretaUrlValue,gabarito)

        incorretaValue="sao paulo"
        incorretaUrlValue="https://www.vinhedo.sp.gov.br/fotos/baca8cdabf5bd1e8b4df102ae7873545.jpg"
        //incorretaValue = document.getElementById(`respostaPergunta2${i}`).value;
        //incorretaUrlValue= document.getElementById(`urlPergunta2${i}`).value;
        gabarito=false;
        checkIncorreta(incorretaValue,incorretaUrlValue,gabarito)

        incorretaValue="ponta grossa"
        incorretaUrlValue="https://www.vinhedo.sp.gov.br/fotos/baca8cdabf5bd1e8b4df102ae7873545.jpg"
        //incorretaValue = document.getElementById(`respostaPergunta3${i}`).value;  
        //incorretaUrlValue= document.getElementById(`urlPergunta3${i}`).value;
        gabarito=false; 
        checkIncorreta(incorretaValue,incorretaUrlValue,gabarito)

       if(validarNumeroRespostas(contRespostas)=== false){
        i=contadorPerguntas; paginaPerguntas();
       }

        let perguntaObjeto={ title:txtValue, color:corValue, answers:respostas  }
        respostas=[];
        questoes.push(perguntaObjeto);

}
console.log(corValue);
paginaNiveis();
}

function CapturarInfosNiveis(){

    for(let i=1;i<=nivelValue;i++){

        
        txtNivelValue="Nivel dificil"
        //txtNivelValue=document.getElementById(`tituloNivel${i}`).value;
        acertoPorcentagemNivelValue=70;
       // acertoPorcentagemNivelValue=document.getElementById(`acertoPorcentagem${i}`).value;
       urlImagemNivelValue="https://www.vinhedo.sp.gov.br/fotos/baca8cdabf5bd1e8b4df102ae7873545.jpg";
        //urlImagemNivelValue=document.getElementById(`urlImagemNivel${i}`).value;
        descricaoNivelValue="pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp";
        //descricaoNivelValue=document.getElementById(`descricaoNivel${i}`).value;

       if(acertoPorcentagemNivelValue>0)
            checkAcertoMin++;

       if(checkInfosNiveis()=== false){
        return paginaNiveis();
       }

       else{
                let niveisObjeto={title:txtNivelValue, image:urlImagemNivelValue,
                    text:descricaoNivelValue,
                    minValue:acertoPorcentagemNivelValue
                }
                niveis.push(niveisObjeto);
        }
    }

   let quizzObjeto={ title:tituloValue, image:urlValue, questions:questoes,levels: niveis    }
    console.log(quizzObjeto);
    enviarObjeto(quizzObjeto);
    }

/*function incorretaObjeto(incorretaValue,incorretaUrlValue,gabarito){

    let objetoIncorreto={text:incorretaValue,image:incorretaUrlValue, isCorrectAnswer:gabarito
    }
    respostas.push(objetoIncorreto)
    incorretaValue="";
    incorretaUrlValue="";
}*/

/*function objetoCorreto(corretaValue,corretaUrlValue,gabarito){
    console.log("3");
    let objetoCorreto={
        text:corretaValue, image:corretaUrlValue, isCorrectAnswer:gabarito
    }
    respostas.push(objetoCorreto)
    corretaValue=""; corretaUrlValue="";
    console.log("4");
}*/

function validarNumeroRespostas(contRespostas){
    if(contRespostas<2){
        alert("Numero de respostas deve ser entre 2 e 4")
        respostas=questoes=quizzObjeto=[];
        return false;
    }
}

function validarTextoCorPergunta(txtValue,corValue){
    console.log("1");
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
    console.log("2");
        if(validarURL(corretaUrlValue)===false){
            alert("Insira uma URL valida");
            return false;
        }

        let objetoCorreto={
            text:corretaValue, image:corretaUrlValue, isCorrectAnswer:gabarito
        }
        respostas.push(objetoCorreto)
        corretaValue=""; corretaUrlValue="";
}

function checkIncorreta(incorretaValue,incorretaUrlValue,gabarito){
 
    console.log("antes validar URL")
    if(validarURL(incorretaUrlValue)===false){        
        alert("Insira uma URL valida");
        return false;
}
console.log("depois validar URL")
    if(incorretaValue!=="" && incorretaUrlValue!==""){
        let objetoIncorreto={text:incorretaValue,image:incorretaUrlValue, isCorrectAnswer:gabarito
        }
        respostas.push(objetoIncorreto)
    }
        else{
            alert("Não pode ter resposta vazia");
            return false;
        }

    contRespostas++;
    incorretaValue=""; incorretaUrlValue="";
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

    else if(checkAcertoMin===0){
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%");
        return false;
    }
    else return true;
}

function enviarObjeto(quizzObjeto){

    paginaPronto();
   // const promise = axios.post("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes", quizzObjeto);
    //promise.then(paginaPronto);
    //promise.then(armazenarCodigoQuizz);
}

function removerBloco(pergunta){
    const remover = document.querySelector(`.pergunta${pergunta}`);
    console.log(remover);
    remover.classList.toggle("escondido");
}

function removerBlocoNivel(nivel){
    const remover = document.querySelector(`.nivel${nivel}`);
    console.log(remover);
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

    console.log(idQuizzUsuario);

    localStorage.setItem('idQuizzes', JSON.stringify(idQuizzUsuario));
}