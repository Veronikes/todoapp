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

        if (!name) {
            alert("Nelze vytvořit úkol bez názvu. Zkus to znovu :-)");
            return;
        }

        const listId = listSelect.value;

        if (!listId) {
            alert("Nelze vytvořit úkol bez seznamu. Nejprve si vytvoř nějaký seznam, a zkus to znovu :-)");
            return;
        }

        const task = new Task(name, listId);

        window.Storage.tasks[task.id] = task;

        this.renderTask(task, true);
        window.Storage.save();
        input.value = '';
        window.dispatchEvent(new CustomEvent("task-created", {"detail": {"task": task}}));
    }
    
    initializeEvents() {
        document.getElementById('add-task').addEventListener('click', (event) => this.addTask(event));
        document.getElementById('task-name').addEventListener('keyup', (event) => {
           if (event.key === 'Enter') {
                this.addTask(event);
           }
        });
        document.querySelectorAll('[data-task-delete]').forEach((element) => element.addEventListener('click', (event) => this.removeTask(event)));
        document.querySelectorAll('[data-task-checkbox]').forEach((element) => element.addEventListener('change', (event) => this.toggleTaskState(event)));
        window.addEventListener('list-created', (event) => this.addListSelectOption(event.detail.list));
        window.addEventListener('list-removed', (event) => this.removeListSelectOption(event.detail.list));
        window.addEventListener('task-removed', () => this.toggleEmptyState());
    }

    removeTask(event) {
        const taskElement = event.currentTarget.parentElement.parentElement;
        const taskId = taskElement.getAttribute('data-task-id');
        const task = window.Storage.tasks[taskId];
        delete window.Storage.tasks[taskId];
        taskElement.remove();
        window.Storage.save();
        this.toggleEmptyState();
        window.dispatchEvent(new CustomEvent("task-removed", {"detail": {"task": task}}));
    }

    renderTask(task, registerEvents = false) {
        const listElement = task.completed
            ? document.getElementById('completed-task-list')
            : document.getElementById('task-list');

        let temp = document.createElement('div');
        temp.innerHTML = task.render();
        if (registerEvents) {
            temp.querySelector('[data-task-delete]').addEventListener('click', (event) => this.removeTask(event));
            temp.querySelector('[data-task-checkbox]').addEventListener('change', (event) => this.toggleTaskState(event));
        }
        listElement.appendChild(temp.firstElementChild);

        this.toggleEmptyState();
    }

    getTasksForCurrentScreen() {
        const screen = window.Storage.screen;
        const tasks = Object.values(window.Storage.tasks);

        if (screen === "all-tasks") {
            return tasks;
        }

        if (screen === "completed-tasks") {
            return tasks.filter(task => task.completed);
        }

        return tasks.filter(task => task.list === screen);
    }

    renderTasks() {
        for (let task of this.getTasksForCurrentScreen()) {
            this.renderTask(task);
        }
    }

    toggleEmptyState() {
        const element = document.getElementById('task-list-empty');
        const tasks = this.getTasksForCurrentScreen();

        if (tasks.length === 0) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }

        const taskListWrapper = document.getElementById('task-list-wrapper');
        if (tasks.filter(task => !task.completed).length === 0) {
            taskListWrapper.classList.add('hidden');
        } else {
            taskListWrapper.classList.remove('hidden');
        }

        const completedTaskListWrapper = document.getElementById('completed-task-list-wrapper');
        if (tasks.filter(task => task.completed).length === 0) {
            completedTaskListWrapper.classList.add('hidden');
        } else {
            completedTaskListWrapper.classList.remove('hidden');
        }
    }

    toggleTaskState(event) {
        const element = event.currentTarget.parentElement.parentElement;
        const taskId = element.getAttribute('data-task-id');
        const task = window.Storage.tasks[taskId];
        task.completed = !task.completed;
        if (! task.rewarded) {
            window.dispatchEvent(new CustomEvent("score-added", {"detail": {"score": 1}}));
        }
        task.rewarded = true;
        window.Storage.tasks[task.id] = task;
        window.Storage.save();
        element.remove();
        this.renderTask(task, true);
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

    removeListSelectOption(list) {
        const listSelectElement = document.getElementById('list-select');
        const option = listSelectElement.querySelector(`option[value="${list.id}"]`);
        option.remove();
    }



}