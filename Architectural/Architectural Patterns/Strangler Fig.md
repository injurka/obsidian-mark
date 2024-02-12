Постепенно переносите устаревшую систему, постепенно заменяя определенные функции новыми приложениями и службами. Старая система в конечном итоге задыхается от новой системы, которая в результате заменяет все функции устаревшей системы, позволяя вам вывести ее из эксплуатации.

Заменяйте определенные функции поэтапно новым программным обеспечением и услугами. Создайте фасад, который перехватывает запросы, направляемые в устаревшую серверную систему. Эти запросы перенаправляются фасадом либо в новые службы, либо в устаревшее приложение. Клиенты могут использовать тот же интерфейс, в то время как существующие функции постепенно переносятся в новую систему, совершенно не зная о переходе.

![[strangler_fig.png]]

Этот метод помогает распределить работу по разработке по времени и снизить риск миграции. Вы можете добавлять функциональные возможности в новую систему с любой скоростью, которая вам нравится, при этом гарантируя, что устаревшее приложение продолжает работать, потому что фасад безопасно направляет пользователей к соответствующему приложению. Устаревшая система постепенно становится «задушенной» и со временем больше не требуется по мере переноса функций в новую систему. После завершения этой процедуры устаревшую систему можно безопасно вывести из эксплуатации.

---

Для реализации паттерна Strangler Fig, перенося функциональность с одной версии React на другую, вы можете постепенно заменять старые компоненты новыми, используя подход постепенного обновления.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strangler Fig Example - Updating React Version</title>
</head>
<body>
    <div id="app"></div>
    
    <!-- Include both old and new React libraries -->
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    
    <!-- Your legacy React code using old version -->
    <script>
        // Define a legacy React component using old version
        const LegacyComponent = () => {
            return React.createElement('div', null, 'Legacy React Component');
        };
        
        // Render the legacy React component in the app div
        ReactDOM.render(React.createElement(LegacyComponent), document.getElementById('app'));
    </script>
    
    <!-- New React components using the new version -->
    <script>
        // Define a new React component using new version
        const NewComponent = () => {
            return React.createElement('div', null, 'New React Component');
        };
        
        // Render the new React component in the app div
        ReactDOM.render(React.createElement(NewComponent), document.getElementById('app'));
    </script>
</body>
</html>
```

В этом примере, мы подключаем и используем как старую, так и новую версии React. Вы можете постепенно обновлять компоненты, заменяя старые на новые, и таким образом переносить функциональность на новую версию React.