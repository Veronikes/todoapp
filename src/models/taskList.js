class TaskList {
    id;
    name;
    color;
    count;
    

    constructor(name, color) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.color = color;
    }

    render() {
        return `
            <li data-list-id="${this.id}" data-screen="${this.id}" class="group data-[selected]:bg-neutral-200/50 rounded-md p-1 px-2">
                <a href="?screen=${this.id}" >   
                    <span class="w-full flex flex-row items-center justify-between">
                        <span class="flex flex-row items-center gap-2">
                            <span class="grow shrink-0 bg-rose-400 rounded w-4 h-4" style="background-color: ${this.color}"></span>
                            <span class="w-full line-clamp-1 shrink grow-0"> ${this.name} </span>
                        </span>
                        <div class="shrink-0 flex flex-row items-center gap-0.5">
                            <span class="bg-white border border-neutral-200 rounded min-w-[1.5rem] px-2 h-6 flex items-center justify-center" data-list-count>0</span>
                            <button data-list-delete type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </span>
                </a>    
            </li>
        `;
    }

}