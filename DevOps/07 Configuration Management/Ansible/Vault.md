# Ansible Vault

## 📖 DevOps Story (Боль и Решение)
**Боль:** Пароли от баз данных, API-ключи и SSH-сертификаты лежат в Git в открытом виде (plaintext). Любой разработчик, имеющий доступ к репозиторию, может скомпрометировать продакшн.
**Решение:** **Ansible Vault** позволяет шифровать переменные (или целые файлы) с помощью AES-256 прямо в репозитории. При запуске плейбука пароль расшифровывается на лету, что позволяет безопасно хранить секреты в Git (GitOps).

## 🗺️ Архитектура / Схема работы

```mermaid
flowchart LR
    A[Разработчик] -- пишет плейбук --> B[Git Repo]
    A -- ansible-vault encrypt --> C((Зашифрованные переменные\n vault_secret.yml))
    C -.-> B
    B --> D[CI/CD / Ansible Server]
    D -- ansible-playbook\n--vault-password-file --> E[Целевые серверы]
    F[(Vault Password File\n/ CI Variable)] -.-> D
```

## 🛠️ Примеры конфигураций

**Создание и шифрование файла переменных:**
```bash
# Создать новый зашифрованный файл
ansible-vault create group_vars/all/vault.yml

# Зашифровать существующий файл
ansible-vault encrypt config.yml

# Использование Vault ID (для нескольких паролей)
ansible-vault encrypt --vault-id prod@prompt config_prod.yml
```

**Использование в плейбуке (YAML):**
```yaml
# group_vars/all/vault.yml
vault_db_password: "SuperSecretPassword123"

# playbook.yml
- hosts: database
  tasks:
    - name: Ensure PostgreSQL user exists
      postgresql_user:
        name: app_user
        password: "{{ vault_db_password }}"
```

**Запуск с расшифровкой:**
```bash
# С запросом пароля
ansible-playbook -i inventory playbook.yml --ask-vault-pass

# Использование файла с паролем (для CI/CD)
echo "my_secret_password" > .vault_pass.txt
ansible-playbook -i inventory playbook.yml --vault-password-file .vault_pass.txt
```

## 🚀 Day 2 Operations
- **Ротация паролей:** Используйте `ansible-vault rekey --vault-id @prompt secrets.yml` для периодической смены пароля шифрования без необходимости заново вводить сами секретные данные.
- **Интеграция с CI/CD:** Никогда не храните пароль от Vault на диске в открытом виде надолго. В GitLab CI/GitHub Actions передавайте его как секретную переменную окружения (Environment Variable) и временно записывайте в tmp-файл во время джоба.
- **Множественные Vault IDs:** Разделяйте пароли для разных сред (dev, stg, prod). Используйте `--vault-id dev@.vault_pass_dev --vault-id prod@prompt`.

## 🛑 Антипаттерны
- ❌ **Коммит файла с паролем от Vault в Git:** (например, `.vault_pass.txt`). Это полностью сводит на нет смысл шифрования.
- ❌ **Шифрование целого файла плейбука (playbook.yml):** Усложняет code review и поиск по репозиторию. Шифруйте только файлы с переменными (vars) или конкретные строки (inline encryption: `ansible-vault encrypt_string`).
- ❌ **Использование одного пароля для всех окружений:** Компрометация пароля от dev-среды скомпрометирует и production.
