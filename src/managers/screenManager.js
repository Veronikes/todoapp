class ScreenManager{

    constructor(){
        this.load();
        this.highlight();
    }

    load(){
        const params = new URLSearchParams(window.location.search);
        window.Storage.screen = params.get("screen") ?? "all-tasks";
    }

    highlight(){
        document.querySelectorAll("[data-screen]").forEach((element) => element.removeAttribute("data-selected"));
        const element = document.querySelector(`[data-screen="${window.Storage.screen}"]`);
        if (element) {
            element.setAttribute("data-selected", "data-selected");
        }
        
    }

}