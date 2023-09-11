import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';
const IN_PROCESS = 'in-process'
const DONE = 'done'

const todoInput = document.getElementById('todo-input')
const todoAddBtn = document.getElementById('todo-add-btn')
const todoListWrapper = document.getElementById('todo-list-wrapper')
const sortByNameBtn = document.getElementById('sort-by-name-btn')
const sortByStatusBtn = document.getElementById('sort-by-status-btn')
const errorText = document.getElementById('error-text')

let todoList = [
    {
        id: uuidv4(),
        title: 'Test task 7',
        status: IN_PROCESS
    },
    {
        id: uuidv4(),
        title: 'A task 1',
        status: IN_PROCESS
    }
]

updateTodoUI()

todoAddBtn.addEventListener('click', () => {
    errorText.innerText = ''
    todoInput.classList.remove('is-danger')

    if(todoInput.value === ""){
        todoInput.classList.add('is-danger')
        errorText.innerText = 'Todo title cannot be empty!'
        return
    }
    todoList.push({id: uuidv4(), title: todoInput.value, status: IN_PROCESS})
    console.log(todoList);

    updateTodoUI()
})

sortByNameBtn.addEventListener('click', () => {
    todoList = todoList.sort((a, b) => {
        const titleA = a.title.toLowerCase()
        const titleB = b.title.toLowerCase()

        if (titleA < titleB) return -1
        if (titleA > titleB) return 1
        return 0
    })

    updateTodoUI();
})

sortByStatusBtn.addEventListener('click', () => {
    todoList = todoList.sort((a) => {
        if (a.status === DONE) return 1
        if (a.status === IN_PROCESS) return -1
        return 0
    })

    updateTodoUI();
})

function updateTodoUI(){
    todoListWrapper.innerHTML = ""

    todoList.forEach(todo => {
        const todo1 = createTodo({id: todo.id, status: todo.status, title: todo.title})
        todoListWrapper.appendChild(todo1)
        todoInput.value = ''
    })
}

function createTodo({id, title, status}){
    const todoItem = document.createElement("div")
    todoItem.className = 'notification is-link pt-3 pb-3 pl-4 pr-4'

    //level
    const todoItemLevel = document.createElement('div')
    todoItemLevel.className = 'level'

    //done button
    const doneTodoBtn = document.createElement('button')
    doneTodoBtn.className = "button is-primary is-rounded is-outlined p-3 mr-3"
    doneTodoBtn.innerHTML = '<i class="fa-solid fa-check"></i>'

    doneTodoBtn.addEventListener('click', () => {
        todoList = todoList.map(todo => {
            if(todo.id === id){
                if(todo.status === IN_PROCESS){
                    todo.status = DONE
                }
                else{
                    todo.status = IN_PROCESS
                }
            }
            return todo
        })

        console.log(todoList);
        updateTodoUI()
    })

    if(status === DONE){
        doneTodoBtn.classList.add('is-focused')
    }
    else{
        doneTodoBtn.classList.remove('is-focused')
    }

    //title
    const todoItemTitle = document.createElement('span')
    todoItemTitle.className = 'title is-4 level-left mb-0'
    const titleText = document.createElement("span")
    titleText.innerText = title
    todoItemTitle.appendChild(doneTodoBtn)
    todoItemTitle.appendChild(titleText)

    //delete button
    const deleteTodoBtn = document.createElement('button')
    deleteTodoBtn.className = 'button is-danger is-light level-right'
    deleteTodoBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'

    deleteTodoBtn.addEventListener('click', () => {
        todoList = todoList.filter(todo => todo.id !== id)
        console.log(todoList);
        updateTodoUI()
    })

    //append
    todoItemLevel.appendChild(todoItemTitle)
    todoItemLevel.appendChild(deleteTodoBtn)
    todoItem.appendChild(todoItemLevel)

    return todoItem
}

// const arr = [1, 2, 3, 4, 4, 5, 4]
// console.log(arr);
// const newArr = arr.filter(item => item !== 4)
// console.log(newArr);
