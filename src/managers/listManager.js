class ListManager {

    constructor() {
        this.renderLists();
        this.initializeEvents();
    }

    addList(event) {
        const nameInput = document.getElementById('list-name');
        const colorInput = document.getElementById('list-color');
        const name = nameInput.value;
        const color = colorInput.value;

        const list = new TaskList(name, color);

        window.Storage.lists[list.id] = list;

        this.renderList(list);
        window.Storage.save();
        nameInput.value = '';
        window.dispatchEvent(new CustomEvent("list-created", {"detail": {"list": list}}));
    }
    
    initializeEvents() {
        document.getElementById('add-list').addEventListener('click', (event) => this.addList(event));
        document.querySelectorAll('[data-list-delete]').forEach((element) => element.addEventListener('click', this.removeList));
    }

    renderList(list) {
        const listElement = document.getElementById('list-list');
        let temp = document.createElement('div');
        temp.innerHTML = list.render();
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
        if (window.Storage.lists.length === 0) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }

    removeList(event) {
        const listElement = event.currentTarget.parentElement.parentElement.parentElement;
        const listId = listElement.getAttribute('data-list-id');
        delete window.Storage.lists[listId];
        listElement.remove();
        window.Storage.save();
    }



}