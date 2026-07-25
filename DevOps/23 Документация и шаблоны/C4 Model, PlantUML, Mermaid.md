# C4 Model, PlantUML, Mermaid: Docs-as-Code

## 📖 История: Боль и Решение
**Боль:** Архитектурные схемы рисуются в Visio/Draw.io и устаревают ровно в момент сохранения. Никто не знает, где лежит актуальная версия, а при изменении архитектуры перерисовывать схему вручную слишком долго.
**Решение:** Diagram-as-Code (DaC). Использование текстовых форматов (Mermaid, PlantUML) для описания архитектуры (например, по методологии C4). Схемы хранятся в Git вместе с кодом, версионируются и обновляются через PR.

## 📊 Mermaid-схема (C4 Context Example)
```mermaid
C4Context
    title System Context diagram for Internet Banking System
    
    Person(customer, "Banking Customer", "A customer of the bank, with personal bank accounts.")
    System(banking_system, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")
    
    System_Ext(mail_system, "E-mail system", "The internal Microsoft Exchange e-mail system.")
    System_Ext(mainframe, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")
    
    Rel(customer, banking_system, "Uses")
    Rel_Back(customer, mail_system, "Sends e-mails to")
    Rel_Neighbor(banking_system, mail_system, "Sends e-mails", "SMTP")
    Rel(banking_system, mainframe, "Gets account information from, and makes payments using")
```

## 💻 Примеры

### PlantUML (C4 Container)
```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(user, "User", "Uses the system")
Container(web_app, "Web Application", "React", "Provides interface")
Container(api, "API Application", "Go", "Handles business logic")
ContainerDb(db, "Database", "PostgreSQL", "Stores data")

Rel(user, web_app, "Uses", "HTTPS")
Rel(web_app, api, "Calls", "JSON/HTTPS")
Rel(api, db, "Reads/Writes", "SQL/TCP")
@enduml
```

### Интеграция в Markdown (Markdown/GitLab/GitHub)
Просто используйте блоки ` ```mermaid ` или ` ```plantuml ` в ваших README.md файлах. Платформы отрендерят их автоматически.

## 🌅 Day 2 Operations
* **Автоматизация сборки:** Настройте CI-пайплайн для конвертации PlantUML/Mermaid в PNG/SVG, если ваша wiki-система не поддерживает их нативную отрисовку (например, плагин для MkDocs или Confluence).
* **Единый стиль:** Зафиксируйте корпоративные цвета, шрифты и уровень детализации схем в отдельном репозитории с шаблонами (include).
* **Связь с кодом:** Используйте инструменты типа Structurizr для генерации C4 схем прямо из аннотаций в коде приложения.

## 🛑 Антипаттерны
* **"Спагетти-архитектура" на схеме:** Попытка отобразить все микросервисы и связи на одном холсте. Используйте C4 (Context -> Container -> Component -> Code) для разделения уровней абстракции.
* **Слишком много деталей:** Добавление IP-адресов, портов и версий библиотек в логическую архитектурную схему.
* **Хранение бинарников:** Коммит `.png` файлов в репозиторий без исходного текстового файла схемы.
