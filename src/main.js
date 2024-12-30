class Main {
    managers = {};

    constructor() {
        this.managers = {
            'taskListManager': new TaskListManager(),
        }
    }


}

window.onload = () => {
    window.Storage = new Storage();
    const main = new Main();
}
