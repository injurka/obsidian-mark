**SAML** (Security Assertion Markup Language) — это стандарт для обмена данными аутентификации и авторизации между системами. Он позволяет реализовать **единый вход (SSO)**: пользователь входит один раз, а затем автоматически получает доступ ко всем связанным сервисам без повторного ввода пароля.  

**Пример**:  
Вы входите в корпоративный портал, а затем без пароля открываете почту, CRM и другие внутренние системы. Это работает благодаря SAML.  

---

## Для чего нужен SAML?  
1. **Единый вход (SSO)**  
   Устраняет необходимость запоминать множество паролей для разных сервисов.  
2. **Федеративная идентификация**  
   Организации могут доверять аутентификации, выполненной другой системой (например, вход в облачный сервис через корпоративный аккаунт).  
3. **Безопасность**  
   SAML использует шифрование и цифровые подписи для защиты данных.  

---

## Основные компоненты SAML  
1. **Identity Provider (IdP)**  
   Система, которая проверяет личность пользователя и выдает «удостоверение» (S-assertion).  
   *Примеры*: Azure AD, Okta, Keycloak.  
2. **Service Provider (SP)**  
   Сервис, который предоставляет доступ к ресурсам (например, веб-приложение).  
   *Примеры*: Salesforce, Google Workspace, GitHub Enterprise.  
3. **Assertion (Утверждение)**  
   XML-документ, который содержит информацию о пользователе (логин, права доступа).  

---

## Как работает SAML (шаг за шагом)  
1. **Пользователь пытается войти в Service Provider (SP)**  
   Например, открывает корпоративную CRM.  
2. **SP перенаправляет пользователя к Identity Provider (IdP)**  
   Отправляет запрос на аутентификацию (AuthnRequest).  
3. **IdP проверяет личность пользователя**  
   Пользователь вводит логин/пароль, проходит 2FA или использует существующую сессию.  
4. **IdP генерирует SAM-утверждение**  
   В нем указывается:  
   - Кто пользователь (атрибут `NameID`),  
   - Его права (роли),  
   - Срок действия токена.  
5. **IdP отправляет утверждение обратно в SP**  
   Через браузер пользователя (метод POST) или напрямую (back-channel).  
6. **SP проверяет подпись утверждения и выдает доступ**  
   Если все в порядке, пользователь попадает в систему.  

---

## Пример потока SAML  
1. Вы открываете `app.company.com` (SP).  
2. SP перенаправляет вас на `sso.company.com` (IdP).  
3. Вы вводите пароль в IdP.  
4. IdP формирует SAML-утверждение и отправляет его обратно в SP.  
5. SP проверяет данные и открывает доступ к приложению.  

---

## Преимущества SAML  
- **Удобство**: Один пароль для всех сервисов.  
- **Безопасность**: Пароль не передается в SP — только криптографически подписанные утверждения.  
- **Централизация**: Управление правами через IdP (например, блокировка уволенных сотрудников во всех системах сразу).  

---

## Недостатки SAML  
- **Сложность настройки**: Требуется интеграция SP и IdP через XML-метаданные.  
- **Зависимость от XML**: SAML использует XML, который менее гибок, чем JSON (как в OAuth/JWT).  
- **Латентность**: Перенаправления между SP и IdP могут замедлить вход.  

---

## SAML vs OAuth/OpenID Connect  
- **SAML**  
  - Использует XML.  
  - Оптимизирован для корпоративных SSO.  
  - Часто применяется в B2B-сценариях.  
- **OAuth/OpenID Connect**  
  - Использует JSON (JWT).  
  - Популярен в мобильных и потребительских приложениях (например, вход через Google/Facebook).  

---

## Где используется SAML?  
1. Корпоративные порталы (доступ к внутренним сервисам).  
2. Облачные приложения (Salesforce, Workday).  
3. Образовательные платформы (доступ к библиотекам и курсам через вуз).  

---

## Пример SAML-утверждения (упрощенно)  
```xml  
<saml:Assertion>  
  <saml:Issuer>https://sso.company.com</saml:Issuer>  
  <saml:Subject>  
    <saml:NameID>user@company.com</saml:NameID>  
  </saml:Subject>  
  <saml:Conditions>  
    <saml:Audience>https://app.company.com</saml:Audience>  
    <saml:NotBefore>2023-10-01T00:00:00Z</saml:NotBefore>  
    <saml:NotOnOrAfter>2023-10-01T01:00:00Z</saml:NotOnOrAfter>  
  </saml:Conditions>  
  <saml:AuthnStatement>  
    <saml:AuthnInstant>2023-10-01T00:05:00Z</saml:AuthnInstant>  
  </saml:AuthnStatement>  
</saml:Assertion>  
```  

---

## Как настроить SAML?  
1. **Обмен метаданными**  
   - IdP и SP обмениваются XML-файлами с настройками (URL, сертификаты).  
2. **Настройка атрибутов**  
   Определите, какие данные пользователя (email, роли) будут передаваться в SP.  
3. **Тестирование**  
   Используйте инструменты вроде SAML Tracer (расширение для браузера) для отладки.  