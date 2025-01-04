class TaskManager {

    constructor() {
        this.renderTasks();
        this.initializeEvents();
        this.renderListSelect();
    }


    addTask(event) {
        const input = document.getElementById('task-name');
        const listSelect = document.getElementById('list-select');
        const name = input.value;
        const listId = listSelect.value;

        if (!listId) {
            alert("Nelze vytvořit úkol bez seznamu. Nejprve si vytvoř nějaký seznam, a zkus to znovu :-)");
            return;
        }

        const task = new Task(name, listId);

        window.Storage.tasks[task.id] = task;

        this.renderTask(task);
        window.Storage.save();
        input.value = '';
    }
    
    initializeEvents() {
        document.getElementById('add-task').addEventListener('click', (event) => this.addTask(event));
        document.querySelectorAll('[data-task-delete]').forEach((element) => element.addEventListener('click', this.removeTask));
        window.addEventListener('list-created', (event) => this.addListSelectOption(event.detail.list));
    }

    removeTask(event) {
        const taskElement = event.currentTarget.parentElement.parentElement;
        const taskId = taskElement.getAttribute('data-task-id');
        delete window.Storage.tasks[taskId];
        taskElement.remove();
        window.Storage.save();
    }

    renderTask(task) {
        const listElement = document.getElementById('task-list');
        let temp = document.createElement('div');
        temp.innerHTML = task.render();
        listElement.appendChild(temp.firstElementChild);
        this.toggleEmptyState();
    }

    renderTasks() {
        for (let task of Object.values(window.Storage.tasks)) {
            this.renderTask(task);
        }
    }

    toggleEmptyState() {
        const element = document.getElementById('task-list-empty');
        if (window.Storage.tasks.length === 0) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }

    renderListSelect() {
        for (let list of Object.values(window.Storage.lists)) {
            this.addListSelectOption(list);
        }
    }

    addListSelectOption(list) {
        const listSelectElement = document.getElementById('list-select');
        let option = document.createElement('option');
            option.innerHTML = list.name;
            option.value = list.id;
            listSelectElement.appendChild(option);
    }



}