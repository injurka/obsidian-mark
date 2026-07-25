# Git LFS (Large File Storage)

## 📖 История из окопов (DevOps Story)
**Боль:** Команда Data Science и дизайнеров начала хранить веса ML-моделей (.pt) и исходники графики (.psd) прямо в Git. За полгода репозиторий разросся с 50 МБ до 15 ГБ. `git clone` занимал полчаса, CI-раннеры падали по таймауту или из-за нехватки места на диске.  
**Решение:** Внедрение Git LFS. Большие бинарные файлы были заменены на легковесные текстовые указатели (pointers) в истории Git, а сами бинарники переехали на отдельный LFS-сервер (S3-подобное хранилище). Репозиторий снова стал "худым" и быстрым.

## 🗺️ Архитектура

```mermaid
flowchart LR
    Dev[Developer]
    GitRepo[Local Git Repo\n(Contains Text Pointers)]
    LFSServer[(LFS Server\nBlob Storage)]
    RemoteGit[Remote Git Server]

    Dev -- "git commit huge_model.bin" --> GitRepo
    GitRepo -- "Pointer File" --> RemoteGit
    GitRepo -- "Actual Binary" --> LFSServer
    
    Dev2[Developer 2]
    RemoteGit -- "Fetch Pointers" --> Dev2
    LFSServer -- "Download Binary on checkout" --> Dev2
```

## 💻 Примеры (Bash & конфигурация)

### Инициализация и трекинг файлов
```bash
# 1. Установка LFS (один раз на машину)
git lfs install

# 2. Указание типов файлов для трекинга
git lfs track "*.psd"
git lfs track "*.pt"
git lfs track "datasets/**"

# 3. Фиксация настроек
git add .gitattributes
git commit -m "chore: setup git lfs tracking for media and models"
```

### Пример файла `.gitattributes`
Под капотом `git lfs track` просто модифицирует `.gitattributes`:
```text
*.psd filter=lfs diff=lfs merge=lfs -text
*.pt filter=lfs diff=lfs merge=lfs -text
```

## 🛠️ Day 2 Operations (Эксплуатация)
1. **Миграция раздутого репозитория:**
   Если бинарники *уже* попали в историю Git, их нужно оттуда вычистить:
   ```bash
   # Превращает старые коммиты с .mp4 в LFS-объекты и переписывает историю
   git lfs migrate import --include="*.mp4" --everything
   git push --force --all
   ```
2. **Очистка локального кэша:**
   Со временем локальная папка `.git/lfs/objects` сильно разрастается.
   ```bash
   git lfs prune # Удаляет старые LFS-файлы, которых нет в текущем checkout
   ```
3. **CI/CD Оптимизация:**
   В CI-пайплайнах (например, GitLab CI или GitHub Actions) клонирование LFS-объектов может быть лишним (если вы собираете только код). Отключайте скачивание LFS, если оно не нужно для сборки.

## ⚠️ Антипаттерны
- **LFS для сжимаемого текста:** Использование LFS для лог-файлов (`*.log`), минифицированного JS или больших SQL-дампов. Git сам отлично сжимает текст через zlib (packfiles). LFS нужен только для несжимаемых/бинарных данных.
- **Забытый `git lfs install` на CI:** Раннеры клонируют репозиторий, но вместо реальных картинок получают 100-байтовые текстовые указатели LFS. Сборка проходит, но продакшен ломается.
- **Хранение секретов в LFS:** LFS-серверы часто имеют более слабые настройки контроля доступа по сравнению с основным Git-репозиторием. Секретам там не место.
