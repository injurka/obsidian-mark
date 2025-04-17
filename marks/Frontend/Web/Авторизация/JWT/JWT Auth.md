![[jwt.png]]

В этой схеме аутентификации клиент отправляет post-запрос с учетными данными (обычно именем пользователя и паролем) серверной части API. Сервер проверяет учетные данные, если они верны, создается токен JWT и подписывается с использованием секретного ключа. Затем API вернет этот токен клиенту. Токен JWT будет отправляться на сервер при каждом последующем запросе.

Токен JWT отправляется на сервер через заголовок авторизации.

## Структура веб-токена JSON

Токен JWT состоит из трех различных разделов, отделенных друг от друга символом точки: заголовок.полезная нагрузка.подпись

![[jwt-structure.png]]

Каждый раздел содержит важную информацию. После расшифровки,

**заголовок** представляет собой представление в формате JSON, которое содержит данные, относящиеся к типу токена, с которым мы имеем дело, и алгоритму, используемому для его генерации.

**полезная нагрузка** - это представление в формате JSON, содержащее данные, относящиеся к запросу и пользователю, его выполняющему.

**подпись** - это закодированная строка, используемая как клиентом, так и сервером для проверки подлинности полезной нагрузки.

Посетите [jwt.io](https://jwt.io/), чтобы расшифровать ваш JWT.

>server
```js
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();

app.use(express.json());

// Define a secret key for signing the JWT
const secretKey = 'your_secret_key';

// Middleware function to authenticate
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send('No authorization header');
    } else {
        const token = authHeader.split(' ')[1]; // Remove 'Bearer '
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).send('Invalid token');
            } else {
                req.user = decoded.user;
                next();
            }
        });
    }
}

// Route for logging in
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ user: { username } }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Use the middleware function on all routes
app.use(authenticate);

// Define a route that requires authentication
app.get('/', (req, res) => {
    res.send(`Welcome, ${req.user.username}!`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

>client
```js
const axios = require('axios');

const username = 'admin';
const password = 'password';

// Send a POST request to the login route
axios.post('http://localhost:3000/login', { username, password })
.then(response => {
    const token = response.data.token;

    // Use the token in a subsequent GET request
    axios.get('http://localhost:3000/', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
})
.catch(error => {
    console.log(error);
});
```
