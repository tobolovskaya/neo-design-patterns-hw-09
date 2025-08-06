# User Statistics Exporter (HW9)

У цьому проєкті реалізовано експорт користувацьких даних з API у формати CSV, JSON та XML за допомогою **патерну Шаблонний метод**.

## Структура проекту

```
src/
├── data/
│   └── UserData.ts           # Інтерфейс користувача (id, name, email, phone)
├── exporters/
│   ├── DataExporter.ts       # Базовий клас з шаблонним методом export()
│   ├── CsvExporter.ts        # Підклас: реалізація render() та save() для CSV
│   ├── JsonExporter.ts       # Підклас: реалізація render() та save() для JSON
│   └── XmlExporter.ts        # Підклас: як Json, плюс hook afterRender() для коментаря з таймстампом
└── main.ts                   # Точка входу: послідовний виклик exporter.export()
```

## Патерн Шаблонний метод

У класі **DataExporter** описано метод `export()`, що виконує кроки в суворому порядку:

1. `load()` — завантаження даних із зовнішнього API.
2. `transform()` — вибір лише потрібних полів та сортування.
3. `beforeRender()` — hook: пустий за замовчуванням.
4. `render()` — **абстрактний** метод, реалізується в підкласах для створення тексту у потрібному форматі.
5. `afterRender()` — hook: пустий, але в `XmlExporter` допрацьовується часом генерування.
6. `save()` — **абстрактний** метод, що записує результат у файл.

Таким чином, загальний алгоритм винесено в єдине місце, а форматні відмінності інкапсульовані в підкласах.

## Додавання нового формату експорту

1. Створіть новий файл у `src/exporters/`, наприклад `YamlExporter.ts`.
2. Успадкуйте його від `DataExporter`:

   ```ts
   export class YamlExporter extends DataExporter {
     protected render(): void {
       // конвертація this.data у YAML → this.result
     }
     protected save(): Promise<void> {
       // запис this.result у users.yaml
     }
   }
   ```
3. Додайте його у `main.ts`:

   ```ts
   import { YamlExporter } from './exporters/YamlExporter';
   // …
   const exporters = [ new CsvExporter(), new JsonExporter(), new XmlExporter(), new YamlExporter() ];
   ```
4. Запустіть `export()` — ваш новий формат автоматично відпрацює в рамках шаблонного методу.

## Приклад запуску

```bash
npm install
npx ts-node src/main.ts
```

Після виконання у корені проєкту з’являться файли:

* `users.csv`
* `users.json`
* `users.xml`

## Приклад вмісту `users.csv`

```
id,name,email,phone
1,Leanne Graham,Sincere@april.biz,1-770-736-8031 x56442
2,Ervin Howell,Shanna@melissa.tv,010-692-6593 x09125
…
```

---

© 2025 Design Patterns 
