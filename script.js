let todoForm = document.querySelector('#todo-form')
let todoInput = document.querySelector('#todo-input')
let todoList = document.querySelector('#todo-list')

/* Метод stopPropagation() тільки перешкоджає просуванню події далі */
/* Якщо необхідно повністю зупинити обробку події, використовується метод stopImmediatePropagation(), Він не тільки запобігає 
спливанню, але й зупиняє обробку подій на поточному елементі. */
/* Не припиняйте спливання без необхідності. Припинення спливання створює свої підводні камені, які потім доводиться обходити.
Наприклад, аналітика використовує спливання, щоб відстежувати події на сторінці. */

window.addEventListener("load", function() {
    todoInput.focus()
})

class Todo {
    constructor() {
        this.todos = []
    }

    addTodo(name) {
        let task = {
            name: name,
            status: false,
        }
        this.todos.push(task)
        let taskBox = document.createElement("div")
        taskBox.style.display = 'flex'
        let taskName = document.createElement("p")
        taskName.innerHTML = name
        let checkBox = document.createElement("input")
        let taskBtn = document.createElement("button")
        taskBtn.type = "button"
        taskBtn.classList.add("delete-button")
        taskBtn.innerHTML = "x"
        checkBox.type = "checkbox"
        checkBox.classList.add("checkbox")
        todoList.appendChild(taskBox)
        taskBox.append(taskName, checkBox, taskBtn)
        taskBtn.addEventListener('click', () => {
            this.deleteTodo(name, taskBox)
        })
        checkBox.addEventListener("click", () => {
            this.toggleDone(checkBox, taskName)
        })
    }

    deleteTodo(name, taskBox) {
        this.todos = this.todos.filter((todo) => todo.name !== name)
        todoList.removeChild(taskBox)
    }

    toggleDone(checkBox, taskName) {
        if (checkBox.checked) {
            taskName.style.color = "blue"
        } 
        else {
            taskName.style.color = "black"
        }
    }
}

let newTodoList = new Todo()
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (todoInput.value.trim() !== "") {
        newTodoList.addTodo(todoInput.value.trim())
        todoInput.value = ""
    }
})