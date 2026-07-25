# AWX / Ansible Automation Platform (AAP)

## 📖 DevOps Story (Боль и Решение)
**Боль:** Команда DevOps запускает плейбуки Ansible с локальных ноутбуков. Возникает проблема "на моей машине работает", невозможно отследить кто и когда вносил изменения, нет нормального RBAC, а SSH-ключи и пароли разбросаны по всем устройствам.
**Решение:** **AWX** (upstream для Red Hat **Ansible Automation Platform**) — это централизованный Control Plane (веб-интерфейс, REST API и task engine). Он обеспечивает запуск плейбуков из единой точки, управление доступом (RBAC), интеграцию с внешними хранилищами секретов (HashiCorp Vault, CyberArk) и подробный аудит.

## 🗺️ Архитектура

```mermaid
flowchart TD
    User([Пользователь / CI/CD]) --> |Web UI / REST API| AWX[AWX Web Server]
    AWX --> DB[(PostgreSQL\nБаза данных)]
    AWX --> Dispatcher[Task Engine / Dispatcher]
    Dispatcher --> EE[Execution Environments\n(Podman/Docker)]
    EE --> |SSH / WinRM| Node1[Target Node 1]
    EE --> |SSH / WinRM| Node2[Target Node 2]
    Creds[(Credential Management)] -.-> EE
    Git[Git Repository] -.-> EE
```

## 🛠️ Примеры конфигураций

**Создание ресурсов в AWX как код (через коллекцию `awx.awx`):**
```yaml
- name: Configure AWX / AAP
  hosts: localhost
  gather_facts: false
  collections:
    - awx.awx
  tasks:
    - name: Создать проект из Git
      project:
        name: "My Infrastructure Repo"
        organization: "Default"
        scm_type: git
        scm_url: "https://github.com/myorg/ansible-infra.git"
        scm_update_on_launch: true

    - name: Создать Job Template
      job_template:
        name: "Deploy Nginx"
        job_type: run
        inventory: "Production Inventory"
        project: "My Infrastructure Repo"
        playbook: "deploy_nginx.yml"
        credentials:
          - "Prod SSH Key"
```

**Вызов Job Template через REST API (bash):**
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_OAUTH2_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"extra_vars": {"app_version": "1.2.3"}}' \
  https://awx.example.com/api/v2/job_templates/10/launch/
```

## 🚀 Day 2 Operations
- **Execution Environments (EE):** В AAP 2.0 / свежем AWX плейбуки выполняются в контейнерах (EE). Создавайте кастомные EE с помощью `ansible-builder`, чтобы заранее установить все нужные Python-библиотеки и Ansible-коллекции, вместо установки их "на лету" при каждом запуске.
- **Масштабирование:** Используйте концепцию *Execution Nodes* (ранее *Isolated Nodes*) для запуска плейбуков в изолированных сетевых сегментах (например, в DMZ) без необходимости открывать SSH-доступ из центрального кластера AWX напрямую.
- **Configuration as Code (CaC):** Не накликивайте проекты, инвентари и темплейты руками. Используйте инструменты вроде коллекции `ansible.controller` для настройки самого AWX через Ansible.

## 🛑 Антипаттерны
- ❌ **Прямое вмешательство в контейнеры AWX/AAP:** Установка пакетов `apt/pip` напрямую внутрь контейнеров `awx-web` или `awx-task`. Все изменения пропадут при перезапуске/обновлении. Используйте Custom Execution Environments.
- ❌ **Хранение секретов в открытом виде в переменных Job Template:** Используйте встроенный механизм Credentials или интеграцию с внешними Secret Manager (HashiCorp Vault).
- ❌ **Запуск долгих задач (Long-running tasks) без асинхронности:** Если плейбук выполняется часами, сетевой таймаут может оборвать сессию. Лучше проектировать плейбуки идемпотентными и использовать асинхронные таски (async/poll).
