# Identity & Access Management (IAM)

Раздел посвящен системам управления идентификацией и доступом, протоколам аутентификации, авторизации, управлению сессиями и федерацией в веб-приложениях.

---

## 🗺️ Структура раздела

### 1. Фундамент и концепции
- **[[Термины: identity, authentication, authorization]]** — разница между AuthN (кто вы?) и AuthZ (что вам можно?), базовые термины.

---

### 2. Аутентификация (Authentication — "Кто вы?")
- **[[Basic Authentication]]** — базовый HTTP-механизм (заголовок `Authorization: Basic`).
- **[[Digest Authentication]]** — схема с хэшированием учетных данных и nonce.
- **[[WebAuthn и Passkeys]]** — беспарольный криптографический стандарт W3C/FIDO2.
- **[[Многофакторная аутентификация (MFA)]]** — факторы знания, владения, свойства; TOTP, SMS, Push, адаптивная 2FA.
- **[[Kerberos]]** — корпоративная взаимная аутентификация по билетам (KDC, TGT, SPNEGO).
- **[[LDAP]]** — протокол каталогов пользователей и Active Directory.

---

### 3. Токены и управление сессиями
- **[[Сессии и cookies]]** — stateful подход: `session_id`, безопасные атрибуты (`HttpOnly`, `Secure`, `SameSite`), хранение в Redis.
- **[[JWT]]** — stateless токены: структура (Header, Payload, Signature), безопасность и хранение.
- **[[Refresh Tokens]]** — механизм ротации, скользящее продление сессий и отзыв токенов.
- **[[Access Token vs ID Token]]** — принципиальная разница между токеном доступа (API) и токеном личности (UI).

---

### 4. Делегирование доступа и федерация (SSO)
- **[[SSO]]** — концепция Single Sign-On, Identity Providers (IdP) и Service Providers (SP).
- **[[OAuth 1.0]]** — история и протокол с криптографической подписью каждого запроса.
- **[[OAuth 2.0]]** — современный протокол делегирования прав (Authorization Code, Client Credentials, PKCE).
- **[[OpenID Connect]]** — слой аутентификации поверх OAuth 2.0 (ID Token, UserInfo, Discovery).
- **[[SAML]]** — XML-стандарт федерации в корпоративном сегменте.

---

### 5. Авторизация доступа (Authorization — "Что вам можно?")
- **[[Авторизация: роли и permissions]]** — архитектура прав, permissions vs roles, scopes и политики.
- **[[RBAC]]** — Role-Based Access Control: иерархии ролей, схема БД и реализация.
- **[[ABAC]]** — Attribute-Based Access Control: динамические политики XACML/OPA на основе контекста и атрибутов.
- **[[Route Guards и авторизация]]** — защита клиентских маршрутов в React / Next.js, UX-паттерны и серверная валидация.
