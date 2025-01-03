class Main {
    managers = {};

    constructor() {
        this.managers = {
            'taskManager': new TaskManager(),
            'listManager': new ListManager(),
        }
    }
}

window.onload = () => {
    window.Storage = new Storage();
    const main = new Main();
}
