class ListManager {

    constructor() {
        this.renderLists();
        this.initializeEvents();
        this.calculateCounts();
    }

    calculateCounts() {
        document.querySelectorAll("[data-list-id]").forEach((element) => {
            const id = element.getAttribute("data-list-id");
            const countElement = element.querySelector("[data-list-count]");

            if (countElement) {
                countElement.innerText = Object.values(window.Storage.tasks).filter(task => task.list === id).length;
            }
        });
    }

    addList(event) {
        const nameInput = document.getElementById('list-name');
        const colorInput = document.getElementById('list-color');
        const name = nameInput.value;
        const color = colorInput.value;

        if (!name) {
            alert("Nelze vytvořit seznam bez názvu. Zkus to znovu :-)");
            return;
        }

        const list = new TaskList(name, color);

        window.Storage.lists[list.id] = list;

        this.renderList(list);
        window.Storage.save();
        nameInput.value = '';
        window.dispatchEvent(new CustomEvent("list-created", {"detail": {"list": list}}));
    }
    
    initializeEvents() {
        document.getElementById('add-list').addEventListener('click', (event) => this.addList(event));
        document.getElementById('list-name').addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.addList(event);
            }
        });
        document.querySelectorAll('[data-list-delete]').forEach((element) => element.addEventListener('click', this.removeList));
        window.addEventListener('task-created', () => this.calculateCounts());
        window.addEventListener('task-removed', () => this.calculateCounts());
    }

    renderList(list) {
        const listElement = document.getElementById('list-list');
        let temp = document.createElement('div');
        temp.innerHTML = list.render();
        temp.querySelector('[data-list-delete]').addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            this.removeList(event);
        });
        listElement.appendChild(temp.firstElementChild);
        this.toggleEmptyState();
    }

    renderLists() {
        for (let list of Object.values(window.Storage.lists)) {
            this.renderList(list);
        }
    }

    toggleEmptyState() {
        const element = document.getElementById('list-list-empty');
        const lists = Object.entries(window.Storage.lists);
        if (lists.length === 0) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }

    removeList(event) {
        event.stopPropagation();
        event.preventDefault();

        const listElement = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
        const listId = listElement.getAttribute('data-list-id');
        const list = window.Storage.lists[listId];

        const tasks = Object.values(window.Storage.tasks).filter((task) => task.list === listId);

        if (tasks.length > 0 && !confirm('Jste si jistí, že to chcete smazat?')) {
            return;
        }

        delete window.Storage.lists[listId];
        listElement.remove();
        window.Storage.save();
        this.toggleEmptyState();
        window.dispatchEvent(new CustomEvent("list-removed", {"detail": {"list": list}}));
        tasks.forEach((task) => {
            delete window.Storage.tasks[task.id];
            document.querySelector(`[data-task-id="${task.id}"]`).remove();
            window.dispatchEvent(new CustomEvent("task-removed", {"detail": {"task": task}}));
        });

        if (window.Storage.screen === listId) {
            window.location.search = new URLSearchParams({screen: 'all-tasks'}).toString();
        }
    }



}