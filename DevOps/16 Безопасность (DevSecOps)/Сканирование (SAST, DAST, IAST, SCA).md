# Сканирование (SAST, DAST, IAST, SCA)

## История: Боль и Решение
**Боль:** Код пишется быстро, уязвимости плодятся еще быстрее. Узнавать о дырах в безопасности после взлома продакшена или от багхантеров слишком дорого и больно. 
**Решение:** Внедрить непрерывное сканирование на всех этапах пайплайна (Shift-Left Security). SAST для исходников, SCA для зависимостей, DAST для работающего приложения, IAST для анализа в рантайме.

## Архитектура проверок

```mermaid
flowchart LR
    Dev[Developer] -->|Commit| Git[Git Repo]
    Git --> CI[CI Pipeline]
    
    subgraph Build Phase
        CI --> SAST[SAST: Code Scan]
        CI --> SCA[SCA: Deps Scan]
    end
    
    Build Phase --> Artifact[Container Image]
    Artifact --> TestEnv[Test Environment]
    
    subgraph Test Phase
        TestEnv --> DAST[DAST: App Scan]
        TestEnv --> IAST[IAST: Runtime Scan]
    end
    
    Test Phase --> Prod[Production]
```

## Инструменты и примеры

### SAST (Static Application Security Testing)
Анализ исходного кода без его запуска.
**Пример (GitLab CI + SonarQube):**
```yaml
sast:
  stage: test
  image: sonarsource/sonar-scanner-cli
  script:
    - sonar-scanner -Dsonar.projectKey=my_project -Dsonar.sources=.
```

### SCA (Software Composition Analysis)
Поиск уязвимостей в Open Source зависимостях (библиотеках).
**Пример (Trivy в пайплайне):**
```bash
# Сканирование зависимостей проекта
trivy fs --severity HIGH,CRITICAL .
```

### DAST (Dynamic Application Security Testing)
Анализ запущенного приложения "снаружи" (Black-box).
**Пример (OWASP ZAP):**
```bash
docker run -t owasp/zap2docker-stable zap-baseline.py -t https://my-app.staging.com
```

### IAST (Interactive Application Security Testing)
Анализ приложения "изнутри" во время работы (инструментация кода). Работает как агент.

## Day 2 Operations (Советы)
- **Управление ложными срабатываниями (False Positives):** Регулярно ревьюируйте результаты сканирований. Создайте механизм быстрого добавления исключений (suppressions), чтобы не блокировать релизы из-за мусора.
- **Риск-ориентированный подход:** Чинить сначала уязвимости с эксплойтами в дикой природе (CISA KEV), а не просто всё с CVSS High/Critical.
- **Оптимизация скорости:** SAST сканирования могут быть долгими. Настройте инкрементальные проверки только измененного кода (PR/MR).

## Антипаттерны
- **Включить все правила сразу и заблокировать сборку:** Приведет к саботажу со стороны разработчиков. Начинайте с режима аудита (только репорты), затем блокируйте только Critical.
- **Сканировать только ветку `main`:** Уязвимости попадут в общую ветку, исправить их будет сложнее. Нужно сканировать в Feature-ветках до слияния.
- **Игнорировать SCA:** Большая часть кода в современных приложениях — это чужие библиотеки. SAST своего кода не защитит от дыры в log4j.
