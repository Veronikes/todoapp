class Storage {
    tasks = {};
    lists = [];

    constructor() {
        this.load();
    }

    load() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        this.lists = JSON.parse(localStorage.getItem('lists')) || [];
        console.log(this.tasks);

        for (let item of Object.values(this.tasks)) {
            let task = new Task();
            this.tasks[item.id] = Object.assign(task, item);
        }

        for (let i = 0; i < this.lists.length; i++) {
            let list = new TaskList();
            this.lists[i] = Object.assign(list, this.lists[i]);
        }
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }
}