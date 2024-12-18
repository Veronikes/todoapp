class Main {

    #todos = [];


    constructor() {
        console.log("Inicializace");

        this.nacti();
    }

    nacti() {
        this.#todos = localStorage.getItem("todos");
    }

    uloz() {
        localStorage.setItem("todos", this.#todos);
   }
}


window.onload = () => {
    const main = new Main();

}