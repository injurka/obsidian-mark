Базовая аутентификация HTTP

При базовой аутентификации HTTP запрос содержит поле заголовка в форме `Authorization: Basic <credentials>`, где учетные данные - это кодировка имени пользователя и пароля в формате `Base64`, соединенные одним двоеточием :.

Эта схема аутентификации небезопасна, поскольку учетные данные не зашифрованы. Он становится безопасным только тогда, когда запрос отправляется по протоколу **HTTPS**, что означает, что запрос был зашифрован по протоколу **SSL**.

> server
```js
const express = require('express');
const app = express();

// Define a username and password
const username = 'admin';
const password = 'password';

// Middleware function to authenticate
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send('No authorization header');
    } else {
        const base64Credentials = authHeader.split(' ')[1]; // Remove 'Basic '
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [usernameFromHeader, passwordFromHeader] = credentials.split(':');

        if (usernameFromHeader === username && passwordFromHeader === password) {
            next();
        } else {
            res.status(401).send('Invalid credentials');
        }
    }
}

// Use the middleware function on all routes
app.use(authenticate);

// Define a route that requires authentication
app.get('/', (req, res) => {
    res.send('Welcome to the secure area!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

> client
```js
const axios = require('axios');

const username = 'admin';
const password = 'password';

const config = {
    method: 'get',
    url: 'http://localhost:3000/',
    headers: {
        'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
};

axios(config)
.then(function (response) {
    console.log(JSON.stringify(response.data));
})
.catch(function (error) {
    console.log(error);
});
```
