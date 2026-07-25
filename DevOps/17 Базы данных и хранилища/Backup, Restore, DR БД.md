# Backup, Restore и Disaster Recovery (DR) БД

## 📖 DevOps-история: Боль и Решение

**Боль:** В пятницу вечером разработчик случайно выполнил `DROP TABLE users;` на проде вместо стейджинга. Последний бэкап делался "когда-то давно" скриптом на bash, который месяц назад перестал работать из-за нехватки места на диске. Бизнес простаивает, логи транзакций (WAL) не архивировались, восстановить данные на момент "за 5 минут до аварии" (Point-in-Time Recovery - PITR) невозможно.

**Решение:** Внедрение автоматизированной системы резервного копирования (например, Barman, pgBackRest или Wal-G для PostgreSQL), настройка непрерывного архивирования WAL в S3-совместимое хранилище (MinIO/AWS) и регулярные учения по DR (Disaster Recovery). Теперь при падении основного кластера поднимается реплика в другом дата-центре (RPO < 1 мин, RTO < 10 мин), а бэкапы тестируются автоматически.

---

## 🏗 Архитектура Disaster Recovery (Active-Passive)

```mermaid
graph TD
    subgraph "Data Center A (Primary)"
        App[Application] --> |Read/Write| DB_Primary[(Primary DB)]
        DB_Primary -.-> |WAL Archiving| S3_Storage[S3 Storage / MinIO]
    end

    subgraph "Data Center B (DR / Standby)"
        DB_Standby[(Standby DB)] -.-> |Restore/Fetch WAL| S3_Storage
        DB_Primary --> |Streaming Replication| DB_Standby
    end
    
    subgraph "Backup Server / Tool"
        BackupTool[pgBackRest / Wal-G] --> |Full/Incremental Backups| S3_Storage
        BackupTool -.-> |Manage| DB_Primary
    end
```

---

## 🛠 Примеры (WAL-G для PostgreSQL)

**1. Конфигурация WAL-G (env variables):**

```bash
# /etc/wal-g.d/env/AWS_S3_PREFIX
s3://my-backup-bucket/postgres-db/

# /etc/wal-g.d/env/AWS_ACCESS_KEY_ID
AKIAIOSFODNN7EXAMPLE

# /etc/wal-g.d/env/AWS_SECRET_ACCESS_KEY
wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# /etc/wal-g.d/env/WALG_COMPRESSION_METHOD
lz4
```

**2. Настройка `postgresql.conf` для архивации:**

```ini
wal_level = replica
archive_mode = on
archive_command = 'wal-g wal-push %p'
archive_timeout = 60s
```

**3. Создание бэкапа (cron-задача):**

```bash
#!/bin/bash
# Запуск полного бэкапа каждую ночь в 2:00
0 2 * * * postgres wal-g backup-push /var/lib/postgresql/14/main
```

**4. Восстановление (PITR) из S3:**

```bash
# Останавливаем БД и чистим старую дату
systemctl stop postgresql
rm -rf /var/lib/postgresql/14/main/*

# Восстанавливаем последний полный бэкап
wal-g backup-fetch /var/lib/postgresql/14/main LATEST

# Настраиваем recovery.signal для PITR на конкретное время
touch /var/lib/postgresql/14/main/recovery.signal
cat <<EOF > /var/lib/postgresql/14/main/postgresql.auto.conf
restore_command = 'wal-g wal-fetch "%f" "%p"'
recovery_target_time = '2026-07-25 15:00:00'
EOF

systemctl start postgresql
```

---

## 🌅 Day 2 Operations (Советы по эксплуатации)

- **Регулярные учения (Recovery Drills):** Бэкап не существует, пока вы из него успешно не восстановились. Автоматизируйте развертывание тестовой среды из ночного бэкапа с проверкой консистентности (например, запросом `SELECT count(*) FROM users`).
- **Мониторинг бэкапов:** Настройте алерты (Prometheus/Grafana) на отсутствие свежих бэкапов (старше 24 часов) и на падение процесса архивации WAL.
- **Управление жизненным циклом (Retention Policy):** Настройте удаление старых бэкапов и WAL в S3 (Lifecycle Rules), чтобы не переплачивать за хранение петабайтов мусора.
- **Оценка RPO и RTO:** 
  - **RPO (Recovery Point Objective):** Сколько данных мы готовы потерять (определяет частоту бэкапов/архивации).
  - **RTO (Recovery Time Objective):** Как быстро мы должны подняться после сбоя (определяет скорость восстановления или наличие горячей реплики).

---

## 🚫 Антипаттерны

1. **"Дампы" вместо физических бэкапов:** Использование `pg_dump` или `mysqldump` для баз размером сотни гигабайт. Это медленно, нагружает базу, а восстановление может занять дни.
2. **Бэкап на тот же диск/сервер:** Хранение резервных копий на том же физическом диске или сервере, где крутится сама БД. При сгорании сервера теряется всё.
3. **Отсутствие шифрования:** Хранение бэкапов в облаке в открытом виде без шифрования на стороне клиента (Client-Side Encryption).
4. **Неучет нагрузки:** Запуск тяжелого полного физического бэкапа в часы пиковой нагрузки на продакшен-базу (I/O saturation).
