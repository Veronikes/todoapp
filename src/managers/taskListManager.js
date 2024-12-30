class TaskListManager {

    constructor() {
        this.renderTasks();
        this.initializeEvents();
    }


    addTask(event) {
        const input = document.getElementById('task-name');
        const name = input.value;

        const task = new Task(name);

        window.Storage.tasks[task.id] = task;

        this.renderTask(task);
        window.Storage.save();
        input.value = '';
    }
    
    initializeEvents() {
        document.getElementById('add-task').addEventListener('click', (event) => this.addTask(event));
        document.querySelectorAll('[data-task-delete]').forEach((element) => element.addEventListener('click', this.removeTask));
    }

    removeTask(event) {
        const taskElement = event.currentTarget.parentElement;
        const taskId = taskElement.getAttribute('data-task-id');
        delete window.Storage.tasks[taskId];
        taskElement.remove();
        window.Storage.save();
    }

    renderTask(task) {
        const listElement = document.getElementById('task-list');
        let temp = document.createElement('div');
        console.log(task);
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

    

}