# Merge vs Rebase

## 📖 DevOps-история (Боль эксплуатации)
**Симптом:** Инженер Вася пытается откатить неудачный релиз в `main` после инцидента. Он смотрит в `git log`, но видит "спагетти" из сотен переплетенных коммитов от 5 разных команд с сообщениями вроде `fix` и `merge origin/main`. Понять, какой именно мерж принес баг, и откатить его (`git revert -m`) становится невозможной задачей. Время простоя растет.
**Решение:** Внедрение четкой стратегии: `rebase` для локальных веток (линейная история) и `merge --no-ff` для вливания фичей в `main` (явные точки интеграции).

## 📊 Архитектура / Схема (Mermaid)
```mermaid
gitGraph
    commit id: "Initial"
    branch feature
    checkout feature
    commit id: "Feat A"
    checkout main
    commit id: "Hotfix"
    checkout feature
    commit id: "Feat B"
    
    %% Rebase approach
    note right of feature: Rebase: перенос коммитов поверх Hotfix
    
    %% Merge --no-ff approach
    checkout main
    merge feature id: "Merge PR #1" tag: "v1.1"
```

## 💻 Примеры (Bash/YAML)

**Правильный Rebase локальной ветки перед PR:**
```bash
git fetch origin
git rebase origin/main
# В случае конфликтов решаем их и:
git rebase --continue
# Обновляем PR (Force push с осторожностью)
git push --force-with-lease
```

**Настройка Git для безопасного Pull:**
```bash
# Всегда делать rebase при pull вместо merge-commit
git config --global pull.rebase true
```

## 🛠 Day 2 Operations (Эксплуатация)
* **Git Rerere (Reuse recorded resolution):** Если вы часто делаете rebase долгоживущей ветки, включите `git config --global rerere.enabled true`. Git запомнит, как вы решали конфликты, и применит их автоматически в следующий раз.
* **Инструменты CI:** Настройка в пайплайнах (например, GitHub/GitLab) требования "linear history" перед мержем (блокировка мержа, если ветка не fast-forward относительно main).

## 🚫 Антипаттерны
* **Rebase общих веток:** `git rebase` переписывает историю (меняет хэши коммитов). Выполнение rebase на ветке `main` или любой другой ветке, с которой работают другие разработчики, сломает им локальные репозитории. Золотое правило: *Rebase только свои локальные, еще не влитые ветки.*
* **Слепой Force Push:** Использование `git push -f` вместо `git push --force-with-lease`. Последний проверяет, не запушил ли кто-то другой коммиты в вашу ветку, прежде чем перезаписать ее.
