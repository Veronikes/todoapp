class Main {
    managers = {};

    constructor() {
        this.managers = {
            'taskManager': new TaskManager(),
            'listManager': new ListManager(),
            'screenManager': new ScreenManager(),
        }
    }
}

window.onload = () => {
    window.Storage = new Storage();
    const main = new Main();
}
