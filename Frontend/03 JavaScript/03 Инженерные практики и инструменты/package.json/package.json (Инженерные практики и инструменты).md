# package.json (Оглавление)

- ### [[Особенности package.json|Особенности]]
- ### [[Версионирование зависимостей|Специфика версий]]
- ### [[package-lock.json]]

---

## Что такое package.json?

`package.json` — это сердце любого проекта на JavaScript/TypeScript (в среде Node.js). Это манифест, который содержит метаданные проекта, его зависимости, скрипты для запуска и конфигурации различных инструментов.

```json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "Пример проекта",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

> [!TIP]
> Основное отличие `dependencies` от `devDependencies`: первые нужны для **работы** приложения на сервере (например, фреймворк), вторые — только для **разработки** (линтеры, сборщики, тесты).