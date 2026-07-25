# Supply Chain Security (SBOM, SLSA, Sigstore, Cosign)

## История: Боль и Решение
**Боль:** Ваш код может быть идеальным, но если злоумышленник подменит библиотеку в NPM, образ в Docker Hub или вклинится в процесс сборки CI/CD (как в случае с SolarWinds) — вы взломаны. Как доказать, что то, что крутится в проде — это ровно то, что вы написали?
**Решение:** Supply Chain Security. Создание "спецификации" (SBOM), подписывание артефактов без головной боли с ключами (Sigstore/Cosign) и стандартизация процессов сборки (SLSA).

## Архитектура защиты Supply Chain

```mermaid
flowchart TD
    Code[Source Code] --> CI[CI Builder]
    
    subgraph Secure Supply Chain
        CI -->|1. Build & Generate| SBOM[Generate SBOM\nSyft / Trivy]
        CI -->|2. Sign Image| Cosign[Sign with Cosign\nKeyless via Sigstore]
        CI -->|3. Generate Provenance| SLSA[SLSA Provenance]
    end
    
    Secure Supply Chain --> Registry[Container Registry]
    
    Registry --> Cluster[Kubernetes]
    
    subgraph Verification
        Cluster -->|Check Signature| Kyverno[Kyverno / Connaisseur]
    end
```

## Инструменты и примеры

### SBOM (Software Bill of Materials)
Список всех компонентов, зависимостей и их версий в приложении.
**Пример (генерация с помощью Syft):**
```bash
# Генерация SBOM в формате SPDX
syft packages my-app:latest -o spdx-json > sbom.spdx.json
```

### Sigstore & Cosign
Подписание артефактов контейнеров. Keyless-режим позволяет не хранить приватные ключи долго (использует OIDC).
**Пример (Подпись образа и проверка):**
```bash
# Keyless подписание образа
cosign sign --yes registry.example.com/my-app:v1.0

# Проверка подписи
cosign verify registry.example.com/my-app:v1.0 \
  --certificate-identity "hello@example.com" \
  --certificate-oidc-issuer "https://github.com/login/oauth"
```

### SLSA (Supply-chain Levels for Software Artifacts)
Фреймворк, описывающий уровни зрелости безопасности цепочки поставок (L1-L4). Включает создание provenance (происхождение) артефакта.

## Day 2 Operations (Советы)
- **Интеграция с Admission Controllers:** Настройте Kubernetes (Kyverno, OPA Gatekeeper) на отклонение подов, чьи образы не подписаны вашим Cosign.
- **Хранение SBOM:** Отправляйте сгенерированные SBOM в Dependency-Track для непрерывного отслеживания уязвимостей в уже выпущенных версиях.
- **Автоматическая ротация:** Используйте Keyless-подписание Sigstore, чтобы полностью избавиться от проблемы ротации и утечки долгоживущих ключей подписи.

## Антипаттерны
- **Создавать SBOM и ничего с ним не делать:** SBOM сам по себе не защищает. Его нужно регулярно сканировать на новые CVE.
- **Хранение приватного ключа Cosign в CI переменных без защиты:** Если ключ утечет, злоумышленник сможет подписывать вредоносные образы от вашего имени. Лучше использовать keyless (OIDC) или KMS (AWS KMS, HashiCorp Vault).
- **Слепая вера публичным Registry:** Скачивание базовых образов напрямую с Docker Hub без проверки подписей или сканирования.
