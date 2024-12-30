class TaskList {
    id;

    constructor() {
        this.id = crypto.randomUUID();
    }

    static make(data) {
        return new TaskList(...data);
    }

}