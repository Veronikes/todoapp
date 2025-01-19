# To do app

## Úvod
Tato dokumentace popisuje funkční a technickou specifikaci aplikace, která umožní uživatelům vytvářet úkoly.

## Funkční specifikace

### Základní funkce
1. **Vytváření úkolu**
   - Uživatel může vytvořit nový úkol, který bude obsahovat:
     - Název úkolu (povinné)
     - Seznam, do kterého úkol patří (volitelné)
   
2. **Správa seznamů**
   - Uživatel může vytvářet seznamy úkolů. Každý seznam může mít:
     - Název (povinné)
     - Barvu (povinné)
   - Uživatel si může seznamy vytvářet a mazat je.

3. **Zobrazení úkolů**
   - Uživatel může vidět všechny úkoly v úvodním zobrazení. Dále může zobrazit splněné úkoly nebo úkoly v jednotlivých seznamech.

4. **Ukládání dat**
   - Všechna data o úkolech a seznamech budou ukládána do local storage pro zachování stavu po obnovení stránky.

5. **Administrace úkolů**
   - Uživatel může úkoly označit jako dokončené.
   - Uživatel může úkoly mazat.

### Uživatelské rozhraní
- Aplikace bude mít jednoduché a responzivní uživatelské rozhraní vytvořené pomocí HTML a TailwindCSS.
- Hlavní komponenty budou zahrnovat:
  - Formulář pro přidání nového úkolu.
  - Seznam úkolů s možností jejich interakce (mazání, označení jako dokončené).
  - Seznamy úkolů s možností přidání nových seznamů a jejich správy.

## Technická specifikace

### Technologie
- **JavaScript** (objektově orientované programování)
- **TailwindCSS** (pro stylování)
- **Local Storage** (pro persistentní ukládání dat)

### Struktura kódu
1. **Třídy**
    - `Main`: Třída starající se o běh aplikace 
    - `Task`: Třída reprezentující úkol
      - Atributy: `id`, `name`, `list`, `completed`, `rewarded`
      - Metody: `render()`

    - `TaskList`: Třída reprezentující skupinu úkolů
      - Atributy: `id`, `name`, `color`, `count`
      - Metody: `render()`

    - `Storage`: Třída pro manipulaci s local storage
      - Atributy: `tasks`, `lists`, `screen`, `score`
      - Metody: `load()`, `save()`
    
    - `ListManager`: Třída starající se o seznamy
      - Metody: `calculateCounts()`, `addList(event)`, `initializeEvents()`, `renderList(list)`, `renderLists()`, `toggleEmptyState()`,`removeList(event)`

    - `ScreenManager`: Třída starající se o přepínání stránek
      - Metody:`load()`, `highlight()`

    - `TaskManager`: Třída starající se o úkoly
      - Metody: `addTask(event)`, `initializeEvents()`, `removeTask(event)`, `renderTask(task, registerEvents = false)`, `getTasksForCurrentScreen()`, `renderTasks()`, `toggleEmptyState()`, `toggleTaskState(event)`, `renderListSelect()`, `addListSelectOption(list)`, `removeListSelectOption(list)`
    


2. **Data Model**
   - Úkoly budou uloženy jako pole objektů v local storage.
   - Seznamy budou uloženy jako samostatné objekty s referencemi k úkolům.

### Příklad struktury dat
```json
{
  "tasks": {
    "<uuid>": {
      "id": "<uuid>",
      "name": "Úkol 1",
      "list": "1",
      "completed": false,
      "rewarded": false,
    }
  },
  "lists": {
    "<uuid>": {
      "id": "<uuid>",
      "name": "Seznam 1",
      "color": "#FF5733"
    }
  }
}
```

## Závěr
Tato specifikace popisuje základní architekturu a funkčnost aplikace. Aplikace poskytuje jednoduchý a přehledný nástroj pro  organizaci úkolů.