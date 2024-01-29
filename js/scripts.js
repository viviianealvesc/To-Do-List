
// Seleção de elementos
const todoForm      = document.querySelector("#todo-form");
const todoInput     = document.querySelector("#todo-input");
const todoList      = document.querySelector("#todo-list");
const editForm      = document.querySelector("#edit-form");
const editInput     = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput   = document.querySelector("#search-input");
const eraseBtn      = document.querySelector("#erase-button");
const filterBtn     = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div") //criando um elemento <div>
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    
    todoList.appendChild(todo);

    todoInput.value = ""
    todoInput.focus()

}


// ESTOU PEGANDO O QUE FOI ESCRITO NO INPUT E ARMAZENANDO NA FUNCAO "saveTodo"
todoForm.addEventListener('submit', (e) => {
    e.preventDefault() //consigo enviar o formulario sem recarregar a página

    const inputValue = todoInput.value //estou pegando o que esta sendo escrito no meu input

    if(inputValue) {
        saveTodo(inputValue)
    } 

})


// Se a classe "hide" estiver presente, ela será removida; se não estiver
//presente, será adicionada.
const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      let todoTitle = todo.querySelector("h3");
  
      if (todoTitle.innerText === oldInputValue) {
        todoTitle.innerText = text;
  
        // Utilizando dados da localStorage
        updateTodoLocalStorage(oldInputValue, text);
      }
    });
  };

//IDENTIFICAR O ELEMENTO QUE FOI CLICADO
//isto é uma função anonima
document.addEventListener('click', (e) => {

    const targetEl = e.target //vejo que elemento foi clicado 
    const parentEl = targetEl.closest('div')//selecionei o elemento div mais proxima
    let todoTitle


    /*Este bloco condicional verifica se a variável parentEl existe e se contém um 
    elemento <h3> usando o método querySelector(). Se ambas as condições forem 
    verdadeiras, o bloco de código dentro do if será executado.*/
    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText || "";
      }

    //Eu estou verificando se o elemento clicado tem a classe "finish-todo".
    if(targetEl.classList.contains('finish-todo')) {
        //pego o elemento DIV mais proximo e adiciono a classe "done".
        parentEl.classList.toggle('done')
    }

    if(targetEl.classList.contains('remove-todo')) {
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-todo')) {
        toggleForms()

        // Mudo o valor do input
        editInput.value = todoTitle
        // Estou salvando este valor na memoria
        oldInputValue = todoTitle 
        
    }
})

// Quando eu clicar no meu botao "cancelar" ele vai ser redirecionado para editar o elemento clicado
cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleForms()
})


editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //esta pegando o novo valor editado pelo usuario
    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
})
