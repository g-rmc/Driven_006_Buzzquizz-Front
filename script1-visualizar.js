let numQuizzes = 0;
const paginaBase = document.querySelector(".paginaQuizz");

function atualizarPagina(){
    document.location.reload();
}

function carregarPaginaInicial(){

    paginaBase.innerHTML = "";

    paginaBase.innerHTML = `  <div class="meusQuizzes">
                        <h3>Você não criou nenhum</br>quizz ainda :(</h3> 
                        <button onclick="paginaComeco()">Criar Quizz</button>
                    </div>

                    <div class="todosQuizzes">
                        <h1>Todos os Quizzes</h1>
                        <div class="quizzes"></div>
                    </div>`

    //carregarQuizzes();
}

/*function carregarQuizzes(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(renderizarQuizzes);
    promise.catch(alertaErro);
}*/

function renderizarQuizzes(obj){
    let array = obj.data;
    numQuizzes = array.length;
    
    let divQuizzes = document.querySelector(".quizzes");

    divQuizzes.innerHTML = ""

    console.log(array[1])

    for (let i = 0; i < numQuizzes; i++){
        
        let quizz = array[i];

        let html =  `   <div class="quizz"
                        style="background-image: url('${quizz.image}');"
                        onclick="carregarQuizz(${quizz.id})">
                            <div>${quizz.title}</div>
                        </div>`;

        divQuizzes.innerHTML += html;
    }
}

function alertaErro(obj){
    let id = obj.status
    console.log(`Erro ${id}`);
    alert(`Erro ${id}`);
}

/*function carregarQuizz(id){
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promise.then(renderizarQuizz);
    promise.catch(alertaErro);
}*/

function renderizarQuizz(obj){

    let quizz = obj.data;

    paginaBase.innerHTML = "";

    paginaBase.innerHTML = `<div class="todosQuizzes">${quizz.title}</div>`;

    console.log(quizz)

}

carregarPaginaInicial();