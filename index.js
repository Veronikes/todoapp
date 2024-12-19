class Main {

    #todos = [];


    constructor() {
        console.log("Inicializace");

        this.load();
    }

    load() {
        this.#todos = localStorage.getItem("todos");
    }

    save() {
        localStorage.setItem("todos", this.#todos);
   }
}


window.onload = () => {
    const main = new Main();

}