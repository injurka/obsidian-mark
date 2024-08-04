## Добавить нового пользователя

```ts
npm adduser --auth-type=legacy --registry=https://nexus.infrastructure.prosebya.tech/repository/npm/
```

При создании пользователя в `.npmrc` автоматически добавиться новый токен 

## Получить все текущие токены авторизации

```ts
cat ~/.npmrc
```
