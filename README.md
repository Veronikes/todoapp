# To do app

## Úvod
Tato dokumentace popisuje funkční a technickou specifikaci aplikace, která umožní uživatelům vytvářet úkoly.

## Funkční specifikace

### Základní funkce
1. **Vytváření úkolu**
   - Uživatel může vytvořit nový úkol, který bude obsahovat:
     - Název úkolu (povinné)
     - Datum (volitelné)
     - Popis úkolu (volitelné)
     - Seznam, do kterého úkol patří (volitelné)
   
2. **Správa seznamů**
   - Uživatel může vytvářet seznamy úkolů. Každý seznam může mít:
     - Název (povinné)
     - Barvu (volitelné)
   - Uživatel si může seznamy upravovat a mazat je.

3. **Zobrazení úkolů**
   - Uživatel může vidět všechny dnešní úkoly v úvodním zobrazení. Dále může zobrazit nadcházející úkoly nebo úkoly v jednotlivých seznamech.

4. **Ukládání dat**
   - Všechna data o úkolech a seznamech budou ukládána do local storage pro zachování stavu po obnovení stránky.

5. **Administrace úkolů**
   - Uživatel může úkoly označit jako dokončené.
   - Uživatel může úkoly editovat nebo mazat.

### Uživatelské rozhraní
- Aplikace bude mít jednoduché a responzivní uživatelské rozhraní vytvořené pomocí HTML a TailwindCSS.
- Hlavní komponenty budou zahrnovat:
  - Formulář pro přidání nového úkolu.
  - Seznam úkolů s možností jejich interakce (editace, mazání, označení jako dokončené).
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
     - Atributy: `id`, `name`, `description`, `dueAt`, `listId`, `completed`
     - Metody: `markAsCompleted()`

   - `TaskList`: Třída reprezentující skupinu úkolů
     - Atributy: `id`, `name`, `color`, `tasks`
     - Metody: `addTask(Task task)`, `removeTask(taskId)`

   - `Storage`: Třída pro manipulaci s local storage
     - Metody: `saveTasks(tasks)`, `loadTasks()`, `saveLists(lists)`, `loadLists()`


2. **Data Model**
   - Úkoly budou uloženy jako pole objektů v local storage.
   - Seznamy budou uloženy jako samostatné objekty s referencemi k úkolům.

### Příklad struktury dat
```json
{
  "tasks": [
    {
      "name": "Úkol 1",
      "description": "Popis úkolu 1",
      "dueAt": "2023-12-31",
      "listId": "1",
      "completed": false
    }
  ],
  "lists": [
    {
      "id": "1",
      "name": "Seznam 1",
      "color": "#FF5733"
    }
  ]
}
```

## Závěr
Tato specifikace popisuje základní architekturu a funkčnost aplikace. Aplikace poskytuje jednoduchý a přehledný nástroj pro  organizaci úkolů.