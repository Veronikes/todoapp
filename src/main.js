class Main {
    managers = {};

    constructor() {
        this.managers = {
            'screenManager': new ScreenManager(),
            'taskManager': new TaskManager(),
            'listManager': new ListManager(),
        }
    }
}

window.onload = () => {
    window.Storage = new Storage();
    const main = new Main();
}
