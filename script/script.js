addEventListener('DOMContentLoaded', (event) => {
    'use strict';
    const todoText = document.querySelector("#newToDoText");
    const todoList = document.querySelector(".todo-list");
    let todos = [], serializedArr;

    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    document.querySelector("#addBtn").addEventListener('click', showModal);
    document.querySelector(".closeBtnModal").addEventListener('click', hideModal);
    document.querySelector("#addBtnModal").addEventListener('click', () => {
        addTodoItem(todoText.value);
    });
    document.querySelector("#clearBtn").addEventListener('click', (() => {
        localStorage.clear();
        todos = [];
        todoList.innerHTML = "";
        displayNoItem();
        showTodoList();
    }))


    showTodoList();

    function showTodoList() {

        todoList.innerHTML = '';

        todos.forEach((value, index, array) => {
            let li = document.createElement("li"),
                p = document.createElement("p"),
                button = document.createElement("button");

            li.classList.add("todo-item");

            p.classList.add("todo-text");
            p.innerText = todos[index].todoText;

            button.classList.add("deleteBtn");
            button.innerHTML = '<i class="fa-solid fa-trash icon"></i>';

            li.append(p, button);

            todoList.append(li);

        })

        btnListener();
        displayPendingItem();

        if (todos.length == 0) {
            displayNoItem();
        }


    }


    function showModal() {
        let addModal = document.querySelector(".add-modal");
        addModal.classList.add("show-add-modal");
        addModal.classList.remove("hide-add-modal");
    }

    function hideModal() {
        let addModal = document.querySelector(".add-modal");
        addModal.classList.add("hide-add-modal");
        addModal.classList.remove("show-add-modal");
    }

    function addTodoItem(value) {
        todos.push({ todoText: value });
        showTodoList();

        serializedArr = JSON.stringify(todos);
        localStorage.setItem('todos', serializedArr);
        todoText.value = "";

    }

    function btnListener() {
        document.querySelectorAll(".deleteBtn").forEach((item, index, array) => {
            item.addEventListener('click', (e) => {
                todos.splice(index, 1);
                serializedArr = JSON.stringify(todos);
                localStorage.setItem('todos', serializedArr);
                e.target.parentNode.style.border = "2px solid red";
                setTimeout(showTodoList, 500);


            })
        })
    }

    function displayPendingItem() {
        document.querySelector("#pendingItem").innerText = todos.length;
    }

    function displayNoItem() {
        todoList.innerHTML = '<p class="no-item">No item on the list</p>';
    }


});

