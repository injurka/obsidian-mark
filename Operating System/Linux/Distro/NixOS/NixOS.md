- ### [[Override package]]
- ### [[Operating System/Linux/Distro/NixOS/Dots|Dots]]
- ### [[Operating System/Linux/Distro/NixOS/Источники|Источники]]

- ### [[introduction]]
- ### [[installation]]
- ### [[getting-started]]
- ### [[nix-language]]
- ### [[development-environments]]

```json
nixos-docs/
├── README.md                 # Главный файл: Краткое описание проекта, цели, как использовать документацию, ссылки на основные разделы
├── LICENSE                   # Лицензия документации (например, CC-BY-SA 4.0 или MIT)
├── CONTRIBUTING.md           # Руководство для тех, кто хочет внести вклад в документацию
├── images/                   # Папка для изображений, диаграмм, скриншотов
│   └── ...
├── glossary.md               # Словарь терминов (Nix Expression Language, Derivation, Flake, Channel, etc.)
│
├── 01-introduction/          # Введение для новичков
│   ├── 01-what-is-nix.md     # Что такое Nix (менеджер пакетов и язык)?
│   ├── 02-what-is-nixos.md   # Что такое NixOS (операционная система)?
│   ├── 03-why-nixos.md       # Преимущества: Декларативность, Воспроизводимость, Атомарность, Откаты
│   ├── 04-core-concepts.md   # Ключевые концепции (Nix Store, Профили, Поколения)
│   └── 05-comparison.md      # Сравнение с другими дистрибутивами и системами управления конфигурацией
│
├── 02-installation/          # Руководства по установке
│   ├── 01-preparation.md     # Подготовка: Системные требования, Загрузочный носитель, Резервное копирование
│   ├── 02-graphical-installer.md # Установка с использованием графического установщика Calamares
│   ├── 03-manual-installation.md # Пошаговая ручная установка (разметка диска, генерация конфига)
│   ├── 04-virtual-machine.md # Установка в виртуальной машине (VirtualBox, QEMU/KVM)
│   ├── 05-wsl.md             # Установка NixOS на Windows Subsystem for Linux (WSL)
│   └── 06-post-installation.md # Первые шаги после установки (проверка, основные команды)
│
├── 03-getting-started/       # Основы работы с системой
│   ├── 01-configuration-nix.md # Структура и основы /etc/nixos/configuration.nix
│   ├── 02-basic-commands.md  # Основные команды: nixos-rebuild, nix-env, nix-shell, nix-collect-garbage
│   ├── 03-package-management.md # Установка и удаление пакетов (декларативно)
│   ├── 04-system-updates.md  # Обновление системы (каналы, nixos-rebuild switch --upgrade)
│   ├── 05-rollbacks.md       # Как выполнять откаты системы
│   └── 06-users-and-groups.md # Управление пользователями и группами
│
├── 04-nix-language/          # Язык Nix
│   ├── 01-syntax-basics.md   # Основы синтаксиса: Значения, Списки, Множества атрибутов (Sets), Функции
│   ├── 02-builtins.md        # Встроенные функции (import, builtins.*)
│   ├── 03-let-bindings.md    # Локальные переменные (let ... in ...)
│   ├── 04-functions.md       # Определение и использование функций
│   ├── 05-derivations.md     # Концепция дериваций (что это, как создаются)
│   └── 06-debugging-nix.md   # Отладка Nix-выражений (nix repl, builtins.trace)
│
├── 05-configuration/         # Детальная настройка системы
│   ├── system/               # Базовая система
│   │   ├── 01-bootloader.md  # Настройка загрузчика (GRUB, systemd-boot)
│   │   ├── 02-networking.md  # Сеть (проводная, Wi-Fi, NetworkManager, systemd-networkd)
│   │   ├── 03-services.md    # Управление сервисами systemd
│   │   ├── 04-filesystem.md  # Файловые системы, монтирование, ZFS, Btrfs
│   │   ├── 05-hardware.md    # Настройка оборудования (драйверы, звук, Bluetooth)
│   │   ├── 06-locale-time.md # Локализация, время, раскладки клавиатуры
│   │   └── 07-security.md    # Основы безопасности (firewall, AppArmor/SELinux?)
│   ├── desktop/              # Настройка рабочего стола
│   │   ├── 01-display-manager.md # Дисплейные менеджеры (GDM, LightDM, SDDM)
│   │   ├── 02-desktop-environments.md # Окружения рабочего стола (Gnome, KDE, XFCE)
│   │   ├── 03-window-managers.md # Оконные менеджеры (i3, Sway, Hyprland)
│   │   ├── 04-fonts.md       # Управление шрифтами
│   │   └── 05-theming.md     # Темы и внешний вид
│   ├── software/             # Управление ПО
│   │   ├── 01-nixpkgs.md     # Структура репозитория nixpkgs, поиск пакетов
│   │   ├── 02-overlays.md    # Использование и создание оверлеев (для кастомизации пакетов)
│   │   ├── 03-overrides.md   # Переопределение опций пакетов
│   │   └── 04-containers.md  # Работа с контейнерами (Docker, Podman)
│   └── secrets-management/   # Управление секретами
│       ├── 01-introduction.md # Проблематика секретов в декларативной системе
│       ├── 02-agenix.md       # Использование agenix
│       ├── 03-sops-nix.md     # Использование sops-nix
│       └── 04-vault.md        # Интеграция с HashiCorp Vault (если применимо)
│
├── 06-nixos-modules/         # Модульная система NixOS
│   ├── 01-introduction.md    # Что такое модули NixOS?
│   ├── 02-writing-modules.md # Как написать свой модуль (опции, конфигурация)
│   ├── 03-options.md         # Определение опций (types, default, description)
│   ├── 04-config.md          # Определение конфигурации (слияние настроек)
│   └── 05-best-practices.md  # Рекомендации по написанию модулей
│
├── 07-flakes/                # Nix Flakes (современный подход)
│   ├── 01-introduction.md    # Что такое Flakes и зачем они нужны? (Чистота, версионирование)
│   ├── 02-enabling-flakes.md # Как включить экспериментальную поддержку Flakes
│   ├── 03-flake-nix.md       # Структура файла flake.nix (inputs, outputs)
│   ├── 04-managing-system.md # Управление конфигурацией NixOS с помощью Flakes
│   ├── 05-development-shells.md # Создание окружений для разработки (`nix develop`)
│   ├── 06-flake-commands.md  # Новые команды: nix build, nix run, nix develop, nix flake ...
│   └── 07-templates.md       # Использование и создание шаблонов Flakes
│
├── 08-packaging/             # Создание и модификация пакетов
│   ├── 01-nixpkgs-structure.md # Как устроен репозиторий nixpkgs
│   ├── 02-simple-package.md  # Создание простого пакета (mkDerivation)
│   ├── 03-build-phases.md    # Фазы сборки (unpack, patch, configure, build, install, check)
│   ├── 04-dependencies.md    # Управление зависимостями (buildInputs, nativeBuildInputs)
│   ├── 05-patching.md        # Применение патчей
│   ├── 06-languages-frameworks/ # Специфика упаковки для разных языков
│   │   ├── python.md
│   │   ├── nodejs.md
│   │   ├── rust.md
│   │   ├── go.md
│   │   └── ...
│   └── 07-contributing-to-nixpkgs.md # Как отправить свой пакет в nixpkgs
│
├── 09-development-environments/ # Использование Nix для разработки
│   ├── 01-nix-shell.md       # Создание временных окружений с `nix-shell` (shell.nix)
│   ├── 02-nix-develop.md     # Использование `nix develop` с Flakes
│   ├── 03-direnv-integration.md # Интеграция с direnv для автоматической активации окружений
│   └── 04-cross-compilation.md # Кросс-компиляция с Nix
│
├── 10-ecosystem/             # Экосистема Nix
│   ├── 01-home-manager.md    # Управление пользовательскими настройками (dotfiles) с Home Manager
│   ├── 02-nixops.md          # Развертывание NixOS на удаленные машины с NixOps (устаревает, но еще используется)
│   ├── 03-deploy-rs.md       # Современное развертывание с deploy-rs (на базе Flakes)
│   ├── 04-colmena.md         # Еще один инструмент развертывания
│   ├── 05-nix-darwin.md      # Использование Nix на macOS
│   ├── 06-nur.md             # Nix User Repositories (Пользовательские репозитории)
│   └── 07-community-resources.md # Ссылки на сообщество (форумы, чаты, Discourse, Matrix)
│
├── 11-advanced-topics/       # Продвинутые темы
│   ├── 01-garbage-collection.md # Детали сборки мусора (GC roots, nix-store --gc)
│   ├── 02-nix-store-internals.md # Внутреннее устройство /nix/store
│   ├── 03-binary-cache.md    # Использование и создание бинарных кешей (Cachix)
│   ├── 04-nixos-tests.md     # Написание и запуск тестов для NixOS
│   ├── 05-custom-iso.md      # Создание кастомных ISO-образов NixOS
│   └── 06-security-hardening.md # Углубленное укрепление безопасности
│
├── 12-troubleshooting/       # Решение проблем
│   ├── 01-common-errors.md   # Распространенные ошибки и их решения
│   ├── 02-debugging-builds.md # Отладка сборок пакетов (`nix-shell -p nix-prefetch-scripts --run "unpackPhase"` и т.д.)
│   ├── 03-network-issues.md  # Проблемы с сетью
│   ├── 04-boot-issues.md     # Проблемы с загрузкой
│   └── 05-reporting-bugs.md  # Как правильно сообщать об ошибках
│
└── 13-reference/             # Справочные материалы
    ├── nix-commands.md       # Справочник по командам Nix (nix, nix-env, nix-shell, etc.)
    ├── nixos-commands.md     # Справочник по командам NixOS (nixos-rebuild, nixos-option, etc.)
    ├── nixpkgs-functions.md  # Справочник по основным функциям nixpkgs (mkDerivation, fetchGit, etc.)
    └── nixos-options.md      # Поиск и описание опций NixOS (`nixos-option`, search.nixos.org)

```
