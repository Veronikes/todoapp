class Storage {
    tasks = {};
    lists = {};
    screen;
    score = 0;

    constructor() {
        this.load();

        document.querySelector('[data-score]').textContent = this.score;

        window.addEventListener('score-added', (event) => {
            this.score += parseInt(event.detail.score);
            document.querySelector('[data-score]').textContent = this.score;
            localStorage.setItem('score', this.score);
        });
    }

    load() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        this.lists = JSON.parse(localStorage.getItem('lists')) || {};
        this.score = parseInt(localStorage.getItem('score') || 0);

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
        localStorage.setItem('score', this.score);
    }
}