class Storage {
    tasks = {};
    lists = {};

    constructor() {
        this.load();
    }

    load() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        this.lists = JSON.parse(localStorage.getItem('lists')) || {};

        for (let item of Object.values(this.tasks)) {
            let task = new Task();
            this.tasks[item.id] = Object.assign(task, item);
        }

        for (let item of Object.values(this.lists)) {
            let list = new TaskList();
            this.lists[item.id] = Object.assign(list, item);
        }
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }
}