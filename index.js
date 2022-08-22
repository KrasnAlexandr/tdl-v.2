const formTask = document.querySelector('.task');
const inputForm = formTask.querySelector('.task__input');
const formBtn = formTask.querySelector('.task__btn');
const deleteAllTaskButton = document.querySelector('.del-btn');

const taskList = document.querySelector('.task__list');

const templateElement = document.querySelector('#template').content;

let editedTask = null;


function createTask (text) {
    const newTask = templateElement.cloneNode(true);

    newTask.querySelector('.task__text').textContent = text;

    addListenerForTask(newTask);

    return newTask;
}

function editTask (evt) {
    const parentLi = evt.target.closest('.task__items');
    editMode(parentLi);
}

function editMode (li) {
    inputForm.value  = li.querySelector('.task__text').textContent;
    inputForm.focus();
    formBtn.textContent = 'save';
    formBtn.style.background = 'yellow';

    editedTask = li
}

function deleteTask (evt) {
    const parentLi = evt.target.closest('.task__items');
    parentLi.remove();
}

function addListenerForTask (task) {
    task.querySelector('.task__edit').addEventListener('click', editTask);
    task.querySelector('.task__deleted').addEventListener('click', deleteTask);
}

function addTask (task, container = taskList) {
    container.append(task);
}

function normalizeForm () {
    editedTask = null;
    inputForm.value = '';
    formBtn.textContent = 'add';
    formBtn.style.background = 'rgb(124, 227, 123, 0.5)';
}

function submitTask (evt) {
    evt.preventDefault();

    if (inputForm.value >= 1) {
        const taskText = inputForm.value;

        if (editedTask) {
            editedTask.querySelector('.task__text').textContent = taskText;
        } else {
            addTask(createTask(taskText));
        }
    }

    normalizeForm()
}

formTask.addEventListener('submit', submitTask);
deleteAllTaskButton.addEventListener('click', () => taskList.innerHTML = '');

